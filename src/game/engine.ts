import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import { StageMap, CheckpointGate, SpikeHazard, ExplosiveBarrel, SpinningSawHazard, FireGeyserHazard, MysteryBox } from './map';
import { SpriteRenderer } from './sprites';
import { sounds } from './sound';
import { Lesson, Question, WeaponType, PlayerStats } from '../types';

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isPlayer: boolean;
  bulletType: 'NORMAL' | 'SPREAD' | 'MACHINE' | 'LASER' | 'FIRE';
  pierceCount?: number;
}

interface Enemy {
  id: string;
  type: 'soldier' | 'turret';
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  direction: number;
  animFrame: number;
  shootCooldown: number;
  patrolStartX: number;
  patrolEndX: number;
  angle?: number;
}

interface ItemPickup {
  id: string;
  type: 'mushroom' | 'weapon_s' | 'weapon_m' | 'weapon_l' | 'weapon_f' | 'ammo' | 'heart';
  x: number;
  y: number;
  vx: number;
  vy: number;
  timer: number;
  isGrounded: boolean;
}

interface FlyingDrone {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  animFrame: number;
  hp: number;
  dropType: 'mushroom' | 'weapon_s' | 'weapon_m' | 'weapon_l' | 'weapon_f';
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  timer: number;
  maxTimer: number;
}

interface FloatingToast {
  text: string;
  x: number;
  y: number;
  alpha: number;
  color?: string;
}

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
}

export class GameEngine {
  public map: StageMap;
  public lesson: Lesson;

  // Player state
  public px: number = 80;
  public py: number = 380;
  public pvx: number = 0;
  public pvy: number = 0;
  public pDir: number = 1;
  public isGrounded: boolean = true;
  public isJumping: boolean = false;
  public animFrame: number = 0;
  public shootCooldown: number = 0;
  public isShootingAnim: boolean = false;

  // Mushroom Powerup & Stats
  public hearts: number = 5;
  public maxHearts: number = 5;
  public medals: number = 0;
  public enemiesDefeated: number = 0;
  public weapon: WeaponType = 'RIFLE';
  public spreadTimeMs: number = 0; // Special weapon duration timer
  public isInvincible: boolean = false;
  public invincibleTimer: number = 0;

  // Super Mushroom giant state
  public mushroomTimer: number = 0; // Frames of giant mode
  public isGiant: boolean = false;

  // Camera
  public cameraX: number = 0;

  // Entities & Pickups
  public bullets: Bullet[] = [];
  public enemies: Enemy[] = [];
  public items: ItemPickup[] = [];
  public drones: FlyingDrone[] = [];
  public droneSpawnTimer: number = 300; // Spawns periodic flying item drone
  public explosions: Explosion[] = [];
  public confettis: Confetti[] = [];
  public floatingToast: FloatingToast | null = null;

  // Status
  public state: 'playing' | 'paused' | 'quiz' | 'victory' | 'gameover' = 'playing';
  public activeGateForQuiz: CheckpointGate | null = null;

  // Callbacks
  public onStateChange?: (state: 'playing' | 'paused' | 'quiz' | 'victory' | 'gameover') => void;
  public onOpenQuiz?: (context: { gateNumber: number; question: Question; gateId: string }) => void;
  public onStatsChange?: (stats: PlayerStats) => void;

  constructor(lesson: Lesson) {
    this.lesson = lesson;
    this.map = new StageMap(lesson.questions.length);
    this.initEnemies();
  }

  public setLesson(lesson: Lesson) {
    this.lesson = lesson;
    this.resetGame();
  }

  public resetGame() {
    this.map = new StageMap(this.lesson.questions.length);
    this.px = 80;
    this.py = this.map.groundY;
    this.pvx = 0;
    this.pvy = 0;
    this.pDir = 1;
    this.hearts = 5;
    this.medals = 0;
    this.enemiesDefeated = 0;
    this.weapon = 'RIFLE';
    this.spreadTimeMs = 0;
    this.isInvincible = false;
    this.invincibleTimer = 0;
    this.mushroomTimer = 0;
    this.isGiant = false;
    this.bullets = [];
    this.items = [];
    this.drones = [];
    this.droneSpawnTimer = 300;
    this.explosions = [];
    this.confettis = [];
    this.floatingToast = null;
    this.cameraX = 0;
    this.state = 'playing';
    this.activeGateForQuiz = null;

    this.initEnemies();
    this.notifyStats();
  }

