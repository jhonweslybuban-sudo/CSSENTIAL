import React, { useState, useRef } from 'react';
import { Search, CheckCircle2, Clock, RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import { WORKSPACE_OBJECTS, SearchTarget } from '../../data/gamesData';
import { api } from '../../services/api';

interface TroubleshootingSearchGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const TroubleshootingSearchGame: React.FC<TroubleshootingSearchGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<any>(null);

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const currentTarget = WORKSPACE_OBJECTS[currentTargetIndex];

  const handleSvgClick = async (e: React.MouseEvent<SVGSVGElement>) => {
    if (isCompleted || !currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const b = currentTarget.bbox;
    const isHit =
      clickX >= b.x &&
      clickX <= b.x + b.width &&
      clickY >= b.y &&
      clickY <= b.y + b.height;

    if (isHit) {
      const nextFound = [...foundIds, currentTarget.id];
      setFoundIds(nextFound);
      setFeedback(`Found! That's the ${currentTarget.name}! 🎉`);

      if (nextFound.length === WORKSPACE_OBJECTS.length) {
        setIsCompleted(true);
        clearInterval(timerRef.current);
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

        await api.recordGameResult({
          student_id: studentId,
          session_id: sessionId,
          game_name: 'Troubleshooting Search',
          start_time: new Date(startTimeRef.current).toISOString(),
          end_time: new Date().toISOString(),
          duration_seconds: duration,
          score: 100,
          level: 1,
          completed: true
        });
      } else {
        // Advance to next unfound target
        setTimeout(() => {
          setFeedback(null);
          setCurrentTargetIndex(prev => (prev + 1) % WORKSPACE_OBJECTS.length);
        }, 800);
      }
    } else {
      setFeedback(`Not quite there! That's not the ${currentTarget.name}. Look closely.`);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleRestart = () => {
    setFoundIds([]);
    setCurrentTargetIndex(0);
    setFeedback(null);
    setIsCompleted(false);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      
      {/* Header Controls */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO GAMES</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-xs bg-gray-100 px-2.5 py-1 rounded-md text-gray-700">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
          <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            Found: {foundIds.length} / {WORKSPACE_OBJECTS.length}
          </div>
        </div>
      </div>

      {/* Target Mission Banner */}
      {!isCompleted && currentTarget && (
        <div className="bg-blue-800 text-white rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
              TARGET OBJECT TO LOCATE
            </span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-yellow-300" />
              <span>Find the: {currentTarget.name}</span>
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">{currentTarget.description}</p>
          </div>
          {feedback && (
            <div className="px-3 py-1 bg-white/20 backdrop-blur-xs text-xs font-bold rounded-lg border border-white/30 animate-in fade-in">
              {feedback}
            </div>
          )}
        </div>
      )}

      {/* Interactive Workbench Stage */}
      <div className="relative w-full h-[420px] bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden shadow-lg select-none">
        
        {/* Completion Modal */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/85 p-6 text-center text-white space-y-4">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h3 className="text-3xl font-black">EXCELLENT WORK!</h3>
            <p className="text-xs text-slate-300 max-w-md">
              You found all 10 essential computer components and tools on the workbench in{' '}
              <strong className="text-yellow-400">{formatTime(elapsedTime)}</strong>!
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Back to Games Hub
              </button>
            </div>
          </div>
        )}

        {/* Clickable Vector Workbench */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          onClick={handleSvgClick}
          className="w-full h-full cursor-crosshair"
        >
          {/* Work Mat Background */}
          <rect x="0" y="0" width="100" height="100" fill="#0f172a" />
          <rect x="5" y="5" width="90" height="90" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />

          {/* 1. Motherboard Area */}
          <rect x="28" y="15" width="44" height="50" rx="1" fill="#064e3b" stroke="#10b981" strokeWidth="0.6" />
          <text x="50" y="20" fill="#34d399" fontSize="2.2" fontFamily="monospace" textAnchor="middle">
            ATX MOTHERBOARD
          </text>

          {/* 2. CPU Socket */}
          <rect x="38" y="22" width="12" height="16" rx="0.5" fill="#334155" stroke="#94a3b8" strokeWidth="0.4" />
          <rect x="40" y="24" width="8" height="10" fill="#64748b" />
          <text x="44" y="30" fill="#ffffff" fontSize="1.8" fontFamily="monospace" textAnchor="middle">CPU</text>

          {/* 3. RAM Modules */}
          <g transform="translate(12, 18)">
            <rect x="0" y="0" width="4" height="22" rx="0.5" fill="#2563eb" stroke="#60a5fa" strokeWidth="0.4" />
            <rect x="6" y="0" width="4" height="22" rx="0.5" fill="#2563eb" stroke="#60a5fa" strokeWidth="0.4" />
            <text x="5" y="-1" fill="#93c5fd" fontSize="1.6" fontFamily="monospace" textAnchor="middle">RAM</text>
          </g>

          {/* 4. CPU Cooling Fan */}
          <g transform="translate(40, 38)">
            <circle cx="7" cy="8" r="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.5" />
            <circle cx="7" cy="8" r="2" fill="#0f172a" />
            <line x1="7" y1="2" x2="7" y2="14" stroke="#e0f2fe" strokeWidth="0.6" />
            <line x1="1" y1="8" x2="13" y2="8" stroke="#e0f2fe" strokeWidth="0.6" />
          </g>

          {/* 5. SATA Cable (Red ribbon) */}
          <g transform="translate(74, 28)">
            <path d="M 0 0 C 8 8, 2 14, 12 18" stroke="#ef4444" strokeWidth="1.8" fill="none" />
            <rect x="0" y="-1" width="3" height="3" fill="#18181b" />
            <rect x="11" y="16" width="3" height="3" fill="#18181b" />
          </g>

          {/* 6. 24-Pin ATX Power Cable */}
          <g transform="translate(70, 55)">
            <rect x="0" y="0" width="16" height="6" rx="0.5" fill="#18181b" stroke="#71717a" strokeWidth="0.4" />
            <path d="M 2 6 C 5 14, 8 16, 12 20" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
            <path d="M 6 6 C 9 14, 12 16, 16 20" stroke="#ef4444" strokeWidth="1.5" fill="none" />
            <text x="8" y="4" fill="#facc15" fontSize="1.4" fontFamily="monospace" textAnchor="middle">ATX 24P</text>
          </g>

          {/* 7. Magnetic Screwdriver */}
          <g transform="translate(8, 68) rotate(15)">
            <rect x="0" y="0" width="8" height="3" rx="0.5" fill="#ef4444" />
            <rect x="8" y="0.8" width="8" height="1.4" fill="#94a3b8" />
            <polygon points="16,0.5 18,1.5 16,2.5" fill="#475569" />
          </g>

          {/* 8. 2.5" Solid State Drive (SSD) */}
          <g transform="translate(32, 72)">
            <rect x="0" y="0" width="15" height="18" rx="1" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.5" />
            <rect x="2" y="2" width="11" height="10" fill="#0369a1" />
            <text x="7.5" y="8" fill="#ffffff" fontSize="2" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SSD
            </text>
          </g>

          {/* 9. 3.5" Mechanical HDD */}
          <g transform="translate(50, 72)">
            <rect x="0" y="0" width="18" height="20" rx="1" fill="#334155" stroke="#94a3b8" strokeWidth="0.5" />
            <circle cx="9" cy="9" r="6" fill="#64748b" stroke="#cbd5e1" strokeWidth="0.4" />
            <circle cx="9" cy="9" r="2" fill="#1e293b" />
            <text x="9" y="18" fill="#94a3b8" fontSize="1.6" fontFamily="monospace" textAnchor="middle">HDD</text>
          </g>

          {/* 10. Blue RJ-45 Network Cable */}
          <g transform="translate(78, 78)">
            <path d="M 0 0 Q 8 12, 14 6" stroke="#2563eb" strokeWidth="1.6" fill="none" />
            <rect x="12" y="4" width="4" height="4" rx="0.5" fill="#60a5fa" />
          </g>

          {/* Found Markers */}
          {foundIds.map((id) => {
            const item = WORKSPACE_OBJECTS.find(o => o.id === id);
            if (!item) return null;
            return (
              <g key={id} transform={`translate(${item.bbox.x + item.bbox.width / 2}, ${item.bbox.y + item.bbox.height / 2})`}>
                <circle cx="0" cy="0" r="3.5" fill="#10b981" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.6" />
                <path d="M -1.5 0 L -0.5 1.5 L 1.5 -1" stroke="#ffffff" strokeWidth="0.6" fill="none" />
              </g>
            );
          })}
        </svg>

      </div>

      {/* Checklist of 10 items */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">
          COMPONENTS CHECKLIST
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {WORKSPACE_OBJECTS.map((obj) => {
            const isFound = foundIds.includes(obj.id);
            return (
              <div
                key={obj.id}
                className={`p-2 rounded-md border text-xs font-semibold flex items-center gap-1.5 ${
                  isFound
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${isFound ? 'text-emerald-600' : 'text-gray-300'}`}
                />
                <span className="truncate">{obj.name}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
