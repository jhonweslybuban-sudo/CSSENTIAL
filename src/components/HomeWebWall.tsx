import React from 'react';
import {
  ChevronRight,
  Sparkles,
  Gamepad2,
  BookOpen,
  HelpCircle,
  Wrench,
  Bot,
  Bell,
  Cpu,
  ShieldAlert,
  Info
} from 'lucide-react';
import { LESSONS } from '../data/curriculum';
import { PageView } from '../types';

interface HomeWebWallProps {
  onNavigate: (page: PageView) => void;
  onSelectTopic?: (topicId: string) => void;
  onOpenGames?: () => void;
  onOpenAI?: () => void;
}

export const HomeWebWall: React.FC<HomeWebWallProps> = ({
  onNavigate,
  onSelectTopic,
  onOpenGames,
  onOpenAI
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Three-Column Web Wall Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT PANEL: FEATURED TOPICS */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-xs flex flex-col p-4">
          <div className="border-b border-gray-100 pb-3 mb-3">
            <h2 className="text-base font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>FEATURED TOPICS</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Core curriculum units for BTLED-ICT 3rd Year
            </p>
          </div>

          <div className="space-y-2 flex-1">
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                id={`featured-topic-${lesson.topicNumber}`}
                onClick={() => {
                  if (onSelectTopic) {
                    onSelectTopic(lesson.id);
                  }
                  onNavigate('COLLECTION');
                }}
                className="w-full text-left p-2.5 rounded-md border border-gray-200 hover:border-blue-400 hover:bg-blue-50/70 transition-all group flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {lesson.topicNumber}
                    </span>
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-blue-800 line-clamp-1">
                      {lesson.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 pl-7 leading-tight">
                    {lesson.shortDesc}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
              </button>
            ))}
          </div>

          <button
            id="browse-all-topics-btn"
            onClick={() => onNavigate('COLLECTION')}
            className="w-full mt-3 py-2 px-3 text-xs font-bold text-center text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            VIEW ALL LESSON MODULES →
          </button>
        </div>

        {/* CENTER PANEL: DETAILED COMPUTER SYSTEM HARDWARE ILLUSTRATION */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-gray-200 shadow-xs p-4 flex flex-col justify-between overflow-hidden relative">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Interactive Hardware Overview
              </span>
              <h2 className="text-lg font-black text-gray-900">
                Computer System Assembly &amp; Diagnostics
              </h2>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Ready for Assembly
            </span>
          </div>

          {/* High-fidelity Vector Technical Illustration */}
          <div className="relative w-full h-[280px] sm:h-[320px] bg-slate-900 rounded-lg p-3 flex items-center justify-center overflow-hidden border border-slate-800 shadow-inner">
            
            {/* Blueprint Grid background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <svg
              viewBox="0 0 600 360"
              className="w-full h-full max-h-full drop-shadow-md select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Desk Mat / ESD Work Area */}
              <rect x="20" y="320" width="560" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <text x="290" y="338" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">
                STATIC-DISSIPATIVE ESD ASSEMBLY BENCH
              </text>

              {/* Computer Monitor */}
              <g transform="translate(40, 40)">
                {/* Stand */}
                <path d="M 120 180 L 140 230 L 100 230 Z" fill="#475569" />
                <rect x="70" y="230" width="100" height="8" rx="2" fill="#334155" />
                {/* Screen Bezel */}
                <rect x="10" y="20" width="220" height="160" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                {/* Display Screen */}
                <rect x="16" y="26" width="208" height="148" rx="3" fill="#0284c7" />
                
                {/* BIOS / System Screen Content */}
                <rect x="20" y="30" width="200" height="20" fill="#0369a1" />
                <text x="30" y="44" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  UEFI BIOS UTILITY - EZ MODE
                </text>
                
                {/* Hardware Telemetry UI */}
                <g fill="#ffffff" fontSize="8" fontFamily="monospace">
                  <text x="30" y="65">CPU: 3.80GHz | 38°C (Normal)</text>
                  <text x="30" y="80">RAM: 16384 MB (DDR4 Dual-Ch)</text>
                  <text x="30" y="95">Motherboard: ATX B550 v2.1</text>
                  <text x="30" y="110">Boot #1: UEFI USB Installer</text>
                  <text x="30" y="125">Voltage: +12.08V | +5.01V | +3.32V</text>
                  
                  {/* Status Box */}
                  <rect x="30" y="138" width="180" height="24" rx="3" fill="#075985" stroke="#38bdf8" strokeWidth="1" />
                  <text x="36" y="153" fill="#38bdf8" fontWeight="bold">
                    STATUS: POST PASSED (ALL OK)
                  </text>
                </g>
              </g>

              {/* Desktop Tower (Glass Side Panel Case) */}
              <g transform="translate(300, 30)">
                {/* Outer Case Chassis */}
                <rect x="20" y="10" width="220" height="280" rx="8" fill="#111827" stroke="#374151" strokeWidth="3" />
                {/* Glass Panel Area */}
                <rect x="30" y="20" width="200" height="255" rx="4" fill="#090d16" stroke="#1f2937" strokeWidth="2" />

                {/* Motherboard PCB inside */}
                <rect x="40" y="30" width="160" height="190" rx="3" fill="#064e3b" stroke="#047857" strokeWidth="1.5" />
                
                {/* CPU Socket & Cooler */}
                <rect x="60" y="45" width="55" height="55" rx="4" fill="#1e293b" stroke="#64748b" />
                <circle cx="87.5" cy="72.5" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="87.5" cy="72.5" r="8" fill="#0f172a" />
                {/* Cooler Fan Blades */}
                <path d="M 87.5 53 L 87.5 92" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 68 72.5 L 107 72.5" stroke="#38bdf8" strokeWidth="2" />
                <text x="87.5" y="112" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
                  CPU &amp; COOLER
                </text>

                {/* RAM Slots & Sticks (Dual Channel A2, B2) */}
                <g transform="translate(130, 42)">
                  <rect x="0" y="0" width="6" height="60" fill="#1e293b" />
                  <rect x="8" y="0" width="6" height="60" fill="#2563eb" stroke="#60a5fa" strokeWidth="0.8" />
                  <rect x="16" y="0" width="6" height="60" fill="#1e293b" />
                  <rect x="24" y="0" width="6" height="60" fill="#2563eb" stroke="#60a5fa" strokeWidth="0.8" />
                  <text x="15" y="72" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    RAM A2/B2
                  </text>
                </g>

                {/* Discrete Dedicated GPU Card */}
                <g transform="translate(45, 125)">
                  <rect x="0" y="0" width="170" height="36" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <circle cx="50" cy="18" r="12" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                  <circle cx="110" cy="18" r="12" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                  {/* PCIe 8-pin Power Cable */}
                  <path d="M 150 10 L 150 -10 L 170 -10 L 170 100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="80" y="22" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    DEDICATED GPU (PCIe)
                  </text>
                </g>

                {/* Bottom Power Supply Unit (PSU) Shroud */}
                <rect x="30" y="225" width="200" height="50" fill="#18181b" stroke="#27272a" />
                <rect x="45" y="235" width="80" height="30" rx="3" fill="#09090b" stroke="#3f3f46" />
                <text x="85" y="253" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  PSU 650W 80+
                </text>
                
                {/* 24-Pin ATX Main Cable Harness */}
                <path d="M 115 235 C 140 200, 190 140, 185 85" stroke="#ef4444" strokeWidth="3" fill="none" />
                <path d="M 118 235 C 143 200, 193 140, 188 85" stroke="#eab308" strokeWidth="3" fill="none" />
                <path d="M 121 235 C 146 200, 196 140, 191 85" stroke="#3b82f6" strokeWidth="3" fill="none" />

                {/* Front Case Fans */}
                <circle cx="215" cy="70" r="16" fill="#0284c7" opacity="0.3" />
                <circle cx="215" cy="140" r="16" fill="#0284c7" opacity="0.3" />
                <circle cx="215" cy="210" r="16" fill="#0284c7" opacity="0.3" />
              </g>

              {/* Screwdriver on the bench */}
              <g transform="translate(180, 280) rotate(-15)">
                <rect x="0" y="0" width="50" height="8" rx="2" fill="#ef4444" />
                <rect x="50" y="2" width="40" height="4" fill="#94a3b8" />
                <polygon points="90,1 96,4 90,7" fill="#64748b" />
              </g>

              {/* Anti-Static Wrist Strap Clip */}
              <g transform="translate(110, 310)">
                <rect x="0" y="0" width="30" height="10" rx="3" fill="#0284c7" />
                <path d="M 30 5 C 60 15, 80 5, 110 15" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <circle cx="112" cy="15" r="4" fill="#e2e8f0" />
              </g>
            </svg>

            {/* Quick Overlays */}
            <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              <span>ATX Specification 2.4 | Dual-Channel Configuration</span>
            </div>
          </div>

          {/* Action prompt below illustration */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Ready to test your installation skills and troubleshooting methodology?
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="webwall-explore-activities-btn"
                onClick={() => onNavigate('ACTIVITIES')}
                className="w-full sm:w-auto px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-md shadow-xs transition-all"
              >
                GO TO ACTIVITIES
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: QUICK LINKS */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-xs p-4 flex flex-col">
          <div className="border-b border-gray-100 pb-3 mb-3">
            <h2 className="text-base font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>QUICK LINKS</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Direct access to interactive learning tools
            </p>
          </div>

          <div className="space-y-2.5 flex-1">
            
            {/* Quick Quiz */}
            <button
              id="quick-link-quiz"
              onClick={() => {
                onNavigate('ACTIVITIES');
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 hover:border-blue-400 transition-all text-left group"
            >
              <div className="w-9 h-9 bg-blue-700 text-white rounded-md flex items-center justify-center shrink-0 shadow-xs">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 group-hover:text-blue-900">
                  Quick Quiz Assessment
                </div>
                <div className="text-[11px] text-gray-500">
                  Test your hardware knowledge
                </div>
              </div>
            </button>

            {/* Games Hub */}
            <button
              id="quick-link-games"
              onClick={() => onNavigate('GAMES_HUB')}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 hover:border-purple-400 transition-all text-left group"
            >
              <div className="w-9 h-9 bg-purple-700 text-white rounded-md flex items-center justify-center shrink-0 shadow-xs">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 group-hover:text-purple-900">
                  Interactive Games Hub
                </div>
                <div className="text-[11px] text-gray-500">
                  9 educational puzzle games
                </div>
              </div>
            </button>

            {/* Collection */}
            <button
              id="quick-link-collection"
              onClick={() => onNavigate('COLLECTION')}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 hover:border-emerald-400 transition-all text-left group"
            >
              <div className="w-9 h-9 bg-emerald-700 text-white rounded-md flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-900">
                  Learning Collection
                </div>
                <div className="text-[11px] text-gray-500">
                  Presentations, downloads &amp; videos
                </div>
              </div>
            </button>

            {/* Troubleshooting Guide */}
            <button
              id="quick-link-troubleshooting"
              onClick={() => onNavigate('ACTIVITIES')}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 hover:border-amber-400 transition-all text-left group"
            >
              <div className="w-9 h-9 bg-amber-600 text-white rounded-md flex items-center justify-center shrink-0 shadow-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 group-hover:text-amber-900">
                  Troubleshooting Scenarios
                </div>
                <div className="text-[11px] text-gray-500">
                  Black screens, beeps, power cuts
                </div>
              </div>
            </button>

            {/* AI Learning Assistant */}
            <button
              id="quick-link-ai-assistant"
              onClick={() => {
                if (onOpenAI) {
                  onOpenAI();
                } else {
                  window.dispatchEvent(new CustomEvent('open-cssential-ai'));
                }
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-sky-200 bg-sky-50/50 hover:bg-sky-100/60 hover:border-sky-400 transition-all text-left group"
            >
              <div className="w-9 h-9 bg-sky-600 text-white rounded-md flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 group-hover:text-sky-900">
                  CSSENTIAL AI Assistant
                </div>
                <div className="text-[11px] text-gray-500">
                  Smart explanations &amp; hints
                </div>
              </div>
            </button>

          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400 font-medium">
              3rd-Year BTLED-ICT Platform
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM PANEL: ANNOUNCEMENTS & LAB NOTICES */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">
                ANNOUNCEMENTS &amp; LABORATORY REMINDERS
              </h2>
              <p className="text-xs text-gray-500">
                Official course updates for Computer System Installation &amp; Configuration
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
            Semester II - Lab Group A &amp; B
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
              <Cpu className="w-4 h-4 text-blue-700" />
              <span>Unit 2 Physical Assembly Assessment</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Review <strong>Lesson 2 (Installing Computer Systems)</strong>. Remember that brass standoffs must be mounted only where corresponding motherboard holes exist.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>ESD Safety Standard Compliance</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Every student must wear an anti-static wrist strap clipped to bare chassis metal before handling CPU chips and dual-channel RAM sticks.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>Interactive Games Hub Now Active</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Complete the 9 interactive educational games under the <strong>ACTIVITIES &gt; 🎮 PLAY</strong> button. Your scores and attempts are logged automatically.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
