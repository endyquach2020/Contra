import { SpriteRenderer } from './sprites';

export interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  isCrate?: boolean; // Wooden box 📦
  isMetal?: boolean; // Steel platform
}

export interface CheckpointGate {
  id: string;
  gateNumber: number;
  x: number;
  y: number;
  w: number;
  h: number;
  isUnlocked: boolean;
  questionIndex: number;
}

export interface TurretPlacement {
  id: string;
  x: number;
  y: number;
  platformId?: number;
}

export interface SpikeHazard {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ExplosiveBarrel {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  flashTimer: number;
  isExploded: boolean;
}

export interface SpinningSawHazard {
  id: string;
  x: number;
  y: number;
  radius: number;
  minX: number;
  maxX: number;
  speed: number;
  direction: number;
  rotation: number;
}

export interface FireGeyserHazard {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  timer: number;
  cyclePeriod: number;
  isActive: boolean;
}

export interface MysteryBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  content: 'mushroom' | 'weapon_s' | 'weapon_m' | 'weapon_l' | 'weapon_f' | 'ammo';
  isHit: boolean;
}

export class StageMap {
  public width: number = 6500;
  public height: number = 450;
  public groundY: number = 380;
  public platforms: Platform[] = [];
  public gates: CheckpointGate[] = [];
  public turretPlacements: TurretPlacement[] = [];

  // Diverse obstacles & interactive props
  public spikes: SpikeHazard[] = [];
  public barrels: ExplosiveBarrel[] = [];
  public spinningSaws: SpinningSawHazard[] = [];
  public fireGeysers: FireGeyserHazard[] = [];
  public mysteryBoxes: MysteryBox[] = [];

  constructor(totalQuestions: number = 10) {
    this.generateStage(totalQuestions);
  }

