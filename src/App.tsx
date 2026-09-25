import { useState, useEffect } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { ContraGame } from './components/ContraGame';
import { QuestionManager } from './components/QuestionManager';
import { QuestionStore } from './quiz/questionStore';
import { Lesson } from './types';

export default function App() {
  const [view, setView] = useState<'title' | 'game'>('title');
  const [lessons, setLessons] = useState<Lesson[]>(QuestionStore.getLessons());
  const [activeLesson, setActiveLesson] = useState<Lesson>(QuestionStore.getActiveLesson());
  const [showQuestionManager, setShowQuestionManager] = useState<boolean>(false);

  const handleLessonsUpdated = () => {
    const updated = QuestionStore.getLessons();
    setLessons(updated);
    const active = QuestionStore.getActiveLesson();
    setActiveLesson(active);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    QuestionStore.setActiveLessonId(lesson.id);
  };

  const handleStartGame = () => {
    setView('game');
  };

  const handleBackToHub = () => {
    setView('title');
  };

  return (
    <div className="w-full min-h-screen bg-[#07130e] text-white">
      {view === 'title' ? (
        <TitleScreen
          lessons={lessons}
          activeLesson={activeLesson}
          onSelectLesson={handleSelectLesson}
          onStartGame={handleStartGame}
          onOpenQuestionManager={() => setShowQuestionManager(true)}
        />
      ) : (
        <ContraGame
          lesson={activeLesson}
          onBackToHub={handleBackToHub}
          onOpenQuestionManager={() => setShowQuestionManager(true)}
        />
      )}

      {/* Question Bank Manager Modal (CRUD) */}
      <QuestionManager
        isOpen={showQuestionManager}
        onClose={() => setShowQuestionManager(false)}
        onLessonsUpdated={handleLessonsUpdated}
      />
    </div>
  );
}
