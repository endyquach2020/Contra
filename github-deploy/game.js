/**
 * Arena Edu Connect - Contra Chiến Trường Tri Thức
 * Standalone Engine (HTML5 Canvas + Web Audio API + Vanilla JavaScript)
 * Zero external dependencies - Sẵn sàng Deploy GitHub Pages!
 */

// ==========================================
// 1. ÂM THANH RETRO BẰNG WEB AUDIO API
// ==========================================
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'square', duration = 0.1, volume = 0.2) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playShoot() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playSpread() {
    this.playTone(650, 'triangle', 0.12, 0.25);
    setTimeout(() => this.playTone(850, 'sawtooth', 0.08, 0.15), 25);
  }

  playLaser() {
    this.playTone(1200, 'sine', 0.15, 0.2);
  }

  playJump() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playExplosion() {
    this.playTone(100, 'sawtooth', 0.25, 0.3);
  }

  playHit() {
    this.playTone(140, 'square', 0.15, 0.3);
  }

  playMushroom() {
    // Classic powerup jingle
    const notes = [330, 392, 659, 523, 587, 784];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'square', 0.09, 0.22), idx * 70);
    });
  }

  playGateOpen() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.14, 0.25), idx * 80);
    });
  }

  playCorrect() {
    this.playTone(587, 'square', 0.1, 0.2);
    setTimeout(() => this.playTone(880, 'square', 0.2, 0.25), 100);
  }

  playWrong() {
    this.playTone(220, 'sawtooth', 0.2, 0.3);
    setTimeout(() => this.playTone(165, 'sawtooth', 0.25, 0.3), 150);
  }

  playVictory() {
    const victoryNotes = [523, 659, 784, 1046, 784, 1046];
    victoryNotes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'square', 0.2, 0.25), i * 160);
    });
  }

  playGameOver() {
    const lossNotes = [440, 415, 392, 349];
    lossNotes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sawtooth', 0.25, 0.25), i * 200);
    });
  }
}

const sounds = new SoundSystem();

// ==========================================
// 2. DỮ LIỆU CÂU HỎI & QUẢN LÝ (CRUD + STORAGE)
// ==========================================
const DEFAULT_LESSONS = [
  {
    id: "lesson_cntt",
    title: "Công nghệ Thông tin & Lập trình",
    topic: "CNTT & Phần mềm",
    description: "Vượt qua thử thách mạng máy tính, thuật toán và lập trình Web hiện đại.",
    questions: [
      {
        id: "q_1",
        question: "Giao thức nào được sử dụng để truyền tải trang web an toàn và có mã hóa dữ liệu?",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correctAnswer: 1,
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) sử dụng chứng chỉ SSL/TLS để mã hóa dữ liệu giữa trình duyệt và máy chủ."
      },
      {
        id: "q_2",
        question: "Trong lập trình JavaScript, từ khóa nào dùng để khai báo hằng số không thể gán lại?",
        options: ["var", "let", "const", "def"],
        correctAnswer: 2,
        explanation: "'const' khai báo biến giá trị không đổi sau khi đã gán khởi tạo."
      },
      {
        id: "q_3",
        question: "Cấu trúc dữ liệu nào hoạt động theo nguyên lý LIFO (Last In First Out)?",
        options: ["Queue (Hàng đợi)", "Stack (Ngăn xếp)", "Array (Mảng)", "Tree (Cây)"],
        correctAnswer: 1,
        explanation: "Stack hoạt động theo cơ chế Vào sau - Ra trước (LIFO), như chồng đĩa."
      },
      {
        id: "q_4",
        question: "Thẻ HTML5 nào dùng để vẽ đồ họa 2D động trực tiếp bằng mã JavaScript?",
        options: ["<svg>", "<canvas>", "<paint>", "<graphics>"],
        correctAnswer: 1,
        explanation: "Thẻ <canvas> cung cấp bề mặt đồ họa vẽ bitmap thông qua CanvasRenderingContext2D."
      }
    ]
  },
  {
    id: "lesson_science",
    title: "Khoa học Tự nhiên & Vũ trụ",
    topic: "Khoa học & Không gian",
    description: "Khám phá các định luật vật lý, hệ mặt trời và nguyên tố hóa học.",
    questions: [
      {
        id: "q_s1",
        question: "Hành tinh nào có kích thước lớn nhất trong Hệ Mặt Trời của chúng ta?",
        options: ["Sao Hỏa", "Sao Thổ", "Sao Mộc (Jupiter)", "Sao Kim"],
        correctAnswer: 2,
        explanation: "Sao Mộc là hành tinh khí khổng lồ lớn nhất, chứa hơn 70% tổng khối lượng của toàn bộ các hành tinh gộp lại."
      },
      {
        id: "q_s2",
        question: "Khí nào chiếm tỷ lệ phần trăm thể tích lớn nhất trong bầu khí quyển Trái Đất?",
        options: ["Khí Oxy (O2)", "Khí Nitơ (N2)", "Khí Carbonic (CO2)", "Khí Argon (Ar)"],
        correctAnswer: 1,
        explanation: "Khí Nitơ chiếm khoảng 78% thể tích khí quyển Trái Đất."
      },
      {
        id: "q_s3",
        question: "Vận tốc ánh sáng truyền trong chân không xấp xỉ bằng bao nhiêu km/s?",
        options: ["150.000 km/s", "300.000 km/s", "340 m/s", "1.080.000 km/s"],
        correctAnswer: 1,
        explanation: "Vận tốc ánh sáng trong chân không là c ≈ 299.792 km/s (làm tròn 300.000 km/s)."
      }
    ]
  },
  {
    id: "lesson_math",
    title: "Toán học & Tư duy Logic",
    topic: "Toán học",
    description: "Thử tài tính nhanh, hình học và logic phản xạ Contra.",
    questions: [
      {
        id: "q_m1",
        question: "Định lý Pytago áp dụng cho loại tam giác nào?",
        options: ["Tam giác đều", "Tam giác cân", "Tam giác vuông", "Tam giác tù"],
        correctAnswer: 2,
        explanation: "Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông (a² + b² = c²)."
      },
      {
        id: "q_m2",
        question: "Số nguyên tố chẵn duy nhất trong tập hợp số nguyên dương là số nào?",
        options: ["0", "2", "4", "6"],
        correctAnswer: 1,
        explanation: "Số 2 là số nguyên tố chẵn duy nhất vì mọi số chẵn lớn hơn 2 đều chia hết cho 2."
      }
    ]
  }
];

