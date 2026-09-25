import React, { useState } from 'react';
import { Lesson, Question } from '../types';
import { QuestionStore } from '../quiz/questionStore';
import { Plus, Trash2, Edit2, Check, X, RotateCcw, BookOpen, HelpCircle, Compass, Folder } from 'lucide-react';
import { TOPIC_CATEGORIES } from '../quiz/defaultQuestions';

interface QuestionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonsUpdated: () => void;
}

const AVAILABLE_TOPICS = [
  'Tự nhiên & Khoa học',
  'Xã hội, Lịch sử & Địa lý',
  'Toán học & Tư duy logic',
  'Tiếng Việt & Ca dao',
  'Tiếng Anh (English)',
  'Kỹ năng sống & Đố mẹo',
  'Khác (Tự tạo)'
];

const SUGGESTED_ICONS = ['🌿', '🦁', '🪐', '🏛️', '🗺️', '⚔️', '🔢', '⚡', '📐', '📖', '🎋', '🔤', '💡', '🛡️', '🎯'];

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  isOpen,
  onClose,
  onLessonsUpdated
}) => {
  const [lessons, setLessons] = useState<Lesson[]>(QuestionStore.getLessons());
  const [activeLessonId, setActiveLessonId] = useState<string>(
    QuestionStore.getActiveLessonId()
  );

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  // Lesson Edit state
  const [isAddingLesson, setIsAddingLesson] = useState<boolean>(false);
  const [newLessonTopic, setNewLessonTopic] = useState<string>('Tự nhiên & Khoa học');
  const [customTopicName, setCustomTopicName] = useState<string>('');
  const [newLessonIcon, setNewLessonIcon] = useState<string>('🌿');
  const [newLessonTitle, setNewLessonTitle] = useState<string>('');

  // Sidebar filter
  const [filterTopic, setFilterTopic] = useState<string>('all');

  // Question Edit state
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState<boolean>(false);

  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOptions, setFormOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');

  if (!isOpen) return null;

  const refreshLessons = () => {
    const updated = QuestionStore.getLessons();
    setLessons(updated);
    onLessonsUpdated();
  };

  const handleSelectLesson = (id: string) => {
    setActiveLessonId(id);
    QuestionStore.setActiveLessonId(id);
    setIsCreatingQuestion(false);
    setEditingQuestionId(null);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const finalTopic = newLessonTopic === 'Khác (Tự tạo)'
      ? (customTopicName.trim() || 'Chủ đề tự tạo')
      : newLessonTopic;

    const created = QuestionStore.addLesson({
      topic: finalTopic,
      subject: finalTopic,
      icon: newLessonIcon,
      title: newLessonTitle.trim(),
      description: `Bộ câu hỏi ôn tập chủ đề ${finalTopic}`,
      questions: []
    });

    setNewLessonTitle('');
    setCustomTopicName('');
    setIsAddingLesson(false);
    refreshLessons();
    handleSelectLesson(created.id);
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (confirm('Bạn có chắc muốn xóa bài học này không?')) {
      QuestionStore.deleteLesson(lessonId);
      refreshLessons();
      const updated = QuestionStore.getLessons();
      if (updated.length > 0) {
        handleSelectLesson(updated[0].id);
      }
    }
  };

  const handleOpenCreateQuestion = () => {
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrectIndex(0);
    setFormExplanation('');
    setEditingQuestionId(null);
    setIsCreatingQuestion(true);
  };

  const handleOpenEditQuestion = (q: Question) => {
    setFormQuestion(q.question);
    setFormOptions([...q.options] as [string, string, string, string]);
    setFormCorrectIndex(q.correctIndex);
    setFormExplanation(q.explanation || '');
    setIsCreatingQuestion(false);
    setEditingQuestionId(q.id);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || formOptions.some(opt => !opt.trim())) {
      alert('Vui lòng điền câu hỏi và cả 4 phương án trả lời!');
      return;
    }

    if (isCreatingQuestion) {
      QuestionStore.addQuestionToLesson(activeLesson.id, {
        question: formQuestion.trim(),
        options: formOptions.map(o => o.trim()) as [string, string, string, string],
        correctIndex: formCorrectIndex,
        explanation: formExplanation.trim()
      });
    } else if (editingQuestionId) {
      QuestionStore.updateQuestionInLesson(activeLesson.id, {
        id: editingQuestionId,
        question: formQuestion.trim(),
        options: formOptions.map(o => o.trim()) as [string, string, string, string],
        correctIndex: formCorrectIndex,
        explanation: formExplanation.trim()
      });
    }

    setIsCreatingQuestion(false);
    setEditingQuestionId(null);
    refreshLessons();
  };

  const handleDeleteQuestion = (qId: string) => {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
      QuestionStore.deleteQuestionFromLesson(activeLesson.id, qId);
      refreshLessons();
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Khôi phục toàn bộ bài học và câu hỏi theo chủ đề về mặc định ban đầu?')) {
      QuestionStore.resetToDefaults();
      refreshLessons();
      handleSelectLesson(QuestionStore.getActiveLessonId());
    }
  };

  // Distinct topics for filtering
  const distinctTopics = Array.from(new Set(lessons.map(l => l.topic || l.subject || 'Khác')));

  const displayedLessons = filterTopic === 'all'
    ? lessons
    : lessons.filter(l => (l.topic || l.subject) === filterTopic);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-6 text-neutral-800">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading">
                HỆ THỐNG QUẢN LÝ CÂU HỎI THEO CHỦ ĐỀ
              </h2>
              <p className="text-xs text-emerald-200">
                Thêm, sửa, xóa các bộ câu hỏi và bài học luyện tập theo từng chủ đề
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-emerald-950 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left sidebar (lessons list) & Right area (questions CRUD) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar: Lessons selector */}
          <div className="w-full md:w-84 bg-neutral-50 border-r border-neutral-200 p-4 flex flex-col gap-3 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-neutral-500 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" />
                <span>BÀI HỌC THEO CHỦ ĐỀ ({lessons.length})</span>
              </span>
              <button
                onClick={() => setIsAddingLesson(true)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo bài mới</span>
              </button>
            </div>

            {/* Filter by Topic */}
            <div className="bg-white p-2 rounded-xl border border-neutral-200">
              <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                Lọc theo chủ đề:
              </label>
              <select
                value={filterTopic}
                onChange={e => setFilterTopic(e.target.value)}
                className="w-full text-xs p-1.5 border border-neutral-300 rounded bg-neutral-50 font-semibold"
              >
                <option value="all">🌟 Tất cả chủ đề ({lessons.length})</option>
                {distinctTopics.map(t => (
                  <option key={t} value={t}>
                    {t} ({lessons.filter(l => (l.topic || l.subject) === t).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Add Lesson Form Popup */}
            {isAddingLesson && (
              <form onSubmit={handleCreateLesson} className="p-3 bg-white rounded-xl border border-emerald-300 shadow-sm flex flex-col gap-2.5">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>TẠO BÀI HỌC MỚI</span>
                </span>
                
                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Chọn Chủ đề:</label>
                  <select
                    value={newLessonTopic}
                    onChange={e => setNewLessonTopic(e.target.value)}
                    className="w-full text-xs p-1.5 border border-neutral-300 rounded bg-white font-medium"
                  >
                    {AVAILABLE_TOPICS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {newLessonTopic === 'Khác (Tự tạo)' && (
                  <div>
                    <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Tên chủ đề mới:</label>
                    <input
                      type="text"
                      value={customTopicName}
                      onChange={e => setCustomTopicName(e.target.value)}
                      placeholder="VD: Lịch sử thế giới, Âm nhạc..."
                      className="w-full text-xs p-1.5 border border-neutral-300 rounded"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Biểu tượng Icon:</label>
                  <div className="flex flex-wrap gap-1 p-1.5 bg-neutral-50 rounded border border-neutral-200">
                    {SUGGESTED_ICONS.map(ic => (
                      <button
                        type="button"
                        key={ic}
                        onClick={() => setNewLessonIcon(ic)}
                        className={`w-7 h-7 text-sm rounded flex items-center justify-center transition-all cursor-pointer ${
                          newLessonIcon === ic ? 'bg-emerald-600 text-white scale-110' : 'hover:bg-neutral-200'
                        }`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">Tên bài học / Nhiệm vụ:</label>
                  <input
                    type="text"
                    value={newLessonTitle}
                    onChange={e => setNewLessonTitle(e.target.value)}
                    placeholder="VD: Động vật biển sâu, Phép tính nhân..."
                    className="w-full text-xs p-1.5 border border-neutral-300 rounded"
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end mt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingLesson(false)}
                    className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 rounded"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700"
                  >
                    Lưu bài
                  </button>
                </div>
              </form>
            )}

            {/* List of Lessons */}
            <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
              {displayedLessons.map(les => {
                const isSelected = les.id === activeLesson.id;
                const topic = les.topic || les.subject || 'Chủ đề chung';
                const icon = les.icon || '🎯';

                return (
                  <div
                    key={les.id}
                    onClick={() => handleSelectLesson(les.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-emerald-100/70 border-emerald-500 shadow-xs'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{icon}</span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded truncate max-w-[170px]">
                          {topic}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate mt-1">
                        {les.title}
                      </h4>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        {les.questions.length} câu hỏi
                      </span>
                    </div>

                    {lessons.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLesson(les.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Xóa bài học"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reset Defaults button */}
            <button
              onClick={handleResetDefaults}
              className="mt-auto pt-3 border-t border-neutral-200 flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục các chủ đề mặc định</span>
            </button>
          </div>

          {/* Right Main Area: Questions of selected lesson */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4">
            
            {/* Active Lesson Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeLesson.icon || '🎯'}</span>
                  <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    CHỦ ĐỀ: {activeLesson.topic || activeLesson.subject || 'Chủ đề chung'}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-neutral-900 mt-1">
                  {activeLesson.title}
                </h3>
              </div>

              {!isCreatingQuestion && !editingQuestionId && (
                <button
                  onClick={handleOpenCreateQuestion}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm câu hỏi mới</span>
                </button>
              )}
            </div>

            {/* Create / Edit Question Form */}
            {(isCreatingQuestion || editingQuestionId) && (
              <form onSubmit={handleSaveQuestion} className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-700" />
                    <span>{isCreatingQuestion ? 'THÊM CÂU HỎI MỚI' : 'CHỈNH SỬA CÂU HỎI'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingQuestion(false);
                      setEditingQuestionId(null);
                    }}
                    className="text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Đóng lại
                  </button>
                </div>

                {/* Question title */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Nội dung câu hỏi:
                  </label>
                  <textarea
                    value={formQuestion}
                    onChange={e => setFormQuestion(e.target.value)}
                    placeholder="VD: Động vật nào sau đây chạy nhanh nhất trên đất liền?"
                    className="w-full p-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    rows={2}
                    required
                  />
                </div>

                {/* 4 Options */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-2">
                    4 Phương án trả lời (chọn nút tròn để đánh dấu ĐÁP ÁN ĐÚNG):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['A', 'B', 'C', 'D'].map((letter, idx) => (
                      <div
                        key={letter}
                        className={`flex items-center gap-2 p-2 rounded-xl border ${
                          formCorrectIndex === idx ? 'bg-emerald-100/80 border-emerald-500' : 'bg-white border-neutral-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="correctIndexRadio"
                          checked={formCorrectIndex === idx}
                          onChange={() => setFormCorrectIndex(idx)}
                          className="w-4 h-4 text-emerald-600 cursor-pointer"
                        />
                        <span className="font-bold text-xs text-neutral-700">{letter}:</span>
                        <input
                          type="text"
                          value={formOptions[idx]}
                          onChange={e => {
                            const newOpts = [...formOptions] as [string, string, string, string];
                            newOpts[idx] = e.target.value;
                            setFormOptions(newOpts);
                          }}
                          placeholder={`Đáp án ${letter}...`}
                          className="w-full text-xs p-1.5 border border-neutral-200 rounded bg-white"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1">
                    Giải thích đáp án (tùy chọn):
                  </label>
                  <input
                    type="text"
                    value={formExplanation}
                    onChange={e => setFormExplanation(e.target.value)}
                    placeholder="VD: Báo săn (Cheetah) có thể bứt tốc lên đến 120 km/h..."
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingQuestion(false);
                      setEditingQuestionId(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-200 rounded-xl"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm"
                  >
                    Lưu câu hỏi
                  </button>
                </div>
              </form>
            )}

            {/* Questions List */}
            <div className="flex flex-col gap-2.5">
              {activeLesson.questions.length === 0 ? (
                <div className="p-8 text-center text-neutral-400 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
                  Bài học này chưa có câu hỏi nào. Bấm nút "Thêm câu hỏi mới" phía trên để tạo câu hỏi!
                </div>
              ) : (
                activeLesson.questions.map((q, qIdx) => (
                  <div
                    key={q.id}
                    className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-xs hover:border-emerald-300 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-900 leading-snug">
                            {q.question}
                          </h4>
                          {q.explanation && (
                            <p className="text-xs text-neutral-500 mt-0.5">
                              💡 {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenEditQuestion(q)}
                          className="p-1.5 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Sửa câu hỏi"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Xóa câu hỏi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Answers pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100 text-xs">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-1.5 px-2 rounded-lg truncate ${
                            optIdx === q.correctIndex
                              ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-400'
                              : 'bg-neutral-50 text-neutral-600 border border-neutral-200'
                          }`}
                        >
                          <span className="font-bold mr-1">
                            {['A', 'B', 'C', 'D'][optIdx]}:
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
