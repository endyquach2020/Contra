import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  medals: number;
  totalGates: number;
  enemiesDefeated: number;
  onRestart: () => void;
  onReturnHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  medals,
  totalGates,
  enemiesDefeated,
  onRestart,
  onReturnHome
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-linear-to-b from-[#1c0a0a] to-[#0d0404] border-2 border-red-600/40 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(220,38,38,0.25)] flex flex-col items-center">
        
        {/* Glowing Red Skull */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl animate-pulse"></div>
          <span className="text-6xl sm:text-7xl drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
            💀
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider mb-2 font-heading uppercase">
          NHIỆM VỤ THẤT BẠI
        </h2>

        {/* Subtitle */}
        <p className="text-neutral-300 text-sm sm:text-base font-reading mb-5">
          Bạn đã hết 5 mạng chiến đấu.
        </p>

        {/* Stats Pill */}
        <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-xs sm:text-sm font-semibold text-neutral-300">
          <span>Huy hiệu: <strong className="text-emerald-400">{medals}/{totalGates}</strong></span>
          <span className="mx-2 text-neutral-600">·</span>
          <span>Hạ gục: <strong className="text-red-400">{enemiesDefeated}</strong> tên địch</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onRestart}
            className="w-full sm:flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            <span>CHƠI LẠI</span>
          </button>
          <button
            onClick={onReturnHome}
            className="w-full sm:flex-1 py-3 px-5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/30 cursor-pointer active:scale-95"
          >
            <Home className="w-5 h-5" />
            <span>VỀ KHO GAME</span>
          </button>
        </div>

      </div>
    </div>
  );
};