  private initEnemies() {
    this.enemies = [];

    // Spawn 1-2 soldiers between each gate
    for (let i = 0; i < this.map.gates.length; i++) {
      const gate = this.map.gates[i];
      const nextGateX = i < this.map.gates.length - 1 ? this.map.gates[i + 1].x : gate.x + 680;

      // Patrol soldier on ground
      this.enemies.push({
        id: `soldier_${i}_1`,
        type: 'soldier',
        x: gate.x + 230,
        y: this.map.groundY,
        vx: -1.2,
        vy: 0,
        hp: 1,
        maxHp: 1,
        direction: -1,
        animFrame: 0,
        shootCooldown: 90 + Math.random() * 60,
        patrolStartX: gate.x + 100,
        patrolEndX: nextGateX - 80
      });

      // Turrets on elevated platforms
      const turretInfo = this.map.turretPlacements.find(t => t.id === `turret_${i}`);
      if (turretInfo) {
        this.enemies.push({
          id: turretInfo.id,
          type: 'turret',
          x: turretInfo.x,
          y: turretInfo.y,
          vx: 0,
          vy: 0,
          hp: 2,
          maxHp: 2,
          direction: -1,
          animFrame: 0,
          shootCooldown: 120 + Math.random() * 40,
          patrolStartX: turretInfo.x,
          patrolEndX: turretInfo.x,
          angle: Math.PI
        });
      }
    }
  }

  public update(keys: Record<string, boolean>) {
    if (this.state !== 'playing') return;

    // 1. Weapon duration timer
    if (this.spreadTimeMs > 0) {
      this.spreadTimeMs -= 1000 / 60;
      if (this.spreadTimeMs <= 0) {
        this.spreadTimeMs = 0;
        this.weapon = 'RIFLE';
        this.notifyStats();
      }
    }

    // 2. Super Mushroom timer (Giant Mode)
    if (this.mushroomTimer > 0) {
      this.mushroomTimer--;
      this.isGiant = true;
      if (this.mushroomTimer <= 0) {
        this.isGiant = false;
        this.showToast('SIÊU NẤM HẾT HIỆU LỰC', this.px, this.py - 50, '#eab308');
        this.notifyStats();
      }
    }

    // 3. Invincibility timer
    if (this.isInvincible) {
      this.invincibleTimer--;
      if (this.invincibleTimer <= 0) {
        this.isInvincible = false;
      }
    }

    // 4. Update Map Obstacles (Saws, Fire Geysers, Barrels)
    this.map.updateObstacles();

    // 5. Player Movement Inputs
    const left = keys['ArrowLeft'] || keys['KeyA'] || keys['a'] || keys['A'];
    const right = keys['ArrowRight'] || keys['KeyD'] || keys['d'] || keys['D'];
    const jump = keys['Space'] || keys[' '] || keys['KeyW'] || keys['w'] || keys['W'] || keys['ArrowUp'] || keys['KeyK'] || keys['k'];
    const shoot = keys['KeyX'] || keys['x'] || keys['X'] || keys['KeyJ'] || keys['j'] || keys['J'] || keys['KeyZ'] || keys['z'] || keys['Z'] || keys['KeyB'] || keys['b'] || keys['B'];

    const baseSpeed = this.isGiant ? 3.4 : 2.8;

    if (left) {
      this.pvx = -baseSpeed;
      this.pDir = -1;
      this.animFrame += 0.2;
    } else if (right) {
      this.pvx = baseSpeed;
      this.pDir = 1;
      this.animFrame += 0.2;
    } else {
      this.pvx = 0;
      this.animFrame = 0;
    }

    // Jump
    if (jump && this.isGrounded) {
      this.pvy = this.isGiant ? -10.5 : -9.6;
      this.isGrounded = false;
      this.isJumping = true;
      sounds.playJump();
    }

    // Gravity
    this.pvy += 0.45;
    if (this.pvy > 12) this.pvy = 12;

    // Move X
    this.px += this.pvx;
    this.handleHorizontalCollisions();
    this.handleGateCollisions();

    // Move Y
    this.py += this.pvy;
    this.handleVerticalCollisions();

    // Head hitting Mystery Boxes from below
    this.handleMysteryBoxHeadCollisions();

    // Obstacle Hazards collisions
    this.handleObstacleCollisions();

    // Giant player crushing enemies by running over them
    if (this.isGiant) {
      this.handleGiantStompEnemies();
    }

    // 6. Shooting
    if (this.shootCooldown > 0) {
      this.shootCooldown--;
    }

    if (shoot && this.shootCooldown <= 0) {
      this.fireBullet();
    }

    // 7. Update Flying Drones Spawner & Movement
    this.updateFlyingDrones();

    // 8. Update Pickups (Mushroom, Weapons, Ammo)
    this.updateItems();

    // 9. Update Bullets
    this.updateBullets();

    // 10. Update Enemies
    this.updateEnemies();

    // 11. Update Explosions & Confetti & Toast
    this.updateParticles();

    // 12. Camera Scrolling
    const targetCamX = this.px - CANVAS_WIDTH * 0.35;
    this.cameraX += (targetCamX - this.cameraX) * 0.1;
    if (this.cameraX < 0) this.cameraX = 0;
    const maxCamX = this.map.width - CANVAS_WIDTH;
    if (this.cameraX > maxCamX) this.cameraX = maxCamX;

    // 13. Check Victory (Passed all gates and reached end of stage)
    const lastGate = this.map.gates[this.map.gates.length - 1];
    if (lastGate && lastGate.isUnlocked && this.px > lastGate.x + 250) {
      this.state = 'victory';
      sounds.playStageClear();
      this.onStateChange?.('victory');
    }
  }

