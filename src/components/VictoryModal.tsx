import React from 'react';
import { RotateCcw, Home, Award, BookOpen } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  medals: number;
  totalGates: number;
  enemiesDefeated: number;
  onRestart: () => void;
  onSelectLesson: () => void;
  onReturnHome: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  medals,
  totalGates,
  enemiesDefeated,
  onRestart,
  onSelectLesson,
  onReturnHome
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-linear-to-b from-[#0f241a] to-[#08140e] border-2 border-emerald-500/50 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col items-center">
        
        {/* Golden Trophy Icon */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/25 rounded-full blur-2xl animate-pulse"></div>
          <span className="text-6xl sm:text-7xl drop-shadow-[0_0_25px_rgba(245,158,11,0.8)]">
            🏆
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wider mb-2 font-heading uppercase">
          CHIẾN THẮNG CHIẾN TRƯỜNG!
        </h2>

        {/* Subtitle */}
        <p className="text-neutral-200 text-sm sm:text-base font-reading mb-6">
          Chúc mừng bạn đã hoàn thành xuất sắc tất cả các cổng tri thức!
        </p>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center">
            <Award className="w-6 h-6 text-amber-400 mb-1" />
            <span className="text-xs text-neutral-400">Huy hiệu đạt được</span>
            <span className="text-xl font-extrabold text-emerald-400">{medals} / {totalGates}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center">
            <span className="text-2xl mb-1">🎯</span>
            <span className="text-xs text-neutral-400">Kẻ địch hạ gục</span>
            <span className="text-xl font-extrabold text-red-400">{enemiesDefeated}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={onRestart}
            className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            <span>CHƠI LẠI BÀI NÀY</span>
          </button>
          
          <button
            onClick={onSelectLesson}
            className="w-full py-2.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-5 h-5" />
            <span>CHỌN BÀI HỌC KHÁC</span>
          </button>

          <button
            onClick={onReturnHome}
            className="w-full py-2.5 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>VỀ KHO GAME</span>
          </button>
        </div>

      </div>
    </div>
  );
};