class StorageManager {
  static getLessons() {
    try {
      const data = localStorage.getItem('contra_quiz_lessons_gh');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    localStorage.setItem('contra_quiz_lessons_gh', JSON.stringify(DEFAULT_LESSONS));
    return DEFAULT_LESSONS;
  }

  static saveLessons(lessons) {
    localStorage.setItem('contra_quiz_lessons_gh', JSON.stringify(lessons));
  }

  static getActiveLessonId() {
    return localStorage.getItem('contra_active_lesson_gh') || DEFAULT_LESSONS[0].id;
  }

  static setActiveLessonId(id) {
    localStorage.setItem('contra_active_lesson_gh', id);
  }

  static getActiveLesson() {
    const lessons = this.getLessons();
    const activeId = this.getActiveLessonId();
    return lessons.find(l => l.id === activeId) || lessons[0];
  }
}

// ==========================================
// 3. ENGINE TRÒ CHƠI CONTRA (CANVAS 2D)
// ==========================================
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 480;
const GRAVITY = 0.55;

class ContraGameApp {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Game State
    this.lessons = StorageManager.getLessons();
    this.activeLesson = StorageManager.getActiveLesson();
    this.gameState = 'title'; // 'title', 'playing', 'paused', 'quiz', 'victory', 'gameover'
    
    // Player
    this.player = this.createPlayer();
    
    // Map & Camera
    this.cameraX = 0;
    this.mapWidth = 3600;
    
    // Entities
    this.platforms = [];
    this.hazards = []; // spikes, barrels, saws, geysers
    this.gates = [];
    this.enemies = [];
    this.bullets = [];
    this.particles = [];
    this.itemPickups = [];
    this.drone = null;
    this.droneTimer = 300;
    
    // Inputs
    this.keys = {};
    
    // HUD & Stats
    this.currentGateIndex = 0;
    this.activeQuizContext = null;
    
    this.initEventListeners();
    this.renderTitleScreen();
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }

  createPlayer() {
    return {
      x: 80,
      y: 300,
      vx: 0,
      vy: 0,
      width: 28,
      height: 48,
      isGrounded: false,
      isCrouching: false,
      aimUp: false,
      direction: 1, // 1: right, -1: left
      hearts: 5,
      maxHearts: 5,
      score: 0,
      medals: 0,
      enemiesDefeated: 0,
      invulnerableTimer: 0,
      shootCooldown: 0,
      weapon: 'RIFLE', // 'RIFLE', 'SPREAD', 'MACHINE', 'LASER', 'FIRE'
      weaponAmmo: 0,
      // Super Mushroom Mechanics
      isGiant: false,
      giantTimer: 0,
      // Animation frames
      animFrame: 0,
      animTimer: 0
    };
  }

  initMap() {
    const questions = this.activeLesson.questions;
    this.platforms = [
      // Main Ground
      { x: 0, y: 410, w: 3800, h: 70, type: 'ground' },
      // Elevated Platforms
      { x: 180, y: 320, w: 140, h: 16 },
      { x: 420, y: 270, w: 160, h: 16 },
      { x: 700, y: 310, w: 180, h: 16 },
      { x: 1100, y: 260, w: 160, h: 16 },
      { x: 1350, y: 320, w: 150, h: 16 },
      { x: 1750, y: 270, w: 180, h: 16 },
      { x: 2050, y: 310, w: 160, h: 16 },
      { x: 2450, y: 250, w: 190, h: 16 },
      { x: 2800, y: 310, w: 180, h: 16 }
    ];

    // Gates placed according to questions
    this.gates = [];
    const gateSpacing = 750;
    questions.forEach((q, idx) => {
      this.gates.push({
        id: 'gate_' + idx,
        x: 650 + idx * gateSpacing,
        y: 230,
        w: 36,
        h: 180,
        gateNumber: idx + 1,
        question: q,
        unlocked: false,
        pulseAnim: 0
      });
    });

    this.mapWidth = 650 + questions.length * gateSpacing + 600;

    // Hazards
    this.hazards = [
      // Mystery Boxes [ ? ] (Shoot or bump to get Mushroom/Weapon)
      { type: 'mystery_box', x: 240, y: 230, w: 32, h: 32, hits: 0, content: 'mushroom' },
      { type: 'mystery_box', x: 820, y: 210, w: 32, h: 32, hits: 0, content: 'spread' },
      { type: 'mystery_box', x: 1450, y: 220, w: 32, h: 32, hits: 0, content: 'laser' },
      { type: 'mystery_box', x: 2150, y: 210, w: 32, h: 32, hits: 0, content: 'mushroom' },
      
      // Explosive Barrels
      { type: 'barrel', x: 380, y: 374, w: 28, h: 36, hp: 2 },
      { type: 'barrel', x: 1020, y: 374, w: 28, h: 36, hp: 2 },
      { type: 'barrel', x: 1680, y: 374, w: 28, h: 36, hp: 2 },
      { type: 'barrel', x: 2380, y: 374, w: 28, h: 36, hp: 2 },

      // Spikes
      { type: 'spikes', x: 520, y: 396, w: 60, h: 14 },
      { type: 'spikes', x: 1250, y: 396, w: 70, h: 14 },
      { type: 'spikes', x: 1950, y: 396, w: 60, h: 14 },

      // Spinning Saws
      { type: 'saw', x: 880, y: 390, radius: 18, minX: 860, maxX: 980, speed: 1.8, dir: 1, angle: 0 },
      { type: 'saw', x: 1560, y: 390, radius: 18, minX: 1540, maxX: 1680, speed: 2.2, dir: 1, angle: 0 },

      // Fire Geysers
      { type: 'geyser', x: 1180, y: 370, w: 24, h: 40, active: false, timer: 0 }
    ];

    // Enemies
    this.enemies = [
      { x: 320, y: 360, w: 28, h: 46, vx: -1.2, hp: 2, type: 'soldier', shootTimer: 80 },
      { x: 580, y: 360, w: 28, h: 46, vx: -1.5, hp: 2, type: 'runner' },
      { x: 950, y: 360, w: 28, h: 46, vx: -1.2, hp: 3, type: 'soldier', shootTimer: 70 },
      { x: 1300, y: 360, w: 28, h: 46, vx: -1.4, hp: 2, type: 'runner' },
      { x: 1600, y: 360, w: 28, h: 46, vx: -1.2, hp: 3, type: 'soldier', shootTimer: 60 },
      { x: 1900, y: 360, w: 28, h: 46, vx: -1.5, hp: 2, type: 'runner' },
      { x: 2300, y: 360, w: 28, h: 46, vx: -1.2, hp: 4, type: 'soldier', shootTimer: 50 },
      { x: 2700, y: 360, w: 28, h: 46, vx: -1.5, hp: 3, type: 'runner' }
    ];

    this.bullets = [];
    this.particles = [];
    this.itemPickups = [];
    this.cameraX = 0;
  }

