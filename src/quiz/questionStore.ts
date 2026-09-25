import { Lesson, Question } from '../types';
import { DEFAULT_LESSONS } from './defaultQuestions';

const LESSONS_STORAGE_KEY = 'contra_quiz_lessons_v3_topics';
const ACTIVE_LESSON_KEY = 'contra_quiz_active_lesson_id_v3';

export class QuestionStore {
  public static getLessons(): Lesson[] {
    try {
      const data = localStorage.getItem(LESSONS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all have topic
          return parsed.map((l: Lesson) => ({
            ...l,
            topic: l.topic || l.subject || 'Tự nhiên & Khoa học'
          }));
        }
      }
    } catch (e) {
      console.error('Failed to load lessons from storage', e);
    }
    // Initialize defaults
    QuestionStore.saveLessons(DEFAULT_LESSONS);
    return DEFAULT_LESSONS;
  }

  public static saveLessons(lessons: Lesson[]): void {
    try {
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessons));
    } catch (e) {
      console.error('Failed to save lessons', e);
    }
  }

  public static getActiveLessonId(): string {
    return localStorage.getItem(ACTIVE_LESSON_KEY) || DEFAULT_LESSONS[0].id;
  }

  public static setActiveLessonId(id: string): void {
    localStorage.setItem(ACTIVE_LESSON_KEY, id);
  }

  public static getActiveLesson(): Lesson {
    const lessons = QuestionStore.getLessons();
    const activeId = QuestionStore.getActiveLessonId();
    return lessons.find(l => l.id === activeId) || lessons[0];
  }

  public static addLesson(lesson: Omit<Lesson, 'id'>): Lesson {
    const lessons = QuestionStore.getLessons();
    const newLesson: Lesson = {
      ...lesson,
      id: 'lesson_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    };
    lessons.push(newLesson);
    QuestionStore.saveLessons(lessons);
    return newLesson;
  }

  public static updateLesson(updated: Lesson): void {
    const lessons = QuestionStore.getLessons().map(l => (l.id === updated.id ? updated : l));
    QuestionStore.saveLessons(lessons);
  }

  public static deleteLesson(id: string): void {
    let lessons = QuestionStore.getLessons().filter(l => l.id !== id);
    if (lessons.length === 0) {
      lessons = [...DEFAULT_LESSONS];
    }
    QuestionStore.saveLessons(lessons);
  }

  public static addQuestionToLesson(lessonId: string, question: Omit<Question, 'id'>): Question {
    const lessons = QuestionStore.getLessons();
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) throw new Error('Lesson not found');

    const newQ: Question = {
      ...question,
      id: 'q_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)
    };
    lesson.questions.push(newQ);
    QuestionStore.saveLessons(lessons);
    return newQ;
  }

  public static updateQuestionInLesson(lessonId: string, question: Question): void {
    const lessons = QuestionStore.getLessons();
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    lesson.questions = lesson.questions.map(q => (q.id === question.id ? question : q));
    QuestionStore.saveLessons(lessons);
  }

  public static deleteQuestionFromLesson(lessonId: string, questionId: string): void {
    const lessons = QuestionStore.getLessons();
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    lesson.questions = lesson.questions.filter(q => q.id !== questionId);
    QuestionStore.saveLessons(lessons);
  }

  public static resetToDefaults(): Lesson[] {
    QuestionStore.saveLessons(DEFAULT_LESSONS);
    QuestionStore.setActiveLessonId(DEFAULT_LESSONS[0].id);
    return DEFAULT_LESSONS;
  }
}
