import React from 'react';
import { 
  Dumbbell, 
  Flame, 
  Trophy, 
  Play, 
  Layers,
  Home,
  Bot,
  SlidersHorizontal
} from 'lucide-react';
import { ActiveWorkoutSession, UserProfile } from '../types';

export type NavTab = 'dashboard' | 'routines' | 'challenge' | 'exercises' | 'history' | 'tools' | 'coach';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeSession: ActiveWorkoutSession | null;
  onOpenActiveSession: () => void;
  onQuickStart: () => void;
  profile: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeSession,
  onOpenActiveSession,
  onQuickStart,
  profile,
}) => {
  return (
    <>
      {/* Top Mobile/Tablet App Bar */}
      <header className="sticky top-0 z-30 bg-[#06070a]/95 backdrop-blur-md border-b border-zinc-850/80 px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 max-w-5xl mx-auto">
          {/* Logo / Brand - "PRO" badge removed */}
          <div 
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center space-x-2.5 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-[1.5px] shadow-md shadow-emerald-950/40">
              <div className="w-full h-full bg-[#050608] rounded-[9px] flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <span className="font-display tracking-wider text-2xl text-white font-extrabold uppercase">
              3000
            </span>
          </div>

          {/* Right Header Controls - Start button removed */}
          <div className="flex items-center space-x-2">
            {/* Tools Quick Link */}
            <button
              onClick={() => onSelectTab('tools')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all active:scale-95 ${
                currentTab === 'tools' || currentTab === 'history' || currentTab === 'exercises'
                  ? 'bg-zinc-800 border-zinc-700 text-emerald-400'
                  : 'bg-[#0b0c12] border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Tools</span>
            </button>

            {/* Streak Counter */}
            <div 
              onClick={() => onSelectTab('challenge')}
              title={`${profile.streakDays} day workout streak`}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-950/30 border border-amber-900/40 text-amber-400 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>{profile.streakDays}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Thumb-Zone Navigation Dock with Perfectly Centered Start Button */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#06070a]/95 backdrop-blur-xl border-t border-zinc-850 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-md sm:max-w-xl mx-auto px-3 flex items-center justify-between h-16">
          {/* Left Wing (2 equal items: Home & Routines) */}
          <div className="flex-1 flex items-center justify-around">
            {/* Home */}
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
                currentTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap select-none">Home</span>
            </button>

            {/* Routines */}
            <button
              onClick={() => onSelectTab('routines')}
              className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
                currentTab === 'routines' ? 'text-emerald-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap select-none">Routines</span>
            </button>
          </div>

          {/* EXACT DEAD CENTER: Primary Workout Action Button */}
          <div className="flex-shrink-0 px-2 -mt-5 flex flex-col items-center justify-center">
            <button
              onClick={activeSession ? onOpenActiveSession : onQuickStart}
              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-2xl transition-all transform active:scale-90 ${
                activeSession 
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-black shadow-emerald-500/40 scale-105' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-950/70 hover:scale-105'
              }`}
              title={activeSession ? 'Open active workout' : 'Start workout'}
            >
              <Play className="w-6 h-6 fill-black translate-x-0.5" />
              <span className="text-[9px] font-extrabold uppercase tracking-tight -mt-0.5 whitespace-nowrap select-none">
                {activeSession ? 'ACTIVE' : 'START'}
              </span>
            </button>
          </div>

          {/* Right Wing (2 equal items: AI Coach & 3000 Club) */}
          <div className="flex-1 flex items-center justify-around">
            {/* AI Coach */}
            <button
              onClick={() => onSelectTab('coach')}
              className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
                currentTab === 'coach' ? 'text-emerald-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Bot className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap select-none">AI Coach</span>
            </button>

            {/* 3000 Challenge */}
            <button
              onClick={() => onSelectTab('challenge')}
              className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
                currentTab === 'challenge' ? 'text-emerald-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap select-none">3000 Club</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
