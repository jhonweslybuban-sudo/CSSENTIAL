import React, { useState, useRef } from 'react';
import { ArrowUpDown, CheckCircle2, RotateCcw, ArrowLeft, Trophy, Layers, ChevronRight } from 'lucide-react';
import { INSTALLATION_LEVELS } from '../../data/gamesData';
import { api } from '../../services/api';

interface InstallationSequenceGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const InstallationSequenceGame: React.FC<InstallationSequenceGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = INSTALLATION_LEVELS[levelIndex];

  // Shuffled items
  const [items, setItems] = useState<typeof currentLevel.steps>(() =>
    [...currentLevel.steps].sort(() => Math.random() - 0.5)
  );
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLevelPassed, setIsLevelPassed] = useState(false);

  const startTimeRef = useRef<number>(Date.now());

  // Click-to-swap mechanism
  const handleItemClick = (idx: number) => {
    if (isVerified && isLevelPassed) return;

    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      // Swap items
      const newItems = [...items];
      const temp = newItems[selectedIdx];
      newItems[selectedIdx] = newItems[idx];
      newItems[idx] = temp;
      setItems(newItems);
      setSelectedIdx(null);
      setIsVerified(false);
    }
  };

  const handleVerify = async () => {
    // Check if current order matches correct order
    const correctOrder = currentLevel.steps.map(s => s.id);
    const userOrder = items.map(s => s.id);
    const passed = correctOrder.every((id, idx) => userOrder[idx] === id);

    setIsVerified(true);
    setIsLevelPassed(passed);

    if (passed) {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      await api.recordGameResult({
        student_id: studentId,
        session_id: sessionId,
        game_name: 'Installation Sequence',
        start_time: new Date(startTimeRef.current).toISOString(),
        end_time: new Date().toISOString(),
        duration_seconds: duration,
        score: 100,
        level: levelIndex + 1,
        completed: true
      });
    }
  };

  const handleNextLevel = () => {
    if (levelIndex < INSTALLATION_LEVELS.length - 1) {
      const nextIndex = levelIndex + 1;
      setLevelIndex(nextIndex);
      setItems([...INSTALLATION_LEVELS[nextIndex].steps].sort(() => Math.random() - 0.5));
      setSelectedIdx(null);
      setIsVerified(false);
      setIsLevelPassed(false);
    }
  };

  const handleReset = () => {
    setItems([...currentLevel.steps].sort(() => Math.random() - 0.5));
    setSelectedIdx(null);
    setIsVerified(false);
    setIsLevelPassed(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO GAMES</span>
        </button>
        <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-100 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Level {levelIndex + 1} of {INSTALLATION_LEVELS.length}</span>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Sequence Ordering Challenge
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-0.5">
            {currentLevel.title}
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Click on any two steps to swap their positions until the entire assembly/configuration timeline is in correct chronological order.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-2.5">
          {items.map((step, idx) => {
            const isCorrectPosition = step.id === currentLevel.steps[idx].id;
            const isSelected = selectedIdx === idx;

            let borderClass = 'border-gray-200 bg-gray-50/70 hover:border-blue-400 hover:bg-blue-50/40 text-gray-800';
            if (isSelected) {
              borderClass = 'border-blue-600 bg-blue-100 text-blue-950 ring-2 ring-blue-500 scale-[1.01]';
            } else if (isVerified) {
              if (isCorrectPosition) {
                borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
              } else {
                borderClass = 'border-red-400 bg-red-50 text-red-900';
              }
            }

            return (
              <button
                key={step.id}
                onClick={() => handleItemClick(idx)}
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 shadow-2xs cursor-pointer ${borderClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-white border border-gray-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step.text.replace(/^\d+\.\s*/, '')}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isVerified && isCorrectPosition && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  )}
                  {isVerified && !isCorrectPosition && (
                    <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      Wrong Position
                    </span>
                  )}
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {isVerified && (
          <div
            className={`p-4 rounded-lg border text-xs font-bold animate-in fade-in ${
              isLevelPassed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 flex items-center gap-2'
                : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            {isLevelPassed ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Sequence verified! All steps are in correct chronological order.</span>
              </>
            ) : (
              <span>Some steps are out of order. Look at the highlighted items, swap them, and verify again.</span>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle &amp; Reset</span>
          </button>

          <div className="flex items-center gap-2">
            {!isLevelPassed ? (
              <button
                onClick={handleVerify}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-all"
              >
                CHECK SEQUENCE ORDER
              </button>
            ) : levelIndex < INSTALLATION_LEVELS.length - 1 ? (
              <button
                onClick={handleNextLevel}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-all"
              >
                <span>NEXT LEVEL</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  🎉 All Sequence Levels Mastered!
                </span>
                <button
                  onClick={onBack}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Return to Games
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
