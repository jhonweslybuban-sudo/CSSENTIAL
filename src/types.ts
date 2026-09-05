export interface StudentProfile {
  student_id: string;
  name: string;
  year_section: string;
  created_at: string;
  last_active?: string;
}

export interface Student {
  student_id: string;
  student_name: string;
  created_at: string;
  last_active: string;
}

export interface Session {
  id?: string;
  session_id: string;
  student_id: string;
  session_start: string;
  session_end?: string;
  total_session_time: number; // in seconds
}

export interface ActivityAttempt {
  id?: string;
  attempt_id?: string;
  student_id: string;
  session_id: string;
  activity_name: string;
  activity_type: string;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  score: number;
  total_items: number;
  percentage: number;
  completed: boolean;
  created_at?: string;
}

export interface QuizResult {
  id?: string;
  quiz_id?: string;
  student_id: string;
  session_id: string;
  quiz_name: string;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  score: number;
  total_questions: number;
  percentage: number;
  completed: boolean;
  created_at?: string;
}

export interface GameResult {
  id?: string;
  game_result_id?: string;
  student_id: string;
  session_id: string;
  game_name: string;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  score: number;
  level: number;
  attempts?: number;
  completed: boolean;
  created_at?: string;
  extra_stats?: Record<string, any>;
}

export interface LessonView {
  id?: string;
  view_id?: string;
  student_id: string;
  session_id: string;
  lesson_title: string;
  started_at: string;
  finished_at: string;
  duration_seconds: number;
  completed: boolean;
}

export interface DownloadRecord {
  id?: string;
  student_id: string;
  session_id: string;
  resource_name: string;
  file_type: string;
  timestamp: string;
}

export interface AIUsageRecord {
  id?: string;
  usage_id?: string;
  student_id: string;
  session_id: string;
  current_page: string;
  activity_game?: string;
  question_count: number;
  first_time: string;
  last_time: string;
  last_question?: string;
}

export interface ActivityLog {
  id?: string;
  log_id?: string;
  student_id: string;
  student_name: string;
  session_id: string;
  timestamp: string;
  action_text: string;
}

export type PageView =
  | 'HOME'
  | 'ACTIVITIES'
  | 'COLLECTION'
  | 'ABOUT_US'
  | 'GAMES_HUB'
  | 'ACTIVITY_PLAYER'
  | 'ACTIVE_GAME'
  | 'RESEARCHER_DASHBOARD';

export interface ResearcherStats {
  totalStudents: number;
  totalSessions: number;
  averageActivityScore: number;
  averageQuizScore: number;
  totalGameResults: number;
  totalDownloads: number;
  students: StudentProfile[];
  activityAttempts: ActivityAttempt[];
  quizResults: QuizResult[];
  gameResults: GameResult[];
  downloads?: DownloadRecord[];
}

export interface LessonContent {
  id: string;
  topicNumber: number;
  title: string;
  shortDesc: string;
  description?: string;
  duration?: string;
  objectives: string[];
  contentSections: {
    heading: string;
    body: string;
    keyPoints?: string[];
  }[];
  steps?: {
    step: number;
    title: string;
    details: string;
    warning?: string;
  }[];
  reminders: string[];
  troubleshootingTips: string[];
  videoUrl: string;
}
