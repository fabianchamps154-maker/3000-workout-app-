import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Check, 
  Timer, 
  FastForward, 
  Dumbbell, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  Armchair
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveExerciseSession, Exercise, Routine } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';
import { soundFX } from '../utils/audio';
import { ExerciseVisualDiagram } from './ExerciseVisualDiagram';

interface ActiveWorkoutModalProps {
  routine?: Routine | null;
  workoutTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onFinishWorkout: (summary: {
    title: string;
    durationSeconds: number;
    exercises: ActiveExerciseSession[];
    totalReps: number;
    totalVolumeKg: number;
    notes?: string;
  }) => void;
  weightUnit: 'kg' | 'lbs';
  soundEnabled: boolean;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  routine,
  workoutTitle,
  isOpen,
  onClose,
  onFinishWorkout,
  weightUnit,
  soundEnabled,
}) => {
  const [sessionExercises, setSessionExercises] = useState<ActiveExerciseSession[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [workoutNotes, setWorkoutNotes] = useState<string>('');

  // Rest Timer state
  const [restRemaining, setRestRemaining] = useState<number>(0);
  const [restTotal, setRestTotal] = useState<number>(60);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);

  // Exercise Picker Modal state
  const [showAddExercisePicker, setShowAddExercisePicker] = useState<boolean>(false);
  const [exerciseSearch, setExerciseSearch] = useState<string>('');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  useEffect(() => {
    if (routine) {
      const initialized: ActiveExerciseSession[] = routine.exercises.map(re => {
        const found = EXERCISE_DATABASE.find(e => e.id === re.exerciseId);
        return {
          exerciseId: re.exerciseId,
          exerciseName: found ? found.name : 'Exercise',
          category: found ? found.category : 'Full Body',
          restSec: re.restSec || 60,
          sets: re.sets.map((s, idx) => ({
            id: `set-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
            setNumber: idx + 1,
            reps: s.reps,
            weightKg: s.weightKg,
            completed: false,
          }))
        };
      });
      setSessionExercises(initialized);
    } else {
      const defaultEx = EXERCISE_DATABASE[0];
      setSessionExercises([
        {
          exerciseId: defaultEx.id,
          exerciseName: defaultEx.name,
          category: defaultEx.category,
          restSec: defaultEx.defaultRestSec,
          sets: [
            { id: `s-1`, setNumber: 1, reps: defaultEx.defaultReps, weightKg: defaultEx.defaultWeightKg, completed: false },
            { id: `s-2`, setNumber: 2, reps: defaultEx.defaultReps, weightKg: defaultEx.defaultWeightKg, completed: false },
            { id: `s-3`, setNumber: 3, reps: defaultEx.defaultReps, weightKg: defaultEx.defaultWeightKg, completed: false },
          ]
        }
      ]);
    }
  }, [routine]);

  // Overall workout stopwatch
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, startTime]);

  // Rest timer countdown
  useEffect(() => {
    if (!isRestActive || restRemaining <= 0) {
      if (isRestActive && restRemaining <= 0) {
        setIsRestActive(false);
        soundFX.playRestComplete(soundEnabled);
      }
      return;
    }

    const timer = setInterval(() => {
      setRestRemaining(prev => {
        if (prev <= 1) {
          setIsRestActive(false);
          soundFX.playRestComplete(soundEnabled);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRestActive, restRemaining, soundEnabled]);

  const displayWeight = (kg: number) => {
    if (weightUnit === 'lbs') {
      return Math.round(kg * 2.20462);
    }
    return kg;
  };

  const parseWeightToKg = (val: number) => {
    if (weightUnit === 'lbs') {
      return Math.round((val / 2.20462) * 10) / 10;
    }
    return val;
  };

  const handleToggleSet = (exIndex: number, setIndex: number) => {
    setSessionExercises(prev => {
      const updated = [...prev];
      const targetEx = { ...updated[exIndex] };
      const targetSets = [...targetEx.sets];
      const targetSet = { ...targetSets[setIndex] };

      const willBeCompleted = !targetSet.completed;
      targetSet.completed = willBeCompleted;
      targetSets[setIndex] = targetSet;
      targetEx.sets = targetSets;
      updated[exIndex] = targetEx;

      if (willBeCompleted) {
        soundFX.playSetComplete(soundEnabled);
        const restDuration = targetEx.restSec || 60;
        setRestTotal(restDuration);
        setRestRemaining(restDuration);
        setIsRestActive(true);
      }

      return updated;
    });
  };

  const handleUpdateSet = (exIndex: number, setIndex: number, field: 'reps' | 'weightKg', value: number) => {
    setSessionExercises(prev => {
      const updated = [...prev];
      const targetEx = { ...updated[exIndex] };
      const targetSets = [...targetEx.sets];
      targetSets[setIndex] = {
        ...targetSets[setIndex],
        [field]: value
      };
      targetEx.sets = targetSets;
      updated[exIndex] = targetEx;
      return updated;
    });
  };

  const handleAddSet = (exIndex: number) => {
    setSessionExercises(prev => {
      const updated = [...prev];
      const targetEx = { ...updated[exIndex] };
      const prevSet = targetEx.sets[targetEx.sets.length - 1];
      const newSetNumber = targetEx.sets.length + 1;
      targetEx.sets = [
        ...targetEx.sets,
        {
          id: `set-${Date.now()}-${newSetNumber}`,
          setNumber: newSetNumber,
          reps: prevSet ? prevSet.reps : 10,
          weightKg: prevSet ? prevSet.weightKg : 0,
          completed: false,
        }
      ];
      updated[exIndex] = targetEx;
      return updated;
    });
  };

  const handleRemoveSet = (exIndex: number, setIndex: number) => {
    setSessionExercises(prev => {
      const updated = [...prev];
      const targetEx = { ...updated[exIndex] };
      if (targetEx.sets.length <= 1) return prev;
      targetEx.sets = targetEx.sets.filter((_, idx) => idx !== setIndex).map((s, idx) => ({
        ...s,
        setNumber: idx + 1
      }));
      updated[exIndex] = targetEx;
      return updated;
    });
  };

  const handleAddExerciseToSession = (exercise: Exercise) => {
    setSessionExercises(prev => [
      ...prev,
      {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        category: exercise.category,
        restSec: exercise.defaultRestSec,
        sets: [
          { id: `s-${Date.now()}-1`, setNumber: 1, reps: exercise.defaultReps, weightKg: exercise.defaultWeightKg, completed: false },
          { id: `s-${Date.now()}-2`, setNumber: 2, reps: exercise.defaultReps, weightKg: exercise.defaultWeightKg, completed: false },
          { id: `s-${Date.now()}-3`, setNumber: 3, reps: exercise.defaultReps, weightKg: exercise.defaultWeightKg, completed: false },
        ]
      }
    ]);
    setShowAddExercisePicker(false);
  };

  const handleRemoveExercise = (exIndex: number) => {
    if (sessionExercises.length <= 1) return;
    setSessionExercises(prev => prev.filter((_, idx) => idx !== exIndex));
  };

  const totalCompletedSets = sessionExercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const totalRepsDone = sessionExercises.reduce(
    (acc, ex) => acc + ex.sets.filter(s => s.completed).reduce((sAcc, s) => sAcc + Number(s.reps || 0), 0),
    0
  );
  const totalVolumeMovedKg = sessionExercises.reduce(
    (acc, ex) => acc + ex.sets.filter(s => s.completed).reduce((sAcc, s) => sAcc + (Number(s.reps || 0) * Number(s.weightKg || 0)), 0),
    0
  );

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    if (totalRepsDone === 0 && totalCompletedSets === 0) {
      if (!window.confirm('No sets marked completed yet. Do you still want to finish this session?')) {
        return;
      }
    }

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        colors: ['#ec4899', '#10b981', '#f43f5e', '#34d399', '#ffffff'],
        origin: { y: 0.6 },
      });
    } catch {}

    soundFX.playVictory(soundEnabled);

    onFinishWorkout({
      title: workoutTitle,
      durationSeconds: Math.max(elapsedSec, 1),
      exercises: sessionExercises,
      totalReps: totalRepsDone,
      totalVolumeKg: Math.round(totalVolumeMovedKg),
      notes: workoutNotes,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-100 text-zinc-900 overflow-hidden">
      {/* Top Session Bar (Solid Clean Colors) */}
      <div className="bg-white border-b-2 border-zinc-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-zinc-900 tracking-tight flex items-center space-x-2">
              <span>{workoutTitle}</span>
              {routine?.difficulty && (
                <span className="text-[10px] bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded-md font-bold">
                  {routine.difficulty}
                </span>
              )}
            </h2>
            <div className="flex items-center space-x-3 text-xs text-zinc-600 font-mono-numbers font-bold">
              <span className="flex items-center space-x-1 text-emerald-700">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTimer(elapsedSec)}</span>
              </span>
              <span>•</span>
              <span className="text-pink-600">{totalCompletedSets} sets</span>
              <span>•</span>
              <span className="text-emerald-700">{totalRepsDone} reps</span>
              <span>•</span>
              <span>
                {weightUnit === 'lbs' ? Math.round(totalVolumeMovedKg * 2.20462) : Math.round(totalVolumeMovedKg)} {weightUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleFinish}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all transform active:scale-95 flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Finish</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-xl transition-colors"
            title="Minimize"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rest Timer Banner */}
      {isRestActive && (
        <div className="bg-emerald-50 border-b-2 border-emerald-300 px-4 py-2.5 flex items-center justify-between text-xs animate-in slide-in-from-top">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <span className="text-emerald-900 font-extrabold">Active Rest Interval:</span>
            <span className="font-mono text-base font-black text-emerald-800">{formatTimer(restRemaining)}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setRestRemaining(prev => prev + 30)}
              className="px-2.5 py-1 bg-white hover:bg-zinc-100 text-zinc-800 rounded-lg font-bold text-[11px] border border-zinc-300 shadow-2xs"
            >
              +30s
            </button>
            <button
              onClick={() => setRestRemaining(prev => Math.max(0, prev - 15))}
              className="px-2.5 py-1 bg-white hover:bg-zinc-100 text-zinc-800 rounded-lg font-bold text-[11px] border border-zinc-300 shadow-2xs"
            >
              -15s
            </button>
            <button
              onClick={() => {
                setIsRestActive(false);
                setRestRemaining(0);
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-black text-[11px] shadow-xs"
            >
              <FastForward className="w-3 h-3" />
              <span>Skip</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Exercises List Container */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4 max-w-4xl mx-auto w-full">
        {sessionExercises.map((exSession, exIdx) => {
          const exerciseDetail = EXERCISE_DATABASE.find(e => e.id === exSession.exerciseId);
          const isExpanded = expandedExerciseId === exSession.exerciseId;
          const isEven = exIdx % 2 === 0;

          return (
            <div
              key={`${exSession.exerciseId}-${exIdx}`}
              className={`bg-white border-2 rounded-2xl overflow-hidden shadow-xs transition-colors ${
                isEven ? 'border-pink-300' : 'border-emerald-300'
              }`}
            >
              {/* Exercise Header */}
              <div className="p-3.5 sm:p-4 bg-zinc-50 border-b-2 border-zinc-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-md text-xs font-mono font-black flex items-center justify-center text-white ${
                      isEven ? 'bg-pink-600' : 'bg-emerald-600'
                    }`}>
                      {exIdx + 1}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 tracking-tight">
                      {exSession.exerciseName}
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold text-white ${
                      isEven ? 'bg-pink-600' : 'bg-emerald-600'
                    }`}>
                      {exSession.category}
                    </span>
                  </div>
                  {exerciseDetail && (
                    <p className="text-[11px] text-zinc-600 mt-0.5 ml-8 font-medium">
                      Target: {exerciseDetail.targetMuscles.join(', ')} • Rest: {exSession.restSec}s
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-1.5">
                  {exerciseDetail && (
                    <button
                      onClick={() => setExpandedExerciseId(isExpanded ? null : exSession.exerciseId)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-800 text-xs font-bold flex items-center space-x-1 shadow-2xs"
                      title="Instructions & non-equipment cues"
                    >
                      <Armchair className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px]">Visuals & Mod</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                  {sessionExercises.length > 1 && (
                    <button
                      onClick={() => handleRemoveExercise(exIdx)}
                      className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                      title="Remove exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Form & Visual Diagrams Dropdown */}
              {isExpanded && exerciseDetail && (
                <div className="p-4 bg-zinc-50 border-b-2 border-zinc-200 space-y-3">
                  <ExerciseVisualDiagram exercise={exerciseDetail} />
                </div>
              )}

              {/* Sets Table */}
              <div className="p-3 sm:p-4">
                <div className="grid grid-cols-12 gap-2 text-[11px] font-black text-zinc-500 uppercase tracking-wider mb-2 px-1">
                  <div className="col-span-2 text-center">Set</div>
                  <div className="col-span-4 text-center">Weight ({weightUnit})</div>
                  <div className="col-span-3 text-center">Reps</div>
                  <div className="col-span-3 text-center">Done</div>
                </div>

                <div className="space-y-2">
                  {exSession.sets.map((set, sIdx) => {
                    const isDone = set.completed;

                    return (
                      <div
                        key={set.id}
                        className={`grid grid-cols-12 gap-2 items-center p-2.5 rounded-xl border-2 transition-all ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-400'
                            : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {/* Set Number */}
                        <div className="col-span-2 flex items-center justify-center space-x-1">
                          <span className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-800'
                          }`}>
                            {set.setNumber}
                          </span>
                        </div>

                        {/* Weight input */}
                        <div className="col-span-4 flex items-center justify-center">
                          <div className="relative w-full max-w-[110px]">
                            <input
                              type="number"
                              min="0"
                              step={weightUnit === 'lbs' ? '5' : '2.5'}
                              value={displayWeight(set.weightKg) || ''}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                handleUpdateSet(exIdx, sIdx, 'weightKg', parseWeightToKg(val));
                              }}
                              className={`w-full bg-white border-2 text-center font-mono font-bold text-sm py-1.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                isDone ? 'border-emerald-400 text-emerald-900' : 'border-zinc-300 text-zinc-900'
                              }`}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        {/* Reps input */}
                        <div className="col-span-3 flex items-center justify-center">
                          <div className="relative w-full max-w-[80px]">
                            <input
                              type="number"
                              min="1"
                              value={set.reps || ''}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10) || 0;
                                handleUpdateSet(exIdx, sIdx, 'reps', val);
                              }}
                              className={`w-full bg-white border-2 text-center font-mono font-bold text-sm py-1.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                isDone ? 'border-emerald-400 text-emerald-900' : 'border-zinc-300 text-zinc-900'
                              }`}
                              placeholder="10"
                            />
                          </div>
                        </div>

                        {/* Completion Checkmark & Delete set action */}
                        <div className="col-span-3 flex items-center justify-center space-x-1.5">
                          <button
                            onClick={() => handleToggleSet(exIdx, sIdx)}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all transform active:scale-90 font-bold ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white hover:bg-pink-50 text-zinc-400 hover:text-pink-600 border-2 border-zinc-200 hover:border-pink-400'
                            }`}
                          >
                            <Check className={`w-5 h-5 ${isDone ? 'stroke-[3]' : 'stroke-[2]'}`} />
                          </button>

                          {exSession.sets.length > 1 && (
                            <button
                              onClick={() => handleRemoveSet(exIdx, sIdx)}
                              className="p-1 text-zinc-400 hover:text-rose-600 transition-colors"
                              title="Delete set"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Set Button */}
                <div className="mt-3 flex justify-start">
                  <button
                    onClick={() => handleAddSet(exIdx)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-100 hover:bg-pink-200 border border-pink-300 text-xs font-bold text-pink-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Set</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Exercise CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <button
            onClick={() => setShowAddExercisePicker(true)}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 border-dashed border-emerald-400 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-sm transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Add Another Exercise to Session</span>
          </button>

          <button
            onClick={handleFinish}
            className="bg-pink-600 hover:bg-pink-700 text-white font-black text-sm py-3 px-6 rounded-xl shadow-xs transition-all transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Complete & Log Workout</span>
          </button>
        </div>

        {/* Workout Notes */}
        <div className="bg-white border-2 border-zinc-200 rounded-2xl p-4 shadow-xs">
          <label className="block text-xs font-black text-zinc-600 uppercase tracking-wider mb-1.5">
            Workout Notes / RPE (Optional)
          </label>
          <textarea
            value={workoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
            placeholder="E.g., Used wall push-ups today, felt great on shoulders, high energy..."
            rows={2}
            className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-pink-500 rounded-xl p-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Add Exercise Picker Modal */}
      {showAddExercisePicker && (
        <div className="fixed inset-0 z-60 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-zinc-300 rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b-2 border-zinc-100 flex items-center justify-between bg-zinc-50">
              <h3 className="font-extrabold text-base text-zinc-900">Add Exercise to Active Session</h3>
              <button
                onClick={() => setShowAddExercisePicker(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 border-b-2 border-zinc-100 bg-white">
              <input
                type="text"
                value={exerciseSearch}
                onChange={(e) => setExerciseSearch(e.target.value)}
                placeholder="Search exercise by name or household mod (e.g. Chair, Wall)..."
                className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-pink-500 rounded-xl px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
                autoFocus
              />
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {EXERCISE_DATABASE.filter(ex =>
                ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                ex.category.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                ex.accessibleAlternative.title.toLowerCase().includes(exerciseSearch.toLowerCase())
              ).map(ex => (
                <button
                  key={ex.id}
                  onClick={() => handleAddExerciseToSession(ex)}
                  className="w-full text-left p-3 rounded-xl hover:bg-pink-50 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-pink-600">
                      {ex.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500">
                      {ex.category} • Mod: {ex.accessibleAlternative.title}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-pink-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
