import React, { useState, useEffect } from 'react';
import { Monitor, Download, Play, FileText, CheckCircle2, Film } from 'lucide-react';
import { LESSONS_DATA } from '../data/curriculum';
import { LessonContent } from '../types';
import { LessonViewerModal } from './LessonViewerModal';
import { VideoModal } from './VideoModal';
import { api } from '../services/api';

interface CollectionViewProps {
  studentId: string;
  sessionId: string;
  initialTopicId?: string | null;
  onClearInitialTopic?: () => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  studentId,
  sessionId,
  initialTopicId,
  onClearInitialTopic
}) => {
  const [selectedLessonForPresentation, setSelectedLessonForPresentation] = useState<LessonContent | null>(null);
  const [selectedLessonForVideo, setSelectedLessonForVideo] = useState<LessonContent | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Auto-open or focus topic when navigated with initialTopicId
  useEffect(() => {
    if (initialTopicId) {
      const match = LESSONS_DATA.find((l) => l.id === initialTopicId);
      if (match) {
        setSelectedLessonForPresentation(match);
      }
      onClearInitialTopic?.();
    }
  }, [initialTopicId, onClearInitialTopic]);

  const handleDownload = async (lesson: LessonContent, format: 'PDF' | 'DOCX') => {
    // Generate text content for the lesson handout
    const textContent = `=====================================================
CSSENTIAL: ONE-CLICK MULTI-INTERVENTION LEARNING PLATFORM
COMPUTER SYSTEM INSTALLATION AND CONFIGURATION (BTLED-ICT)
=====================================================

TOPIC ${lesson.topicNumber}: ${lesson.title.toUpperCase()}
Duration: ${lesson.duration}
Syllabus ID: ${lesson.id}

-----------------------------------------------------
1. LEARNING OBJECTIVES:
-----------------------------------------------------
${lesson.objectives.map((obj, i) => `[${i + 1}] ${obj}`).join('\n')}

-----------------------------------------------------
2. STEP-BY-STEP LABORATORY PROCEDURE:
-----------------------------------------------------
${lesson.steps.map(s => `STEP ${s.step}: ${s.title}\nDetails: ${s.details}${s.warning ? `\n[CAUTION]: ${s.warning}` : ''}`).join('\n\n')}

-----------------------------------------------------
3. CORE THEORETICAL CONCEPTS:
-----------------------------------------------------
${lesson.contentSections.map(c => `[${c.heading}]\n${c.body}${c.keyPoints ? `\nKey Points:\n` + c.keyPoints.map(k => `  - ${k}`).join('\n') : ''}`).join('\n\n')}

-----------------------------------------------------
4. SAFETY REMINDERS:
-----------------------------------------------------
${lesson.reminders.map(r => `• ${r}`).join('\n')}

-----------------------------------------------------
5. DIAGNOSTIC TROUBLESHOOTING TIPS:
-----------------------------------------------------
${lesson.troubleshootingTips.map(t => `• ${t}`).join('\n')}

=====================================================
Research Development Team:
- Jhon Wesly T. Buban (Developer/Researcher)
- Juliana Marizh B. Calaputpu (Researcher)
- Charlotte Mae H. Colon (Researcher)
- Precious Lara M. Timoteo (Researcher)
College of Education, BTLED-ICT
=====================================================
`;

    // Create Blob and trigger real browser download
    const mimeType = format === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CSSENTIAL_Topic_${lesson.topicNumber}_${lesson.title.replace(/\s+/g, '_')}.${format === 'PDF' ? 'txt' : 'doc'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Record in research database
    await api.recordDownload({
      student_id: studentId,
      session_id: sessionId,
      resource_name: `${lesson.title} Handout (${format})`,
      file_type: format
    });

    setDownloadNotice(`Downloaded ${format} for Topic ${lesson.topicNumber}: "${lesson.title}"`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Figure 3 Title & Subheading */}
      <div className="text-center max-w-3xl mx-auto space-y-1">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
          MODULE TITLE
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
          Computer System Installation and Configuration
        </h2>
        <p className="text-xs text-gray-600">
          Comprehensive curriculum collection containing structured lecture slides, printable laboratory handouts, and high-definition video demonstrations.
        </p>
      </div>

      {/* Download Alert Banner */}
      {downloadNotice && (
        <div className="max-w-xl mx-auto p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Figure 3 Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">LESSON / TOPIC</th>
                <th className="py-4 px-4 text-center">PRESENTATION</th>
                <th className="py-4 px-4 text-center">DOWNLOADS</th>
                <th className="py-4 px-4 text-center">VIDEOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
              {LESSONS_DATA.map((lesson, index) => (
                <tr
                  key={lesson.id}
                  id={`collection-row-${index + 1}`}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  {/* Topic Name and Description */}
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        0{lesson.topicNumber}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-blue-700 uppercase block">
                          Lesson {lesson.topicNumber}
                        </span>
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 sm:line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Presentation Button */}
                  <td className="py-4 px-4 text-center">
                    <button
                      id={`present-btn-${lesson.id}`}
                      onClick={() => setSelectedLessonForPresentation(lesson)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>PRESENT</span>
                    </button>
                  </td>

                  {/* Download Options (PDF & DOCX) */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        id={`download-pdf-${lesson.id}`}
                        onClick={() => handleDownload(lesson, 'PDF')}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 border border-gray-300 hover:border-red-300 font-bold text-xs rounded-md transition-colors cursor-pointer"
                        title="Download Syllabus PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-red-600" />
                        <span>PDF</span>
                      </button>
                      <button
                        id={`download-docx-${lesson.id}`}
                        onClick={() => handleDownload(lesson, 'DOCX')}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-300 hover:border-blue-300 font-bold text-xs rounded-md transition-colors cursor-pointer"
                        title="Download Syllabus DOCX"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>DOCX</span>
                      </button>
                    </div>
                  </td>

                  {/* Watch Video Button */}
                  <td className="py-4 px-4 text-center">
                    <button
                      id={`watch-video-${lesson.id}`}
                      onClick={() => setSelectedLessonForVideo(lesson)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>WATCH</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <LessonViewerModal
        lesson={selectedLessonForPresentation}
        isOpen={!!selectedLessonForPresentation}
        onClose={() => setSelectedLessonForPresentation(null)}
        studentId={studentId}
        sessionId={sessionId}
      />

      <VideoModal
        lesson={selectedLessonForVideo}
        isOpen={!!selectedLessonForVideo}
        onClose={() => setSelectedLessonForVideo(null)}
      />

    </div>
  );
};
