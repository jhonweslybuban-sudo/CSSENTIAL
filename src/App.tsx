import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { StudentEntryModal } from './components/StudentEntryModal';
import { HomeWebWall } from './components/HomeWebWall';
import { ActivitiesView } from './components/ActivitiesView';
import { ActivityPlayer } from './components/ActivityPlayer';
import { GamesHub, GameType } from './components/GamesHub';
import { CollectionView } from './components/CollectionView';
import { AboutUsView } from './components/AboutUsView';
import { ResearcherDashboard } from './components/ResearcherDashboard';
import { AIAssistant } from './components/AIAssistant';

import { SortConfigureGame } from './components/games/SortConfigureGame';
import { CodeCrackerGame } from './components/games/CodeCrackerGame';
import { TroubleshootingSearchGame } from './components/games/TroubleshootingSearchGame';
import { InstallationSequenceGame } from './components/games/InstallationSequenceGame';
import { TroubleshootingFlashcardsGame } from './components/games/TroubleshootingFlashcardsGame';
import { MemoryMatchGame } from './components/games/MemoryMatchGame';
import { DragDropPartsGame } from './components/games/DragDropPartsGame';
import { ComputerSystemQuizGame } from './components/games/ComputerSystemQuizGame';
import { TechWordScrambleGame } from './components/games/TechWordScrambleGame';

