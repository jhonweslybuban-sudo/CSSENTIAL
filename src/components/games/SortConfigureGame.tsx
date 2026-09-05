import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Heart, Trophy, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { SORT_ITEMS, SortItem } from '../../data/gamesData';
import { api } from '../../services/api';

interface SortConfigureGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const SortConfigureGame: React.FC<SortConfigureGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const categories: SortItem['category'][] = [
    'Input Devices',
    'Output Devices',
    'Storage Devices',
    'Tools & Safety'
  ];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const targetCategory = categories[currentCategoryIndex];

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [basketPos, setBasketPos] = useState(50); // percentage 0-100
  const [fallingItem, setFallingItem] = useState<{ item: SortItem; y: number; x: number } | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER' | 'VICTORY'>('IDLE');
  const [feedback, setFeedback] = useState<string | null>(null);

  const startTimeRef = useRef<number>(Date.now());

  // Spawn falling item
  const spawnItem = () => {
    const randomItem = SORT_ITEMS[Math.floor(Math.random() * SORT_ITEMS.length)];
    const randomX = 15 + Math.random() * 70; // 15% to 85%
    setFallingItem({ item: randomItem, y: 0, x: randomX });
  };

  const handleStartGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setCurrentCategoryIndex(0);
    setBasketPos(50);
    setGameState('PLAYING');
    startTimeRef.current = Date.now();
    spawnItem();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setBasketPos(prev => Math.max(10, prev - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setBasketPos(prev => Math.min(90, prev + 8));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Falling loop
  useEffect(() => {
    if (gameState !== 'PLAYING' || !fallingItem) return;

    const speed = 1.2 + level * 0.4;
    const interval = setInterval(() => {
      setFallingItem(prev => {
        if (!prev) return null;
        const newY = prev.y + speed;

        // Collision check near basket bottom (y >= 82)
        if (newY >= 82) {
          const hit = Math.abs(prev.x - basketPos) < 16;
          const isCorrectCategory = prev.item.category === targetCategory;

          if (hit) {
            if (isCorrectCategory) {
              setScore(s => s + 20);
              setFeedback(`+20 Caught ${prev.item.name}! (${targetCategory})`);
              // Progress level or change category
              if ((score + 20) % 60 === 0) {
                setCurrentCategoryIndex(ci => (ci + 1) % categories.length);
                setLevel(l => l + 1);
              }
            } else {
              setLives(l => {
                const nextLives = l - 1;
                if (nextLives <= 0) {
                  endGame(score, level, false);
                }
                return nextLives;
              });
              setFeedback(`Wrong! ${prev.item.name} is a ${prev.item.category}`);
            }
          } else {
            // Missed item
            if (isCorrectCategory) {
              // Missed a valid target
              setLives(l => {
                const nextLives = l - 1;
                if (nextLives <= 0) {
                  endGame(score, level, false);
                }
                return nextLives;
              });
              setFeedback(`Missed ${prev.item.name}! (-1 Life)`);
            }
          }

          // Spawn next
          setTimeout(() => {
            setFeedback(null);
            spawnItem();
          }, 300);

          return null;
        }

        return { ...prev, y: newY };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [gameState, fallingItem, basketPos, targetCategory, level, score]);

  const endGame = async (finalScore: number, finalLevel: number, victory: boolean) => {
    setGameState(victory ? 'VICTORY' : 'GAMEOVER');
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

    await api.recordGameResult({
      student_id: studentId,
      session_id: sessionId,
      game_name: 'Sort & Configure',
      start_time: new Date(startTimeRef.current).toISOString(),
      end_time: new Date().toISOString(),
      duration_seconds: duration,
      score: finalScore,
      level: finalLevel,
      completed: true
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          ← BACK TO GAMES
        </button>
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-red-600">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Score: {score}
          </div>
          <div className="text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
            Level: {level}
          </div>
        </div>
      </div>

      {/* Target Category Banner */}
      <div className="bg-blue-700 text-white rounded-lg p-3 text-center shadow-xs">
        <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
          Current Target Category
        </span>
        <h2 className="text-xl font-black">{targetCategory}</h2>
        <p className="text-xs text-blue-100 mt-0.5">
          Catch only items belonging to this category in your collector!
        </p>
      </div>

      {/* Game Stage */}
      <div className="relative w-full h-[380px] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden select-none">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]"></div>

        {/* Start / Game Over Overlays */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 p-6 text-center text-white space-y-4">
            <h3 className="text-2xl font-black text-white">SORT &amp; CONFIGURE</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Control the collector tray with the <strong>Arrow Keys</strong> or on-screen buttons. Catch computer items that match the target category (Input, Output, Storage, Tools). Avoid mismatching items!
            </p>
            <button
              onClick={handleStartGame}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>START PLAYING</span>
            </button>
          </div>
        )}

        {(gameState === 'GAMEOVER' || gameState === 'VICTORY') && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 p-6 text-center text-white space-y-4">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black">
              {gameState === 'VICTORY' ? 'OUTSTANDING SORTING!' : 'GAME OVER'}
            </h3>
            <div className="text-sm text-slate-300">
              Final Score: <span className="font-bold text-yellow-400 text-lg">{score}</span> | Reached Level: {level}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStartGame}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY AGAIN</span>
              </button>
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                RETURN TO HUB
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alert Pill */}
        {feedback && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 bg-slate-800/90 text-white text-xs font-bold rounded-full border border-slate-600 shadow-md animate-in fade-in">
            {feedback}
          </div>
        )}

        {/* Falling Item */}
        {fallingItem && gameState === 'PLAYING' && (
          <div
            className="absolute -translate-x-1/2 transition-all flex flex-col items-center"
            style={{
              top: `${fallingItem.y}%`,
              left: `${fallingItem.x}%`
            }}
          >
            <div className="px-3 py-1.5 bg-white text-slate-900 border-2 border-blue-400 rounded-lg shadow-lg font-bold text-xs whitespace-nowrap animate-pulse">
              📦 {fallingItem.item.name}
            </div>
          </div>
        )}

        {/* Catcher Basket / Collector Tray */}
        <div
          className="absolute bottom-4 -translate-x-1/2 transition-all duration-75"
          style={{ left: `${basketPos}%` }}
        >
          <div className="w-32 h-10 bg-gradient-to-t from-blue-700 to-blue-500 border-2 border-blue-300 rounded-b-xl rounded-t-sm flex items-center justify-center text-white text-xs font-black shadow-lg">
            🧺 {targetCategory}
          </div>
        </div>

      </div>

      {/* On-Screen Mobile / Click Controls */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onClick={() => setBasketPos(prev => Math.max(10, prev - 12))}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg flex items-center gap-2 active:bg-gray-400 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Move Left</span>
        </button>
        <button
          onClick={() => setBasketPos(prev => Math.min(90, prev + 12))}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg flex items-center gap-2 active:bg-gray-400 cursor-pointer"
        >
          <span>Move Right</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
