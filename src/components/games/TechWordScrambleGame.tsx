import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { SCRAMBLE_WORDS } from '../../data/gamesData';
import { api } from '../../services/api';

interface TechWordScrambleGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const TechWordScrambleGame: React.FC<TechWordScrambleGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const currentItem = SCRAMBLE_WORDS[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || feedback) return;

    const cleanInput = inputVal.trim().toUpperCase();
    const isCorrect = cleanInput === currentItem.word.toUpperCase();

    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback({ isCorrect: true, message: `Correct! Word is ${currentItem.word}! 🎉` });
    } else {
      setFeedback({ isCorrect: false, message: `Incorrect! Try again or reveal the hint.` });
    }
  };

  const handleNext = async () => {
    if (currentIndex < SCRAMBLE_WORDS.length - 1) {
      setCurrentIndex(i => i + 1);
      setInputVal('');
      setFeedback(null);
      setShowHint(false);
    } else {
      setIsCompleted(true);
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      await api.recordGameResult({
        student_id: studentId,
        session_id: sessionId,
        game_name: 'Tech Word Scramble',
        start_time: new Date(startTimeRef.current).toISOString(),
        end_time: new Date().toISOString(),
        duration_seconds: duration,
        score,
        level: 1,
        completed: true
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setInputVal('');
    setFeedback(null);
    setShowHint(false);
    setScore(0);
    setIsCompleted(false);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="max-w-xl mx-auto space-y-5">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO GAMES</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Score: {score}
          </div>
          <div className="text-gray-500 font-mono">
            {currentIndex + 1} / {SCRAMBLE_WORDS.length}
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {currentItem.isFillBlank ? 'Technical Sentence Completion' : 'Unscramble Hardware Word'}
            </span>
            <h2 className="text-xl font-black text-gray-900">
              Word Puzzle #{currentIndex + 1}
            </h2>
          </div>

          {/* Puzzle presentation */}
          <div className="p-6 bg-slate-900 text-white rounded-xl text-center space-y-3 shadow-inner">
            {currentItem.isFillBlank ? (
              <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
                {currentItem.sentence}
              </p>
            ) : (
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                  SCRAMBLED LETTERS
                </span>
                <div className="flex items-center justify-center gap-2 flex-wrap font-mono text-3xl sm:text-4xl font-black tracking-widest text-yellow-300">
                  {currentItem.scrambled.split('').map((letter, i) => (
                    <span
                      key={i}
                      className="w-10 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center shadow-xs"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hint button */}
          <div className="text-center">
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Show Technical Definition Hint</span>
              </button>
            ) : (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 inline-block">
                <strong>Clue:</strong> {currentItem.hint}
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                autoFocus
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="TYPE YOUR ANSWER..."
                disabled={feedback?.isCorrect}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-center font-mono text-lg font-bold tracking-widest uppercase focus:ring-2 focus:ring-blue-600 outline-hidden"
              />
              {!feedback?.isCorrect ? (
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
                >
                  SUBMIT
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
                >
                  NEXT →
                </button>
              )}
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-lg text-xs font-bold text-center ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border border-red-200 text-red-900'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </form>

        </div>
      ) : (
        /* Results */
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center space-y-5 shadow-xs">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-gray-900">Word Scramble Mastered!</h3>
          <p className="text-xs text-gray-600">
            You completed all technical word puzzles with a final score of{' '}
            <strong className="text-blue-700 font-bold">{score} pts</strong>!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg cursor-pointer"
            >
              Back to Games Hub
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