  private handleHorizontalCollisions() {
    if (this.px < 30) this.px = 30;
    if (this.px > this.map.width - 40) this.px = this.map.width - 40;

    // Platform & Crate lateral collision
    const pWidth = this.isGiant ? 16 : 10;
    this.map.platforms.forEach(p => {
      if (p.isCrate) {
        const playerTop = this.py - (this.isGiant ? 48 : 36);
        const playerBottom = this.py;
        if (playerBottom > p.y + 4 && playerTop < p.y + p.h - 4) {
          if (this.pvx > 0 && this.px + pWidth > p.x && this.px - pWidth < p.x) {
            this.px = p.x - pWidth;
          } else if (this.pvx < 0 && this.px - pWidth < p.x + p.w && this.px + pWidth > p.x + p.w) {
            this.px = p.x + p.w + pWidth;
          }
        }
      }
    });
  }

  private handleGateCollisions() {
    this.map.gates.forEach(gate => {
      if (!gate.isUnlocked) {
        const dist = Math.abs(this.px - (gate.x + gate.w / 2));
        if (dist < 28 && this.py > gate.y && this.py - 36 < gate.y + gate.h) {
          if (this.pDir > 0) {
            this.px = gate.x - 18;
          } else {
            this.px = gate.x + gate.w + 18;
          }
          this.pvx = 0;
          this.triggerQuizForGate(gate);
        }
      }
    });
  }

  private handleMysteryBoxHeadCollisions() {
    // Check if player jumped into bottom of Mystery Box
    if (this.pvy < 0) {
      const playerHeadY = this.py - (this.isGiant ? 48 : 36);
      this.map.mysteryBoxes.forEach(box => {
        if (!box.isHit) {
          if (
            this.px + 12 > box.x &&
            this.px - 12 < box.x + box.w &&
            playerHeadY <= box.y + box.h &&
            playerHeadY >= box.y
          ) {
            this.hitMysteryBox(box);
            this.pvy = 1.5; // bounce down
          }
        }
      });
    }
  }

  private hitMysteryBox(box: MysteryBox) {
    if (box.isHit) return;
    box.isHit = true;
    sounds.playBoxHit();

    // Spawn item popping out of box
    this.spawnItem(box.x + box.w / 2, box.y - 12, box.content);
  }

  private spawnItem(
    x: number,
    y: number,
    type: 'mushroom' | 'weapon_s' | 'weapon_m' | 'weapon_l' | 'weapon_f' | 'ammo' | 'heart'
  ) {
    this.items.push({
      id: `item_${Date.now()}_${Math.random()}`,
      type,
      x,
      y,
      vx: (Math.random() - 0.5) * 1.8,
      vy: -4.5, // pops upward
      timer: 700,
      isGrounded: false
    });
  }

  private handleObstacleCollisions() {
    const playerBottom = this.py;
    const playerTop = this.py - (this.isGiant ? 46 : 34);

    // 1. Spikes Hazard
    this.map.spikes.forEach(sp => {
      if (
        this.px + 8 > sp.x &&
        this.px - 8 < sp.x + sp.w &&
        playerBottom >= sp.y + 2 &&
        playerTop <= sp.y + sp.h
      ) {
        if (this.isGiant) {
          // Giant player bounces off spikes safely
          this.pvy = -6;
          sounds.playSpikeHit();
        } else if (!this.isInvincible) {
          sounds.playSpikeHit();
          this.pvy = -6.5;
          this.takePlayerDamage();
        }
      }
    });

    // 2. Spinning Saws Hazard
    this.map.spinningSaws.forEach(saw => {
      const dist = Math.hypot(this.px - saw.x, this.py - 18 - saw.y);
      if (dist < saw.radius + (this.isGiant ? 16 : 10)) {
        if (this.isGiant) {
          this.pvy = -6;
          this.pvx = this.px > saw.x ? 5 : -5;
          sounds.playHit();
        } else if (!this.isInvincible) {
          this.pvx = this.px > saw.x ? 4 : -4;
          this.pvy = -5;
          this.takePlayerDamage();
        }
      }
    });

    // 3. Fire Geysers Hazard
    this.map.fireGeysers.forEach(fg => {
      if (fg.isActive) {
        const flameTop = fg.y - 48;
        if (
          this.px + 10 > fg.x &&
          this.px - 10 < fg.x + fg.w &&
          playerBottom >= flameTop &&
          playerTop <= fg.y + fg.h
        ) {
          if (!this.isInvincible) {
            this.pvy = -5;
            this.takePlayerDamage();
          }
        }
      }
    });
  }