  public generateStage(totalQuestions: number) {
    this.platforms = [];
    this.gates = [];
    this.turretPlacements = [];
    this.spikes = [];
    this.barrels = [];
    this.spinningSaws = [];
    this.fireGeysers = [];
    this.mysteryBoxes = [];

    const gateSpacing = 680;
    this.width = (totalQuestions + 1) * gateSpacing + 900;

    // 1. Base Continuous Ground
    this.platforms.push({
      x: -200,
      y: this.groundY,
      w: this.width + 400,
      h: 80
    });

    // Initial warm-up Mystery Box before Gate #1 with a super mushroom!
    this.mysteryBoxes.push({
      id: 'init_box_1',
      x: 230,
      y: this.groundY - 80,
      w: 28,
      h: 28,
      content: 'mushroom',
      isHit: false
    });

    // 2. Generate gates and obstacles in each segment
    for (let i = 0; i < totalQuestions; i++) {
      const gateNum = i + 1;
      const gateX = 460 + i * gateSpacing;

      // The Checkpoint Gate
      this.gates.push({
        id: `gate_${gateNum}`,
        gateNumber: gateNum,
        x: gateX,
        y: this.groundY - 140,
        w: 32,
        h: 140,
        isUnlocked: false,
        questionIndex: i
      });

      // Segment after the gate
      const segmentX = gateX + 130;

      // 1. Wooden Crate
      this.platforms.push({
        x: segmentX + 50,
        y: this.groundY - 44,
        w: 44,
        h: 44,
        isCrate: true
      });

      if (i % 2 === 1) {
        // Stacked double crate
        this.platforms.push({
          x: segmentX + 50,
          y: this.groundY - 88,
          w: 44,
          h: 44,
          isCrate: true
        });
      }

      // 2. Mystery Box [?] (Alternates between Mushroom and special Weapons S, M, L, F, Ammo)
      const contentsList: Array<'mushroom' | 'weapon_s' | 'weapon_m' | 'weapon_l' | 'weapon_f' | 'ammo'> = [
        'mushroom',
        'weapon_m',
        'weapon_s',
        'mushroom',
        'weapon_l',
        'weapon_f',
        'ammo',
        'mushroom',
        'weapon_s',
        'weapon_m'
      ];
      const boxContent = contentsList[i % contentsList.length];

      this.mysteryBoxes.push({
        id: `box_${i}`,
        x: segmentX + 60,
        y: this.groundY - 110,
        w: 28,
        h: 28,
        content: boxContent,
        isHit: false
      });

      // 3. Elevated Metal Platform
      const platformY = this.groundY - 95;
      this.platforms.push({
        x: segmentX + 170,
        y: platformY,
        w: 140,
        h: 18,
        isMetal: true
      });

      // Turret on elevated platform
      if (i >= 1) {
        this.turretPlacements.push({
          id: `turret_${i}`,
          x: segmentX + 240,
          y: platformY - 10
        });
      }

      // 4. Diverse Obstacles (Spikes, Barrels, Saws, Fire Geysers)
      const obstaclePattern = i % 4;

      if (obstaclePattern === 0) {
        // Floor Spike Trap right before the metal platform
        this.spikes.push({
          id: `spikes_${i}`,
          x: segmentX + 115,
          y: this.groundY - 16,
          w: 42,
          h: 16
        });

        // Explosive Red TNT Barrel on platform
        this.barrels.push({
          id: `barrel_${i}`,
          x: segmentX + 185,
          y: platformY - 32,
          w: 24,
          h: 32,
          hp: 2,
          flashTimer: 0,
          isExploded: false
        });
      } else if (obstaclePattern === 1) {
        // Oscillating Spinning Saw on the ground
        this.spinningSaws.push({
          id: `saw_${i}`,
          x: segmentX + 340,
          y: this.groundY - 18,
          radius: 18,
          minX: segmentX + 320,
          maxX: segmentX + 410,
          speed: 1.6,
          direction: 1,
          rotation: 0
        });

        // Explosive Barrel on ground
        this.barrels.push({
          id: `barrel_${i}`,
          x: segmentX + 120,
          y: this.groundY - 32,
          w: 24,
          h: 32,
          hp: 2,
          flashTimer: 0,
          isExploded: false
        });
      } else if (obstaclePattern === 2) {
        // Fire Geyser / Vent between crates and platform
        this.fireGeysers.push({
          id: `geyser_${i}`,
          x: segmentX + 118,
          y: this.groundY - 10,
          w: 32,
          h: 10,
          timer: (i * 45) % 180,
          cyclePeriod: 160,
          isActive: false
        });

        // Spike Trap on platform
        this.spikes.push({
          id: `spikes_${i}`,
          x: segmentX + 280,
          y: platformY - 16,
          w: 28,
          h: 16
        });
      } else {
        // Obstacle pattern 3: Explosive barrel + Spikes combo
        this.barrels.push({
          id: `barrel_${i}_1`,
          x: segmentX + 340,
          y: this.groundY - 32,
          w: 24,
          h: 32,
          hp: 2,
          flashTimer: 0,
          isExploded: false
        });

        this.spikes.push({
          id: `spikes_${i}`,
          x: segmentX + 380,
          y: this.groundY - 16,
          w: 36,
          h: 16
        });
      }

      // Additional crate before next gate
      if (i % 2 === 0) {
        this.platforms.push({
          x: segmentX + 430,
          y: this.groundY - 44,
          w: 44,
          h: 44,
          isCrate: true
        });
      }
    }
  }

