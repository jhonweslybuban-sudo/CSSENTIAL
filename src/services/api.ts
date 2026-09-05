import { Student, Session, ActivityAttempt, QuizResult, GameResult, LessonView, StudentProfile, ResearcherStats } from '../types';

export const api = {
  getSavedStudent(): StudentProfile | null {
    try {
      const data = localStorage.getItem('cssential_student');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveStudent(student: StudentProfile): void {
    try {
      localStorage.setItem('cssential_student', JSON.stringify(student));
    } catch {
      // Ignore
    }
  },

  async registerStudent(name: string, year_section: string = '3rd-Year BTLED-ICT'): Promise<StudentProfile> {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, year_section })
      });
      if (!res.ok) throw new Error('Failed to register student');
      const data = await res.json();
      const profile: StudentProfile = {
        student_id: data.student_id || `std_${Date.now()}`,
        name: data.student_name || name,
        year_section,
        created_at: data.created_at || new Date().toISOString()
      };
      this.saveStudent(profile);
      return profile;
    } catch (err) {
      console.warn('Backend student registration fallback:', err);
      const fallbackStudent: StudentProfile = {
        student_id: `local_std_${Date.now()}`,
        name,
        year_section,
        created_at: new Date().toISOString()
      };
      this.saveStudent(fallbackStudent);
      return fallbackStudent;
    }
  },

  async startSession(student_id: string): Promise<Session> {
    try {
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id })
      });
      if (!res.ok) throw new Error('Failed to start session');
      const data = await res.json();
      return {
        id: data.id || data.session_id,
        session_id: data.session_id || data.id,
        student_id,
        session_start: data.session_start || new Date().toISOString(),
        total_session_time: 0
      };
    } catch (err) {
      console.warn('Backend session start fallback:', err);
      const sid = `local_sess_${Date.now()}`;
      return {
        id: sid,
        session_id: sid,
        student_id,
        session_start: new Date().toISOString(),
        total_session_time: 0
      };
    }
  },

  async createSession(student_id: string): Promise<Session> {
    return this.startSession(student_id);
  },

  async sendHeartbeat(session_id: string, duration_increment: number = 10): Promise<void> {
    try {
      await fetch('/api/sessions/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id, duration_increment })
      });
    } catch {
      // Non-blocking
    }
  },

  async recordActivityAttempt(attempt: Partial<ActivityAttempt>): Promise<ActivityAttempt> {
    try {
      const res = await fetch('/api/activity-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attempt)
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to record activity attempt:', err);
      return attempt as ActivityAttempt;
    }
  },

  async recordQuizResult(result: Partial<QuizResult>): Promise<QuizResult> {
    try {
      const res = await fetch('/api/quiz-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to record quiz result:', err);
      return result as QuizResult;
    }
  },

  async recordGameResult(result: Partial<GameResult>): Promise<GameResult> {
    try {
      const res = await fetch('/api/game-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to record game result:', err);
      return result as GameResult;
    }
  },

  async recordLessonView(view: Partial<LessonView>): Promise<LessonView> {
    try {
      const res = await fetch('/api/lesson-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(view)
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to record lesson view:', err);
      return view as LessonView;
    }
  },

  async recordDownload(data: { student_id: string; session_id: string; resource_name: string; file_type: string }): Promise<void> {
    try {
      await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch {
      // Fallback
    }
  },

  async logAction(student_id: string, session_id: string, action_text: string): Promise<void> {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id, session_id, action_text })
      });
    } catch {
      // Silent
    }
  },

  async trackAIUsage(student_id: string, session_id: string, current_page: string, activity_game?: string, question?: string): Promise<void> {
    try {
      await fetch('/api/ai-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id, session_id, current_page, activity_game, question })
      });
    } catch {
      // Silent
    }
  },

  async askAI(message: string, currentContext: string = '', history: any[] = [], currentPage: string = 'dashboard'): Promise<{ reply: string; source: string }> {
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, currentPage, currentContext })
      });
      if (!res.ok) throw new Error('AI service response error');
      return await res.json();
    } catch (err) {
      console.warn('AI call network fallback:', err);
      return {
        reply: 'The AI Assistant is currently communicating in offline mode. You can ask any question regarding Computer System Installation, Configuration, Troubleshooting, or navigating CSSENTIAL!',
        source: 'client-fallback'
      };
    }
  },

  async getResearcherOverview() {
    const res = await fetch('/api/researcher/overview');
    return await res.json();
  },

  async getResearcherRecords() {
    const res = await fetch('/api/researcher/records');
    return await res.json();
  },

  async getResearcherStats(): Promise<ResearcherStats> {
    try {
      const records = await this.getResearcherRecords();
      const students = records.students || [];
      const activityAttempts = records.activity_attempts || [];
      const quizResults = records.quiz_results || [];
      const gameResults = records.game_results || [];
      const sessions = records.sessions || [];
      const downloads = records.downloads || [];

      const avgActScore = activityAttempts.length
        ? Math.round(activityAttempts.reduce((acc: number, cur: any) => acc + (cur.percentage || 0), 0) / activityAttempts.length)
        : 0;

      const avgQuizScore = quizResults.length
        ? Math.round(quizResults.reduce((acc: number, cur: any) => acc + (cur.percentage || 0), 0) / quizResults.length)
        : 0;

      return {
        totalStudents: students.length,
        totalSessions: sessions.length,
        averageActivityScore: avgActScore,
        averageQuizScore: avgQuizScore,
        totalGameResults: gameResults.length,
        totalDownloads: downloads.length,
        students: students.map((s: any) => ({
          student_id: s.student_id,
          name: s.student_name || s.name,
          year_section: s.year_section || '3rd-Year BTLED-ICT',
          created_at: s.created_at
        })),
        activityAttempts: activityAttempts.map((a: any) => ({
          ...a,
          id: a.id || a.attempt_id
        })),
        quizResults: quizResults.map((q: any) => ({
          ...q,
          id: q.id || q.quiz_id
        })),
        gameResults: gameResults.map((g: any) => ({
          ...g,
          id: g.id || g.game_result_id
        })),
        downloads
      };
    } catch (err) {
      console.warn('Failed to load researcher records:', err);
      return {
        totalStudents: 0,
        totalSessions: 0,
        averageActivityScore: 0,
        averageQuizScore: 0,
        totalGameResults: 0,
        totalDownloads: 0,
        students: [],
        activityAttempts: [],
        quizResults: [],
        gameResults: []
      };
    }
  },

  async getStudentPerformance(student_id: string) {
    const res = await fetch(`/api/researcher/students/${student_id}`);
    return await res.json();
  },

  async getResearcherAnalytics() {
    const res = await fetch('/api/researcher/analytics');
    return await res.json();
  }
};

