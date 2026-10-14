import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { RoutinesView } from './components/RoutinesView';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { Challenge3000 } from './components/Challenge3000';
import { HistoryView } from './components/HistoryView';
import { FitnessTools } from './components/FitnessTools';
import { AICoachHub } from './components/AICoachHub';
import { storage } from './utils/storage';
import { 
  CompletedWorkoutLog, 
  WorkoutRoutine, 
  UserProfile, 
  ActiveWorkoutSession,
  Exercise 
} from './types';
import { PRESET_ROUTINES } from './data/presetRoutines';
import { EXERCISE_DATABASE } from './data/exercises';
import { Clock, Play, Maximize2, Smartphone, Tablet, Monitor } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [logs, setLogs] = useState<CompletedWorkoutLog[]>(() => storage.getLogs());
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => storage.getRoutines());
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());
  const [activeSession, setActiveSession] = useState<ActiveWorkoutSession | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'tablet' | 'fluid'>('mobile');

  // Sync profile & routines to storage when changed
  useEffect(() => {
    storage.saveRoutines(routines);
  }, [routines]);

  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  // Start workout from a routine
  const handleStartRoutine = (routine: WorkoutRoutine) => {
    const newSession: ActiveWorkoutSession = {
      id: `session-${Date.now()}`,
      routineId: routine.id,
      routineName: routine.name,
      startTime: Date.now(),
      elapsedSeconds: 0,
      isPaused: false,
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      restTimer: {
        isActive: false,
        remainingSeconds: 0,
        totalSeconds: 60,
      },
      exercises: routine.exercises.map((re) => {
        const meta = EXERCISE_DATABASE.find(e => e.id === re.exerciseId);
        return {
          exerciseId: re.exerciseId,
          exerciseName: re.exerciseName,
          category: meta?.category || 'full-body',
          restSeconds: re.restSeconds,
          completed: false,
          sets: Array.from({ length: re.targetSets }, (_, i) => ({
            setNumber: i + 1,
            reps: re.targetReps,
            weightKg: re.targetWeightKg || 20,
            completed: false,
          })),
        };
      }),
    };

    setActiveSession(newSession);
    setIsPlayerOpen(true);
  };

  // Quick start a fresh blank workout
  const handleQuickStart = () => {
    const defaultRoutine = PRESET_ROUTINES[0]; // Spartan 3000
    handleStartRoutine(defaultRoutine);
  };

  // Quick start single exercise from library
  const handleQuickStartExercise = (ex: Exercise) => {
    const newSession: ActiveWorkoutSession = {
      id: `session-${Date.now()}`,
      routineName: `Quick Session: ${ex.name}`,
      startTime: Date.now(),
      elapsedSeconds: 0,
      isPaused: false,
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      restTimer: {
        isActive: false,
        remainingSeconds: 0,
        totalSeconds: ex.defaultRestSec,
      },
      exercises: [
        {
          exerciseId: ex.id,
          exerciseName: ex.name,
          category: ex.category,
          restSeconds: ex.defaultRestSec,
          completed: false,
          sets: Array.from({ length: ex.defaultSets }, (_, i) => ({
            setNumber: i + 1,
            reps: ex.defaultReps,
            weightKg: 20,
            completed: false,
          })),
        }
      ],
    };

    setActiveSession(newSession);
    setIsPlayerOpen(true);
  };

  // Finish Workout
  const handleFinishWorkout = (log: CompletedWorkoutLog) => {
    const updatedLogs = storage.addLog(log);
    setLogs(updatedLogs);
    setProfile(storage.getProfile());
    setActiveSession(null);
    setIsPlayerOpen(false);
    setCurrentTab('dashboard');
  };

  // Cancel / Discard
  const handleCancelWorkout = () => {
    if (window.confirm('Are you sure you want to discard this workout? Current progress will be lost.')) {
      setActiveSession(null);
      setIsPlayerOpen(false);
    }
  };

  // Save new or updated routine
  const handleSaveRoutine = (routine: WorkoutRoutine) => {
    const existingIdx = routines.findIndex(r => r.id === routine.id);
    if (existingIdx >= 0) {
      const updated = [...routines];
      updated[existingIdx] = routine;
      setRoutines(updated);
    } else {
      setRoutines([routine, ...routines]);
    }
  };

  // Delete routine
  const handleDeleteRoutine = (routineId: string) => {
    setRoutines(routines.filter(r => r.id !== routineId));
  };

  // Delete single history log
  const handleDeleteLog = (logId: string) => {
    const updated = logs.filter(l => l.id !== logId);
    setLogs(updated);
    storage.saveLogs(updated);
  };

  // Clear all data
  const handleClearAll = () => {
    if (window.confirm('Reset all workout history and restore initial defaults?')) {
      storage.resetAll();
      setLogs(storage.getLogs());
      setRoutines(storage.getRoutines());
      setProfile(storage.getProfile());
      setActiveSession(null);
      setIsPlayerOpen(false);
    }
  };

  // Import JSON logs
  const handleImportLogs = (imported: CompletedWorkoutLog[]) => {
    const merged = [...imported, ...logs];
    setLogs(merged);
    storage.saveLogs(merged);
  };

  // Update Monthly Goal
  const handleUpdateGoal = (newGoal: number) => {
    const updatedProfile = { ...profile, monthlyGoal: newGoal };
    setProfile(updatedProfile);
    storage.saveProfile(updatedProfile);
  };

  // Device width wrapper class
  const getContainerWidth = () => {
    if (deviceFrame === 'mobile') return 'max-w-[430px] border-x border-zinc-900/60 shadow-2xl';
    if (deviceFrame === 'tablet') return 'max-w-[768px] border-x border-zinc-900/60 shadow-2xl';
    return 'max-w-4xl';
  };

  return (
    <div className="min-h-screen bg-[#050608] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Device Viewport Switcher (Discreet on desktop) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[#030406] border-b border-zinc-900 text-[11px] text-zinc-500 font-mono">
        <div className="flex items-center space-x-2">
          <span>📱 Mobile/Tablet Viewport Mode:</span>
          <div className="flex items-center space-x-1 bg-[#090a0f] p-0.5 rounded-lg border border-zinc-850">
            <button
              onClick={() => setDeviceFrame('mobile')}
              className={`px-2 py-0.5 rounded flex items-center space-x-1 ${
                deviceFrame === 'mobile' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'hover:text-zinc-300'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile (430px)</span>
            </button>
            <button
              onClick={() => setDeviceFrame('tablet')}
              className={`px-2 py-0.5 rounded flex items-center space-x-1 ${
                deviceFrame === 'tablet' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'hover:text-zinc-300'
              }`}
            >
              <Tablet className="w-3 h-3" />
              <span>Tablet (768px)</span>
            </button>
            <button
              onClick={() => setDeviceFrame('fluid')}
              className={`px-2 py-0.5 rounded flex items-center space-x-1 ${
                deviceFrame === 'fluid' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'hover:text-zinc-300'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Fluid</span>
            </button>
          </div>
        </div>

        <div>
          <span>PWA Ready · Touch Optimized</span>
        </div>
      </div>

      {/* Main App Container Container */}
      <div className={`w-full mx-auto min-h-screen flex flex-col transition-all duration-300 ${getContainerWidth()}`}>
        {/* Top Navbar */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            if (isPlayerOpen) setIsPlayerOpen(false);
          }}
          activeSession={activeSession}
          onOpenActiveSession={() => setIsPlayerOpen(true)}
          onQuickStart={handleQuickStart}
          profile={profile}
        />

        {/* Main Content Area (padded bottom for fixed bottom dock) */}
        <main className="flex-1 w-full px-3.5 sm:px-6 pt-4 pb-28">
          {isPlayerOpen && activeSession ? (
            <WorkoutPlayer
              session={activeSession}
              onUpdateSession={setActiveSession}
              onFinishWorkout={handleFinishWorkout}
              onCancelWorkout={handleCancelWorkout}
              onMinimize={() => setIsPlayerOpen(false)}
            />
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <Dashboard
                  logs={logs}
                  routines={routines}
                  profile={profile}
                  activeSession={activeSession}
                  onStartRoutine={handleStartRoutine}
                  onOpenActiveSession={() => setIsPlayerOpen(true)}
                  onNavigate={setCurrentTab}
                />
              )}

              {currentTab === 'routines' && (
                <RoutinesView
                  routines={routines}
                  onStartRoutine={handleStartRoutine}
                  onSaveRoutine={handleSaveRoutine}
                  onDeleteRoutine={handleDeleteRoutine}
                />
              )}

              {currentTab === 'challenge' && (
                <Challenge3000
                  logs={logs}
                  profile={profile}
                  onUpdateGoal={handleUpdateGoal}
                  onStartQuickWorkout={handleQuickStart}
                />
              )}

              {currentTab === 'exercises' && (
                <ExerciseLibrary
                  onQuickStartExercise={handleQuickStartExercise}
                />
              )}

              {currentTab === 'history' && (
                <HistoryView
                  logs={logs}
                  onDeleteLog={handleDeleteLog}
                  onClearAll={handleClearAll}
                  onImportLogs={handleImportLogs}
                />
              )}

              {currentTab === 'coach' && (
                <AICoachHub
                  profile={profile}
                  logs={logs}
                  routines={routines}
                  onStartRoutine={handleStartRoutine}
                  onUpdateProfile={setProfile}
                />
              )}

              {currentTab === 'tools' && (
                <FitnessTools onNavigate={setCurrentTab} />
              )}
            </>
          )}
        </main>

        {/* Minimized Workout Floating Pill (positioned right above the bottom dock) */}
        {!isPlayerOpen && activeSession && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm sm:max-w-md bg-[#08090e]/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="truncate">
                <h4 className="text-xs font-bold text-white truncate">{activeSession.routineName}</h4>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400">
                  <Clock className="w-3 h-3" />
                  <span>
                    {Math.floor(activeSession.elapsedSeconds / 60)}:
                    {(activeSession.elapsedSeconds % 60).toString().padStart(2, '0')}
                  </span>
                  {activeSession.restTimer.isActive && (
                    <span className="text-amber-400 font-semibold">
                      · Rest: {activeSession.restTimer.remainingSeconds}s
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsPlayerOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center space-x-1 shrink-0 shadow-md shadow-emerald-950/40 active:scale-95"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Resume</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
