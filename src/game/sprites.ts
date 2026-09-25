export class SpriteRenderer {
  /**
   * Draw Player (Green Uniform Commando with Red Bandana)
   * Supports Giant Super Mushroom Mode & Invincibility
   */
  public static drawPlayer(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: number, // 1: right, -1: left
    animFrame: number,
    isJumping: boolean,
    isShooting: boolean,
    isInvincible: boolean,
    isGiant: boolean = false
  ) {
    // If invincible, blink every few frames (unless giant, then show star shimmer)
    if (isInvincible && !isGiant && Math.floor(Date.now() / 90) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Giant Mushroom Power mode
    if (isGiant) {
      // Golden Power Aura
      const auraPulse = Math.sin(Date.now() / 80) * 0.25 + 0.75;
      ctx.save();
      ctx.strokeStyle = `rgba(250, 204, 21, ${auraPulse * 0.8})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, -24, 20, 28, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Sparkles around giant player
      const sparkTime = Date.now() / 150;
      for (let s = 0; s < 3; s++) {
        const ang = sparkTime + (s * Math.PI * 2) / 3;
        const sx = Math.cos(ang) * 24;
        const sy = -24 + Math.sin(ang) * 20;
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(sx - 2, sy - 2, 4, 4);
      }
      ctx.restore();

      // Scale player up by 1.35x
      ctx.scale(1.35, 1.35);
    }

    if (direction < 0) {
      ctx.scale(-1, 1);
    }

    // 1. Shadow under player
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Legs (Green pants)
    ctx.fillStyle = isGiant ? '#15803d' : '#2f855a'; // Green uniform pants
    const frame = Math.floor(animFrame) % 4;

    if (isJumping) {
      // Tucked jump legs
      ctx.fillRect(-8, -14, 6, 10);
      ctx.fillRect(2, -16, 6, 12);
      // Boots
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(-8, -4, 6, 4);
      ctx.fillRect(2, -4, 6, 4);
    } else {
      // Running cycle
      if (frame === 0 || frame === 2) {
        ctx.fillRect(-7, -15, 6, 13);
        ctx.fillRect(1, -15, 6, 13);
      } else if (frame === 1) {
        ctx.fillRect(-9, -15, 6, 11);
        ctx.fillRect(3, -15, 6, 14);
      } else {
        ctx.fillRect(-5, -15, 6, 14);
        ctx.fillRect(1, -15, 6, 11);
      }
      // Black Boots
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(-8, -3, 7, 4);
      ctx.fillRect(2, -3, 7, 4);
    }

    // 3. Torso (Green combat jacket)
    ctx.fillStyle = isGiant ? '#22c55e' : '#38a169';
    ctx.fillRect(-7, -29, 14, 15);

    // Belt & Holster
    ctx.fillStyle = '#744210';
    ctx.fillRect(-7, -17, 14, 3);
    ctx.fillStyle = '#d69e2e'; // Belt buckle
    ctx.fillRect(-2, -17, 4, 3);

    // 4. Arms & Rifle
    ctx.fillStyle = isGiant ? '#15803d' : '#2f855a';
    ctx.fillRect(-4, -27, 8, 5); // Shoulder

    // Rifle
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(0, -23, 20, 5); // Rifle barrel
    ctx.fillStyle = '#744210';
    ctx.fillRect(-4, -22, 7, 5); // Stock

    // Hand holding rifle
    ctx.fillStyle = '#f6ad55';
    ctx.fillRect(4, -23, 4, 4);

    // 5. Head & Red Bandana
    // Head / Face
    ctx.fillStyle = '#f6ad55';
    ctx.fillRect(-5, -39, 10, 10);

    // Eye
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(2, -35, 2.5, 2.5);

    // Red Bandana / Headband
    ctx.fillStyle = isGiant ? '#facc15' : '#e53e3e';
    ctx.fillRect(-6, -41, 12, 4);
    // Bandana trailing ribbon (fluttering)
    const ribbonWave = Math.sin(Date.now() / 100) * 2;
    ctx.fillRect(-11, -40 + ribbonWave, 6, 3);
    ctx.fillRect(-15, -39 - ribbonWave, 5, 2.5);

    // Muzzle flash when shooting
    if (isShooting) {
      ctx.fillStyle = '#f6e05e';
      ctx.beginPath();
      ctx.arc(24, -20.5, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(24, -20.5, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw Enemy Red Soldier
   */
  public static drawEnemy(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: number,
    animFrame: number,
    isShooting: boolean
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (direction < 0) {
      ctx.scale(-1, 1);
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Red Pants
    ctx.fillStyle = '#9b2c2c';
    const frame = Math.floor(animFrame) % 4;
    if (frame === 0 || frame === 2) {
      ctx.fillRect(-6, -14, 5, 12);
      ctx.fillRect(1, -14, 5, 12);
    } else {
      ctx.fillRect(-8, -14, 5, 10);
      ctx.fillRect(3, -14, 5, 13);
    }

    // Boots
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-7, -3, 6, 3.5);
    ctx.fillRect(2, -3, 6, 3.5);

    // Torso (Red shirt)
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(-6, -28, 12, 14);

    // Belt
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-6, -16, 12, 2.5);

    // Rifle
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(-2, -22, 18, 4);

    // Head with Red Helmet
    ctx.fillStyle = '#9b2c2c';
    ctx.fillRect(-5, -37, 10, 9);
    // Face
    ctx.fillStyle = '#f6ad55';
    ctx.fillRect(-3, -34, 7, 4);
    // Eye
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(1, -33, 2, 2);

    // Muzzle flash
    if (isShooting) {
      ctx.fillStyle = '#feb2b2';
      ctx.beginPath();
      ctx.arc(19, -20, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw Cannon Turret
   */
  public static drawTurret(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Base Mount
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-14, -6, 28, 10);
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(-12, -12, 24, 6);

    // Rotating Cannon Ball Hub
    ctx.fillStyle = '#4a5568';
    ctx.beginPath();
    ctx.arc(0, -12, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a202c';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rotating Barrel
    ctx.save();
    ctx.translate(0, -12);
    ctx.rotate(angle);
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(0, -5, 20, 10);
    ctx.fillStyle = '#e53e3e'; // Cannon ring
    ctx.fillRect(16, -6, 4, 12);
    ctx.restore();

    ctx.restore();
  }

  /**
   * Draw Super Mushroom 🍄
   * Classic retro red mushroom with white spots and cute face
   */
  public static drawMushroom(ctx: CanvasRenderingContext2D, x: number, y: number, bounceOffset: number = 0) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y + bounceOffset));

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing aura
    const pulse = Math.sin(Date.now() / 120) * 0.2 + 0.8;
    ctx.strokeStyle = `rgba(239, 68, 68, ${pulse * 0.4})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -10, 14, 0, Math.PI * 2);
    ctx.stroke();

    // Stem (Beige/cream)
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.roundRect(-7, -10, 14, 10, [0, 0, 4, 4]);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Stem Eyes
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(-4, -7, 2, 4);
    ctx.fillRect(2, -7, 2, 4);

    // Red Cap
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(0, -10, 12, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cap bottom rim
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.ellipse(0, -10, 12, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // White Spots
    ctx.fillStyle = '#ffffff';
    // Center spot
    ctx.beginPath();
    ctx.arc(0, -16, 4, 0, Math.PI * 2);
    ctx.fill();
    // Left spot
    ctx.beginPath();
    ctx.arc(-7, -12, 2.8, 0, Math.PI * 2);
    ctx.fill();
    // Right spot
    ctx.beginPath();
    ctx.arc(7, -12, 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw Item Pod / Weapon Drop [S], [M], [L], [F], [❤️]
   */
  public static drawItemPod(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: 'S' | 'M' | 'L' | 'F' | 'HEART' | 'AMMO'
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Floating bobbing pulse
    const pulse = Math.sin(Date.now() / 100) * 2;
    ctx.translate(0, pulse);

    // Outer glow
    let glowColor = '#f59e0b';
    let badgeColor = '#f59e0b';
    let letter = 'S';

    if (type === 'M') {
      glowColor = '#06b6d4';
      badgeColor = '#06b6d4';
      letter = 'M';
    } else if (type === 'L') {
      glowColor = '#a855f7';
      badgeColor = '#a855f7';
      letter = 'L';
    } else if (type === 'F') {
      glowColor = '#f97316';
      badgeColor = '#f97316';
      letter = 'F';
    } else if (type === 'HEART') {
      glowColor = '#ef4444';
      badgeColor = '#ef4444';
      letter = '❤️';
    } else if (type === 'AMMO') {
      glowColor = '#10b981';
      badgeColor = '#10b981';
      letter = '📦';
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, 12 - pulse, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Halo
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.stroke();

    // Metallic Pod Housing
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Emblem Core
    ctx.fillStyle = badgeColor;
    if (type === 'HEART') {
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤️', 0, 1);
    } else if (type === 'AMMO') {
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📦', 0, 1);
    } else {
      ctx.font = 'bold 13px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, 0, 1);
    }

    ctx.restore();
  }

  /**
   * Draw Flying Falcon Drone / Item Carrier (Classic Contra Flying Blimp)
   */
  public static drawFlyingDrone(ctx: CanvasRenderingContext2D, x: number, y: number, animFrame: number) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Wing flap
    const flap = Math.sin(animFrame * 2) * 5;

    // Wing left
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(-18, -6 + flap);
    ctx.lineTo(-12, 4 + flap);
    ctx.closePath();
    ctx.fill();

    // Wing right
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(18, -6 + flap);
    ctx.lineTo(12, 4 + flap);
    ctx.closePath();
    ctx.fill();

    // Center capsule body
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Flashing sensor beacon
    const flash = Math.floor(Date.now() / 80) % 2 === 0;
    ctx.fillStyle = flash ? '#facc15' : '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw Spikes (Chông Gai)
   */
  public static drawSpikes(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    // Metal Base
    ctx.fillStyle = '#374151';
    ctx.fillRect(x, y + h - 4, w, 4);

    // Hazard yellow/black stripe base
    ctx.fillStyle = '#eab308';
    ctx.fillRect(x, y + h - 3, w, 2);

    // Sharp Triangle Spikes
    const spikeWidth = 14;
    const numSpikes = Math.max(1, Math.floor(w / spikeWidth));
    const actualWidth = w / numSpikes;

    for (let i = 0; i < numSpikes; i++) {
      const sx = x + i * actualWidth;
      // Spike body (dark iron)
      ctx.fillStyle = '#9ca3af';
      ctx.beginPath();
      ctx.moveTo(sx, y + h - 4);
      ctx.lineTo(sx + actualWidth / 2, y);
      ctx.lineTo(sx + actualWidth, y + h - 4);
      ctx.closePath();
      ctx.fill();

      // Gleaming edge highlight
      ctx.fillStyle = '#f3f4f6';
      ctx.beginPath();
      ctx.moveTo(sx + actualWidth / 2, y);
      ctx.lineTo(sx + actualWidth / 2 + 1.5, y + 2);
      ctx.lineTo(sx + actualWidth / 2, y + h - 4);
      ctx.closePath();
      ctx.fill();

      // Bloody / rusty tip
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(sx + actualWidth * 0.35, y + 4);
      ctx.lineTo(sx + actualWidth / 2, y);
      ctx.lineTo(sx + actualWidth * 0.65, y + 4);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * Draw Explosive Barrel (Thùng Thuốc Nổ / TNT)
   */
  public static drawExplosiveBarrel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    isHitFlash: boolean
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h, w / 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Red barrel body
    ctx.fillStyle = isHitFlash ? '#ffffff' : '#dc2626';
    ctx.fillRect(2, 2, w - 4, h - 4);

    // Metal ribs / rims
    ctx.fillStyle = isHitFlash ? '#fca5a5' : '#7f1d1d';
    ctx.fillRect(0, 0, w, 4); // Top rim
    ctx.fillRect(0, h - 4, w, 4); // Bottom rim
    ctx.fillRect(1, h / 2 - 2, w - 2, 4); // Middle band

    // Hazard Stripes
    ctx.fillStyle = '#facc15';
    ctx.fillRect(4, 8, w - 8, 5);
    ctx.fillStyle = '#1e293b';
    for (let bx = 6; bx < w - 6; bx += 8) {
      ctx.fillRect(bx, 8, 4, 5);
    }

    // Skull / TNT label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TNT', w / 2, h / 2 + 7);

    // Hazard warning icon
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(w / 2, h - 9, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw Spinning Saw (Lưỡi Cưa Xoay)
   */
  public static drawSpinningSaw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    rotation: number
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.rotate(rotation);

    // Circular Saw Blade
    const teeth = 12;
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a1 = (i * Math.PI * 2) / teeth;
      const a2 = ((i + 0.5) * Math.PI * 2) / teeth;
      const rOuter = radius;
      const rInner = radius * 0.72;
      ctx.lineTo(Math.cos(a1) * rOuter, Math.sin(a1) * rOuter);
      ctx.lineTo(Math.cos(a2) * rInner, Math.sin(a2) * rInner);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Blood / friction red edge
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    // Center Bearing Hub
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Central golden bolt
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw Fire Geyser / Vent (Ống Phun Lửa)
   */
  public static drawFireGeyser(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    isActive: boolean,
    flameTimer: number
  ) {
    ctx.save();
    // Metal Vent Base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // Vent Grill Slits
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 4, y + 2, w - 8, 4);

    // If active, shoot roaring flame column upward
    if (isActive) {
      const flameHeight = 45 + Math.sin(flameTimer * 10) * 15;
      const flameGrad = ctx.createLinearGradient(0, y, 0, y - flameHeight);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#facc15');
      flameGrad.addColorStop(0.7, '#f97316');
      flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.moveTo(x + 2, y);
      ctx.quadraticCurveTo(x - 6, y - flameHeight * 0.6, x + w / 2, y - flameHeight);
      ctx.quadraticCurveTo(x + w + 6, y - flameHeight * 0.6, x + w - 2, y);
      ctx.closePath();
      ctx.fill();

      // Flame core
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + w / 2 - 3, y - 10, 6, 10);
    } else {
      // Idle warning indicator: small red spark
      const blink = Math.floor(Date.now() / 200) % 2 === 0;
      ctx.fillStyle = blink ? '#ef4444' : '#7f1d1d';
      ctx.fillRect(x + w / 2 - 2, y + 2, 4, 3);
    }
    ctx.restore();
  }

  /**
   * Draw Mystery Question Box ❓ (Bắn hoặc húc để rơi đồ: Nấm hoặc Đạn)
   */
  public static drawMysteryBox(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    isHit: boolean
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    if (!isHit) {
      // Active Golden ? Box
      const pulse = Math.sin(Date.now() / 150) * 0.15 + 0.85;

      // Glow
      ctx.strokeStyle = `rgba(250, 204, 21, ${pulse * 0.6})`;
      ctx.lineWidth = 3;
      ctx.strokeRect(-1, -1, w + 2, h + 2);

      // Gold Body
      ctx.fillStyle = '#eab308';
      ctx.fillRect(0, 0, w, h);

      // 3D Bevel Top & Left
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(0, 0, w, 3);
      ctx.fillRect(0, 0, 3, h);

      // 3D Shadow Bottom & Right
      ctx.fillStyle = '#a16207';
      ctx.fillRect(0, h - 3, w, 3);
      ctx.fillRect(w - 3, 0, 3, h);

      // Corner Rivets
      ctx.fillStyle = '#713f12';
      ctx.fillRect(4, 4, 3, 3);
      ctx.fillRect(w - 7, 4, 3, 3);
      ctx.fillRect(4, h - 7, 3, 3);
      ctx.fillRect(w - 7, h - 7, 3, 3);

      // Center Question Mark "?"
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', w / 2, h / 2 + 1);
    } else {
      // Hit / Deactivated Brown Block
      ctx.fillStyle = '#78716c';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#a8a29e';
      ctx.fillRect(0, 0, w, 2);
      ctx.fillRect(0, 0, 2, h);

      ctx.fillStyle = '#44403c';
      ctx.fillRect(0, h - 2, w, 2);
      ctx.fillRect(w - 2, 0, 2, h);

      ctx.fillStyle = '#292524';
      ctx.fillRect(4, 4, 2, 2);
      ctx.fillRect(w - 6, 4, 2, 2);
      ctx.fillRect(4, h - 6, 2, 2);
      ctx.fillRect(w - 6, h - 6, 2, 2);
    }

    ctx.restore();
  }

  /**
   * Draw Bullets with Weapon Type Varieties:
   * SPREAD (S), MACHINE (M), LASER (L), FIRE (F), RIFLE (R), ENEMY
   */
  public static drawBullet(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isPlayer: boolean,
    bulletType: 'NORMAL' | 'SPREAD' | 'MACHINE' | 'LASER' | 'FIRE' = 'NORMAL'
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    if (isPlayer) {
      if (bulletType === 'SPREAD') {
        // Golden Spread Gun Energy Orb
        ctx.fillStyle = '#ecc94b';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (bulletType === 'MACHINE') {
        // Cyan High-Velocity Tracer Bullet
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(-6, -2, 12, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-4, -1, 8, 2);
      } else if (bulletType === 'LASER') {
        // Piercing Neon Purple / Magenta Laser Ray
        ctx.fillStyle = 'rgba(217, 70, 239, 0.4)';
        ctx.fillRect(-18, -4, 36, 8);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(-14, -2.5, 28, 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-10, -1, 20, 2);
      } else if (bulletType === 'FIRE') {
        // Spinning Fireball
        const fireSpin = Date.now() / 50;
        ctx.rotate(fireSpin);
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(2, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Standard Rifle Bullet
        ctx.fillStyle = '#f6e05e';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Enemy Red Bullet / Cannonball
      ctx.fillStyle = '#e53e3e';
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#feb2b2';
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw Explosion Blast
   */
  public static drawExplosion(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    progress: number
  ) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    const r = radius * (0.3 + progress * 0.7);
    const alpha = Math.max(0, 1 - progress);

    ctx.fillStyle = `rgba(237, 137, 54, ${alpha})`;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(246, 224, 94, ${alpha})`;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
