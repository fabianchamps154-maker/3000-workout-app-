import React, { useState, useEffect } from 'react';
import { Navbar, MobileBottomNav } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { RoutinesView } from './components/RoutinesView';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { Challenge3000View } from './components/Challenge3000View';
import { HistoryAndStats } from './components/HistoryAndStats';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import { BodyProfileModal } from './components/BodyProfileModal';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Play, 
  Smartphone, 
  Maximize2,
  ChevronRight,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getStoredStats, 
  saveStats, 
  getStoredHistory, 
  getStoredRoutines, 
  getStoredPRs, 
  saveCompletedWorkout, 
  saveCustomRoutine, 
  deleteCustomRoutine, 
  addQuickReps 
} from './utils/storage';
import { CompletedWorkout, PersonalRecord, Routine, UserStats, ActiveExerciseSession, UserProfile } from './types';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [stats, setStats] = useState<UserStats>(getStoredStats());
  const [history, setHistory] = useState<CompletedWorkout[]>(getStoredHistory());
  const [routines, setRoutines] = useState<Routine[]>(getStoredRoutines());
  const [prs, setPrs] = useState<Record<string, PersonalRecord>>(getStoredPRs());

  // Frame display mode: 'mobile' (phone screen fit) or 'expanded'
  const [frameMode, setFrameMode] = useState<'mobile' | 'expanded'>('mobile');

  // Active workout session state
  const [isWorkoutActive, setIsWorkoutActive] = useState<boolean>(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState<boolean>(false);
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
  const [activeWorkoutTitle, setActiveWorkoutTitle] = useState<string>('Quick Workout');

  // Personalization modal state
  const [isBodyProfileModalOpen, setIsBodyProfileModalOpen] = useState<boolean>(false);

  // Live phone time
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      setCurrentTimeStr(`${hours}:${mins < 10 ? '0' : ''}${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Summary modal state
  const [summaryData, setSummaryData] = useState<{
    isOpen: boolean;
    title: string;
    durationSeconds: number;
    totalReps: number;
    totalVolumeKg: number;
    newPRs: PersonalRecord[];
    newMilestones: string[];
  }>({
    isOpen: false,
    title: '',
    durationSeconds: 0,
    totalReps: 0,
    totalVolumeKg: 0,
    newPRs: [],
    newMilestones: [],
  });

  // Toast notification state
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const refreshState = () => {
    setStats(getStoredStats());
    setHistory(getStoredHistory());
    setRoutines(getStoredRoutines());
    setPrs(getStoredPRs());
  };

  const handleToggleSound = () => {
    const updated: UserStats = { ...stats, soundEnabled: !stats.soundEnabled };
    setStats(updated);
    saveStats(updated);
  };

  const handleToggleUnit = () => {
    const nextUnit: 'kg' | 'lbs' = stats.weightUnit === 'kg' ? 'lbs' : 'kg';
    const updated: UserStats = { ...stats, weightUnit: nextUnit };
    setStats(updated);
    saveStats(updated);
  };

  const handleStartRoutine = (routine: Routine) => {
    setActiveRoutine(routine);
    setActiveWorkoutTitle(routine.name);
    setIsWorkoutActive(true);
    setIsWorkoutModalOpen(true);
  };

  const handleStartQuickWorkout = () => {
    setActiveRoutine(null);
    setActiveWorkoutTitle('Freestyle Workout');
    setIsWorkoutActive(true);
    setIsWorkoutModalOpen(true);
  };

  const handleFinishWorkout = (summary: {
    title: string;
    durationSeconds: number;
    exercises: ActiveExerciseSession[];
    totalReps: number;
    totalVolumeKg: number;
    notes?: string;
  }) => {
    const completedWorkout: CompletedWorkout = {
      id: `wo-${Date.now()}`,
      title: summary.title,
      routineId: activeRoutine ? activeRoutine.id : undefined,
      startTime: Date.now() - summary.durationSeconds * 1000,
      endTime: Date.now(),
      durationSeconds: summary.durationSeconds,
      exercises: summary.exercises.map(e => ({
        exerciseId: e.exerciseId,
        exerciseName: e.exerciseName,
        sets: e.sets,
      })),
      totalReps: summary.totalReps,
      totalVolumeKg: summary.totalVolumeKg,
      notes: summary.notes,
    };

    const { newPRs, newMilestones } = saveCompletedWorkout(completedWorkout);
    refreshState();

    setIsWorkoutActive(false);
    setIsWorkoutModalOpen(false);

    setSummaryData({
      isOpen: true,
      title: summary.title,
      durationSeconds: summary.durationSeconds,
      totalReps: summary.totalReps,
      totalVolumeKg: summary.totalVolumeKg,
      newPRs,
      newMilestones,
    });
  };

  const handleSaveCustomRoutine = (newRoutine: Routine) => {
    saveCustomRoutine(newRoutine);
    refreshState();
  };

  const handleDeleteCustomRoutine = (routineId: string) => {
    deleteCustomRoutine(routineId);
    refreshState();
  };

  const handleQuickLogReps = (repsCount: number, label: string) => {
    const { newMilestones } = addQuickReps(repsCount, label);
    refreshState();
    if (newMilestones.length > 0) {
      setToastNotification(`Milestone Unlocked: ${newMilestones.join(', ')}`);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setToastNotification(null), 4500);
    }
  };

  const handleProfileUpdated = (profile: UserProfile, newRoutines: Routine[]) => {
    const updatedStats: UserStats = {
      ...stats,
      profile,
    };
    saveStats(updatedStats);
    setStats(updatedStats);
    setRoutines(getStoredRoutines());
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-900 flex flex-col items-center justify-start sm:p-4 overflow-x-hidden">
      
      {/* Desktop Viewport Switcher Controls */}
      <aside aria-label="Screen mode switcher" className="hidden sm:flex items-center justify-between w-full max-w-md mb-2 px-3 py-1 text-xs text-zinc-400">
        <div className="flex items-center space-x-1.5 font-bold">
          <Smartphone className="w-3.5 h-3.5 text-pink-500" />
          <span>Mobile App Screen</span>
        </div>
        <div className="flex items-center space-x-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => setFrameMode('mobile')}
            className={`px-2 py-0.5 rounded font-black text-[11px] transition-colors ${
              frameMode === 'mobile' ? 'bg-pink-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Phone (412px)
          </button>
          <button
            onClick={() => setFrameMode('expanded')}
            className={`px-2 py-0.5 rounded font-black text-[11px] transition-colors ${
              frameMode === 'expanded' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Expand
          </button>
        </div>
      </aside>

      {/* Main Mobile App Phone Screen Container */}
      <div 
        className={`w-full bg-white relative flex flex-col shadow-2xl transition-all duration-300 ${
          frameMode === 'mobile' 
            ? 'max-w-[430px] min-h-screen sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-[44px] sm:border-[10px] sm:border-zinc-800 sm:ring-1 sm:ring-zinc-700/50' 
            : 'max-w-4xl min-h-screen sm:rounded-3xl sm:border-2 sm:border-zinc-800'
        } overflow-hidden`}
      >
        {/* Floating Toast Notification */}
        {toastNotification && (
          <div className="absolute top-12 left-4 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between font-black text-xs border-2 border-emerald-700 animate-in fade-in slide-in-from-top duration-200">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-white shrink-0" />
              <span>{toastNotification}</span>
            </div>
            <button 
              onClick={() => setToastNotification(null)}
              className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-800 rounded-lg text-[10px] font-bold text-white transition-colors"
            >
              OK
            </button>
          </div>
        )}

        {/* Simulated Native Smartphone Status Bar (Top Bezel) */}
        <div className="bg-white shrink-0 pt-2 px-6 pb-1 flex items-center justify-between text-zinc-900 text-xs font-bold select-none border-b border-zinc-100">
          <span className="font-mono text-[12px] font-black">{currentTimeStr}</span>
          
          {/* Simulated Dynamic Island / Camera Pill */}
          <div className="w-24 h-4 bg-zinc-900 rounded-full flex items-center justify-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800" />
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-800">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Top App Header */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          stats={stats}
          onToggleSound={handleToggleSound}
          onToggleUnit={handleToggleUnit}
          onStartQuickWorkout={handleStartQuickWorkout}
          isWorkoutActive={isWorkoutActive}
          onOpenActiveWorkout={() => setIsWorkoutModalOpen(true)}
          onOpenBodyProfileModal={() => setIsBodyProfileModalOpen(true)}
        />

        {/* Scrollable Mobile Content Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 pb-28 scroll-smooth">
          {currentTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              recentWorkouts={history}
              onStartRoutine={handleStartRoutine}
              onStartQuickWorkout={handleStartQuickWorkout}
              onNavigateTab={setCurrentTab}
              onQuickLogReps={handleQuickLogReps}
              onOpenBodyProfileModal={() => setIsBodyProfileModalOpen(true)}
            />
          )}

          {currentTab === 'routines' && (
            <RoutinesView
              routines={routines}
              onStartRoutine={handleStartRoutine}
              onSaveCustomRoutine={handleSaveCustomRoutine}
              onDeleteCustomRoutine={handleDeleteCustomRoutine}
              weightUnit={stats.weightUnit}
              onOpenBodyProfileModal={() => setIsBodyProfileModalOpen(true)}
            />
          )}

          {currentTab === 'exercises' && <ExerciseLibrary />}

          {currentTab === 'challenge' && (
            <Challenge3000View
              stats={stats}
              onQuickLogReps={handleQuickLogReps}
            />
          )}

          {currentTab === 'history' && (
            <HistoryAndStats
              history={history}
              prs={prs}
              stats={stats}
              weightUnit={stats.weightUnit}
            />
          )}
        </main>

        {/* Floating Active Workout Pill (Above Bottom Nav) */}
        {isWorkoutActive && !isWorkoutModalOpen && (
          <div className="absolute bottom-16 left-3 right-3 z-30 animate-in slide-in-from-bottom-2">
            <button
              onClick={() => setIsWorkoutModalOpen(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-3 shadow-xl flex items-center justify-between border-2 border-emerald-400 active:scale-95 transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <div className="text-left">
                  <div className="text-xs font-black truncate max-w-[190px]">{activeWorkoutTitle}</div>
                  <div className="text-[10px] text-emerald-100 font-bold">Session running • Tap to resume</div>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 bg-white text-emerald-800 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </div>
            </button>
          </div>
        )}

        {/* Fixed Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          stats={stats}
        />
      </div>

      {/* Body Profile & Personalization Modal */}
      <BodyProfileModal
        isOpen={isBodyProfileModalOpen}
        onClose={() => setIsBodyProfileModalOpen(false)}
        currentProfile={stats.profile}
        weightUnit={stats.weightUnit}
        onProfileUpdated={handleProfileUpdated}
      />

      {/* Active Workout Session Tracker */}
      <ActiveWorkoutModal
        key={activeRoutine ? activeRoutine.id : 'freestyle'}
        routine={activeRoutine}
        workoutTitle={activeWorkoutTitle}
        isOpen={isWorkoutModalOpen}
        onClose={() => setIsWorkoutModalOpen(false)}
        onFinishWorkout={handleFinishWorkout}
        weightUnit={stats.weightUnit}
        soundEnabled={stats.soundEnabled}
      />

      {/* Post-Workout Celebration Summary */}
      <WorkoutSummaryModal
        isOpen={summaryData.isOpen}
        onClose={() => setSummaryData(prev => ({ ...prev, isOpen: false }))}
        title={summaryData.title}
        durationSeconds={summaryData.durationSeconds}
        totalReps={summaryData.totalReps}
        totalVolumeKg={summaryData.totalVolumeKg}
        newPRs={summaryData.newPRs}
        newMilestones={summaryData.newMilestones}
        weightUnit={stats.weightUnit}
      />
    </div>
  );
};

export default App;
