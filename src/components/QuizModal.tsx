import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { Award, Zap, ShieldAlert, Cpu, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { sounds } from '../game/sound';

interface QuizModalProps {
  isOpen: boolean;
  gateNumber: number;
  question: Question;
  hearts: number;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  gateNumber,
  question,
  hearts,
  onAnswer
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const selectedIndexRef = useRef<number | null>(null);
  selectedIndexRef.current = selectedIndex;

  const isAnsweredRef = useRef<boolean>(false);
  isAnsweredRef.current = isAnswered;

  const handleConfirm = (indexToConfirm?: number) => {
    const finalIdx = indexToConfirm !== undefined ? indexToConfirm : selectedIndexRef.current;
    if (finalIdx === null || isAnsweredRef.current) return;

    const correct = finalIdx === question.correctIndex;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
    } else {
      sounds.playHit();
    }

    // Give visual celebration feedback then close modal
    setTimeout(() => {
      onAnswer(correct);
      // Reset state for next gate
      setSelectedIndex(null);
      setIsAnswered(false);
      setIsCorrect(null);
    }, 1500);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    sounds.playJump();
  };

  // Keyboard shortcut listener: Press A, B, C, D (or 1, 2, 3, 4) and Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnsweredRef.current) return;

      const key = e.key.toUpperCase();
      const code = e.code;

      let targetIndex: number | null = null;

      if (key === 'A' || code === 'KeyA' || key === '1' || code === 'Digit1') {
        targetIndex = 0;
      } else if (key === 'B' || code === 'KeyB' || key === '2' || code === 'Digit2') {
        targetIndex = 1;
      } else if (key === 'C' || code === 'KeyC' || key === '3' || code === 'Digit3') {
        targetIndex = 2;
      } else if (key === 'D' || code === 'KeyD' || key === '4' || code === 'Digit4') {
        targetIndex = 3;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        e.stopPropagation();

        // If user presses the same key again, treat it as confirmation!
        if (selectedIndexRef.current === targetIndex) {
          handleConfirm(targetIndex);
        } else {
          setSelectedIndex(targetIndex);
          sounds.playJump();
        }
        return;
      }

      // Enter or Space key to confirm currently selected answer
      if (code === 'Enter' || code === 'NumpadEnter' || code === 'Space') {
        if (selectedIndexRef.current !== null) {
          e.preventDefault();
          e.stopPropagation();
          handleConfirm(selectedIndexRef.current);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, question]);

  if (!isOpen) return null;

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200">
      
      {/* Sci-Fi Gaming Terminal Container */}
      <div className="relative w-full max-w-2xl bg-[#041018] rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.25)] border-2 border-[#00f0ff]/50 overflow-hidden text-white flex flex-col">
        
        {/* Holographic Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff] animate-pulse"></div>

        {/* Cyber Header */}
        <div className="bg-linear-to-r from-[#061e2a] via-[#092c3d] to-[#061e2a] border-b border-[#0d4a63] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/15 border border-[#00f0ff]/60 flex items-center justify-center text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              <Cpu className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm sm:text-base text-[#bef264] tracking-wider uppercase drop-shadow-[0_0_8px_rgba(190,242,100,0.5)]">
                  MẬT MÃ MỞ CỔNG #{gateNumber}
                </span>
                <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[9px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase animate-pulse">
                  SECURITY LOCK
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest block">
                GATE_OVERRIDE_PROTOCOL // LASER_BARRIER
              </span>
            </div>
          </div>

          {/* Player Hearts in Terminal */}
          <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs sm:text-sm transition-opacity ${
                  i < hearts ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 flex flex-col items-center">
          
          {/* Question Tactical HUD Box */}
          <div className="relative w-full bg-[#061a24]/90 rounded-2xl border-2 border-[#00e5ff]/30 p-4 sm:p-5 mb-5 shadow-inner">
            <div className="absolute -top-2.5 left-4 bg-[#041018] px-2 py-0.5 border border-[#00e5ff]/40 rounded text-[9px] font-black text-[#00f0ff] tracking-widest uppercase">
              // THỬ THÁCH TRI THỨC
            </div>

            <h3 className="text-base sm:text-xl font-extrabold text-white font-heading text-center leading-relaxed drop-shadow-sm mt-1">
              {question.question}
            </h3>
          </div>

          {/* 4 Gaming Options Grid (2x2) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {question.options.map((opt, idx) => {
              const isSelected = selectedIndex === idx;
              const isActualCorrect = idx === question.correctIndex;

              let cardClasses = 'bg-[#081f2b]/80 border-2 border-[#0f4357] hover:border-[#00f0ff] hover:bg-[#0c2c3d] text-neutral-200';
              let badgeClasses = 'bg-[#0b2938] border border-[#00f0ff]/40 text-[#00f0ff]';
              let keyHintClasses = 'bg-[#061720] text-neutral-400 border border-neutral-700';

              if (isAnswered) {
                if (isActualCorrect) {
                  cardClasses = 'bg-[#063825] border-2 border-[#10b981] text-white shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-[1.02] ring-2 ring-[#10b981]';
                  badgeClasses = 'bg-[#10b981] border-white text-black font-black shadow-[0_0_10px_#10b981]';
                  keyHintClasses = 'bg-[#10b981]/20 text-[#bef264] border-[#10b981]';
                } else if (isSelected && !isActualCorrect) {
                  cardClasses = 'bg-[#3b0f15] border-2 border-[#ef4444] text-white shadow-[0_0_25px_rgba(239,68,68,0.7)] ring-2 ring-[#ef4444]';
                  badgeClasses = 'bg-[#ef4444] border-white text-white font-black';
                  keyHintClasses = 'bg-[#ef4444]/20 text-red-300 border-[#ef4444]';
                } else {
                  cardClasses = 'bg-[#06151e]/50 border-2 border-neutral-800 text-neutral-500 opacity-40';
                }
              } else if (isSelected) {
                cardClasses = 'bg-[#0b3647] border-2 border-[#00f0ff] text-white shadow-[0_0_20px_rgba(0,240,255,0.5)] scale-[1.02] ring-1 ring-[#00f0ff]';
                badgeClasses = 'bg-[#00f0ff] border-white text-black font-black shadow-[0_0_12px_#00f0ff]';
                keyHintClasses = 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff] font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`group relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer text-left font-medium active:scale-98 ${cardClasses}`}
                >
                  {/* Keycap Letter Badge */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-heading font-black text-base shrink-0 shadow-sm transition-transform group-hover:scale-105 ${badgeClasses}`}>
                    {letters[idx]}
                  </div>

                  {/* Option Content */}
                  <span className="flex-1 font-reading text-sm sm:text-base font-semibold leading-snug">
                    {opt}
                  </span>

                  {/* Hotkey Tag */}
                  {!isAnswered && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${keyHintClasses}`}>
                      Phím {letters[idx]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Reward Notification Banner upon answering */}
          {isAnswered && (
            <div className="w-full mb-4 animate-in zoom-in-95 duration-200">
              {isCorrect ? (
                <div className="bg-linear-to-r from-[#063825] to-[#0b5439] border-2 border-[#10b981] text-emerald-200 px-4 py-3 rounded-2xl font-black text-center flex items-center justify-center gap-2.5 text-base sm:text-lg shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <Award className="w-6 h-6 text-amber-300" />
                  <span className="tracking-wide">CHÍNH XÁC! CỔNG ĐÃ MỞ + SÚNG SPREAD KÍCH HOẠT!</span>
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                </div>
              ) : (
                <div className="bg-linear-to-r from-[#3b0f15] to-[#250a0e] border-2 border-red-500/80 text-red-200 px-4 py-3 rounded-2xl font-bold text-center flex items-center justify-center gap-2 text-sm sm:text-base shadow-[0_0_25px_rgba(239,68,68,0.3)]">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Chưa chính xác! Cổng laser mở để bạn tiếp tục nhiệm vụ.</span>
                </div>
              )}
            </div>
          )}

          {/* Sci-Fi Action Button: XÁC NHẬN */}
          {!isAnswered && (
            <div className="flex flex-col items-center gap-3 w-full">
              <button
                onClick={() => handleConfirm()}
                disabled={selectedIndex === null}
                className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl font-heading font-black text-base sm:text-lg tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer ${
                  selectedIndex !== null
                    ? 'bg-linear-to-r from-[#00f0ff] via-[#10b981] to-[#00f0ff] text-black shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 ring-2 ring-white'
                    : 'bg-[#061822] text-neutral-600 border border-neutral-800 cursor-not-allowed'
                }`}
              >
                <span>XÁC NHẬN MẬT MÃ</span>
                {selectedIndex !== null && (
                  <span className="text-xs bg-black text-[#bef264] px-2 py-0.5 rounded font-mono font-bold">
                    [ ENTER ↵ ]
                  </span>
                )}
              </button>

              {/* Gaming Keyboard Shortcut Strip */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400 font-mono bg-black/60 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                <span className="text-[#bef264] font-bold">🕹️ ĐIỀU KHIỂN:</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#0b2938] border border-[#00f0ff]/50 rounded text-[#00f0ff] font-bold">A</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#0b2938] border border-[#00f0ff]/50 rounded text-[#00f0ff] font-bold">B</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#0b2938] border border-[#00f0ff]/50 rounded text-[#00f0ff] font-bold">C</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#0b2938] border border-[#00f0ff]/50 rounded text-[#00f0ff] font-bold">D</kbd>
                  <span className="text-neutral-300 ml-1">Chọn đáp án</span>
                </span>
                <span className="text-neutral-600">|</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-[#10b981]/30 border border-[#10b981] rounded text-[#bef264] font-bold">Enter ↵</kbd>
                  <span className="text-neutral-300">Xác nhận</span>
                </span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
