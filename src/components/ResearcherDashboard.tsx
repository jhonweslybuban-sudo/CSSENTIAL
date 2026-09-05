import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  Award,
  Gamepad2,
  Download,
  FileSpreadsheet,
  RefreshCw,
  Search,
  CheckCircle2,
  Trash2,
  BarChart3
} from 'lucide-react';
import { api } from '../services/api';
import { ResearcherStats } from '../types';

interface ResearcherDashboardProps {
  onBackToHome: () => void;
}

export const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({
  onBackToHome
}) => {
  const [stats, setStats] = useState<ResearcherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'STUDENTS' | 'ACTIVITIES' | 'QUIZZES' | 'GAMES'>('OVERVIEW');
  const [searchFilter, setSearchFilter] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getResearcherStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load researcher stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExportCSV = () => {
    if (!stats) return;

    let csvContent = 'data:text/csv;charset=utf-8,';

    // Section 1: Students
    csvContent += 'STUDENTS REGISTERED\n';
    csvContent += 'Student ID,Full Name,Year & Section,Registration Date\n';
    stats.students.forEach(s => {
      csvContent += `"${s.student_id}","${s.name}","${s.year_section}","${s.created_at}"\n`;
    });

    // Section 2: Activity Attempts
    csvContent += '\nACTIVITY ATTEMPTS\n';
    csvContent += 'Student ID,Student Name,Activity Name,Type,Score,Total Items,Percentage,Duration (Seconds),Date\n';
    stats.activityAttempts.forEach(a => {
      const student = stats.students.find(s => s.student_id === a.student_id);
      csvContent += `"${a.student_id}","${student?.name || 'Unknown'}","${a.activity_name}","${a.activity_type}",${a.score},${a.total_items},${a.percentage}%,${a.duration_seconds},"${a.end_time}"\n`;
    });

    // Section 3: Quiz Results
    csvContent += '\nQUIZ RESULTS\n';
    csvContent += 'Student ID,Student Name,Quiz Name,Score,Total,Percentage,Duration (Seconds),Date\n';
    stats.quizResults.forEach(q => {
      const student = stats.students.find(s => s.student_id === q.student_id);
      csvContent += `"${q.student_id}","${student?.name || 'Unknown'}","${q.quiz_name}",${q.score},${q.total_questions},${q.percentage}%,${q.duration_seconds},"${q.end_time}"\n`;
    });

    // Section 4: Game Results
    csvContent += '\nGAME RESULTS\n';
    csvContent += 'Student ID,Student Name,Game Name,Score,Level,Duration (Seconds),Date\n';
    stats.gameResults.forEach(g => {
      const student = stats.students.find(s => s.student_id === g.student_id);
      csvContent += `"${g.student_id}","${student?.name || 'Unknown'}","${g.game_name}",${g.score},${g.level},${g.duration_seconds},"${g.end_time}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CSSENTIAL_Research_Data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
        <div>
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
            RESEARCH DATA &amp; TELEMETRY DASHBOARD
          </span>
          <h2 className="text-2xl font-black text-gray-900">
            Empirical Intervention Analytics
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Observing 3rd-Year BTLED-ICT student interaction, intervention engagement, scores, and completion telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={!stats}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>EXPORT CSV FOR THESIS</span>
          </button>
        </div>
      </div>

      {/* 6 Key Telemetry Metric Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-blue-600 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.totalStudents}</div>
            <div className="text-xs font-semibold text-gray-500">Students</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-indigo-600 mb-1">
              <Clock className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase text-gray-400">Live</span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.totalSessions}</div>
            <div className="text-xs font-semibold text-gray-500">Sessions</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-purple-600 mb-1">
              <Award className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase text-gray-400">Average</span>
            </div>
            <div className="text-2xl font-black text-gray-900">
              {stats.averageActivityScore}%
            </div>
            <div className="text-xs font-semibold text-gray-500">Activity Score</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-rose-600 mb-1">
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase text-gray-400">Average</span>
            </div>
            <div className="text-2xl font-black text-gray-900">
              {stats.averageQuizScore}%
            </div>
            <div className="text-xs font-semibold text-gray-500">Quiz Score</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-emerald-600 mb-1">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase text-gray-400">Plays</span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.totalGameResults}</div>
            <div className="text-xs font-semibold text-gray-500">Game Rounds</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-cyan-600 mb-1">
              <Download className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.totalDownloads}</div>
            <div className="text-xs font-semibold text-gray-500">Handout Downloads</div>
          </div>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {(['OVERVIEW', 'STUDENTS', 'ACTIVITIES', 'QUIZZES', 'GAMES'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {stats && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'OVERVIEW' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  Research Summary &amp; Intervention Assessment
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  The CSSENTIAL platform measures how multi-intervention scaffolding (demonstrations, interactive exercises, games, and AI) impacts 3rd-Year BTLED-ICT students&apos; mastery of Computer System Installation and Configuration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-blue-700 tracking-wider">
                    Recent Activity Submissions
                  </h4>
                  <div className="divide-y divide-gray-100">
                    {stats.activityAttempts.slice(-5).reverse().map((a, i) => (
                      <div key={i} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-gray-800">{a.activity_name}</div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {new Date(a.end_time).toLocaleDateString()} • {a.duration_seconds}s
                          </div>
                        </div>
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {a.percentage}%
                        </span>
                      </div>
                    ))}
                    {stats.activityAttempts.length === 0 && (
                      <div className="py-4 text-center text-xs text-gray-400">
                        No activity attempts recorded yet.
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                    Recent Quiz Submissions
                  </h4>
                  <div className="divide-y divide-gray-100">
                    {stats.quizResults.slice(-5).reverse().map((q, i) => (
                      <div key={i} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-gray-800">{q.quiz_name}</div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {new Date(q.end_time).toLocaleDateString()}
                          </div>
                        </div>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {q.score} / {q.total_questions} ({q.percentage}%)
                        </span>
                      </div>
                    ))}
                    {stats.quizResults.length === 0 && (
                      <div className="py-4 text-center text-xs text-gray-400">
                        No quiz attempts recorded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'STUDENTS' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4">Student ID</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Year &amp; Section</th>
                    <th className="py-3 px-4">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.students.map((student) => (
                    <tr key={student.student_id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">
                        {student.student_id}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {student.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.year_section}
                      </td>
                      <td className="py-3 px-4 text-gray-400 font-mono">
                        {new Date(student.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {stats.students.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400">
                        No students registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ACTIVITIES TAB */}
          {activeTab === 'ACTIVITIES' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4">Activity Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Percentage</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Completed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.activityAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {attempt.activity_name}
                      </td>
                      <td className="py-3 px-4 text-blue-700 font-medium">
                        {attempt.activity_type}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {attempt.score} / {attempt.total_items}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {attempt.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-600">
                        {attempt.duration_seconds}s
                      </td>
                      <td className="py-3 px-4 text-gray-400 font-mono">
                        {new Date(attempt.end_time).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {stats.activityAttempts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-400">
                        No activity attempts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* QUIZZES TAB */}
          {activeTab === 'QUIZZES' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4">Quiz Name</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Percentage</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.quizResults.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {q.quiz_name}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold">
                        {q.score} / {q.total_questions}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {q.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-600">
                        {q.duration_seconds}s
                      </td>
                      <td className="py-3 px-4 text-gray-400 font-mono">
                        {new Date(q.end_time).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {stats.quizResults.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">
                        No quiz results recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* GAMES TAB */}
          {activeTab === 'GAMES' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4">Game Name</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.gameResults.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {g.game_name}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-purple-700">
                        {g.score} pts
                      </td>
                      <td className="py-3 px-4 font-mono">
                        Level {g.level}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-600">
                        {g.duration_seconds}s
                      </td>
                      <td className="py-3 px-4 text-gray-400 font-mono">
                        {new Date(g.end_time).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {stats.gameResults.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">
                        No game sessions recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
