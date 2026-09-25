import React, { useState } from 'react';

interface TouchControlsProps {
  onInput?: (key: string, pressed: boolean) => void;
  onKeyDown?: (key: string) => void;
  onKeyUp?: (key: string) => void;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onInput,
  onKeyDown,
  onKeyUp
}) => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const handlePress = (key: string) => {
    setActiveKeys(prev => new Set(prev).add(key));
    onInput?.(key, true);
    onKeyDown?.(key);
  };

  const handleRelease = (key: string) => {
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
    onInput?.(key, false);
    onKeyUp?.(key);
  };

  const createTouchHandler = (key: string) => ({
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      handlePress(key);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      handleRelease(key);
    },
    onMouseDown: () => handlePress(key),
    onMouseUp: () => handleRelease(key),
    onMouseLeave: () => handleRelease(key)
  });

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 bg-black/40 rounded-2xl border border-neutral-800 backdrop-blur-xs select-none">
      
      {/* D-Pad */}
      <div className="flex items-center gap-1.5">
        <button
          {...createTouchHandler('ArrowLeft')}
          className="w-13 h-13 rounded-xl bg-neutral-800 active:bg-emerald-700 text-white font-black text-lg flex items-center justify-center border border-neutral-700 shadow-md active:scale-95 transition-transform"
        >
          ◀
        </button>
        <button
          {...createTouchHandler('ArrowRight')}
          className="w-13 h-13 rounded-xl bg-neutral-800 active:bg-emerald-700 text-white font-black text-lg flex items-center justify-center border border-neutral-700 shadow-md active:scale-95 transition-transform"
        >
          ▶
        </button>
      </div>

      {/* Action Buttons: Jump & Shoot */}
      <div className="flex items-center gap-3">
        {/* Shoot Button */}
        <div className="flex flex-col items-center">
          <button
            {...createTouchHandler('KeyB')}
            className="w-14 h-14 rounded-full bg-red-600 active:bg-red-700 text-white font-black text-lg flex items-center justify-center shadow-lg border-2 border-red-400 active:scale-95 transition-transform"
          >
            B
          </button>
          <span className="text-[10px] text-neutral-400 font-bold mt-1">BẮN (GIỮ)</span>
        </div>

        {/* Jump Button */}
        <div className="flex flex-col items-center">
          <button
            {...createTouchHandler('Space')}
            className="w-14 h-14 rounded-full bg-emerald-600 active:bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow-lg border-2 border-emerald-400 active:scale-95 transition-transform"
          >
            A
          </button>
          <span className="text-[10px] text-neutral-400 font-bold mt-1">NHẢY</span>
        </div>
      </div>

    </div>
  );
};
