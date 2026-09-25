export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation?: string;
  category?: string;
  difficulty?: 'Dễ' | 'Trung bình' | 'Khó';
}

export interface Lesson {
  id: string;
  topic: string; // 'Toán học' | 'Tự nhiên & Khoa học' | 'Xã hội & Lịch sử' | 'Tiếng Việt' | 'Tiếng Anh' | 'Kỹ năng sống & Đố mẹo' | string
  subject?: string; // subcategory or legacy alias
  title: string;
  description?: string;
  icon?: string;
  badge?: string;
  grade?: number; // optional legacy support
  questions: Question[];
}

export type WeaponType = 'RIFLE' | 'SPREAD' | 'LASER' | 'MACHINE' | 'FIRE';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  showTouchControls: boolean;
}

export interface PlayerStats {
  hearts: number; // 0 to 5
  maxHearts: number;
  medals: number;
  currentGate: number;
  totalGates: number;
  enemiesDefeated: number;
  weapon: WeaponType;
  spreadTimer: number; // seconds remaining of special weapon
  weaponName?: string;
  mushroomTimer?: number; // seconds remaining of super mushroom power
  isGiant?: boolean;
}
