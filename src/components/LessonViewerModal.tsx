import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { LessonContent } from '../types';
import { api } from '../services/api';

interface LessonViewerModalProps {
  lesson: LessonContent | null;
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  sessionId: string;
}

export const LessonViewerModal: React.FC<LessonViewerModalProps> = ({
  lesson,
  isOpen,
  onClose,
  studentId,
  sessionId
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    setCurrentStepIndex(0);
  }, [lesson]);

  if (!isOpen || !lesson) return null;

  const handleClose = async () => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    await api.recordLessonView({
      student_id: studentId,
      session_id: sessionId,
      lesson_title: lesson.title,
      started_at: new Date(startTime).toISOString(),
      finished_at: new Date().toISOString(),
      duration_seconds: duration,
      completed: true
    });
    onClose();
  };

  const steps = lesson.steps || [];
  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Top Header */}
        <div className="bg-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                LESSON PRESENTATION • TOPIC {lesson.topicNumber}
              </span>
              <h3 className="text-lg font-black text-white">{lesson.title}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800">
          
          {/* Learning Objectives Box */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-blue-900 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
              <span>Learning Objectives</span>
            </h4>
            <ul className="space-y-1.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Step Carousel */}
          {steps.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="bg-slate-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Step-by-Step Practical Demonstration
                </span>
                <span className="text-xs font-bold text-blue-700 font-mono">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {currentStep.step}
                  </div>
                  <h4 className="text-base font-black text-gray-900">
                    {currentStep.title}
                  </h4>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed pl-11">
                  {currentStep.details}
                </p>

                {currentStep.warning && (
                  <div className="ml-11 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Caution:</span> {currentStep.warning}
                    </div>
                  </div>
                )}
              </div>

              {/* Step Navigation buttons */}
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex(prev => prev - 1)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold ${
                    currentStepIndex === 0
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-blue-700 hover:bg-blue-100 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
                <div className="flex gap-1.5">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentStepIndex ? 'bg-blue-700 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  disabled={currentStepIndex === steps.length - 1}
                  onClick={() => setCurrentStepIndex(prev => prev + 1)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold ${
                    currentStepIndex === steps.length - 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-blue-700 hover:bg-blue-100 cursor-pointer'
                  }`}
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Deep Content Sections */}
          <div className="space-y-4">
            {lesson.contentSections.map((sec, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900 border-l-3 border-blue-600 pl-2.5">
                  {sec.heading}
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-3.5">
                  {sec.body}
                </p>
                {sec.keyPoints && (
                  <ul className="pl-7 space-y-1 text-xs text-gray-600 list-disc">
                    {sec.keyPoints.map((kp, j) => (
                      <li key={j}>{kp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Reminders and Troubleshooting Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl space-y-2">
              <h5 className="text-xs font-extrabold uppercase text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Important Safety Reminders</span>
              </h5>
              <ul className="space-y-1 text-xs text-gray-700 pl-4 list-disc">
                {lesson.reminders.map((rem, k) => (
                  <li key={k}>{rem}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <h5 className="text-xs font-extrabold uppercase text-emerald-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                <span>Laboratory Troubleshooting Tips</span>
              </h5>
              <ul className="space-y-1 text-xs text-gray-700 pl-4 list-disc">
                {lesson.troubleshootingTips.map((tip, m) => (
                  <li key={m}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            CSSENTIAL Educational Presentation Viewer
          </span>
          <button
            onClick={handleClose}
            className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
          >
            CLOSE PRESENTATION
          </button>
        </div>

      </div>
    </div>
  );
};
