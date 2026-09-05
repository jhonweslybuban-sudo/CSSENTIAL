import React from 'react';
import { Monitor, ArrowLeft, User, ShieldCheck } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  currentPage?: PageView;
  onNavigate?: (page: PageView) => void;
  onReturn: () => void;
  canReturn: boolean;
  studentName?: string;
  onOpenResearcher?: () => void;
  onOpenDashboard?: () => void;
  sessionTimeFormatted?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onReturn,
  canReturn,
  studentName,
  onOpenResearcher,
  onOpenDashboard,
  sessionTimeFormatted = '00:00'
}) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Logo, Title & Subtitle */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0">
              <Monitor className="w-7 h-7" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-blue-900 leading-none">
                  CSSENTIAL
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                  BTLED-ICT 3rd Year
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-1 mt-0.5">
                A One-Click Multi-Intervention Platform for Troubleshooting Computer System Installation and Configuration
              </p>
            </div>
          </div>

          {/* Right Action Controls: Return Button, Student Badge, Researcher link */}
          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {/* Student Session Info */}
            {studentName && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-700">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold text-gray-900 max-w-[120px] truncate">{studentName}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 font-mono">{sessionTimeFormatted}</span>
              </div>
            )}

            {/* Researcher Portal Access */}
            <button
              id="header-researcher-btn"
              onClick={onOpenDashboard || onOpenResearcher}
              title="Researcher Dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span className="hidden sm:inline">Research Portal</span>
            </button>

            {/* Return Button */}
            <button
              id="header-return-btn"
              onClick={onReturn}
              disabled={!canReturn}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md border transition-all ${
                canReturn
                  ? 'bg-white border-blue-600 text-blue-700 hover:bg-blue-50 shadow-xs cursor-pointer active:scale-95'
                  : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
