import React, { useState, useRef } from 'react';
import { RotateCcw, Check, X, ArrowLeft, RotateCw, Trophy, HelpCircle } from 'lucide-react';
import { FLASHCARDS_DATA } from '../../data/gamesData';
import { api } from '../../services/api';

interface TroubleshootingFlashcardsGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const TroubleshootingFlashcardsGame: React.FC<TroubleshootingFlashcardsGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const currentCard = FLASHCARDS_DATA[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = async (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);
    else setReviewCount(prev => prev + 1);

    if (currentIndex < FLASHCARDS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      const total = FLASHCARDS_DATA.length;
      const finalScore = isCorrect ? correctCount + 1 : correctCount;

      await api.recordGameResult({
        student_id: studentId,
        session_id: sessionId,
        game_name: 'Troubleshooting Flashcards',
        start_time: new Date(startTimeRef.current).toISOString(),
        end_time: new Date().toISOString(),
        duration_seconds: duration,
        score: finalScore,
        level: 1,
        completed: true
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setReviewCount(0);
    setIsFinished(false);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO GAMES</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            Known: {correctCount}
          </span>
          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            Review: {reviewCount}
          </span>
          <span className="text-gray-500 font-mono">
            {currentIndex + 1} / {FLASHCARDS_DATA.length}
          </span>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-4">
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / FLASHCARDS_DATA.length) * 100}%` }}
            ></div>
          </div>

          {/* Flashcard Component */}
          <div
            onClick={handleFlip}
            className="w-full min-h-[300px] bg-white border-2 border-blue-200 hover:border-blue-500 rounded-2xl p-8 shadow-md flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 select-none"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                {currentCard.category}
              </span>
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-blue-500" />
                <span>Click Card to Flip</span>
              </span>
            </div>

            <div className="py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                    QUESTION / SYMPTOM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block">
                    EXPLANATION / ANSWER
                  </span>
                  <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed max-w-xl mx-auto">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-gray-400">
              Card {currentIndex + 1} of {FLASHCARDS_DATA.length}
            </div>
          </div>

          {/* Grading Controls (Active when flipped or ready) */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleRate(false)}
              className="flex-1 max-w-[200px] py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <X className="w-4 h-4 text-amber-700" />
              <span>NEED REVIEW</span>
            </button>
            <button
              onClick={() => handleRate(true)}
              className="flex-1 max-w-[200px] py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <Check className="w-4 h-4 text-white" />
              <span>I GOT THIS!</span>
            </button>
          </div>

        </div>
      ) : (
        /* Completion Results Screen */
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-5 shadow-xs">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-gray-900">
            Flashcard Session Complete!
          </h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            You reviewed all {FLASHCARDS_DATA.length} technical flashcards.
          </p>

          <div className="flex justify-center gap-6 py-4 bg-gray-50 rounded-xl max-w-xs mx-auto border border-gray-200">
            <div>
              <div className="text-2xl font-black text-emerald-600">{correctCount}</div>
              <div className="text-[11px] text-gray-500 font-semibold">Mastered</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600">{reviewCount}</div>
              <div className="text-[11px] text-gray-500 font-semibold">Needs Review</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review Again</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg cursor-pointer"
            >
              Back to Games
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
