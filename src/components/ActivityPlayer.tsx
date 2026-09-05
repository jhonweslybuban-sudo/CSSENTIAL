import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import { ActivityDefinition } from '../data/curriculum';
import { api } from '../services/api';

interface ActivityPlayerProps {
  activity: ActivityDefinition;
  studentId: string;
  sessionId: string;
  onBack: () => void;
  onOpenAI?: (context: string) => void;
}

export const ActivityPlayer: React.FC<ActivityPlayerProps> = ({
  activity,
  studentId,
  sessionId,
  onBack,
  onOpenAI
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [answersState, setAnswersState] = useState<{ isCorrect: boolean; selected: number }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isCompleted]);

  const currentItem = activity.items[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentItem.correctIndex;
    setIsAnswerChecked(true);

    const newAnswers = [...answersState, { isCorrect, selected: selectedOption }];
    setAnswersState(newAnswers);
  };

  const handleNext = async () => {
    if (currentIndex < activity.items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setShowHint(false);
    } else {
      // Completed!
      setIsCompleted(true);
      const correctCount = answersState.filter(a => a.isCorrect).length + (selectedOption === currentItem.correctIndex ? 0 : 0);
      const total = activity.items.length;
      const pct = Math.round((correctCount / total) * 100);

      await api.recordActivityAttempt({
        student_id: studentId,
        session_id: sessionId,
        activity_name: activity.name,
        activity_type: activity.type,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date().toISOString(),
        duration_seconds: elapsedSeconds,
        score: correctCount,
        total_items: total,
        percentage: pct,
        completed: true
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setAnswersState([]);
    setShowHint(false);
    setIsCompleted(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const totalScore = answersState.filter(a => a.isCorrect).length;

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in duration-200">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-xs">
        <button
          id="player-back-to-activities-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ACTIVITIES</span>
        </button>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 font-mono text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>
          <div className="font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Score: {totalScore} / {activity.items.length}
          </div>
        </div>
      </div>

      {/* Main Container */}
      {!isCompleted ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          
          {/* Activity Progress Header */}
          <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                {activity.type}
              </span>
              <h2 className="text-lg font-black text-gray-900">{activity.name}</h2>
            </div>
            <div className="text-xs font-bold text-gray-500">
              Question {currentIndex + 1} of {activity.items.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-1.5">
            <div
              className="bg-blue-600 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activity.items.length) * 100}%` }}
            ></div>
          </div>

          {/* Question / Scenario Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-base font-bold text-gray-900">
                {currentItem.title}
              </h3>
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg text-sm text-gray-800 leading-relaxed">
                {currentItem.scenario}
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Select the appropriate diagnostic action / answer:
              </span>
              <div className="space-y-2.5">
                {currentItem.options.map((option, idx) => {
                  let optionClass = 'border-gray-200 hover:border-blue-300 bg-white text-gray-800';

                  if (selectedOption === idx && !isAnswerChecked) {
                    optionClass = 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600';
                  } else if (isAnswerChecked) {
                    if (idx === currentItem.correctIndex) {
                      optionClass = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (selectedOption === idx) {
                      optionClass = 'border-red-500 bg-red-50 text-red-900 line-through';
                    } else {
                      optionClass = 'border-gray-200 opacity-60 bg-gray-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`option-choice-${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerChecked}
                      className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 ${optionClass}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                      {isAnswerChecked && idx === currentItem.correctIndex && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswerChecked && selectedOption === idx && idx !== currentItem.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint Box (Collapsible) */}
            <div>
              {!showHint && !isAnswerChecked && (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Need a conceptual hint?</span>
                </button>
              )}
              {showHint && !isAnswerChecked && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Pedagogical Hint: </span>
                    {currentItem.hint}
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Rationale Box (Shown after checking answer) */}
            {isAnswerChecked && (
              <div
                className={`p-4 rounded-lg border text-xs leading-relaxed animate-in fade-in duration-200 ${
                  selectedOption === currentItem.correctIndex
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                  {selectedOption === currentItem.correctIndex ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span>CORRECT ACTION!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-700" />
                      <span>INCORRECT ACTION</span>
                    </>
                  )}
                </div>
                <p>{currentItem.explanation}</p>
              </div>
            )}

            {/* Bottom Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50/90 border border-amber-200 px-3 py-1.5 rounded-lg font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="hidden sm:inline">Quiz Mode: AI Assistant is disabled during assessments</span>
                <span className="sm:hidden">AI Disabled</span>
              </div>

              {!isAnswerChecked ? (
                <button
                  id="check-answer-btn"
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    selectedOption !== null
                      ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer shadow-xs'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  CHECK ANSWER
                </button>
              ) : (
                <button
                  id="next-question-btn"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <span>
                    {currentIndex < activity.items.length - 1 ? 'NEXT QUESTION' : 'VIEW FINAL RESULTS'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* Completion Results Screen */
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full mx-auto flex items-center justify-center">
            <Award className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Activity Completed
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              {activity.name}
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Your performance score has been securely saved in the research database.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <div className="text-2xl font-black text-blue-700">{totalScore}</div>
              <div className="text-[11px] text-gray-500 font-medium">Correct Items</div>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">
                {Math.round((totalScore / activity.items.length) * 100)}%
              </div>
              <div className="text-[11px] text-gray-500 font-medium">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 font-mono">
                {formatTime(elapsedSeconds)}
              </div>
              <div className="text-[11px] text-gray-500 font-medium">Time Taken</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              id="retry-activity-btn"
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY ACTIVITY</span>
            </button>
            <button
              id="finish-activity-return-btn"
              onClick={onBack}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              BACK TO ACTIVITIES
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