import { PageView, StudentProfile } from './types';
import { ActivityDefinition, ACTIVITIES_DATA } from './data/curriculum';
import { api } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [pageHistory, setPageHistory] = useState<PageView[]>(['HOME']);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDefinition | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [showEntryModal, setShowEntryModal] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Initialize student profile & session from localStorage or show entry modal
  useEffect(() => {
    const initSession = async () => {
      let activeStudent = api.getSavedStudent();
      if (!activeStudent) {
        setShowEntryModal(true);
      } else {
        setStudent(activeStudent);
        try {
          const session = await api.createSession(activeStudent.student_id);
          setSessionId(session.id);
        } catch (err) {
          console.error('Session start error:', err);
        }
      }
    };
    initSession();
  }, []);

  const handleStudentRegistered = (registeredStudent: StudentProfile) => {
    setStudent(registeredStudent);
    setShowEntryModal(false);
    api.createSession(registeredStudent.student_id).then(s => setSessionId(s.id));
  };

  const navigateTo = (page: PageView) => {
    setPageHistory(prev => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturn = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // remove current
      const previousPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(previousPage);
    } else {
      setCurrentPage('HOME');
    }
  };

  // Activity Handlers
  const handleSelectActivity = (act: ActivityDefinition) => {
    setSelectedActivity(act);
    navigateTo('ACTIVITY_PLAYER');
  };

  // Game Handlers
  const handleSelectGame = (game: GameType) => {
    setSelectedGame(game);
    navigateTo('ACTIVE_GAME');
  };

  const handleOpenAIWithPrompt = (prompt: string) => {
    setAiInitialPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col font-sans selection:bg-blue-200">
      
      {/* 1. Wireframe Header */}
      <Header
        onReturn={handleReturn}
        canReturn={pageHistory.length > 1 || currentPage !== 'HOME'}
        studentName={student?.name}
        onOpenDashboard={() => navigateTo('RESEARCHER_DASHBOARD')}
      />

      {/* 2. Wireframe Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: HOME (WEB WALL) */}
        {currentPage === 'HOME' && (
          <HomeWebWall
            onNavigate={(page) => navigateTo(page)}
            onSelectTopic={(topicId) => {
              setSelectedTopicId(topicId);
              navigateTo('COLLECTION');
            }}
            onOpenGames={() => navigateTo('GAMES_HUB')}
            onOpenAI={() => handleOpenAIWithPrompt("Hello! Can you help me understand Computer System Installation and Configuration?")}
          />
        )}

        {/* VIEW 2: ACTIVITIES LIST */}
        {currentPage === 'ACTIVITIES' && (
          <ActivitiesView
            onSelectActivity={handleSelectActivity}
            onOpenGames={() => navigateTo('GAMES_HUB')}
          />
        )}

        {/* VIEW 2B: ACTIVITY PLAYER */}
        {currentPage === 'ACTIVITY_PLAYER' && selectedActivity && (
          <ActivityPlayer
            activity={selectedActivity}
            studentId={student?.student_id || 'STU-GUEST'}
            sessionId={sessionId || 'SESS-TEMP'}
            onBack={() => navigateTo('ACTIVITIES')}
          />
        )}

        {/* VIEW 2C: GAMES HUB */}
        {currentPage === 'GAMES_HUB' && (
          <GamesHub
            onSelectGame={handleSelectGame}
            onBackToActivities={() => navigateTo('ACTIVITIES')}
          />
        )}

        {/* VIEW 2D: ACTIVE GAME RUNNER */}
        {currentPage === 'ACTIVE_GAME' && selectedGame && (
          <div className="animate-in fade-in duration-200">
            {selectedGame === 'SORT_CONFIGURE' && (
              <SortConfigureGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'CODE_CRACKER' && (
              <CodeCrackerGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'TROUBLESHOOTING_SEARCH' && (
              <TroubleshootingSearchGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'INSTALLATION_SEQUENCE' && (
              <InstallationSequenceGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'FLASHCARDS' && (
              <TroubleshootingFlashcardsGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'MEMORY_MATCH' && (
              <MemoryMatchGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'DRAG_DROP' && (
              <DragDropPartsGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'SYSTEM_QUIZ' && (
              <ComputerSystemQuizGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
            {selectedGame === 'WORD_SCRAMBLE' && (
              <TechWordScrambleGame
                studentId={student?.student_id || 'STU-GUEST'}
                sessionId={sessionId || 'SESS-TEMP'}
                onBack={() => navigateTo('GAMES_HUB')}
              />
            )}
          </div>
        )}

        {/* VIEW 3: COLLECTION (LESSONS TABLE) */}
        {currentPage === 'COLLECTION' && (
          <CollectionView
            studentId={student?.student_id || 'STU-GUEST'}
            sessionId={sessionId || 'SESS-TEMP'}
            initialTopicId={selectedTopicId}
            onClearInitialTopic={() => setSelectedTopicId(null)}
          />
        )}

        {/* VIEW 4: ABOUT US (RESEARCHERS) */}
        {currentPage === 'ABOUT_US' && (
          <AboutUsView />
        )}

        {/* VIEW 5: RESEARCHER DASHBOARD */}
        {currentPage === 'RESEARCHER_DASHBOARD' && (
          <ResearcherDashboard
            onBackToHome={() => navigateTo('HOME')}
          />
        )}

      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-gray-700">
            <button
              onClick={() => navigateTo('HOME')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Home (Web Wall)
            </button>
            <button
              onClick={() => navigateTo('ACTIVITIES')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Activities &amp; Exercises
            </button>
            <button
              onClick={() => navigateTo('GAMES_HUB')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Games Hub
            </button>
            <button
              onClick={() => navigateTo('COLLECTION')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Curriculum Collection
            </button>
            <button
              onClick={() => navigateTo('ABOUT_US')}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              About the Researchers
            </button>
            <button
              onClick={() => navigateTo('RESEARCHER_DASHBOARD')}
              className="text-blue-700 hover:text-blue-900 transition-colors cursor-pointer underline underline-offset-4"
            >
              Researcher Telemetry Dashboard
            </button>
          </div>

          <p className="text-[11px] text-gray-400">
            CSSENTIAL: One-Click Multi-Intervention Learning Platform for Computer System Installation and Configuration
          </p>
          <p className="text-[11px] text-gray-400">
            Designed for 3rd-Year BTLED-ICT Students. Developed by Jhon Wesly T. Buban, Juliana Marizh B. Calaputpu, Charlotte Mae H. Colon, and Precious Lara M. Timoteo.
          </p>
        </div>
      </footer>

      {/* Floating AI Assistant (Disabled during quizzes and games to preserve assessment integrity) */}
      {currentPage !== 'ACTIVITY_PLAYER' && currentPage !== 'ACTIVE_GAME' && currentPage !== 'GAMES_HUB' && (
        <AIAssistant
          initialPrompt={aiInitialPrompt}
          onClearInitialPrompt={() => setAiInitialPrompt(null)}
        />
      )}

      {/* Student Entry / Registration Modal */}
      <StudentEntryModal
        isOpen={showEntryModal}
        onRegister={handleStudentRegistered}
        onSubmit={(registeredName) => {
          handleStudentRegistered({
            student_id: `std_${Date.now()}`,
            name: registeredName,
            year_section: '3rd-Year BTLED-ICT',
            created_at: new Date().toISOString()
          });
        }}
      />

    </div>
  );
}
