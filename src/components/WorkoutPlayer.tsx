import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Plus, 
  Minus,
  Trash2, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Pause, 
  Play, 
  Trophy, 
  Bell, 
  BellOff, 
  Minimize2,
  Sparkles,
  Dumbbell
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveWorkoutSession, CompletedWorkoutLog, Exercise } from '../types';
import { soundEffects } from '../utils/audio';
import { EXERCISE_DATABASE } from '../data/exercises';

interface WorkoutPlayerProps {
  session: ActiveWorkoutSession;
  onUpdateSession: (session: ActiveWorkoutSession) => void;
  onFinishWorkout: (log: CompletedWorkoutLog) => void;
  onCancelWorkout: () => void;
  onMinimize: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  session,
  onUpdateSession,
  onFinishWorkout,
  onCancelWorkout,
  onMinimize,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInstructionsSheet, setShowInstructionsSheet] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [finishNotes, setFinishNotes] = useState('');
  const [showAddExerciseSheet, setShowAddExerciseSheet] = useState(false);
  const [addSearch, setAddSearch] = useState('');

  // Elapsed Workout Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!session.isPaused) {
      interval = setInterval(() => {
        onUpdateSession({
          ...session,
          elapsedSeconds: session.elapsedSeconds + 1,
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session.isPaused, session.elapsedSeconds, session]);

  // Rest Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (session.restTimer.isActive && session.restTimer.remainingSeconds > 0) {
      interval = setInterval(() => {
        const nextSeconds = session.restTimer.remainingSeconds - 1;
        
        if (soundEnabled && (nextSeconds === 3 || nextSeconds === 2 || nextSeconds === 1)) {
          soundEffects.playCountdownBeep();
        }

        if (nextSeconds <= 0) {
          if (soundEnabled) {
            soundEffects.playRestComplete();
          }
          onUpdateSession({
            ...session,
            restTimer: {
              ...session.restTimer,
              isActive: false,
              remainingSeconds: 0,
            },
          });
        } else {
          onUpdateSession({
            ...session,
            restTimer: {
              ...session.restTimer,
              remainingSeconds: nextSeconds,
            },
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session.restTimer.isActive, session.restTimer.remainingSeconds, soundEnabled, session]);

  const currentExercise = session.exercises[session.currentExerciseIndex];
  const exerciseMeta = EXERCISE_DATABASE.find(e => e.id === currentExercise?.exerciseId);

  // Time formatters
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle set completed
  const handleToggleSet = (setIdx: number) => {
    if (!currentExercise) return;

    const updatedSets = [...currentExercise.sets];
    const targetSet = updatedSets[setIdx];
    const wasCompleted = targetSet.completed;
    targetSet.completed = !wasCompleted;

    if (!wasCompleted) {
      if (soundEnabled) {
        soundEffects.playSetComplete();
      }
      const restTime = currentExercise.restSeconds || 60;
      onUpdateSession({
        ...session,
        exercises: session.exercises.map((ex, i) => 
          i === session.currentExerciseIndex ? { ...ex, sets: updatedSets } : ex
        ),
        restTimer: {
          isActive: true,
          remainingSeconds: restTime,
          totalSeconds: restTime,
        }
      });
    } else {
      onUpdateSession({
        ...session,
        exercises: session.exercises.map((ex, i) => 
          i === session.currentExerciseIndex ? { ...ex, sets: updatedSets } : ex
        ),
      });
    }
  };

  // Step adjust weight (+/- 2.5kg) or reps (+/- 1)
  const handleStepValue = (setIdx: number, field: 'weightKg' | 'reps', delta: number) => {
    if (!currentExercise) return;
    const updatedSets = [...currentExercise.sets];
    const currentVal = updatedSets[setIdx][field] || 0;
    const newVal = Math.max(0, currentVal + delta);
    updatedSets[setIdx] = {
      ...updatedSets[setIdx],
      [field]: newVal,
    };

    onUpdateSession({
      ...session,
      exercises: session.exercises.map((ex, i) => 
        i === session.currentExerciseIndex ? { ...ex, sets: updatedSets } : ex
      ),
    });
  };

  // Direct manual input update
  const handleUpdateSet = (setIdx: number, field: 'weightKg' | 'reps', value: number) => {
    if (!currentExercise) return;
    const updatedSets = [...currentExercise.sets];
    updatedSets[setIdx] = {
      ...updatedSets[setIdx],
      [field]: Math.max(0, value),
    };

    onUpdateSession({
      ...session,
      exercises: session.exercises.map((ex, i) => 
        i === session.currentExerciseIndex ? { ...ex, sets: updatedSets } : ex
      ),
    });
  };

  // Add new set
  const handleAddSet = () => {
    if (!currentExercise) return;
    const lastSet = currentExercise.sets[currentExercise.sets.length - 1];
    const newSet = {
      setNumber: currentExercise.sets.length + 1,
      reps: lastSet ? lastSet.reps : 10,
      weightKg: lastSet ? lastSet.weightKg : 20,
      completed: false,
    };

    onUpdateSession({
      ...session,
      exercises: session.exercises.map((ex, i) => 
        i === session.currentExerciseIndex ? { ...ex, sets: [...ex.sets, newSet] } : ex
      ),
    });
  };

  // Remove set
  const handleRemoveSet = (setIdx: number) => {
    if (!currentExercise || currentExercise.sets.length <= 1) return;
    const filtered = currentExercise.sets
      .filter((_, idx) => idx !== setIdx)
      .map((s, idx) => ({ ...s, setNumber: idx + 1 }));

    onUpdateSession({
      ...session,
      exercises: session.exercises.map((ex, i) => 
        i === session.currentExerciseIndex ? { ...ex, sets: filtered } : ex
      ),
    });
  };

  // Rest timer controls
  const handleAdjustRest = (deltaSec: number) => {
    const newRemaining = Math.max(5, session.restTimer.remainingSeconds + deltaSec);
    onUpdateSession({
      ...session,
      restTimer: {
        ...session.restTimer,
        isActive: true,
        remainingSeconds: newRemaining,
        totalSeconds: Math.max(session.restTimer.totalSeconds, newRemaining),
      }
    });
  };

  const handleSkipRest = () => {
    onUpdateSession({
      ...session,
      restTimer: {
        ...session.restTimer,
        isActive: false,
        remainingSeconds: 0,
      }
    });
  };

  // Carousel navigation
  const handlePrevExercise = () => {
    if (session.currentExerciseIndex > 0) {
      onUpdateSession({
        ...session,
        currentExerciseIndex: session.currentExerciseIndex - 1,
      });
      setShowInstructionsSheet(false);
    }
  };

  const handleNextExercise = () => {
    if (session.currentExerciseIndex < session.exercises.length - 1) {
      onUpdateSession({
        ...session,
        currentExerciseIndex: session.currentExerciseIndex + 1,
      });
      setShowInstructionsSheet(false);
    }
  };

  // Add exercise to active session
  const handleAddExerciseToSession = (ex: Exercise) => {
    const newSessionExercise = {
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
    };

    onUpdateSession({
      ...session,
      exercises: [...session.exercises, newSessionExercise],
      currentExerciseIndex: session.exercises.length,
    });
    setShowAddExerciseSheet(false);
  };

  // Totals
  const totalVolumeLifted = session.exercises.reduce((totalEx, ex) => {
    return totalEx + ex.sets.reduce((totalSet, set) => {
      return totalSet + (set.completed ? set.weightKg * set.reps : 0);
    }, 0);
  }, 0);

  const totalRepsCompleted = session.exercises.reduce((totalEx, ex) => {
    return totalEx + ex.sets.reduce((totalSet, set) => {
      return totalSet + (set.completed ? set.reps : 0);
    }, 0);
  }, 0);

  const totalCompletedSets = session.exercises.reduce((totalEx, ex) => {
    return totalEx + ex.sets.filter(s => s.completed).length;
  }, 0);

  const estimatedCaloriesBurned = Math.round(
    (session.elapsedSeconds / 60) * 7.5 + (totalVolumeLifted * 0.01)
  );

  const handleConfirmFinish = () => {
    if (soundEnabled) {
      soundEffects.playWorkoutFinished();
    }
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    const log: CompletedWorkoutLog = {
      id: `log-${Date.now()}`,
      routineId: session.routineId,
      routineName: session.routineName,
      date: new Date().toISOString(),
      durationSeconds: session.elapsedSeconds,
      totalVolumeKg: Math.round(totalVolumeLifted),
      totalReps: totalRepsCompleted,
      estimatedCalories: estimatedCaloriesBurned,
      challengePoints: totalRepsCompleted,
      exercisesCompleted: session.exercises.filter(ex => ex.sets.some(s => s.completed)).length,
      exercises: session.exercises,
      notes: finishNotes.trim() || undefined,
    };

    onFinishWorkout(log);
  };

  return (
    <div className="max-w-2xl sm:max-w-4xl mx-auto space-y-4 pb-28 animate-fade-in px-1">
      {/* Sticky Mobile Workout Header */}
      <div className="sticky top-14 z-20 bg-[#08090e]/95 backdrop-blur-md border border-zinc-850 rounded-2xl p-3 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onMinimize}
            className="w-8 h-8 rounded-lg bg-[#0e0f17] border border-zinc-800 flex items-center justify-center text-zinc-400 active:scale-95"
            title="Minimize"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5 font-mono text-xs">
              <span className="font-bold text-emerald-400 uppercase text-[10px]">LIVE</span>
              <span className="text-zinc-600">·</span>
              <span className="text-white font-bold">{formatTime(session.elapsedSeconds)}</span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate max-w-[150px] sm:max-w-xs -mt-0.5">
              {session.routineName}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => onUpdateSession({ ...session, isPaused: !session.isPaused })}
            className="w-8 h-8 rounded-lg bg-[#0e0f17] border border-zinc-800 flex items-center justify-center text-zinc-300 active:scale-95"
            title={session.isPaused ? 'Resume' : 'Pause'}
          >
            {session.isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-8 h-8 rounded-lg bg-[#0e0f17] border border-zinc-800 flex items-center justify-center text-zinc-400 active:scale-95"
            title="Sound"
          >
            {soundEnabled ? <Bell className="w-3.5 h-3.5 text-emerald-400" /> : <BellOff className="w-3.5 h-3.5 text-zinc-600" />}
          </button>

          <button
            onClick={() => setShowFinishConfirm(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-md shadow-emerald-950/40 active:scale-95"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Floating Rest Countdown Alert Banner (when rest is active) */}
      {session.restTimer.isActive && (
        <div className="sticky top-28 z-20 bg-gradient-to-r from-emerald-950/80 via-[#07090f] to-teal-950/80 border border-emerald-800/50 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center font-mono text-emerald-400 font-extrabold text-base shrink-0">
              {formatTime(session.restTimer.remainingSeconds)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono block">
                Rest & Recover
              </span>
              <span className="text-xs text-zinc-300">Prepare for next set</span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => handleAdjustRest(30)}
              className="px-2 py-1 rounded-lg bg-[#0e0f17] border border-zinc-800 text-zinc-200 text-xs font-mono font-semibold active:scale-95"
            >
              +30s
            </button>
            <button
              onClick={handleSkipRest}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black text-xs font-bold active:scale-95"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Exercise Card & Sets Logger */}
      {currentExercise ? (
        <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
          {/* Top Exercise Navigator Header */}
          <div className="flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-500">
                <span>{session.currentExerciseIndex + 1} of {session.exercises.length}</span>
                <span>·</span>
                <span className="uppercase text-emerald-400 font-semibold">{currentExercise.category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white truncate mt-0.5">
                {currentExercise.exerciseName}
              </h2>
            </div>

            {/* Prev / Next Exercise Carousel */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={handlePrevExercise}
                disabled={session.currentExerciseIndex === 0}
                className="w-9 h-9 rounded-xl bg-[#0e0f17] border border-zinc-800 flex items-center justify-center disabled:opacity-20 text-white active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextExercise}
                disabled={session.currentExerciseIndex === session.exercises.length - 1}
                className="w-9 h-9 rounded-xl bg-[#0e0f17] border border-zinc-800 flex items-center justify-center disabled:opacity-20 text-white active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Guide Trigger Pill */}
          {exerciseMeta && (
            <button
              onClick={() => setShowInstructionsSheet(true)}
              className="w-full py-2 px-3 rounded-xl bg-[#050609] border border-zinc-850 flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-200 active:scale-98"
            >
              <div className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">Form Cues: {exerciseMeta.tips}</span>
              </div>
              <span className="text-emerald-400 text-[11px] shrink-0 font-medium">Guide &gt;</span>
            </button>
          )}

          {/* Touch-Optimized Sets Logger */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider px-2">
              <span>Sets ({currentExercise.sets.length})</span>
              <span>Weight & Rep Steppers</span>
            </div>

            <div className="space-y-2">
              {currentExercise.sets.map((set, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                    set.completed
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : 'bg-[#0b0c12] border-zinc-850'
                  }`}
                >
                  {/* Set Number */}
                  <div className="w-7 text-center font-mono font-bold text-xs text-zinc-400 shrink-0">
                    #{set.setNumber}
                  </div>

                  {/* Weight Stepper */}
                  <div className="flex-1 min-w-0 flex items-center justify-center space-x-0.5 sm:space-x-1 bg-[#050609] border border-zinc-800/80 rounded-xl p-0.5 sm:p-1">
                    <button
                      onClick={() => handleStepValue(idx, 'weightKg', -2.5)}
                      className="w-6 sm:w-7 h-7 sm:h-8 rounded-lg bg-[#0e0f17] flex items-center justify-center text-zinc-400 hover:text-white font-bold active:scale-90 shrink-0"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="flex-1 text-center font-mono font-bold text-xs sm:text-sm text-white truncate px-0.5">
                      {set.weightKg}<span className="text-[10px] text-zinc-500 font-normal">kg</span>
                    </div>
                    <button
                      onClick={() => handleStepValue(idx, 'weightKg', 2.5)}
                      className="w-6 sm:w-7 h-7 sm:h-8 rounded-lg bg-[#0e0f17] flex items-center justify-center text-zinc-400 hover:text-white font-bold active:scale-90 shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Reps Stepper */}
                  <div className="flex-1 min-w-0 flex items-center justify-center space-x-0.5 sm:space-x-1 bg-[#050609] border border-zinc-800/80 rounded-xl p-0.5 sm:p-1">
                    <button
                      onClick={() => handleStepValue(idx, 'reps', -1)}
                      className="w-6 sm:w-7 h-7 sm:h-8 rounded-lg bg-[#0e0f17] flex items-center justify-center text-zinc-400 hover:text-white font-bold active:scale-90 shrink-0"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="flex-1 text-center font-mono font-bold text-xs sm:text-sm text-white truncate px-0.5">
                      {set.reps}<span className="text-[10px] text-zinc-500 font-normal">r</span>
                    </div>
                    <button
                      onClick={() => handleStepValue(idx, 'reps', 1)}
                      className="w-6 sm:w-7 h-7 sm:h-8 rounded-lg bg-[#0e0f17] flex items-center justify-center text-zinc-400 hover:text-white font-bold active:scale-90 shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Giant Checkbox Button (44px+ touch target) */}
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => handleToggleSet(idx)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all transform active:scale-85 ${
                        set.completed
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950/60 scale-105'
                          : 'bg-[#0f1018] border border-zinc-800 text-zinc-600 hover:text-white'
                      }`}
                      title="Check off set"
                    >
                      <Check className="w-5 h-5 stroke-[3]" />
                    </button>

                    {currentExercise.sets.length > 1 && (
                      <button
                        onClick={() => handleRemoveSet(idx)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Actions: Add Set & Add Exercise */}
            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={handleAddSet}
                className="flex-1 py-2.5 rounded-xl bg-[#0e0f17] hover:bg-zinc-850 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>+ Add Set</span>
              </button>

              <button
                onClick={() => setShowAddExerciseSheet(true)}
                className="flex-1 py-2.5 rounded-xl bg-[#0e0f17] hover:bg-zinc-850 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <Dumbbell className="w-3.5 h-3.5 text-teal-400" />
                <span>+ Exercise</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-500">
          No exercise selected.
        </div>
      )}

      {/* Live Summary Bar */}
      <div className="grid grid-cols-3 gap-2 bg-[#08090e] border border-zinc-850 rounded-2xl p-3 text-center">
        <div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">Volume</span>
          <div className="font-mono text-sm sm:text-base font-bold text-white">
            {Math.round(totalVolumeLifted).toLocaleString()} <span className="text-[10px] text-zinc-500">kg</span>
          </div>
        </div>
        <div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">Reps</span>
          <div className="font-mono text-sm sm:text-base font-bold text-emerald-400">
            {totalRepsCompleted}
          </div>
        </div>
        <div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">Sets Done</span>
          <div className="font-mono text-sm sm:text-base font-bold text-white">
            {totalCompletedSets}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet: Form Instructions */}
      {showInstructionsSheet && exerciseMeta && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-lg bg-[#08090e] border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Technique Guide</span>
                <h3 className="text-base font-bold text-white">{exerciseMeta.name}</h3>
              </div>
              <button
                onClick={() => setShowInstructionsSheet(false)}
                className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-zinc-400 block mb-1">Target Muscles:</span>
                <div className="flex flex-wrap gap-1">
                  {exerciseMeta.targetMuscles.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#0d0e15] border border-zinc-800 text-zinc-300 text-[10px]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-zinc-400 block mb-1">Instructions:</span>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 bg-[#050609] p-3 rounded-xl border border-zinc-850 leading-relaxed">
                  {exerciseMeta.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-300 text-xs">
                💡 <strong>Cue:</strong> {exerciseMeta.tips}
              </div>
            </div>

            <button
              onClick={() => setShowInstructionsSheet(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet: Add Exercise */}
      {showAddExerciseSheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-lg bg-[#08090e] border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 space-y-3 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Add Exercise</h3>
              <button
                onClick={() => setShowAddExerciseSheet(false)}
                className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search exercise..."
              value={addSearch}
              onChange={(e) => setAddSearch(e.target.value)}
              className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />

            <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
              {EXERCISE_DATABASE.filter(ex => 
                ex.name.toLowerCase().includes(addSearch.toLowerCase()) ||
                ex.category.toLowerCase().includes(addSearch.toLowerCase())
              ).map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleAddExerciseToSession(ex)}
                  className="p-3 rounded-xl bg-[#0c0d14] hover:bg-[#11131c] border border-zinc-850 flex items-center justify-between cursor-pointer active:scale-98"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{ex.name}</h4>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">{ex.category} · {ex.equipment}</span>
                  </div>
                  <Plus className="w-4 h-4 text-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet: Finish Workout Summary */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-md bg-[#08090e] border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center space-y-1.5">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#050608] rounded-[14px] flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Workout Finished!</h3>
              <p className="text-zinc-400 text-xs">Summary of your training volume</p>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-4 gap-2 bg-[#050609] p-3 rounded-2xl border border-zinc-850 text-center font-mono">
              <div>
                <span className="text-[9px] text-zinc-500 block">TIME</span>
                <span className="text-xs font-bold text-white">{formatTime(session.elapsedSeconds)}</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 block">REPS</span>
                <span className="text-xs font-bold text-emerald-400">{totalRepsCompleted}</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 block">VOLUME</span>
                <span className="text-xs font-bold text-white">{Math.round(totalVolumeLifted)}kg</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 block">CAL</span>
                <span className="text-xs font-bold text-teal-400">{estimatedCaloriesBurned}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-900/40 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>+{totalRepsCompleted} Reps to 3000 Goal</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">Saved</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Workout Reflection (Optional)
              </label>
              <textarea
                value={finishNotes}
                onChange={(e) => setFinishNotes(e.target.value)}
                placeholder="How did this workout feel?"
                rows={2}
                className="w-full bg-[#050609] border border-zinc-800 rounded-xl p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0e0f17] border border-zinc-800 text-zinc-300 font-semibold text-xs"
              >
                Back
              </button>
              <button
                onClick={handleConfirmFinish}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs shadow-lg shadow-emerald-950/40 active:scale-95"
              >
                Save Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Workout */}
      <div className="text-center pt-2">
        <button
          onClick={onCancelWorkout}
          className="text-xs text-rose-400/50 hover:text-rose-400 underline font-medium"
        >
          Discard Current Workout Session
        </button>
      </div>
    </div>
  );
};