  public updateObstacles() {
    // 1. Update spinning saws
    this.spinningSaws.forEach(saw => {
      saw.rotation += 0.22;
      saw.x += saw.speed * saw.direction;
      if (saw.x >= saw.maxX) {
        saw.x = saw.maxX;
        saw.direction = -1;
      } else if (saw.x <= saw.minX) {
        saw.x = saw.minX;
        saw.direction = 1;
      }
    });

    // 2. Update fire geysers
    this.fireGeysers.forEach(fg => {
      fg.timer = (fg.timer + 1) % fg.cyclePeriod;
      // Active during the last 45 frames of the cycle (~0.75 seconds)
      fg.isActive = fg.timer > fg.cyclePeriod - 45;
    });

    // 3. Update explosive barrels flash
    this.barrels.forEach(b => {
      if (b.flashTimer > 0) {
        b.flashTimer--;
      }
    });
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number) {
    ctx.save();

    // 1. SKY & BACKGROUND HILLS (Parallax)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
    skyGrad.addColorStop(0, '#102324');
    skyGrad.addColorStop(0.5, '#173638');
    skyGrad.addColorStop(1, '#22484a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Distant dark hills (slow parallax)
    ctx.fillStyle = '#0f2926';
    const bgOffset1 = cameraX * 0.2;
    for (let x = -200 - (bgOffset1 % 400); x < ctx.canvas.width + 400; x += 320) {
      ctx.beginPath();
      ctx.arc(x, this.groundY + 80, 260, Math.PI, 0);
      ctx.fill();
    }

    // Midground green hills (medium parallax)
    ctx.fillStyle = '#153d31';
    const bgOffset2 = cameraX * 0.45;
    for (let x = -200 - (bgOffset2 % 350); x < ctx.canvas.width + 350; x += 280) {
      ctx.beginPath();
      ctx.arc(x, this.groundY + 40, 180, Math.PI, 0);
      ctx.fill();
    }

    // Trees in background
    ctx.fillStyle = '#1a4837';
    const treeOffset = cameraX * 0.65;
    for (let x = -100 - (treeOffset % 180); x < ctx.canvas.width + 180; x += 140) {
      // Tree trunk
      ctx.fillStyle = '#0f291e';
      ctx.fillRect(x + 16, this.groundY - 80, 12, 80);
      // Tree round foliage
      ctx.fillStyle = '#1b4b39';
      ctx.beginPath();
      ctx.arc(x + 22, this.groundY - 85, 34, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. PLATFORMS & CRATES
    this.platforms.forEach(p => {
      const sx = p.x - cameraX;
      if (sx + p.w < -100 || sx > ctx.canvas.width + 100) return;

      if (p.isCrate) {
        // Wooden Crate 📦
        ctx.fillStyle = '#b7791f';
        ctx.fillRect(sx, p.y, p.w, p.h);
        ctx.strokeStyle = '#744210';
        ctx.lineWidth = 3;
        ctx.strokeRect(sx + 1, p.y + 1, p.w - 2, p.h - 2);

        // Inner wood planks
        ctx.fillStyle = '#d69e2e';
        ctx.fillRect(sx + 5, p.y + 5, p.w - 10, p.h - 10);

        // Diagonal cross frame
        ctx.strokeStyle = '#975a16';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(sx + 5, p.y + 5);
        ctx.lineTo(sx + p.w - 5, p.y + p.h - 5);
        ctx.moveTo(sx + p.w - 5, p.y + 5);
        ctx.lineTo(sx + 5, p.y + p.h - 5);
        ctx.stroke();

        // Corner rivets
        ctx.fillStyle = '#4a2800';
        ctx.fillRect(sx + 3, p.y + 3, 3, 3);
        ctx.fillRect(sx + p.w - 6, p.y + 3, 3, 3);
        ctx.fillRect(sx + 3, p.y + p.h - 6, 3, 3);
        ctx.fillRect(sx + p.w - 6, p.y + p.h - 6, 3, 3);
      } else if (p.isMetal) {
        // Steel / Concrete Platform with rivets
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(sx, p.y, p.w, p.h);
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(sx, p.y, p.w, 4);
        ctx.strokeStyle = '#1a202c';
        ctx.lineWidth = 2;
        ctx.strokeRect(sx, p.y, p.w, p.h);

        // Rivets
        ctx.fillStyle = '#718096';
        for (let rx = sx + 12; rx < sx + p.w - 10; rx += 25) {
          ctx.beginPath();
          ctx.arc(rx, p.y + 9, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Main Ground
        ctx.fillStyle = '#1c452e';
        ctx.fillRect(sx, p.y, p.w, p.h);

        // Lush Green Grass Top
        ctx.fillStyle = '#2f855a';
        ctx.fillRect(sx, p.y, p.w, 14);

        // Bright Grass edge
        ctx.fillStyle = '#48bb78';
        ctx.fillRect(sx, p.y, p.w, 5);

        // Hanging grass blades
        ctx.fillStyle = '#2f855a';
        for (let bx = sx; bx < sx + p.w; bx += 18) {
          ctx.beginPath();
          ctx.moveTo(bx, p.y + 14);
          ctx.lineTo(bx + 9, p.y + 22);
          ctx.lineTo(bx + 18, p.y + 14);
          ctx.fill();
        }
      }
    });

    // 3. OBSTACLES: SPIKES
    this.spikes.forEach(sp => {
      const sx = sp.x - cameraX;
      if (sx + sp.w < -50 || sx > ctx.canvas.width + 50) return;
      SpriteRenderer.drawSpikes(ctx, sx, sp.y, sp.w, sp.h);
    });

    // 4. OBSTACLES: FIRE GEYSERS
    this.fireGeysers.forEach(fg => {
      const sx = fg.x - cameraX;
      if (sx + fg.w < -50 || sx > ctx.canvas.width + 50) return;
      SpriteRenderer.drawFireGeyser(ctx, sx, fg.y, fg.w, fg.h, fg.isActive, fg.timer);
    });

    // 5. MYSTERY BOXES [ ? ]
    this.mysteryBoxes.forEach(box => {
      const sx = box.x - cameraX;
      if (sx + box.w < -50 || sx > ctx.canvas.width + 50) return;
      SpriteRenderer.drawMysteryBox(ctx, sx, box.y, box.w, box.h, box.isHit);
    });

    // 6. OBSTACLES: EXPLOSIVE BARRELS
    this.barrels.forEach(b => {
      if (b.isExploded) return;
      const sx = b.x - cameraX;
      if (sx + b.w < -50 || sx > ctx.canvas.width + 50) return;
      SpriteRenderer.drawExplosiveBarrel(ctx, sx, b.y, b.w, b.h, b.flashTimer > 0);
    });

    // 7. OBSTACLES: SPINNING SAWS
    this.spinningSaws.forEach(saw => {
      const sx = saw.x - cameraX;
      if (sx + saw.radius < -50 || sx - saw.radius > ctx.canvas.width + 50) return;
      SpriteRenderer.drawSpinningSaw(ctx, sx, saw.y, saw.radius, saw.rotation);
    });

    // 8. CHECKPOINT GATES (#1, #2, #3...)
    this.gates.forEach(gate => {
      const gx = gate.x - cameraX;
      if (gx < -100 || gx > ctx.canvas.width + 100) return;

      const isUnlocked = gate.isUnlocked;

      // Base pedestal
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(gx - 6, gate.y + gate.h - 24, gate.w + 12, 24);
      ctx.strokeStyle = isUnlocked ? '#38a169' : '#e53e3e';
      ctx.lineWidth = 2;
      ctx.strokeRect(gx - 6, gate.y + gate.h - 24, gate.w + 12, 24);

      // Gate number on pedestal (#1, #2...)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`#${gate.gateNumber}`, gx + gate.w / 2, gate.y + gate.h - 7);

      // Vertical Pillar Bars (Left & Right)
      ctx.fillStyle = '#2d3748';
      ctx.fillRect(gx, gate.y, 7, gate.h - 24);
      ctx.fillRect(gx + gate.w - 7, gate.y, 7, gate.h - 24);

      // Top Beacon Hub
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(gx - 4, gate.y - 14, gate.w + 8, 16);
      ctx.strokeStyle = isUnlocked ? '#38a169' : '#e53e3e';
      ctx.strokeRect(gx - 4, gate.y - 14, gate.w + 8, 16);

      // Top glowing beacon light
      ctx.fillStyle = isUnlocked ? '#48bb78' : '#f56565';
      ctx.beginPath();
      ctx.arc(gx + gate.w / 2, gate.y - 6, 7, 0, Math.PI * 2);
      ctx.fill();

      // Middle Beam Area
      if (!isUnlocked) {
        // Red Pulsing Laser Barrier
        const pulse = Math.sin(Date.now() / 80) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(229, 62, 62, ${pulse})`;
        ctx.fillRect(gx + 8, gate.y + 4, gate.w - 16, gate.h - 32);

        // Core laser wire
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx + gate.w / 2 - 1.5, gate.y + 6, 3, gate.h - 36);

        // Laser horizontal segments
        for (let ly = gate.y + 16; ly < gate.y + gate.h - 30; ly += 20) {
          ctx.fillStyle = '#feb2b2';
          ctx.fillRect(gx + 6, ly, gate.w - 12, 2.5);
        }
      } else {
        // Unlocked: Green translucent column with "OK"
        ctx.fillStyle = 'rgba(72, 187, 120, 0.25)';
        ctx.fillRect(gx + 8, gate.y + 4, gate.w - 16, gate.h - 32);

        ctx.fillStyle = '#48bb78';
        ctx.font = 'bold 13px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OK', gx + gate.w / 2, gate.y + (gate.h - 24) / 2);
      }
    });

    ctx.restore();
  }
}
