import React, { useState, useRef } from 'react';
import { RotateCcw, CheckCircle2, Trophy, ArrowLeft, Move } from 'lucide-react';
import { DRAG_DROP_PARTS } from '../../data/gamesData';
import { api } from '../../services/api';

interface DragDropPartsGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const DragDropPartsGame: React.FC<DragDropPartsGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  // Map targetId -> placedPartId
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [isVerified, setIsVerified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const startTimeRef = useRef<number>(Date.now());

  const availableParts = DRAG_DROP_PARTS.filter(
    p => !Object.values(placements).includes(p.id)
  );

  const handleSelectPart = (id: string) => {
    if (isCompleted) return;
    setSelectedPartId(id === selectedPartId ? null : id);
  };

  const handleTargetZoneClick = (targetId: string) => {
    if (!selectedPartId || isCompleted) return;
    setPlacements(prev => ({
      ...prev,
      [targetId]: selectedPartId
    }));
    setSelectedPartId(null);
    setIsVerified(false);
  };

  const handleRemovePlacement = (targetId: string) => {
    if (isCompleted) return;
    setPlacements(prev => {
      const copy = { ...prev };
      delete copy[targetId];
      return copy;
    });
    setIsVerified(false);
  };

  const handleVerify = async () => {
    const correctCount = DRAG_DROP_PARTS.filter(
      p => placements[p.id] === p.id
    ).length;

    setIsVerified(true);

    if (correctCount === DRAG_DROP_PARTS.length) {
      setIsCompleted(true);
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      await api.recordGameResult({
        student_id: studentId,
        session_id: sessionId,
        game_name: 'Drag & Drop Computer Parts',
        start_time: new Date(startTimeRef.current).toISOString(),
        end_time: new Date().toISOString(),
        duration_seconds: duration,
        score: 100,
        level: 1,
        completed: true
      });
    }
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedPartId(null);
    setIsVerified(false);
    setIsCompleted(false);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO GAMES</span>
        </button>

        <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
          Placed: {Object.keys(placements).length} / {DRAG_DROP_PARTS.length}
        </div>
      </div>

      {/* Available Labels to Place */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            STEP 1: Select a Component Label, then click its destination circle on the schematic:
          </span>
          <span className="text-[11px] text-gray-400">
            {availableParts.length} labels remaining
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {availableParts.length > 0 ? (
            availableParts.map(part => {
              const isSelected = selectedPartId === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => handleSelectPart(part.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500 scale-105'
                      : 'bg-gray-100 hover:bg-blue-50 text-gray-800 border border-gray-300'
                  }`}
                >
                  <Move className="w-3.5 h-3.5" />
                  <span>{part.label}</span>
                </button>
              );
            })
          ) : (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              All labels placed on schematic! Click &quot;VERIFY PLACEMENTS&quot; below.
            </span>
          )}
        </div>
      </div>

      {/* Interactive Schematic Stage */}
      <div className="relative w-full h-[400px] bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden shadow-lg select-none">
        
        {/* Schematic SVG Diagram */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Chassis Frame */}
          <rect x="5" y="5" width="90" height="90" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
          
          {/* Motherboard Tray */}
          <rect x="30" y="15" width="55" height="60" rx="2" fill="#064e3b" stroke="#059669" strokeWidth="0.8" />
          <text x="57" y="20" fill="#34d399" fontSize="2" fontFamily="monospace" textAnchor="middle">
            MOTHERBOARD PCB
          </text>

          {/* PSU Bay (Bottom Left) */}
          <rect x="8" y="72" width="24" height="20" rx="1" fill="#18181b" stroke="#3f3f46" strokeWidth="0.6" />
          <text x="20" y="83" fill="#facc15" fontSize="1.8" fontFamily="monospace" textAnchor="middle">
            PSU BAY
          </text>

          {/* Storage Bays (Bottom Right) */}
          <rect x="70" y="65" width="20" height="25" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="0.6" />
          <text x="80" y="78" fill="#94a3b8" fontSize="1.8" fontFamily="monospace" textAnchor="middle">
            DRIVE BAYS
          </text>

          {/* PCIe Slots (Lower Motherboard) */}
          <rect x="35" y="58" width="30" height="6" rx="0.5" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.4" />
          <text x="50" y="62" fill="#a5b4fc" fontSize="1.6" fontFamily="monospace" textAnchor="middle">
            PCIe x16
          </text>
        </svg>

        {/* Drop Target Zones Overlay */}
        {DRAG_DROP_PARTS.map(target => {
          const placedPartId = placements[target.id];
          const placedPart = DRAG_DROP_PARTS.find(p => p.id === placedPartId);
          const isCorrect = isVerified && placedPartId === target.id;
          const isWrong = isVerified && placedPartId && placedPartId !== target.id;

          return (
            <div
              key={target.id}
              onClick={() => {
                if (placedPartId) handleRemovePlacement(target.id);
                else handleTargetZoneClick(target.id);
              }}
              style={{
                top: `${target.targetY}%`,
                left: `${target.targetX}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer flex flex-col items-center"
            >
              {placedPart ? (
                <div
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold shadow-md flex items-center gap-1 whitespace-nowrap transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                      : isWrong
                      ? 'bg-red-500 text-white ring-2 ring-red-300'
                      : 'bg-blue-600 text-white ring-1 ring-white'
                  }`}
                >
                  <span>{placedPart.label}</span>
                  <span className="text-white/70 hover:text-white ml-1">✕</span>
                </div>
              ) : (
                <div
                  className={`w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                    selectedPartId
                      ? 'border-yellow-400 bg-yellow-400/20 animate-pulse scale-110'
                      : 'border-white/40 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white/60"></span>
                </div>
              )}
            </div>
          );
        })}

        {/* Victory Screen */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/85 p-6 text-center text-white space-y-4">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black">ALL PARTS ACCURATELY PLACED!</h3>
            <p className="text-xs text-slate-300">
              You correctly identified and mapped every major computer chassis &amp; motherboard component.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset &amp; Play Again</span>
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

      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Placements</span>
        </button>

        <button
          onClick={handleVerify}
          disabled={Object.keys(placements).length === 0}
          className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            Object.keys(placements).length > 0
              ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer shadow-xs'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          VERIFY PLACEMENTS
        </button>
      </div>

    </div>
  );
};
