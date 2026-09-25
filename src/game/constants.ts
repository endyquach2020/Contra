export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 450;
export const LEVEL_LENGTH = 3600; // Stage length in pixels

export const GRAVITY = 0.42;
export const PLAYER_SPEED = 2.5;
export const PLAYER_JUMP_FORCE = -9.2;
export const WATER_Y = 405; // Y level of water

export const WEAPON_NAMES: Record<string, string> = {
  R: 'SÚNG TIÊU CHUẨN',
  M: 'ĐẠN LIÊN THANH (M)',
  S: 'ĐẠN TỎA SPREAD GUN (S)',
  L: 'TIA LASER XUYÊN PHÁ (L)',
  B: 'KHIÊN BẢO VỆ (B)',
  F: 'ĐẠN CẦU LỬA (F)'
};

// NES Contra color palette
export const NES_PALETTE = {
  bgDark: '#080810',
  skyBlue: '#3cbcfc',
  jungleGreen: '#00a800',
  jungleDarkGreen: '#006800',
  soilBrown: '#a81000',
  soilDarkBrown: '#680000',
  rockGrey: '#7c7c7c',
  rockDark: '#444444',
  waterCyan: '#008888',
  waterDeepBlue: '#004088',
  waterHighlight: '#68fcfc',
  bridgeGrey: '#949494',
  bridgeRed: '#b81c00',
  playerPants: '#0058f8',
  playerSkin: '#fc9838',
  playerHeadband: '#ffffff',
  enemyRed: '#f83800',
  bulletNormal: '#ffffff',
  bulletSpread: '#f85800',
  bulletLaser: '#00e8d8',
  gold: '#f8b800',
  hudRed: '#e52521'
};
