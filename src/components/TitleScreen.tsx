import React, { useState } from 'react';
import { Lesson } from '../types';
import { Sparkles, Play, PlusCircle, Settings, Award, CheckCircle2, Gamepad2, Search, Compass, Zap, Flame, Target } from 'lucide-react';
import { TOPIC_CATEGORIES } from '../quiz/defaultQuestions';
import { sounds } from '../game/sound';

interface TitleScreenProps {
  lessons: Lesson[];
  activeLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  onStartGame: () => void;
  onOpenQuestionManager: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  lessons,
  activeLesson,
  onSelectLesson,
  onStartGame,
  onOpenQuestionManager
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract distinct topics from current lessons
  const availableTopics = Array.from(new Set(lessons.map(l => l.topic || l.subject || 'Khác')));

  // Merge with TOPIC_CATEGORIES for orderly display
  const topicTabs = [
    { id: 'all', name: 'Tất cả chủ đề', icon: '🌟', count: lessons.length },
    ...TOPIC_CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
      ...cat,
      count: lessons.filter(l => (l.topic || l.subject) === cat.name).length
    }))
  ];

  // Also include any custom topics added by user
  availableTopics.forEach(t => {
    if (!topicTabs.some(tab => tab.name === t)) {
      topicTabs.push({
        id: 'custom-' + t,
        name: t,
        icon: '📚',
        count: lessons.filter(l => (l.topic || l.subject) === t).length
      });
    }
  });

  // Filter lessons by selected topic & search query
  const filteredLessons = lessons.filter(l => {
    const topic = l.topic || l.subject || '';
    const matchesTopic = selectedTopic === 'all' || topic === selectedTopic;
    const matchesSearch =
      searchQuery.trim() === '' ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.description && l.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  const handleTopicClick = (topicName: string) => {
    sounds.playJump();
    setSelectedTopic(topicName);
  };

  const handleLessonClick = (les: Lesson) => {
    sounds.playJump();
    onSelectLesson(les);
  };

  const handleStartGameClick = () => {
    sounds.playPowerup();
    onStartGame();
  };

  return (
    <div className="min-h-screen w-full bg-[#051118] text-white flex flex-col items-center relative overflow-x-hidden">
      
      {/* Background Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Top Banner (ARENA EDU CONNECT / KHO GAME) */}
      <header className="relative w-full bg-[#071a24]/90 border-b border-[#0d4a65] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-[#00f0ff] via-[#10b981] to-[#047857] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] text-black">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-linear-to-r from-[#bef264] via-[#00f0ff] to-white tracking-wider drop-shadow-sm">
                ARENA EDU CONNECT
              </span>
              <span className="bg-[#f59e0b]/20 text-[#facc15] border border-[#f59e0b]/50 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                ⚡ ARCADE GAMING EDITION
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-reading">
              Chiến trường Contra Tri Thức · Vượt ải mở cổng Laser · Ôn tập theo chủ đề
            </p>
          </div>
        </div>

        {/* Action Button: CRUD Question Manager */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuestionManager}
            className="flex items-center gap-2 px-4 py-2 bg-[#092c3a] hover:bg-[#0c394b] border border-[#00f0ff]/40 hover:border-[#00f0ff] rounded-xl text-xs sm:text-sm font-black text-[#00f0ff] transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            <Settings className="w-4 h-4" />
            <span>QUẢN LÝ BỘ CÂU HỎI THEO CHỦ ĐỀ</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative w-full max-w-6xl p-4 sm:p-6 flex flex-col gap-6 z-10">

        {/* Topic Selection Bar */}
        <div className="bg-[#071b26]/90 border border-[#0e4861] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[#00f0ff] font-extrabold text-sm sm:text-base tracking-wider uppercase font-heading">
              <Compass className="w-5 h-5 text-[#00f0ff] animate-spin-slow" />
              <span>CHỦ ĐỀ LUYỆN TẬP TRI THỨC:</span>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#00f0ff]/70 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm chủ đề, bài học..."
                className="w-full bg-[#041119] border border-[#0d4a65] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]"
              />
            </div>
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {topicTabs.map(tab => {
              const isSelected = selectedTopic === (tab.id === 'all' ? 'all' : tab.name);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTopicClick(tab.id === 'all' ? 'all' : tab.name)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-linear-to-r from-[#00f0ff] to-[#10b981] text-black shadow-[0_0_20px_rgba(0,240,255,0.5)] ring-2 ring-white scale-[1.03]'
                      : 'bg-[#061e2b]/80 text-[#93c5fd] border border-[#0d455d] hover:bg-[#0b2b3d] hover:text-white hover:border-[#00f0ff]/60'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-black text-[#00f0ff] font-black' : 'bg-black/40 text-neutral-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid: Left: Lessons list, Right: Selected Campaign & Launch Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (2 Cols): Available Lessons for Selected Topic */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-black text-lg text-[#bef264] flex items-center gap-2 tracking-wide">
                <span>DANH SÁCH BÀI HỌC VƯỢT ẢI</span>
                {selectedTopic !== 'all' && (
                  <span className="text-[#00f0ff] text-sm font-semibold">
                    // {selectedTopic}
                  </span>
                )}
              </h2>
              <span className="text-xs text-neutral-400 font-mono">
                {filteredLessons.length} CHIẾN DỊCH
              </span>
            </div>

            {filteredLessons.length === 0 ? (
              <div className="bg-[#071b26]/70 border border-[#0d4a65] rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                <p className="text-neutral-400 text-sm mb-3 font-reading">
                  Không tìm thấy bài học nào phù hợp với bộ lọc hiện tại.
                </p>
                <button
                  onClick={onOpenQuestionManager}
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-extrabold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Tạo bài học mới cho chủ đề này</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredLessons.map(les => {
                  const isChosen = activeLesson.id === les.id;
                  const topicName = les.topic || les.subject || 'Chủ đề chung';
                  const icon = les.icon || '🎯';

                  return (
                    <div
                      key={les.id}
                      onClick={() => handleLessonClick(les)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isChosen
                          ? 'bg-[#092b3a] border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.3)] ring-1 ring-[#00f0ff] scale-[1.02]'
                          : 'bg-[#071b26]/90 border-[#0d4157] hover:border-[#00f0ff]/60 hover:bg-[#092535]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg">{icon}</span>
                            <span className="text-[10px] font-black text-[#facc15] bg-[#f59e0b]/15 border border-[#f59e0b]/40 px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {topicName}
                            </span>
                          </div>
                          
                          <h3 className="font-heading font-black text-sm sm:text-base text-white leading-snug">
                            {les.title}
                          </h3>
                          {les.description && (
                            <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed font-reading">
                              {les.description}
                            </p>
                          )}
                        </div>

                        {isChosen && (
                          <CheckCircle2 className="w-5 h-5 text-[#00f0ff] shrink-0 mt-1 animate-pulse" />
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-md font-bold text-[11px] font-mono">
                            {les.questions.length} CỔNG LASER
                          </span>
                        </div>

                        <span className={`font-black text-xs tracking-wider uppercase ${isChosen ? 'text-[#00f0ff]' : 'text-neutral-400'}`}>
                          {isChosen ? 'ĐÃ CHỌN ✓' : 'CHỌN BÀI'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Game Ready Card & Launch */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading font-black text-lg text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>CHIẾN TRƯỜNG CONTRA</span>
            </h2>

            {/* Contra Featured Gaming Terminal Card */}
            <div className="relative bg-linear-to-b from-[#092534] via-[#051722] to-[#020b10] border-2 border-[#00f0ff]/50 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,240,255,0.2)] flex flex-col items-center text-center overflow-hidden">
              
              {/* Scanline top glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#bef264] to-transparent shadow-[0_0_12px_#bef264]"></div>

              <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                HOT ARCADE
              </div>

              {/* Game Icon / Graphic */}
              <div className="w-20 h-20 rounded-2xl bg-radial from-[#00f0ff]/30 to-[#041d28] border-2 border-[#00f0ff] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-4">
                {activeLesson.icon || '🎯'}
              </div>

              <h3 className="font-heading font-black text-3xl text-transparent bg-clip-text bg-linear-to-r from-[#bef264] to-[#00f0ff] tracking-wider mb-1">
                CONTRA
              </h3>
              <p className="text-xs text-amber-400 font-black uppercase tracking-widest mb-4">
                CHIẾN TRƯỜNG TRI THỨC
              </p>

              {/* Active Lesson details */}
              <div className="w-full bg-black/60 border border-[#0d4a65] rounded-xl p-3.5 mb-6 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono font-bold">
                    CHỦ ĐỀ ĐANG CHỌN:
                  </span>
                  <span className="text-[11px] font-bold text-amber-300">
                    {activeLesson.topic || activeLesson.subject || 'Chủ đề'}
                  </span>
                </div>

                <span className="text-sm font-extrabold text-white block mt-0.5 font-heading leading-snug">
                  {activeLesson.title}
                </span>

                <div className="flex items-center gap-2 mt-2.5 text-xs text-neutral-300 flex-wrap">
                  <span className="bg-[#0b3647] border border-[#00f0ff]/40 px-2 py-0.5 rounded text-[#00f0ff] font-bold font-mono">
                    {activeLesson.questions.length} Cổng Laser
                  </span>
                  <span>· 5 Mạng</span>
                  <span className="text-amber-300 font-bold">· Súng Spread</span>
                </div>
              </div>

              {/* Launch Button */}
              <button
                onClick={handleStartGameClick}
                className="w-full py-4 bg-linear-to-r from-[#00f0ff] via-[#10b981] to-[#bef264] hover:brightness-110 text-black font-heading font-black text-lg rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.6)] flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-95 group tracking-wider uppercase ring-2 ring-white"
              >
                <Play className="w-6 h-6 fill-black group-hover:scale-110 transition-transform" />
                <span>BẮT ĐẦU CHIẾN ĐẤU</span>
              </button>

              <p className="text-[11px] text-neutral-400 mt-4 leading-relaxed font-reading">
                Vượt chướng ngại vật, tiêu diệt quân địch và giải mã cổng laser để nhận súng Spread hủy diệt!
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
