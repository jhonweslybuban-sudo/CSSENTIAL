import React from 'react';
import {
  Gamepad2,
  ArrowLeft,
  ShoppingBag,
  KeyRound,
  Search,
  Layers,
  Sparkles,
  Grid,
  Move,
  HelpCircle,
  Type,
  Play
} from 'lucide-react';

export type GameType =
  | 'SORT_CONFIGURE'
  | 'CODE_CRACKER'
  | 'TROUBLESHOOTING_SEARCH'
  | 'INSTALLATION_SEQUENCE'
  | 'FLASHCARDS'
  | 'MEMORY_MATCH'
  | 'DRAG_DROP'
  | 'SYSTEM_QUIZ'
  | 'WORD_SCRAMBLE';

interface GamesHubProps {
  onSelectGame: (game: GameType) => void;
  onBackToActivities: () => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({
  onSelectGame,
  onBackToActivities
}) => {
  const gamesList = [
    {
      id: 'SORT_CONFIGURE' as GameType,
      title: 'Sort & Configure',
      category: 'Arcade Sorting',
      desc: 'Control the collector tray with Arrow Keys to catch computer components matching the target category (Input, Output, Storage, Tools).',
      icon: <ShoppingBag className="w-6 h-6 text-blue-700" />,
      badge: 'Reaction Game'
    },
    {
      id: 'CODE_CRACKER' as GameType,
      title: 'Code Cracker',
      category: 'Escape Challenge',
      desc: 'Answer technical questions about voltages, SSDs, and CompTIA troubleshooting to unlock digits and crack the digital security safe.',
      icon: <KeyRound className="w-6 h-6 text-purple-700" />,
      badge: 'Puzzle'
    },
    {
      id: 'TROUBLESHOOTING_SEARCH' as GameType,
      title: 'Troubleshooting Search',
      category: 'Visual Investigation',
      desc: 'Point-and-click hidden component search on a realistic computer assembly workbench. Find CPU, RAM, SATA cables, and multimeters.',
      icon: <Search className="w-6 h-6 text-emerald-700" />,
      badge: 'Observation'
    },
    {
      id: 'INSTALLATION_SEQUENCE' as GameType,
      title: 'Installation Sequence',
      category: 'Process Timeline',
      desc: 'Click to swap steps into their proper chronological order for physical motherboard mounting and UEFI BIOS setup.',
      icon: <Layers className="w-6 h-6 text-indigo-700" />,
      badge: 'Logic Ordering'
    },
    {
      id: 'FLASHCARDS' as GameType,
      title: 'Troubleshooting Flashcards',
      category: 'Knowledge Review',
      desc: 'Flip interactive study cards to master RAM functions, thermal compound physics, CMOS batteries, and POST beep codes.',
      icon: <Sparkles className="w-6 h-6 text-amber-700" />,
      badge: 'Speed Study'
    },
    {
      id: 'MEMORY_MATCH' as GameType,
      title: 'Memory Match',
      category: 'Concept Pairing',
      desc: 'Flip cards face-up to pair hardware components with their corresponding operating function or laboratory specification.',
      icon: <Grid className="w-6 h-6 text-pink-700" />,
      badge: 'Memory'
    },
    {
      id: 'DRAG_DROP' as GameType,
      title: 'Drag & Drop Computer Parts',
      category: 'Chassis Mapping',
      desc: 'Select component labels and map them to their exact physical locations on the desktop tower chassis and motherboard diagram.',
      icon: <Move className="w-6 h-6 text-cyan-700" />,
      badge: 'Interactive Lab'
    },
    {
      id: 'SYSTEM_QUIZ' as GameType,
      title: 'Computer System Quiz',
      category: 'Full Assessment',
      desc: 'A comprehensive 20-item multiple-choice exam covering all units: safety, assembly, testing, and diagnostic flowcharts.',
      icon: <HelpCircle className="w-6 h-6 text-rose-700" />,
      badge: '20 Questions'
    },
    {
      id: 'WORD_SCRAMBLE' as GameType,
      title: 'Tech Word Scramble',
      category: 'Terminology Builder',
      desc: 'Unscramble letters and complete technical sentences covering vital computer system installation terminology.',
      icon: <Type className="w-6 h-6 text-orange-700" />,
      badge: 'Vocabulary'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToActivities}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-700 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ACTIVITIES</span>
          </button>
          <div className="h-4 w-px bg-gray-200"></div>
          <div>
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-blue-700" />
              <span>CSSENTIAL INTERACTIVE GAMES HUB</span>
            </h2>
            <p className="text-xs text-gray-500">
              9 Educational Games &amp; Diagnostic Exercises for 3rd-Year BTLED-ICT Students
            </p>
          </div>
        </div>
      </div>

      {/* 9 Games Grid (3x3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {gamesList.map((game, index) => (
          <div
            key={game.id}
            id={`game-card-${index + 1}`}
            className="bg-white rounded-xl border border-gray-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {game.icon}
                </div>
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                  {game.badge}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  {game.category}
                </span>
                <h3 className="text-base font-black text-gray-900 group-hover:text-blue-900 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mt-1 line-clamp-3">
                  {game.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                id={`launch-game-${game.id.toLowerCase()}`}
                onClick={() => onSelectGame(game.id)}
                className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY GAME</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