  startMission() {
    this.player = this.createPlayer();
    this.initMap();
    this.gameState = 'playing';
    document.getElementById('screenTitle').classList.add('hidden');
    document.getElementById('screenGame').classList.remove('hidden');
    this.updateHUD();
    sounds.playTone(440, 'triangle', 0.2);
  }

  backToHub() {
    this.gameState = 'title';
    document.getElementById('screenGame').classList.add('hidden');
    document.getElementById('screenTitle').classList.remove('hidden');
    this.renderTitleScreen();
  }

  // ==========================================
  // 4. BÀN PHÍM & TƯƠNG TÁC (KEYS A, B, C, D)
  // ==========================================
  initEventListeners() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this.keys[e.key] = true;
      if (e.key) {
        this.keys[e.key.toLowerCase()] = true;
        this.keys[e.key.toUpperCase()] = true;
      }

      // Xử lý phím khi đang hiển thị Modal Quiz: Bấm A, B, C, D hoặc 1, 2, 3, 4
      if (this.gameState === 'quiz' && this.activeQuizContext) {
        const key = e.key.toUpperCase();
        if (key === 'A' || key === '1') {
          e.preventDefault();
          this.handleQuizSelect(0);
        } else if (key === 'B' || key === '2') {
          e.preventDefault();
          this.handleQuizSelect(1);
        } else if (key === 'C' || key === '3') {
          e.preventDefault();
          this.handleQuizSelect(2);
        } else if (key === 'D' || key === '4') {
          e.preventDefault();
          this.handleQuizSelect(3);
        }
        return;
      }

      // Phím Space, Mũi tên không cuộn trang
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      // Tạm dừng P
      if (e.code === 'KeyP') {
        if (this.gameState === 'playing') this.gameState = 'paused';
        else if (this.gameState === 'paused') this.gameState = 'playing';
        this.updateHUD();
      }

