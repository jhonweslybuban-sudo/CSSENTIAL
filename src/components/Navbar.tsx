import React from 'react';
import { Home, Layers, Library, Users } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'HOME', icon: <Home className="w-4 h-4" /> },
    { id: 'ACTIVITIES', label: 'ACTIVITIES', icon: <Layers className="w-4 h-4" /> },
    { id: 'COLLECTION', label: 'COLLECTION', icon: <Library className="w-4 h-4" /> },
    { id: 'ABOUT_US', label: 'ABOUT US', icon: <Users className="w-4 h-4" /> }
  ];

  // If sub-page like GAMES_HUB or ACTIVITY_PLAYER or ACTIVE_GAME, determine active parent
  const activeTab: PageView =
    currentPage === 'GAMES_HUB' || currentPage === 'ACTIVITY_PLAYER' || currentPage === 'ACTIVE_GAME'
      ? 'ACTIVITIES'
      : currentPage;

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap shadow-xs ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-sm ring-1 ring-blue-700'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
