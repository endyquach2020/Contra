import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from '../game/engine';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../game/constants';
import { QuizModal } from './QuizModal';
import { GameOverModal } from './GameOverModal';
import { VictoryModal } from './VictoryModal';
import { TouchControls } from './TouchControls';
import { Lesson, Question, PlayerStats } from '../types';
import { Volume2, VolumeX, X, Zap } from 'lucide-react';
import { sounds } from '../game/sound';

interface ContraGameProps {
  lesson: Lesson;
  onBackToHub: () => void;
  onOpenQuestionManager: () => void;
}

export const ContraGame: React.FC<ContraGameProps> = ({
  lesson,
  onBackToHub,
  onOpenQuestionManager
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'quiz' | 'victory' | 'gameover'>('playing');
  const [quizContext, setQuizContext] = useState<{
    gateNumber: number;
    question: Question;
    gateId: string;
  } | null>(null);

  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    hearts: 5,
    maxHearts: 5,
    medals: 0,
    currentGate: 1,
    totalGates: lesson.questions.length,
    enemiesDefeated: 0,
    weapon: 'RIFLE',
    spreadTimer: 0
  });

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Check touch capability
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Initialize engine
  useEffect(() => {
    const engine = new GameEngine(lesson);
    engineRef.current = engine;

    engine.onStateChange = (newState) => {
      setGameState(newState);
    };

    engine.onOpenQuiz = (ctx) => {
      setQuizContext(ctx);
    };

    engine.onStatsChange = (stats) => {
      setPlayerStats({ ...stats });
    };

    return () => {
      engine.onStateChange = undefined;
      engine.onOpenQuiz = undefined;
      engine.onStatsChange = undefined;
    };
  }, [lesson]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      keysRef.current[e.code] = true;
      keysRef.current[e.key] = true;

      // Pause toggle
      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (engineRef.current && (gameState === 'playing' || gameState === 'paused')) {
          const nextState = gameState === 'playing' ? 'paused' : 'playing';
          engineRef.current.state = nextState;
          setGameState(nextState);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Audio background toggle
  useEffect(() => {
    sounds.setEnabled(soundEnabled);
    if (soundEnabled && gameState === 'playing') {
      sounds.startBgm();
    } else {
      sounds.stopBgm();
    }
  }, [soundEnabled, gameState]);

  // Game Animation Loop (Fixed 60 FPS Timestep)
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let lastTime = performance.now();
    let accumulator = 0;
    const FIXED_STEP = 1000 / 60; // 16.67ms

    const loop = (currentTime: number) => {
      const delta = Math.min(currentTime - lastTime, 100);
      lastTime = currentTime;
      accumulator += delta;

      const engine = engineRef.current;
      if (engine) {
        while (accumulator >= FIXED_STEP) {
          if (engine.state === 'playing') {
            engine.update(keysRef.current);
          }
          accumulator -= FIXED_STEP;
        }

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        engine.render(ctx);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Answer Quiz callback
  const handleAnswerQuiz = useCallback((isCorrect: boolean) => {
    if (engineRef.current) {
      engineRef.current.handleQuizResult(isCorrect);
    }
    setQuizContext(null);
  }, []);

  // Restart game
  const handleRestart = () => {
    if (engineRef.current) {
      engineRef.current.resetGame();
      setGameState('playing');
    }
  };

  const handleTouchInput = (key: string, pressed: boolean) => {
    keysRef.current[key] = pressed;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#07130e] text-white select-none">
      
      {/* Topmost tiny title label */}
      <div className="w-full bg-[#03151e] text-center py-0.5 border-b border-[#0a2e3d]">
        <span className="text-[10px] tracking-widest font-extrabold text-amber-400 uppercase">
          CHIẾN TRƯỜNG TRI THỨC
        </span>
      </div>

      {/* 1. TOP HEADER BAR (Matching user image 100%) */}
      <header className="w-full bg-[#051c27] border-b border-[#0e4359] px-3 sm:px-6 py-2 flex items-center justify-between gap-3 shadow-md">
        
        {/* Left: Red Circular Close button & CONTRA Logo with Audio */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onBackToHub}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ef4444] hover:bg-red-600 flex items-center justify-center text-white cursor-pointer shadow-md border border-red-300/40 transition-transform active:scale-90 shrink-0"
            title="Rời khỏi"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-xl sm:text-2xl tracking-wider text-[#bef264] drop-shadow-[0_0_10px_rgba(190,242,100,0.4)]">
              CONTRA
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                soundEnabled ? 'text-[#bef264] hover:text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Stats: Mushroom, Weapon, 5 Hearts, Skull Counter, Gate Progress */}
        <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
          {/* Mushroom Giant Status (if active) */}
          {playerStats.isGiant && (
            <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400 text-amber-300 font-black text-xs sm:text-sm animate-pulse tracking-wide">
              <span>🍄</span>
              <span>SIÊU NẤM ({playerStats.mushroomTimer}s)</span>
            </div>
          )}

          {/* Weapon Status */}
          <div className="flex items-center gap-1 font-black text-xs sm:text-sm tracking-wider uppercase">
            <Zap className={`w-4 h-4 ${
              playerStats.weapon === 'MACHINE' ? 'text-cyan-400 fill-cyan-400' :
              playerStats.weapon === 'LASER' ? 'text-fuchsia-400 fill-fuchsia-400' :
              playerStats.weapon === 'FIRE' ? 'text-orange-400 fill-orange-400' :
              playerStats.weapon === 'SPREAD' ? 'text-amber-400 fill-amber-400' :
              'text-emerald-400 fill-emerald-400'
            }`} />
            <span className={
              playerStats.weapon === 'MACHINE' ? 'text-cyan-400' :
              playerStats.weapon === 'LASER' ? 'text-fuchsia-400' :
              playerStats.weapon === 'FIRE' ? 'text-orange-400' :
              playerStats.weapon === 'SPREAD' ? 'text-amber-400' :
              'text-emerald-400'
            }>
              {playerStats.weapon === 'SPREAD' ? `SPREAD (${playerStats.spreadTimer}s)` :
               playerStats.weapon === 'MACHINE' ? `MACHINE (${playerStats.spreadTimer}s)` :
               playerStats.weapon === 'LASER' ? `LASER (${playerStats.spreadTimer}s)` :
               playerStats.weapon === 'FIRE' ? `FIRE (${playerStats.spreadTimer}s)` :
               'RIFLE'}
            </span>
          </div>

          {/* Hearts (Matches red vs lost heart in screenshot) */}
          <div className="flex items-center gap-0.5 text-sm sm:text-base">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`transition-opacity ${
                  i < playerStats.hearts ? 'opacity-100' : 'opacity-25 grayscale'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>

          {/* Skull icon with reserve lives */}
          <div className="flex items-center gap-1 text-white font-extrabold text-sm sm:text-base">
            <span className="text-base">💀</span>
            <span>{playerStats.hearts}</span>
          </div>

          {/* Gate counter: 🎯 x 04/10 */}
          <div className="flex items-center gap-1 text-[#bef264] font-black text-sm sm:text-base tracking-wide">
            <span className="text-base">🎯</span>
            <span>
              x {String(playerStats.currentGate).padStart(2, '0')}/{String(playerStats.totalGates).padStart(2, '0')}
            </span>
          </div>
        </div>

      </header>

      {/* 2. SUB-HEADER INSTRUCTION STRIP */}
      <div className="w-full bg-[#05202d] border-y border-[#0d4a65] px-3 sm:px-6 py-1.5 flex items-center overflow-x-auto whitespace-nowrap text-xs gap-2.5 sm:gap-3 shadow-inner">
        {/* HƯỚNG DẪN: */}
        <span className="text-[#a3e635] font-black text-xs tracking-wider shrink-0">
          HƯỚNG DẪN:
        </span>

        {/* [←] [→] Di chuyển */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 bg-linear-to-b from-white to-[#d1d5db] text-neutral-900 font-extrabold text-[11px] rounded shadow-[0_2px_0_#9ca3af] border border-white/80">
            ←
          </span>
          <span className="inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 bg-linear-to-b from-white to-[#d1d5db] text-neutral-900 font-extrabold text-[11px] rounded shadow-[0_2px_0_#9ca3af] border border-white/80">
            →
          </span>
          <span className="text-white font-semibold text-xs ml-0.5">Di chuyển</span>
        </div>

        {/* Dot */}
        <span className="text-neutral-500 font-bold shrink-0">·</span>

        {/* [↑] hoặc [Space] Nhảy */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 bg-linear-to-b from-white to-[#d1d5db] text-neutral-900 font-extrabold text-[11px] rounded shadow-[0_2px_0_#9ca3af] border border-white/80">
            ↑
          </span>
          <span className="text-neutral-300 font-medium text-xs px-0.5">hoặc</span>
          <span className="inline-flex items-center justify-center px-2 py-0.5 bg-linear-to-b from-white to-[#d1d5db] text-neutral-900 font-extrabold text-[11px] rounded shadow-[0_2px_0_#9ca3af] border border-white/80">
            Space
          </span>
          <span className="text-white font-semibold text-xs ml-0.5">Nhảy</span>
        </div>

        {/* Dot */}
        <span className="text-neutral-500 font-bold shrink-0">·</span>

        {/* [X] BẮN ĐẠN */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center justify-center min-w-[22px] px-2 py-0.5 bg-linear-to-b from-[#facc15] to-[#eab308] text-neutral-950 font-black text-[11px] rounded shadow-[0_2px_0_#ca8a04] border border-[#fef08a]">
            X
          </span>
          <span className="text-[#facc15] font-extrabold text-xs">
            BẮN ĐẠN (bắn hộp ? & drone)
          </span>
        </div>

        {/* Dot */}
        <span className="text-neutral-500 font-bold shrink-0">·</span>

        {/* Mushroom Item */}
        <div className="flex items-center gap-1 shrink-0 text-amber-300 font-bold text-xs">
          <span>🍄</span>
          <span>Ăn Nấm: Tăng Máu & Phóng To Nghiền Nát</span>
        </div>

        {/* Dot */}
        <span className="text-neutral-500 font-bold shrink-0">·</span>

        {/* Weapon Pods */}
        <div className="flex items-center gap-1 shrink-0 text-cyan-300 font-semibold text-xs">
          <span>📦</span>
          <span>Lấy Đạn: [S] Tỏa, [M] Liên thanh, [L] Laser, [F] Cầu Lửa</span>
        </div>

        {/* Dot */}
        <span className="text-neutral-500 font-bold shrink-0">·</span>

        {/* Obstacles & Hazards */}
        <div className="flex items-center gap-1 shrink-0 text-rose-300 font-medium text-xs">
          <span>⚠️</span>
          <span>Chướng ngại: Chông gai, Cưa xoay, Phun lửa, Thùng nổ TNT</span>
        </div>
      </div>

      {/* 3. GAME CANVAS CONTAINER */}
      <main className="relative flex-1 w-full max-w-6xl flex flex-col items-center justify-center p-2 sm:p-4">
        <div className="relative w-full aspect-16/9 max-h-[70vh] bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-emerald-900/40">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full object-contain pixelated"
          />

          {/* Pause Overlay */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-3xl font-black text-amber-400 font-heading mb-4 animate-pulse">
                TẠM DỪNG (PAUSED)
              </h2>
              <div className="flex flex-col gap-2.5 w-56">
                <button
                  onClick={() => {
                    if (engineRef.current) {
                      engineRef.current.state = 'playing';
                      setGameState('playing');
                    }
                  }}
                  className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg cursor-pointer transition-all"
                >
                  TIẾP TỤC CHƠI
                </button>
                <button
                  onClick={handleRestart}
                  className="py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg cursor-pointer transition-all"
                >
                  CHƠI LẠI
                </button>
                <button
                  onClick={onBackToHub}
                  className="py-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold rounded-lg cursor-pointer transition-all"
                >
                  VỀ KHO GAME
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Touch Controls for Tablet & Phone */}
        {isTouchDevice && (
          <div className="w-full mt-2">
            <TouchControls onInput={handleTouchInput} />
          </div>
        )}
      </main>

      {/* 4. MODALS */}
      {/* Quiz Question Modal */}
      {quizContext && (
        <QuizModal
          isOpen={gameState === 'quiz'}
          gateNumber={quizContext.gateNumber}
          question={quizContext.question}
          hearts={playerStats.hearts}
          onAnswer={handleAnswerQuiz}
        />
      )}

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={gameState === 'gameover'}
        medals={playerStats.medals}
        totalGates={playerStats.totalGates}
        enemiesDefeated={playerStats.enemiesDefeated}
        onRestart={handleRestart}
        onReturnHome={onBackToHub}
      />

      {/* Victory Modal */}
      <VictoryModal
        isOpen={gameState === 'victory'}
        medals={playerStats.medals}
        totalGates={playerStats.totalGates}
        enemiesDefeated={playerStats.enemiesDefeated}
        onRestart={handleRestart}
        onSelectLesson={onBackToHub}
        onReturnHome={onBackToHub}
      />

    </div>
  );
};