      // Bắn phím X, J hoặc Z
      const isShoot = e.code === 'KeyX' || e.code === 'KeyJ' || e.code === 'KeyZ' ||
                      e.key === 'x' || e.key === 'X' || e.key === 'j' || e.key === 'J' || e.key === 'z' || e.key === 'Z';
      if (isShoot && this.gameState === 'playing') {
        this.firePlayerWeapon();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      this.keys[e.key] = false;
      if (e.key) {
        this.keys[e.key.toLowerCase()] = false;
        this.keys[e.key.toUpperCase()] = false;
      }
    });

    // Touch Controls
    const touchMap = {
      'btnTouchLeft': 'ArrowLeft',
      'btnTouchRight': 'ArrowRight',
      'btnTouchUp': 'ArrowUp',
      'btnTouchDown': 'ArrowDown'
    };

    Object.entries(touchMap).forEach(([btnId, code]) => {
      const el = document.getElementById(btnId);
      if (el) {
        el.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[code] = true; });
        el.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[code] = false; });
      }
    });

    const btnJump = document.getElementById('btnTouchJump');
    if (btnJump) {
      btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.keys['Space'] = true;
      });
      btnJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys['Space'] = false;
      });
    }

    const btnFire = document.getElementById('btnTouchFire');
    if (btnFire) {
      btnFire.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.firePlayerWeapon();
      });
    }

    // Audio toggle
    const btnMute = document.getElementById('btnToggleSound');
    if (btnMute) {
      btnMute.addEventListener('click', () => {
        sounds.enabled = !sounds.enabled;
        btnMute.innerHTML = sounds.enabled ? '🔊 Bật âm' : '🔇 Tắt âm';
        btnMute.className = sounds.enabled ? 'btn btn-secondary btn-sm' : 'btn btn-amber btn-sm';
      });
    }
  }

  // ==========================================
  // 5. VÒNG LẶP TRÒ CHƠI & VẬT LÝ
  // ==========================================
  gameLoop() {
    if (this.gameState === 'playing') {
      this.updatePhysics();
    }
    this.render();
    requestAnimationFrame(this.gameLoop);
  }

  updatePhysics() {
    const p = this.player;

    // Countdown timers
    if (p.invulnerableTimer > 0) p.invulnerableTimer--;
    if (p.shootCooldown > 0) p.shootCooldown--;
    if (p.giantTimer > 0) {
      p.giantTimer--;
      if (p.giantTimer <= 0) {
        p.isGiant = false;
        sounds.playTone(220, 'triangle', 0.2);
        this.updateHUD();
      }
    }

    // Controls
    const speed = p.isGiant ? 5.2 : 4.2;
    const isMovingLeft = this.keys['ArrowLeft'] || this.keys['KeyA'];
    const isMovingRight = this.keys['ArrowRight'] || this.keys['KeyD'];
    const isJumping = this.keys['Space'] || this.keys['KeyW'] || this.keys['ArrowUp'];
    const isCrouching = (this.keys['ArrowDown'] || this.keys['KeyS']) && p.isGrounded;

    p.isCrouching = isCrouching;
    p.aimUp = (this.keys['ArrowUp'] || this.keys['KeyW']) && !isJumping;

    if (isMovingLeft && !isCrouching) {
      p.vx = -speed;
      p.direction = -1;
    } else if (isMovingRight && !isCrouching) {
      p.vx = speed;
      p.direction = 1;
    } else {
      p.vx = 0;
    }

    // Jump
    if (isJumping && p.isGrounded && !isCrouching) {
      p.vy = p.isGiant ? -13.5 : -11.5;
      p.isGrounded = false;
      sounds.playJump();
    }

    // Giữ phím bắn liên tục (Continuous Fire) theo nhịp cooldown của từng loại súng
    const isHoldingShoot = this.keys['KeyX'] || this.keys['KeyJ'] || this.keys['KeyZ'] ||
                           this.keys['x'] || this.keys['X'] || this.keys['j'] || this.keys['J'] || this.keys['z'] || this.keys['Z'];
    if (isHoldingShoot && p.shootCooldown <= 0) {
      this.firePlayerWeapon();
    }

    // Gravity
    p.vy += GRAVITY;
    if (p.vy > 12) p.vy = 12;

    p.x += p.vx;
    p.y += p.vy;

    // Platform collisions
    p.isGrounded = false;
    const pScale = p.isGiant ? 1.35 : 1.0;
    const curW = p.width * pScale;
    const curH = (p.isCrouching ? p.height * 0.55 : p.height) * pScale;

    this.platforms.forEach(plat => {
      // Check landing on platform
      if (
        p.x + curW > plat.x &&
        p.x < plat.x + plat.w &&
        p.y + curH >= plat.y &&
        p.y + curH - p.vy <= plat.y + 14 &&
        p.vy >= 0
      ) {
        p.y = plat.y - curH;
        p.vy = 0;
        p.isGrounded = true;
      }
    });

    // Mystery Box bumping from below
    this.hazards.forEach(h => {
      if (h.type === 'mystery_box') {
        if (
          p.x + curW > h.x &&
          p.x < h.x + h.w &&
          p.y <= h.y + h.h &&
          p.y - p.vy >= h.y &&
          p.vy < 0
        ) {
          p.vy = 2; // bounce down
          this.triggerMysteryBox(h);
        }
      }
    });

    // Boundaries
    if (p.x < 10) p.x = 10;
    if (p.y > 600) {
      // Fall into pit
      this.damagePlayer(1);
      p.y = 300;
      p.vy = 0;
    }

    // Camera follow player
    const targetCamX = p.x - CANVAS_WIDTH * 0.35;
    this.cameraX += (targetCamX - this.cameraX) * 0.1;
    if (this.cameraX < 0) this.cameraX = 0;
    if (this.cameraX > this.mapWidth - CANVAS_WIDTH) {
      this.cameraX = this.mapWidth - CANVAS_WIDTH;
    }

    // Update Gate interaction
    this.gates.forEach(gate => {
      gate.pulseAnim = (gate.pulseAnim || 0) + 0.05;
      if (!gate.unlocked) {
        // Laser barrier collision
        if (p.x + curW >= gate.x && p.x <= gate.x + gate.w) {
          p.x = gate.x - curW - 2;
          p.vx = 0;
          this.openQuizModal(gate);
        }
      }
    });

    // Update Hazards
    this.updateHazards();

    // Update Enemies
    this.updateEnemies();

    // Update Bullets
    this.updateBullets();

    // Update Item Pickups
    this.updatePickups();

    // Update Drone
    this.updateDrone();

    // Update Particles
    this.particles = this.particles.filter(pt => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life--;
      return pt.life > 0;
    });

    // Check Victory
    const lastGate = this.gates[this.gates.length - 1];
    if (lastGate && lastGate.unlocked && p.x > lastGate.x + 200) {
      this.handleVictory();
    }
  }

  // ==========================================
  // 6. CƠ CHẾ NẤM KHỔNG LỒ & ĐẠN DƯỢC
  // ==========================================
  triggerMysteryBox(box) {
    if (box.hits >= 1) return;
    box.hits++;
    sounds.playTone(520, 'square', 0.15, 0.25);
    
    // Spawn item above the box
    const itemType = box.content || 'mushroom';
    this.spawnItemPickup(box.x + 6, box.y - 28, itemType);

    // Particle effect
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: box.x + 16,
        y: box.y + 16,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 4 - 2,
        color: '#fbbf24',
        size: 4,
        life: 25
      });
    }
  }

  spawnItemPickup(x, y, type) {
    this.itemPickups.push({
      x, y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -4,
      w: 24,
      h: 24,
      type: type, // 'mushroom', 'spread', 'machine', 'laser', 'ammo', 'heart'
      isGrounded: false
    });
  }

  updatePickups() {
    const p = this.player;
    const pScale = p.isGiant ? 1.35 : 1.0;
    const curW = p.width * pScale;
    const curH = p.height * pScale;

    this.itemPickups = this.itemPickups.filter(item => {
      item.vy += 0.35;
      item.x += item.vx;
      item.y += item.vy;

      // Platform ground collision
      this.platforms.forEach(plat => {
        if (
          item.x + item.w > plat.x &&
          item.x < plat.x + plat.w &&
          item.y + item.h >= plat.y &&
          item.y + item.h - item.vy <= plat.y + 10
        ) {
          item.y = plat.y - item.h;
          item.vy = 0;
          item.vx *= 0.8;
          item.isGrounded = true;
        }
      });

      // Player collection check
      if (
        p.x + curW > item.x &&
        p.x < item.x + item.w &&
        p.y + curH > item.y &&
        p.y < item.y + item.h
      ) {
        this.collectItem(item.type);
        return false;
      }
      return item.y < 600;
    });
  }

  collectItem(type) {
    const p = this.player;
    if (type === 'mushroom') {
      p.isGiant = true;
      p.giantTimer = 900; // 15 seconds at 60fps
      if (p.hearts < p.maxHearts) p.hearts++;
      sounds.playMushroom();
      this.showToast('🍄 ĂN SIÊU NẤM KHỔNG LỒ! CÀN QUÉT KẺ ĐỊCH!');
    } else if (type === 'spread') {
      p.weapon = 'SPREAD';
      p.weaponAmmo = 60;
      sounds.playTone(700, 'triangle', 0.2);
      this.showToast('🔫 NHẶT SÚNG SPREAD GUN (BẮN TỎA 5 TIA)!');
    } else if (type === 'machine') {
      p.weapon = 'MACHINE';
      p.weaponAmmo = 90;
      sounds.playTone(800, 'square', 0.2);
      this.showToast('⚡ NHẶT SÚNG MACHINE GUN (BẮN LIÊN THANH)!');
    } else if (type === 'laser') {
      p.weapon = 'LASER';
      p.weaponAmmo = 45;
      sounds.playLaser();
      this.showToast('⚡ NHẶT SÚNG LASER BEAM (XUYÊN PHÁ)!');
    } else if (type === 'ammo') {
      p.weaponAmmo += 30;
      sounds.playTone(600, 'square', 0.1);
      this.showToast('📦 NẠP THÊM +30 VIÊN ĐẠN!');
    } else if (type === 'heart') {
      if (p.hearts < p.maxHearts) p.hearts++;
      sounds.playTone(880, 'sine', 0.15);
      this.showToast('💖 HỒI PHỤC +1 TIM!');
    }
    this.updateHUD();
  }

  // Drone Drops
  updateDrone() {
    if (!this.drone) {
      this.droneTimer--;
      if (this.droneTimer <= 0) {
        this.drone = {
          x: this.cameraX - 40,
          y: 90 + Math.random() * 60,
          w: 36,
          h: 24,
          vx: 3.2,
          hp: 2,
          dropContent: Math.random() > 0.5 ? 'mushroom' : 'spread'
        };
        this.droneTimer = 700 + Math.random() * 400;
      }
    } else {
      this.drone.x += this.drone.vx;
      if (this.drone.x > this.cameraX + CANVAS_WIDTH + 60) {
        this.drone = null;
      }
    }
  }

  // ==========================================
  // 7. VŨ KHÍ & ĐẠN DƯỢC
  // ==========================================
  firePlayerWeapon() {
    const p = this.player;
    if (p.shootCooldown > 0) return;

    const pScale = p.isGiant ? 1.35 : 1.0;
    const startX = p.direction === 1 ? p.x + p.width * pScale : p.x;
    const startY = p.isCrouching 
      ? p.y + p.height * pScale * 0.6 
      : (p.aimUp ? p.y + 4 : p.y + p.height * pScale * 0.4);

    const baseSpeed = 9;

    if (p.weapon === 'SPREAD') {
      sounds.playSpread();
      p.shootCooldown = 18;
      // 5-bullet spread
      const angles = p.direction === 1 ? [-0.25, -0.12, 0, 0.12, 0.25] : [Math.PI - 0.25, Math.PI - 0.12, Math.PI, Math.PI + 0.12, Math.PI + 0.25];
      angles.forEach(ang => {
        this.bullets.push({
          x: startX,
          y: startY,
          vx: Math.cos(ang) * baseSpeed,
          vy: Math.sin(ang) * baseSpeed,
          damage: p.isGiant ? 3 : 2,
          radius: 5,
          color: '#fbbf24',
          owner: 'player'
        });
      });
      p.weaponAmmo--;
    } else if (p.weapon === 'MACHINE') {
      sounds.playShoot();
      p.shootCooldown = 7; // Rapid fire
      this.bullets.push({
        x: startX,
        y: startY,
        vx: p.direction * (baseSpeed + 3),
        vy: p.aimUp ? -baseSpeed : (Math.random() - 0.5) * 1.5,
        damage: p.isGiant ? 2 : 1.5,
        radius: 4,
        color: '#67e8f9',
        owner: 'player'
      });
      p.weaponAmmo--;
    } else if (p.weapon === 'LASER') {
      sounds.playLaser();
      p.shootCooldown = 22;
      this.bullets.push({
        x: startX,
        y: startY,
        vx: p.direction * (baseSpeed + 5),
        vy: p.aimUp ? -(baseSpeed + 5) : 0,
        damage: 4,
        radius: 6,
        laserLength: 30,
        pierce: true,
        color: '#a855f7',
        owner: 'player'
      });
      p.weaponAmmo--;
    } else {
      // Default RIFLE
      sounds.playShoot();
      p.shootCooldown = 15;
      this.bullets.push({
        x: startX,
        y: startY,
        vx: p.direction * baseSpeed,
        vy: p.aimUp ? -baseSpeed : 0,
        damage: p.isGiant ? 2.5 : 1.5,
        radius: 4,
        color: '#facc15',
        owner: 'player'
      });
    }

    if (p.weapon !== 'RIFLE' && p.weaponAmmo <= 0) {
      p.weapon = 'RIFLE';
      this.showToast('Hết đạn đặc biệt! Trở về súng tiêu chuẩn RIFLE.');
      this.updateHUD();
    }
  }

  updateBullets() {
    this.bullets = this.bullets.filter(b => {
      b.x += b.vx;
      b.y += b.vy;

      // Hit Drone
      if (b.owner === 'player' && this.drone) {
        if (
          b.x > this.drone.x &&
          b.x < this.drone.x + this.drone.w &&
          b.y > this.drone.y &&
          b.y < this.drone.y + this.drone.h
        ) {
          this.drone.hp -= b.damage;
          if (this.drone.hp <= 0) {
            this.spawnItemPickup(this.drone.x, this.drone.y, this.drone.dropContent);
            sounds.playExplosion();
            this.drone = null;
          }
          return false;
        }
      }

      // Hit Mystery Boxes
      if (b.owner === 'player') {
        for (const h of this.hazards) {
          if (h.type === 'mystery_box' && h.hits < 1) {
            if (b.x > h.x && b.x < h.x + h.w && b.y > h.y && b.y < h.y + h.h) {
              this.triggerMysteryBox(h);
              return false;
            }
          }
        }
      }

      // Hit Explosive Barrels
      if (b.owner === 'player') {
        for (const h of this.hazards) {
          if (h.type === 'barrel' && h.hp > 0) {
            if (b.x > h.x && b.x < h.x + h.w && b.y > h.y && b.y < h.y + h.h) {
              h.hp -= b.damage;
              if (h.hp <= 0) {
                this.explodeBarrel(h);
              }
              return false;
            }
          }
        }
      }

      // Hit Enemies
      if (b.owner === 'player') {
        for (const en of this.enemies) {
          if (en.hp > 0) {
            if (b.x > en.x && b.x < en.x + en.w && b.y > en.y && b.y < en.y + en.h) {
              en.hp -= b.damage;
              sounds.playHit();
              if (en.hp <= 0) {
                this.player.enemiesDefeated++;
                this.player.score += 150;
                sounds.playExplosion();
                this.updateHUD();
              }
              if (!b.pierce) return false;
            }
          }
        }
      }

      // Hit Player
      if (b.owner === 'enemy') {
        const p = this.player;
        const pScale = p.isGiant ? 1.35 : 1.0;
        if (
          b.x > p.x &&
          b.x < p.x + p.width * pScale &&
          b.y > p.y &&
          b.y < p.y + p.height * pScale
        ) {
          this.damagePlayer(1);
          return false;
        }
      }

      return b.x > this.cameraX - 50 && b.x < this.cameraX + CANVAS_WIDTH + 50 && b.y > 0 && b.y < 500;
    });
  }

  // ==========================================
  // 8. CHƯỚNG NGẠI VẬT & KẺ ĐỊCH
  // ==========================================
  explodeBarrel(barrel) {
    sounds.playExplosion();
    // Blast radius damage
    const blastRadius = 90;
    // Damage player if close
    const distPlayer = Math.hypot((this.player.x + 14) - (barrel.x + 14), (this.player.y + 24) - (barrel.y + 18));
    if (distPlayer < blastRadius) {
      this.damagePlayer(1);
    }
    // Damage enemies
    this.enemies.forEach(en => {
      const dist = Math.hypot((en.x + 14) - (barrel.x + 14), (en.y + 20) - (barrel.y + 18));
      if (dist < blastRadius) {
        en.hp = 0;
        this.player.enemiesDefeated++;
        this.player.score += 200;
      }
    });

    // Particle blast
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: barrel.x + 14,
        y: barrel.y + 18,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        color: Math.random() > 0.4 ? '#f97316' : '#ef4444',
        size: 5 + Math.random() * 4,
        life: 30
      });
    }
  }

  updateHazards() {
    const p = this.player;
    const pScale = p.isGiant ? 1.35 : 1.0;
    const curW = p.width * pScale;
    const curH = p.height * pScale;

    this.hazards.forEach(h => {
      // Spinning Saws
      if (h.type === 'saw') {
        h.x += h.speed * h.dir;
        h.angle += 0.2;
        if (h.x > h.maxX) h.dir = -1;
        if (h.x < h.minX) h.dir = 1;

        const dist = Math.hypot((p.x + curW / 2) - h.x, (p.y + curH / 2) - h.y);
        if (dist < h.radius + 14) {
          if (p.isGiant) {
            // Giant kicks the saw away
            h.dir *= -1;
            sounds.playTone(300, 'square', 0.1);
          } else {
            this.damagePlayer(1);
          }
        }
      }

      // Spikes
      if (h.type === 'spikes') {
        if (
          p.x + curW > h.x &&
          p.x < h.x + h.w &&
          p.y + curH >= h.y &&
          p.y + curH <= h.y + h.h + 8
        ) {
          if (p.isGiant) {
            // Giant crushes spikes safely with a bounce
            p.vy = -7;
          } else {
            this.damagePlayer(1);
            p.vy = -6; // bounce back
          }
        }
      }

      // Fire Geysers
      if (h.type === 'geyser') {
        h.timer++;
        if (h.timer % 120 < 60) {
          h.active = true;
          // Burn player
          if (
            p.x + curW > h.x &&
            p.x < h.x + h.w &&
            p.y + curH > h.y - 30 &&
            p.y < h.y + h.h
          ) {
            this.damagePlayer(1);
          }
        } else {
          h.active = false;
        }
      }
    });
  }

  updateEnemies() {
    const p = this.player;
    const pScale = p.isGiant ? 1.35 : 1.0;
    const curW = p.width * pScale;
    const curH = p.height * pScale;

    this.enemies = this.enemies.filter(en => {
      if (en.hp <= 0) return false;

      // Enemy Patrol
      en.x += en.vx;
      if (en.type === 'soldier') {
        en.shootTimer = (en.shootTimer || 60) - 1;
        if (en.shootTimer <= 0 && Math.abs(en.x - p.x) < 400) {
          en.shootTimer = 100 + Math.random() * 60;
          // Shoot at player
          const dir = p.x < en.x ? -1 : 1;
          this.bullets.push({
            x: en.x + (dir === 1 ? en.w : 0),
            y: en.y + 16,
            vx: dir * 4.5,
            vy: 0,
            damage: 1,
            radius: 3.5,
            color: '#ef4444',
            owner: 'enemy'
          });
        }
      }

      // Stomp by Giant Player
      if (
        p.isGiant &&
        p.x + curW > en.x &&
        p.x < en.x + en.w &&
        p.y + curH >= en.y &&
        p.y + curH <= en.y + 24 &&
        p.vy > 0
      ) {
        en.hp = 0;
        p.vy = -8; // Giant jump bounce
        p.enemiesDefeated++;
        p.score += 250;
        sounds.playExplosion();
        this.showToast('💥 DẪM BẸP KẺ ĐỊCH BẰNG SIÊU NẤM!');
        this.updateHUD();
        return false;
      }

      // Body Collision with Player
      if (
        p.x + curW > en.x &&
        p.x < en.x + en.w &&
        p.y + curH > en.y &&
        p.y < en.y + en.h
      ) {
        if (p.isGiant) {
          en.hp = 0;
          p.enemiesDefeated++;
          p.score += 200;
          sounds.playExplosion();
          return false;
        } else {
          this.damagePlayer(1);
        }
      }

      return true;
    });
  }

  damagePlayer(amount) {
    const p = this.player;
    if (p.invulnerableTimer > 0) return;
    p.hearts -= amount;
    p.invulnerableTimer = 60; // 1 second invulnerability
    sounds.playHit();
    this.updateHUD();

    if (p.hearts <= 0) {
      this.handleGameOver();
    }
  }

  // ==========================================
  // 9. TRẢ LỜI CÂU HỎI MỞ CỔNG (PHÍM A, B, C, D)
  // ==========================================
  openQuizModal(gate) {
    this.gameState = 'quiz';
    this.activeQuizContext = gate;

    const modal = document.getElementById('modalQuiz');
    const q = gate.question;

    document.getElementById('quizGateTitle').innerText = `CỔNG LASER #${gate.gateNumber} - XÁC THỰC TRI THỨC`;
    document.getElementById('quizQuestionText').innerText = q.question;

    const optionsContainer = document.getElementById('quizOptionsContainer');
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="option-key-badge">${letters[idx]}</span> <span>${opt}</span>`;
      btn.onclick = () => this.handleQuizSelect(idx);
      optionsContainer.appendChild(btn);
    });

    document.getElementById('quizFeedback').className = 'hidden';
    modal.classList.remove('hidden');
    sounds.playTone(380, 'sine', 0.15);
  }

  handleQuizSelect(selectedIndex) {
    if (!this.activeQuizContext) return;
    const gate = this.activeQuizContext;
    const q = gate.question;
    const isCorrect = selectedIndex === q.correctAnswer;
    const feedbackEl = document.getElementById('quizFeedback');

    const optionButtons = document.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    feedbackEl.classList.remove('hidden');

    if (isCorrect) {
      sounds.playCorrect();
      feedbackEl.className = 'quiz-feedback-box correct-box';
      feedbackEl.innerHTML = `
        <div style="color: #22c55e; font-weight: 700; margin-bottom: 4px;">✅ CHÍNH XÁC! CỔNG LASER ĐANG HẠ XUỐNG...</div>
        <div style="font-size: 0.85rem; color: #cbd5e1;">${q.explanation}</div>
      `;

      gate.unlocked = true;
      this.player.medals++;
      this.player.score += 500;
      this.updateHUD();

      setTimeout(() => {
        sounds.playGateOpen();
        document.getElementById('modalQuiz').classList.add('hidden');
        this.gameState = 'playing';
        this.activeQuizContext = null;
      }, 1500);
    } else {
      sounds.playWrong();
      feedbackEl.className = 'quiz-feedback-box wrong-box';
      feedbackEl.innerHTML = `
        <div style="color: #ef4444; font-weight: 700; margin-bottom: 4px;">❌ CHƯA CHÍNH XÁC! HỆ THỐNG AN NINH BÁO ĐỘNG!</div>
        <div style="font-size: 0.85rem; color: #cbd5e1;">${q.explanation}</div>
        <button id="btnRetryQuiz" class="btn btn-amber btn-sm" style="margin-top: 10px;">Thử lại</button>
      `;

      document.getElementById('btnRetryQuiz').onclick = () => {
        optionButtons.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove('correct', 'wrong');
        });
        feedbackEl.classList.add('hidden');
      };
    }
  }

  // ==========================================
  // 10. KẾT THÚC: CHIẾN THẮNG & GAME OVER
  // ==========================================
  handleVictory() {
    this.gameState = 'victory';
    sounds.playVictory();
    document.getElementById('modalVictory').classList.remove('hidden');
    document.getElementById('victoryScore').innerText = this.player.score;
    document.getElementById('victoryMedals').innerText = `${this.player.medals}/${this.gates.length}`;
    document.getElementById('victoryEnemies').innerText = this.player.enemiesDefeated;
  }

  handleGameOver() {
    this.gameState = 'gameover';
    sounds.playGameOver();
    document.getElementById('modalGameOver').classList.remove('hidden');
    document.getElementById('gameOverScore').innerText = this.player.score;
  }

  // ==========================================
  // 11. VẼ ĐỒ HỌA TRÊN CANVAS 2D
  // ==========================================
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Background Gradient (Cyber Night)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    bgGrad.addColorStop(0, '#04130c');
    bgGrad.addColorStop(0.7, '#072418');
    bgGrad.addColorStop(1, '#020b07');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();
    ctx.translate(-this.cameraX, 0);

    // Draw Parallax Grid & Stars
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.mapWidth; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }

    // Platforms
    this.platforms.forEach(plat => {
      // Tech platform style
      ctx.fillStyle = '#06281b';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

      // Neon edge
      ctx.fillStyle = '#10b981';
      ctx.fillRect(plat.x, plat.y, plat.w, 4);

      // Warning hazard stripes on lower border
      ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.fillRect(plat.x, plat.y + plat.h - 4, plat.w, 4);
    });

    // Draw Hazards
    this.hazards.forEach(h => {
      if (h.type === 'mystery_box') {
        ctx.fillStyle = h.hits >= 1 ? '#4b5563' : '#f59e0b';
        ctx.fillRect(h.x, h.y, h.w, h.h);
        ctx.strokeStyle = '#fde68a';
        ctx.strokeRect(h.x, h.y, h.w, h.h);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(h.hits >= 1 ? '•' : '?', h.x + 10, h.y + 22);
      } else if (h.type === 'barrel') {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(h.x, h.y, h.w, h.h);
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('TNT', h.x + 3, h.y + 22);
      } else if (h.type === 'spikes') {
        ctx.fillStyle = '#94a3b8';
        for (let sx = h.x; sx < h.x + h.w; sx += 12) {
          ctx.beginPath();
          ctx.moveTo(sx, h.y + h.h);
          ctx.lineTo(sx + 6, h.y);
          ctx.lineTo(sx + 12, h.y + h.h);
          ctx.fill();
        }
      } else if (h.type === 'saw') {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.angle);
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      } else if (h.type === 'geyser') {
        ctx.fillStyle = '#334155';
        ctx.fillRect(h.x, h.y, h.w, h.h);
        if (h.active) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.beginPath();
          ctx.moveTo(h.x, h.y);
          ctx.lineTo(h.x + h.w / 2, h.y - 45 - Math.random() * 10);
          ctx.lineTo(h.x + h.w, h.y);
          ctx.fill();
        }
      }
    });

    // Draw Laser Gates
    this.gates.forEach(gate => {
      // Gate Posts
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(gate.x - 8, gate.y - 20, 16, gate.h + 20);
      ctx.fillRect(gate.x + gate.w - 8, gate.y - 20, 16, gate.h + 20);

      // Gate Header Badge
      ctx.fillStyle = gate.unlocked ? '#22c55e' : '#ef4444';
      ctx.fillRect(gate.x - 12, gate.y - 36, gate.w + 24, 18);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`GATE ${gate.gateNumber}`, gate.x - 6, gate.y - 23);

      if (!gate.unlocked) {
        // Glowing Security Laser Beam
        const alpha = 0.5 + Math.sin(gate.pulseAnim) * 0.3;
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.fillRect(gate.x, gate.y, gate.w, gate.h);
        ctx.strokeStyle = '#fca5a5';
        ctx.lineWidth = 2;
        ctx.strokeRect(gate.x, gate.y, gate.w, gate.h);
      } else {
        // Deactivated gate safe field
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.fillRect(gate.x, gate.y, gate.w, gate.h);
      }
    });

    // Draw Pickups
    this.itemPickups.forEach(item => {
      if (item.type === 'mushroom') {
        // Super Mushroom
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(item.x + 12, item.y + 10, 10, Math.PI, 0);
        ctx.fill();
        // White dots
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(item.x + 10, item.y + 5, 4, 4);
        // Stem
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(item.x + 8, item.y + 10, 8, 8);
      } else {
        // Weapon / Ammo capsule
        ctx.fillStyle = item.type === 'spread' ? '#fbbf24' : (item.type === 'machine' ? '#67e8f9' : '#a855f7');
        ctx.fillRect(item.x, item.y, item.w, item.h);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(item.type.charAt(0).toUpperCase(), item.x + 6, item.y + 17);
      }
    });

    // Draw Drone
    if (this.drone) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(this.drone.x, this.drone.y, this.drone.w, this.drone.h);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(this.drone.x - 6, this.drone.y - 4, this.drone.w + 12, 4);
    }

    // Draw Enemies
    this.enemies.forEach(en => {
      ctx.fillStyle = en.type === 'soldier' ? '#dc2626' : '#ea580c';
      ctx.fillRect(en.x, en.y, en.w, en.h);
      // Eye visor
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(en.x + (en.vx < 0 ? 2 : 16), en.y + 8, 10, 5);
    });

    // Draw Bullets
    this.bullets.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Particles
    this.particles.forEach(pt => {
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
    });

    // Draw Player (Contra Commando)
    this.renderPlayer(ctx);

    ctx.restore();
  }

  renderPlayer(ctx) {
    const p = this.player;
    if (p.invulnerableTimer > 0 && Math.floor(Date.now() / 60) % 2 === 0) {
      return; // Flash effect when damaged
    }

    const scale = p.isGiant ? 1.35 : 1.0;
    const w = p.width * scale;
    const h = (p.isCrouching ? p.height * 0.55 : p.height) * scale;

    ctx.save();
    ctx.translate(p.x, p.y);

    // Giant Golden Aura
    if (p.isGiant) {
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
      ctx.lineWidth = 3;
      ctx.strokeRect(-4, -4, w + 8, h + 8);
    }

    // Commando Body (Blue Military Pants + Tan Torso)
    // Headband (Red Contra Classic)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, 0, w, 8 * scale);

    // Head
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(2 * scale, 6 * scale, w - 4 * scale, 12 * scale);

    // Torso / Vest
    ctx.fillStyle = '#15803d'; // Green Tactical Vest
    ctx.fillRect(0, 18 * scale, w, 16 * scale);

    // Pants
    ctx.fillStyle = '#1d4ed8'; // Blue Pants
    ctx.fillRect(0, 34 * scale, w, h - 34 * scale);

    // Gun
    ctx.fillStyle = '#64748b';
    const gunY = p.isCrouching ? 16 * scale : (p.aimUp ? -4 * scale : 20 * scale);
    if (p.direction === 1) {
      ctx.fillRect(w - 4, gunY, 18 * scale, 6 * scale);
    } else {
      ctx.fillRect(-14 * scale, gunY, 18 * scale, 6 * scale);
    }

    ctx.restore();
  }

  // ==========================================
  // 12. CẬP NHẬT HUD & THÔNG BÁO
  // ==========================================
  updateHUD() {
    const p = this.player;
    const heartsContainer = document.getElementById('hudHearts');
    if (heartsContainer) {
      let heartsStr = '';
      for (let i = 0; i < p.maxHearts; i++) {
        heartsStr += i < p.hearts ? '❤️ ' : '🖤 ';
      }
      heartsContainer.innerHTML = heartsStr;
    }

    const hudGate = document.getElementById('hudGate');
    if (hudGate) {
      hudGate.innerText = `Cổng: ${this.gates.filter(g => g.unlocked).length}/${this.gates.length}`;
    }

    const hudMedals = document.getElementById('hudMedals');
    if (hudMedals) {
      hudMedals.innerText = `🏅 ${p.medals}`;
    }

    const hudWeapon = document.getElementById('hudWeapon');
    if (hudWeapon) {
      hudWeapon.innerText = `Vũ khí: ${p.weapon} ${p.weaponAmmo > 0 ? `(${p.weaponAmmo})` : ''}`;
    }

    const hudMushroom = document.getElementById('hudMushroom');
    if (hudMushroom) {
      if (p.isGiant) {
        hudMushroom.classList.remove('hidden');
        hudMushroom.innerText = `🍄 SIÊU NẤM: ${Math.ceil(p.giantTimer / 60)}s`;
      } else {
        hudMushroom.classList.add('hidden');
      }
    }
  }

  showToast(text) {
    const toast = document.getElementById('gameToast');
    if (!toast) return;
    toast.innerText = text;
    toast.classList.remove('hidden');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  renderTitleScreen() {
    const container = document.getElementById('topicGrid');
    if (!container) return;
    container.innerHTML = '';

    this.lessons.forEach(l => {
      const card = document.createElement('div');
      card.className = `topic-card ${l.id === this.activeLesson.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="topic-card-title">${l.title}</div>
        <div class="topic-card-desc">${l.description}</div>
        <div class="topic-card-badge">${l.questions.length} câu hỏi trắc nghiệm</div>
      `;
      card.onclick = () => {
        this.activeLesson = l;
        StorageManager.setActiveLessonId(l.id);
        this.renderTitleScreen();
      };
      container.appendChild(card);
    });
  }
}

// Khởi tạo Game khi tải trang
window.addEventListener('DOMContentLoaded', () => {
  window.contraApp = new ContraGameApp();

  // Nút Bắt đầu
  const btnStart = document.getElementById('btnStartMission');
  if (btnStart) {
    btnStart.addEventListener('click', () => window.contraApp.startMission());
  }

  // Nút Trở về Hub
  const btnBack = document.getElementById('btnBackToHub');
  if (btnBack) {
    btnBack.addEventListener('click', () => window.contraApp.backToHub());
  }

  // Nút Retry Victory / Game Over
  const btnRetry = document.getElementById('btnRestartGame');
  if (btnRetry) {
    btnRetry.addEventListener('click', () => {
      document.getElementById('modalGameOver').classList.add('hidden');
      window.contraApp.startMission();
    });
  }
  const btnVictoryRestart = document.getElementById('btnVictoryRestart');
  if (btnVictoryRestart) {
    btnVictoryRestart.addEventListener('click', () => {
      document.getElementById('modalVictory').classList.add('hidden');
      window.contraApp.startMission();
    });
  }

  // Question Manager Modal
  const btnOpenManager = document.getElementById('btnOpenQuestionManager');
  const modalManager = document.getElementById('modalQuestionManager');
  const btnCloseManager = document.getElementById('btnCloseQuestionManager');

  if (btnOpenManager && modalManager) {
    btnOpenManager.addEventListener('click', () => {
      modalManager.classList.remove('hidden');
      renderQuestionList();
    });
  }
  if (btnCloseManager && modalManager) {
    btnCloseManager.addEventListener('click', () => {
      modalManager.classList.add('hidden');
    });
  }

  function renderQuestionList() {
    const listContainer = document.getElementById('managerQuestionList');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    const active = StorageManager.getActiveLesson();
    active.questions.forEach((q, idx) => {
      const item = document.createElement('div');
      item.style.cssText = 'background: rgba(5,46,22,0.7); border: 1px solid rgba(52,211,153,0.3); border-radius: 6px; padding: 10px; margin-bottom: 8px;';
      item.innerHTML = `
        <div style="font-weight: 700; color: #34d399; margin-bottom: 4px;">Câu ${idx + 1}: ${q.question}</div>
        <div style="font-size: 0.8rem; color: #cbd5e1;">Đáp án đúng: <b>${['A','B','C','D'][q.correctAnswer]}</b> (${q.options[q.correctAnswer]})</div>
      `;
      listContainer.appendChild(item);
    });
  }
});
