import React from 'react';
import { 
  Dumbbell, 
  Flame, 
  Trophy, 
  History, 
  BookOpen, 
  Zap, 
  Volume2, 
  VolumeX, 
  Play,
  User,
  Armchair
} from 'lucide-react';
import { UserStats } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  stats: UserStats;
  onToggleSound: () => void;
  onToggleUnit: () => void;
  onStartQuickWorkout: () => void;
  isWorkoutActive: boolean;
  onOpenActiveWorkout: () => void;
  onOpenBodyProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  stats,
  onToggleSound,
  onToggleUnit,
  onStartQuickWorkout,
  isWorkoutActive,
  onOpenActiveWorkout,
  onOpenBodyProfileModal,
}) => {
  const profile = stats.profile;

  return (
    <header className="sticky top-0 z-30 bg-white border-b-2 border-zinc-200 shrink-0">
      <div className="px-3 sm:px-4 h-14 flex items-center justify-between">
        
        {/* Brand & Somatotype Chip */}
        <div 
          className="flex items-center space-x-2 cursor-pointer select-none active:opacity-80" 
          onClick={() => onSelectTab('dashboard')}
        >
          <div className="w-8 h-8 rounded-xl bg-pink-600 flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4 text-white stroke-[3]" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-black tracking-tight text-base text-zinc-900">3000</span>
            <span className="font-black text-white text-[10px] tracking-wider uppercase bg-emerald-600 px-1.5 py-0.5 rounded">
              WORKOUT
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenBodyProfileModal();
              }}
              className="font-bold text-pink-700 text-[9px] tracking-wider uppercase bg-pink-100 hover:bg-pink-200 px-1.5 py-0.5 rounded border border-pink-300 transition-colors"
            >
              {profile?.bodyType ? profile.bodyType.slice(0, 4).toUpperCase() : 'CALIB'}
            </button>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex items-center space-x-1.5">
          {/* Active Workout Pulsing Pill */}
          {isWorkoutActive ? (
            <button
              onClick={onOpenActiveWorkout}
              className="relative flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-2.5 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={onStartQuickWorkout}
              className="flex items-center space-x-1 bg-pink-600 hover:bg-pink-700 text-white font-black text-xs px-2.5 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={stats.soundEnabled ? 'Mute' : 'Unmute'}
            className="w-8 h-8 rounded-xl text-zinc-600 hover:bg-zinc-100 flex items-center justify-center border border-zinc-200 active:bg-zinc-200"
          >
            {stats.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
          </button>

          {/* KG / LBS Unit Toggle */}
          <button
            onClick={onToggleUnit}
            aria-label="Toggle weight unit"
            className="px-2 py-1 text-[11px] font-mono font-black bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 rounded-lg active:scale-95 transition-transform"
          >
            {stats.weightUnit.toUpperCase()}
          </button>

          {/* Profile Calibration Button */}
          <button
            onClick={onOpenBodyProfileModal}
            aria-label="Open body profile"
            className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 flex items-center justify-center active:scale-95"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  stats: UserStats;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  stats,
}) => {
  const percentTo3000 = Math.min(100, Math.round((stats.totalReps / 3000) * 100));

  const navItems = [
    { id: 'dashboard', label: 'Today', icon: Zap, activeColor: 'text-pink-600 bg-pink-50' },
    { id: 'routines', label: 'Routines', icon: Dumbbell, activeColor: 'text-emerald-700 bg-emerald-50' },
    { id: 'exercises', label: 'Visuals', icon: BookOpen, activeColor: 'text-pink-600 bg-pink-50' },
    { id: 'challenge', label: '3000', icon: Trophy, activeColor: 'text-emerald-700 bg-emerald-50', badge: `${percentTo3000}%` },
    { id: 'history', label: 'Progress', icon: History, activeColor: 'text-pink-600 bg-pink-50' },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-zinc-200 px-2 pt-1 pb-safe shadow-lg select-none">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive ? item.activeColor : 'text-zinc-500 hover:text-zinc-900'
              } active:scale-90`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className={`absolute -top-1.5 -right-3 text-[9px] font-mono font-black px-1 rounded-full ${
                    isActive ? 'bg-emerald-600 text-white' : 'bg-pink-100 text-pink-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-black' : 'font-semibold'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-pink-600 absolute -bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