  private handleGiantStompEnemies() {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      const dist = Math.hypot(this.px - e.x, this.py - e.y);
      if (dist < 32) {
        // Giant player obliterates enemy on contact!
        this.enemiesDefeated++;
        sounds.playExplosion();
        this.explosions.push({
          x: e.x,
          y: e.y - 18,
          radius: 32,
          timer: 0,
          maxTimer: 18
        });
        this.enemies.splice(i, 1);
        this.showToast('💥 NGHIỀN NÁT!', e.x, e.y - 40, '#facc15');
        this.notifyStats();
      }
    }
  }

  private triggerQuizForGate(gate: CheckpointGate) {
    if (this.state !== 'playing') return;
    this.activeGateForQuiz = gate;
    this.state = 'quiz';

    const question = this.lesson.questions[gate.questionIndex] || this.lesson.questions[0];
    this.onOpenQuiz?.({
      gateNumber: gate.gateNumber,
      question,
      gateId: gate.id
    });
    this.onStateChange?.('quiz');
  }

  public handleQuizResult(isCorrect: boolean) {
    if (!this.activeGateForQuiz) return;

    const gate = this.activeGateForQuiz;
    gate.isUnlocked = true;

    if (isCorrect) {
      this.medals++;
      this.weapon = 'SPREAD';
      this.spreadTimeMs = 18000;
      sounds.playQuizSuccess();

      // Confetti & Toast
      this.spawnConfetti(gate.x + gate.w / 2, gate.y + 40);
      this.showToast('CỔNG ĐÃ MỞ! SÚNG SPREAD 18s!', gate.x + gate.w / 2, gate.y - 30, '#10b981');
    } else {
      sounds.playQuizFail();
      this.showToast('CỔNG ĐÃ MỞ!', gate.x + gate.w / 2, gate.y - 30, '#eab308');
    }

    this.activeGateForQuiz = null;
    this.state = 'playing';
    this.notifyStats();
    this.onStateChange?.('playing');
  }

  private handleVerticalCollisions() {
    this.isGrounded = false;
    const pWidth = this.isGiant ? 16 : 10;

    for (let p of this.map.platforms) {
      if (
        this.pvy >= 0 &&
        this.px + pWidth > p.x &&
        this.px - pWidth < p.x + p.w &&
        this.py >= p.y &&
        this.py - this.pvy <= p.y + 14
      ) {
        this.py = p.y;
        this.pvy = 0;
        this.isGrounded = true;
        this.isJumping = false;
        break;
      }
    }
  }

  private fireBullet() {
    this.isShootingAnim = true;
    setTimeout(() => {
      this.isShootingAnim = false;
    }, 110);

    const spawnX = this.px + this.pDir * (this.isGiant ? 26 : 20);
    const spawnY = this.py - (this.isGiant ? 28 : 22);

    if (this.weapon === 'SPREAD') {
      // Spread Gun: 3 spreading fiery orbs in an arc
      this.shootCooldown = 12;
      sounds.playShoot('S');
      const angles = [-0.22, 0, 0.22];
      angles.forEach(ang => {
        const baseAngle = this.pDir > 0 ? 0 : Math.PI;
        const totalAngle = baseAngle + ang;
        const spd = 7.5;
        this.bullets.push({
          x: spawnX,
          y: spawnY,
          vx: Math.cos(totalAngle) * spd,
          vy: Math.sin(totalAngle) * spd,
          isPlayer: true,
          bulletType: 'SPREAD'
        });
      });
    } else if (this.weapon === 'MACHINE') {
      // Machine Gun: rapid dual high-velocity tracer rounds
      this.shootCooldown = 6;
      sounds.playShoot('M');
      this.bullets.push({
        x: spawnX,
        y: spawnY + (Math.random() * 4 - 2),
        vx: this.pDir * 11,
        vy: 0,
        isPlayer: true,
        bulletType: 'MACHINE'
      });
    } else if (this.weapon === 'LASER') {
      // Laser Gun: piercing laser beam with multiple penetration
      this.shootCooldown = 15;
      sounds.playShoot('L');
      this.bullets.push({
        x: spawnX,
        y: spawnY,
        vx: this.pDir * 13,
        vy: 0,
        isPlayer: true,
        bulletType: 'LASER',
        pierceCount: 3
      });
    } else if (this.weapon === 'FIRE') {
      // Fire Gun: swirling fireball with splash damage
      this.shootCooldown = 14;
      sounds.playShoot('F');
      this.bullets.push({
        x: spawnX,
        y: spawnY,
        vx: this.pDir * 7.5,
        vy: (Math.random() - 0.5) * 1.5,
        isPlayer: true,
        bulletType: 'FIRE'
      });
    } else {
      // Standard Rifle
      this.shootCooldown = 14;
      sounds.playShoot('R');
      this.bullets.push({
        x: spawnX,
        y: spawnY,
        vx: this.pDir * 8.5,
        vy: 0,
        isPlayer: true,
        bulletType: 'NORMAL'
      });
    }
  }

  private updateFlyingDrones() {
    this.droneSpawnTimer--;
    if (this.droneSpawnTimer <= 0) {
      this.droneSpawnTimer = 750 + Math.random() * 400; // ~15-20s
      const dropTypes: Array<'mushroom' | 'weapon_s' | 'weapon_m' | 'weapon_l' | 'weapon_f'> = [
        'mushroom',
        'weapon_s',
        'weapon_m',
        'weapon_l',
        'weapon_f'
      ];
      const dropType = dropTypes[Math.floor(Math.random() * dropTypes.length)];

      this.drones.push({
        id: `drone_${Date.now()}`,
        x: this.cameraX + CANVAS_WIDTH + 40,
        y: 85 + Math.random() * 50,
        vx: -2.2,
        vy: 0,
        animFrame: 0,
        hp: 1,
        dropType
      });
    }

    // Move drones
    for (let i = this.drones.length - 1; i >= 0; i--) {
      const d = this.drones[i];
      d.x += d.vx;
      d.animFrame += 0.2;
      d.y += Math.sin(d.animFrame) * 0.8;

      if (d.x < this.cameraX - 100) {
        this.drones.splice(i, 1);
      }
    }
  }

  private updateItems() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.timer--;

      // Gravity and movement
      item.vy += 0.35;
      item.x += item.vx;
      item.y += item.vy;

      // Platform collision
      for (const p of this.map.platforms) {
        if (
          item.vy >= 0 &&
          item.x + 8 > p.x &&
          item.x - 8 < p.x + p.w &&
          item.y >= p.y &&
          item.y - item.vy <= p.y + 12
        ) {
          item.y = p.y;
          item.vy = 0;
          item.vx *= 0.8;
          item.isGrounded = true;
          break;
        }
      }

      // Check player collection
      const dist = Math.hypot(this.px - item.x, this.py - 18 - item.y);
      if (dist < (this.isGiant ? 36 : 26)) {
        this.collectItem(item);
        this.items.splice(i, 1);
        continue;
      }

      if (item.timer <= 0) {
        this.items.splice(i, 1);
      }
    }
  }

  private collectItem(item: ItemPickup) {
    if (item.type === 'mushroom') {
      // 🍄 EAT MUSHROOM!
      sounds.playMushroom();
      if (this.hearts < this.maxHearts) {
        this.hearts = Math.min(this.maxHearts, this.hearts + 1);
      }
      this.mushroomTimer = 720; // 12 seconds
      this.isGiant = true;
      this.isInvincible = true;
      this.invincibleTimer = 90;
      this.showToast('🍄 BẠN ĐÃ ĂN SIÊU NẤM! +1 TIM & PHÓNG TO!', this.px, this.py - 55, '#f59e0b');
    } else if (item.type === 'weapon_s') {
      sounds.playWeaponPickup();
      this.weapon = 'SPREAD';
      this.spreadTimeMs = 18000;
      this.showToast('🔫 ĐẠN TỎA SPREAD GUN (S) 18s!', this.px, this.py - 50, '#f59e0b');
    } else if (item.type === 'weapon_m') {
      sounds.playWeaponPickup();
      this.weapon = 'MACHINE';
      this.spreadTimeMs = 18000;
      this.showToast('⚡ SÚNG LIÊN THANH MACHINE GUN (M) 18s!', this.px, this.py - 50, '#06b6d4');
    } else if (item.type === 'weapon_l') {
      sounds.playWeaponPickup();
      this.weapon = 'LASER';
      this.spreadTimeMs = 18000;
      this.showToast('💫 TIA LASER XUYÊN PHÁ (L) 18s!', this.px, this.py - 50, '#a855f7');
    } else if (item.type === 'weapon_f') {
      sounds.playWeaponPickup();
      this.weapon = 'FIRE';
      this.spreadTimeMs = 18000;
      this.showToast('🔥 ĐẠN CẦU LỬA FIRE GUN (F) 18s!', this.px, this.py - 50, '#f97316');
    } else if (item.type === 'ammo') {
      sounds.playWeaponPickup();
      this.spreadTimeMs += 10000;
      this.showToast('📦 BỔ SUNG ĐẠN DƯỢC +10s!', this.px, this.py - 50, '#10b981');
    } else if (item.type === 'heart') {
      sounds.playPowerup();
      this.hearts = Math.min(this.maxHearts, this.hearts + 1);
      this.showToast('❤️ HỒI PHỤC 1 TIM!', this.px, this.py - 50, '#ef4444');
    }

    this.notifyStats();
  }

  private updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.x += b.vx;
      b.y += b.vy;

      // Out of screen range
      if (b.x < this.cameraX - 100 || b.x > this.cameraX + CANVAS_WIDTH + 100) {
        this.bullets.splice(i, 1);
        continue;
      }

      if (b.isPlayer) {
        let bulletDestroyed = false;

        // 1. Bullets hitting Mystery Boxes [ ? ]
        for (const box of this.map.mysteryBoxes) {
          if (!box.isHit) {
            if (
              b.x >= box.x &&
              b.x <= box.x + box.w &&
              b.y >= box.y &&
              b.y <= box.y + box.h
            ) {
              this.hitMysteryBox(box);
              this.explosions.push({
                x: b.x,
                y: b.y,
                radius: 12,
                timer: 0,
                maxTimer: 10
              });
              bulletDestroyed = true;
              break;
            }
          }
        }
        if (bulletDestroyed) {
          this.bullets.splice(i, 1);
          continue;
        }

        // 2. Bullets hitting Explosive Barrels
        for (const barrel of this.map.barrels) {
          if (!barrel.isExploded) {
            if (
              b.x >= barrel.x &&
              b.x <= barrel.x + barrel.w &&
              b.y >= barrel.y &&
              b.y <= barrel.y + barrel.h
            ) {
              barrel.hp--;
              barrel.flashTimer = 8;
              sounds.playHit();
              bulletDestroyed = true;

              if (barrel.hp <= 0) {
                this.detonateBarrel(barrel);
              }
              break;
            }
          }
        }
        if (bulletDestroyed) {
          this.bullets.splice(i, 1);
          continue;
        }

        // 3. Bullets hitting Flying Drones
        for (let j = this.drones.length - 1; j >= 0; j--) {
          const drone = this.drones[j];
          if (Math.hypot(b.x - drone.x, b.y - drone.y) < 20) {
            sounds.playExplosion();
            this.explosions.push({
              x: drone.x,
              y: drone.y,
              radius: 24,
              timer: 0,
              maxTimer: 16
            });
            // Drop item!
            this.spawnItem(drone.x, drone.y, drone.dropType);
            this.drones.splice(j, 1);
            bulletDestroyed = true;
            break;
          }
        }
        if (bulletDestroyed) {
          this.bullets.splice(i, 1);
          continue;
        }

        // 4. Bullets hitting Enemies
        for (let j = this.enemies.length - 1; j >= 0; j--) {
          const e = this.enemies[j];
          const dist = Math.hypot(b.x - e.x, b.y - (e.y - 18));
          if (dist < 24) {
            const damage = b.bulletType === 'FIRE' ? 2 : 1;
            e.hp -= damage;
            this.explosions.push({
              x: b.x,
              y: b.y,
              radius: b.bulletType === 'FIRE' ? 18 : 12,
              timer: 0,
              maxTimer: 12
            });
            sounds.playHit();

            if (e.hp <= 0) {
              this.enemiesDefeated++;
              this.notifyStats();
              sounds.playExplosion();
              this.explosions.push({
                x: e.x,
                y: e.y - 18,
                radius: 28,
                timer: 0,
                maxTimer: 18
              });

              // Chance of enemy dropping Heart or Ammo
              if (Math.random() < 0.25) {
                this.spawnItem(e.x, e.y - 15, Math.random() < 0.5 ? 'heart' : 'ammo');
              }

              this.enemies.splice(j, 1);
            }

            // Laser pierces
            if (b.bulletType === 'LASER' && b.pierceCount && b.pierceCount > 1) {
              b.pierceCount--;
            } else {
              bulletDestroyed = true;
            }
            break;
          }
        }

        if (bulletDestroyed) {
          this.bullets.splice(i, 1);
          continue;
        }
      } else {
        // Enemy bullet hitting player
        if (!this.isInvincible) {
          const dist = Math.hypot(b.x - this.px, b.y - (this.py - 20));
          if (dist < (this.isGiant ? 24 : 18)) {
            this.bullets.splice(i, 1);
            this.takePlayerDamage();
            continue;
          }
        }
      }
    }
  }

  private detonateBarrel(barrel: ExplosiveBarrel) {
    if (barrel.isExploded) return;
    barrel.isExploded = true;
    sounds.playBarrelBlast();

    const bx = barrel.x + barrel.w / 2;
    const by = barrel.y + barrel.h / 2;

    // Huge Explosion
    this.explosions.push({
      x: bx,
      y: by,
      radius: 46,
      timer: 0,
      maxTimer: 22
    });

    // Destroy nearby enemies within blast radius
    for (let j = this.enemies.length - 1; j >= 0; j--) {
      const e = this.enemies[j];
      const dist = Math.hypot(bx - e.x, by - (e.y - 18));
      if (dist < 90) {
        this.enemiesDefeated++;
        sounds.playExplosion();
        this.explosions.push({
          x: e.x,
          y: e.y - 18,
          radius: 26,
          timer: 0,
          maxTimer: 18
        });
        this.enemies.splice(j, 1);
      }
    }

    // Chain react adjacent barrels
    this.map.barrels.forEach(other => {
      if (!other.isExploded && other.id !== barrel.id) {
        const d = Math.hypot(bx - (other.x + other.w / 2), by - (other.y + other.h / 2));
        if (d < 80) {
          setTimeout(() => {
            this.detonateBarrel(other);
          }, 120);
        }
      }
    });

    // Damage player if too close and not invincible
    const distToPlayer = Math.hypot(bx - this.px, by - this.py);
    if (distToPlayer < 65 && !this.isInvincible) {
      this.pvx = this.px > bx ? 6 : -6;
      this.pvy = -6;
      this.takePlayerDamage();
    }
  }

  private updateEnemies() {
    for (let e of this.enemies) {
      if (e.type === 'soldier') {
        e.x += e.vx;
        e.animFrame += 0.14;
        if (e.x < e.patrolStartX) {
          e.x = e.patrolStartX;
          e.vx = Math.abs(e.vx);
          e.direction = 1;
        } else if (e.x > e.patrolEndX) {
          e.x = e.patrolEndX;
          e.vx = -Math.abs(e.vx);
          e.direction = -1;
        }

        e.shootCooldown--;
        const distToPlayer = Math.abs(e.x - this.px);
        if (distToPlayer < 360 && e.shootCooldown <= 0) {
          e.shootCooldown = 120 + Math.random() * 60;
          const shootDir = this.px > e.x ? 1 : -1;
          e.direction = shootDir;
          this.bullets.push({
            x: e.x + shootDir * 18,
            y: e.y - 20,
            vx: shootDir * 3.6,
            vy: 0,
            isPlayer: false,
            bulletType: 'NORMAL'
          });
        }

        // Direct collision
        if (!this.isInvincible && !this.isGiant) {
          if (Math.hypot(e.x - this.px, e.y - this.py) < 22) {
            this.takePlayerDamage();
          }
        }
      } else if (e.type === 'turret') {
        e.angle = Math.atan2(this.py - 20 - (e.y - 12), this.px - e.x);

        e.shootCooldown--;
        const distToPlayer = Math.hypot(e.x - this.px, e.y - this.py);
        if (distToPlayer < 400 && e.shootCooldown <= 0) {
          e.shootCooldown = 140;
          const spd = 3.2;
          this.bullets.push({
            x: e.x + Math.cos(e.angle) * 22,
            y: e.y - 12 + Math.sin(e.angle) * 22,
            vx: Math.cos(e.angle) * spd,
            vy: Math.sin(e.angle) * spd,
            isPlayer: false,
            bulletType: 'NORMAL'
          });
        }
      }
    }
  }

  private takePlayerDamage() {
    this.hearts--;
    this.isInvincible = true;
    this.invincibleTimer = 90; // ~1.5 seconds invulnerability
    sounds.playHit();
    this.notifyStats();

    if (this.hearts <= 0) {
      this.state = 'gameover';
      sounds.playGameOver();
      this.onStateChange?.('gameover');
    }
  }

  private updateParticles() {
    // Explosions
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const ex = this.explosions[i];
      ex.timer++;
      if (ex.timer >= ex.maxTimer) {
        this.explosions.splice(i, 1);
      }
    }

    // Confetti
    for (let i = this.confettis.length - 1; i >= 0; i--) {
      const c = this.confettis[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.18;
      c.rotation += 0.1;
      if (c.y > CANVAS_HEIGHT + 20) {
        this.confettis.splice(i, 1);
      }
    }

    // Floating toast fade
    if (this.floatingToast) {
      this.floatingToast.y -= 0.6;
      this.floatingToast.alpha -= 0.012;
      if (this.floatingToast.alpha <= 0) {
        this.floatingToast = null;
      }
    }
  }

  public showToast(text: string, x: number, y: number, color: string = '#10b981') {
    this.floatingToast = {
      text,
      x,
      y,
      alpha: 1.0,
      color
    };
  }

  private spawnConfetti(cx: number, cy: number) {
    const colors = ['#f56565', '#ed8936', '#ecc94b', '#48bb78', '#38b2ac', '#4299e1', '#9f7aea', '#ed64a6'];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 2.5 + Math.random() * 5.5;
      this.confettis.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 5,
        rotation: Math.random() * Math.PI
      });
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    // 1. Render Map (Sky, Hills, Trees, Crates, Platforms, Obstacles, Gates)
    this.map.render(ctx, this.cameraX);

    // 2. Render Pickups (Mushrooms & Weapon Pods)
    this.items.forEach(item => {
      const sx = item.x - this.cameraX;
      if (sx < -40 || sx > CANVAS_WIDTH + 40) return;

      if (item.type === 'mushroom') {
        SpriteRenderer.drawMushroom(ctx, sx, item.y);
      } else if (item.type === 'weapon_s') {
        SpriteRenderer.drawItemPod(ctx, sx, item.y, 'S');
      } else if (item.type === 'weapon_m') {
        SpriteRenderer.drawItemPod(ctx, sx, item.y, 'M');
      } else if (item.type === 'weapon_l') {
        SpriteRenderer.drawItemPod(ctx, sx, item.y, 'L');
      } else if (item.type === 'weapon_f') {
        SpriteRenderer.drawItemPod(ctx, sx, item.y, 'F');
      } else if (item.type === 'heart') {
        SpriteRenderer.drawItemPod(ctx, sx, item.y, 'HEART');
      } else if (item.type === 'ammo') {
        SpriteRenderer.drawItemPod(ctx, sx, item.y, 'AMMO');
      }
    });

    // 3. Render Flying Falcon Drones
    this.drones.forEach(d => {
      const sx = d.x - this.cameraX;
      if (sx < -40 || sx > CANVAS_WIDTH + 40) return;
      SpriteRenderer.drawFlyingDrone(ctx, sx, d.y, d.animFrame);
    });

    // 4. Render Enemies
    this.enemies.forEach(e => {
      const sx = e.x - this.cameraX;
      if (sx < -80 || sx > CANVAS_WIDTH + 80) return;

      if (e.type === 'soldier') {
        SpriteRenderer.drawEnemy(ctx, sx, e.y, e.direction, e.animFrame, false);
      } else if (e.type === 'turret') {
        SpriteRenderer.drawTurret(ctx, sx, e.y, e.angle || 0);
      }
    });

    // 5. Render Bullets
    this.bullets.forEach(b => {
      const sx = b.x - this.cameraX;
      SpriteRenderer.drawBullet(ctx, sx, b.y, b.isPlayer, b.bulletType);
    });

    // 6. Render Player
    const playerScreenX = this.px - this.cameraX;
    SpriteRenderer.drawPlayer(
      ctx,
      playerScreenX,
      this.py,
      this.pDir,
      this.animFrame,
      this.isJumping,
      this.isShootingAnim,
      this.isInvincible,
      this.isGiant
    );

    // 7. Render Explosions
    this.explosions.forEach(ex => {
      const sx = ex.x - this.cameraX;
      SpriteRenderer.drawExplosion(ctx, sx, ex.y, ex.radius, ex.timer / ex.maxTimer);
    });

    // 8. Render Confetti
    this.confettis.forEach(c => {
      const sx = c.x - this.cameraX;
      ctx.save();
      ctx.translate(sx, c.y);
      ctx.rotate(c.rotation);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();
    });

    // 9. Render Floating Toast Banner
    if (this.floatingToast) {
      const sx = this.floatingToast.x - this.cameraX;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.floatingToast.alpha);

      // Toast Box
      ctx.fillStyle = this.floatingToast.color || 'rgba(16, 185, 129, 0.95)';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 8;
      const textWidth = Math.max(200, ctx.measureText(this.floatingToast.text).width + 36);
      ctx.beginPath();
      ctx.roundRect(sx - textWidth / 2, this.floatingToast.y - 14, textWidth, 28, 6);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.floatingToast.text, sx, this.floatingToast.y);
      ctx.restore();
    }
  }

  private notifyStats() {
    this.onStatsChange?.({
      hearts: this.hearts,
      maxHearts: this.maxHearts,
      medals: this.medals,
      currentGate: Math.min(this.lesson.questions.length, this.medals + 1),
      totalGates: this.lesson.questions.length,
      enemiesDefeated: this.enemiesDefeated,
      weapon: this.weapon,
      spreadTimer: Math.ceil(this.spreadTimeMs / 1000),
      mushroomTimer: Math.ceil(this.mushroomTimer / 60),
      isGiant: this.isGiant
    });
  }
}
