import React from 'react';
import { X, Play, Clock, CheckCircle2, Film } from 'lucide-react';
import { LessonContent } from '../types';

interface VideoModalProps {
  lesson: LessonContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  lesson,
  isOpen,
  onClose
}) => {
  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                INSTRUCTIONAL DEMONSTRATION VIDEO
              </span>
              <h3 className="text-base font-bold text-white">
                {lesson.title} ({lesson.duration})
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="bg-black aspect-video w-full flex flex-col items-center justify-center relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
          
          {/* Simulated HD Educational Player */}
          <div className="relative z-10 text-center space-y-3 p-6">
            <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-lg ring-4 ring-blue-400/30 group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
            <div>
              <span className="text-xs text-blue-300 font-mono tracking-wider">
                BTLED-ICT 3RD-YEAR LABORATORY MODULE
              </span>
              <h4 className="text-lg font-black text-white mt-1">
                Practical Video: {lesson.title}
              </h4>
            </div>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>1080p HD Ready</span>
            </div>
            <span>Length: {lesson.duration}</span>
          </div>
        </div>

        {/* Video Details & Timestamps */}
        <div className="p-6 space-y-4 text-gray-800">
          <div>
            <h4 className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">
              Demonstration Overview
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">
              This high-definition laboratory video demonstrates the complete procedural steps for{' '}
              <strong>{lesson.title.toLowerCase()}</strong>, focusing on industry-standard ESD precautions, hardware diagnostics, and verification benchmarks.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2">
            <h5 className="text-xs font-bold text-gray-700 uppercase">Key Milestones in this Video:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>00:00 - Tool Preparation &amp; Workspace Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>02:15 - Physical Component Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>05:30 - Configuration &amp; Diagnostic Hookup</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>08:45 - POST Testing &amp; Final Checklist</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              CLOSE VIEWER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
