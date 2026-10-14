import React, { useState } from 'react';
import { 
  Zap, 
  Flame, 
  Dumbbell, 
  Trophy, 
  Clock, 
  Calendar, 
  Play, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  Sparkles,
  Armchair,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { CompletedWorkout, Routine, UserStats } from '../types';
import { PRESET_ROUTINES, CHALLENGE_MILESTONES } from '../data/routines';
import { EXERCISE_DATABASE } from '../data/exercises';
import { ExerciseVisualDiagram } from './ExerciseVisualDiagram';

interface DashboardProps {
  stats: UserStats;
  recentWorkouts: CompletedWorkout[];
  onStartRoutine: (routine: Routine) => void;
  onStartQuickWorkout: () => void;
  onNavigateTab: (tab: string) => void;
  onQuickLogReps: (reps: number, label: string) => void;
  onOpenBodyProfileModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  recentWorkouts,
  onStartRoutine,
  onStartQuickWorkout,
  onNavigateTab,
  onQuickLogReps,
  onOpenBodyProfileModal,
}) => {
  const [quickRepsInput, setQuickRepsInput] = useState<number>(20);
  const [quickRepsExercise, setQuickRepsExercise] = useState<string>('Chair Stands');
  
  // Interactive visual movement showcase on the dashboard
  const [selectedVisualExId, setSelectedVisualExId] = useState<string>('chair-sit-to-stand');

  const targetReps = 3000;
  const progressRatio = Math.min(1, stats.totalReps / targetReps);
  const progressPercent = Math.min(100, Math.round(progressRatio * 100));
  const remainingReps = Math.max(0, targetReps - stats.totalReps);
  const profile = stats.profile;

  const nextMilestone = CHALLENGE_MILESTONES.find(m => stats.totalReps < m.reps) || CHALLENGE_MILESTONES[CHALLENGE_MILESTONES.length - 1];

  const handleQuickLog = () => {
    if (quickRepsInput > 0) {
      onQuickLogReps(quickRepsInput, `${quickRepsInput} ${quickRepsExercise}`);
    }
  };

  const showcaseExercises = [
    { id: 'chair-sit-to-stand', label: 'Chair Stand', icon: 'Chair' },
    { id: 'wall-push-ups', label: 'Wall Push-Up', icon: 'Wall' },
    { id: 'seated-row', label: 'Towel Row', icon: 'Towel' },
    { id: 'seated-overhead-press', label: 'Bottle Press', icon: 'Bottle' },
    { id: 'seated-knee-lifts', label: 'Knee Lifts', icon: 'Seated' },
    { id: 'lying-glute-bridge', label: 'Bed Bridge', icon: 'Bed' },
  ];

  const activeVisualExercise = EXERCISE_DATABASE.find(e => e.id === selectedVisualExId) || EXERCISE_DATABASE[0];

  return (
    <div className="space-y-4 pb-6">
      {/* Hero Banner (Mobile App Size) */}
      <div className="rounded-2xl bg-white border-2 border-zinc-200 p-4 shadow-xs">
        <div className="space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black border border-pink-300">
            <Sparkles className="w-3 h-3 text-pink-600" />
            <span>3000-REP TRAINING MATRIX</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-snug">
            Train Stronger. <span className="text-pink-600 block sm:inline">Accessible For All.</span>
          </h1>

          <p className="text-zinc-600 text-xs leading-relaxed font-medium">
            Visual workout cues, non-equipment modifications for seniors, and body type calibration.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onStartRoutine(PRESET_ROUTINES[0])}
              className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs transition-transform active:scale-95 flex items-center justify-center space-x-1.5 text-center"
            >
              <Armchair className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Chair Routine</span>
            </button>
            <button
              onClick={() => onStartRoutine(PRESET_ROUTINES[3] || PRESET_ROUTINES[1])}
              className="py-2.5 px-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-xs transition-transform active:scale-95 flex items-center justify-center space-x-1.5 text-center"
            >
              <Play className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="truncate">Push 3000</span>
            </button>
          </div>
        </div>
      </div>

      {/* Senior & Accessibility Banner (Compact Mobile Card) */}
      <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-3.5 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-xs text-emerald-950">
                  Senior & Chair Friendly
                </span>
                <span className="text-[9px] font-black uppercase bg-white text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-300">
                  Safe
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug font-medium">
                Wall push-ups, chair stands, and towel rows with zero floor lying.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('exercises')}
          className="mt-2.5 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 active:scale-95"
        >
          <span>Explore Non-Equipment Library</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visual Movement Guide Spotlight (Interactive Mobile Carousel) */}
      <div className="rounded-2xl bg-white border-2 border-zinc-200 p-3.5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-pink-600 text-white flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-black text-zinc-900 tracking-tight">
                Visual Technique Guide
              </h2>
              <p className="text-[10px] text-zinc-500 font-medium">
                Illustrated senior & accessible modifications
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('exercises')}
            className="text-[11px] font-black text-pink-600 hover:text-pink-700 flex items-center space-x-0.5"
          >
            <span>All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Horizontal Mobile Scroll Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {showcaseExercises.map((item) => {
            const isSelected = selectedVisualExId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedVisualExId(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all border-2 shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-zinc-50 text-zinc-700 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile SVG Diagram Showcase */}
        <div>
          <ExerciseVisualDiagram 
            key={activeVisualExercise.id} 
            exercise={activeVisualExercise} 
            defaultToAccessible={true}
          />
        </div>
      </div>

      {/* Body Profile Calibration Banner */}
      <div className="rounded-2xl bg-white border-2 border-zinc-200 p-3.5 flex items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 border border-pink-300 flex items-center justify-center shrink-0 font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="font-black text-xs text-zinc-900 truncate">
                {profile?.isPersonalized 
                  ? `${profile.bodyType} • ${profile.bodyWeightKg}kg`
                  : 'Personalize Body Type'}
              </span>
              <span className="text-[9px] font-black uppercase bg-pink-100 text-pink-800 px-1 py-0.2 rounded border border-pink-200 shrink-0">
                Calibrated
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 truncate font-medium">
              Rep pace and volume calibrated to your body
            </p>
          </div>
        </div>

        <button
          onClick={onOpenBodyProfileModal}
          className="px-2.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-black text-xs rounded-lg shadow-xs transition-transform active:scale-95 shrink-0"
        >
          {profile?.isPersonalized ? 'Edit' : 'Setup'}
        </button>
      </div>

      {/* 3000 Rep Milestone Card (Mobile Optimized) */}
      <div className="rounded-2xl bg-white border-2 border-zinc-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-zinc-900 leading-tight">3000 Milestone</h3>
              <p className="text-[10px] text-zinc-500 font-medium">Every rep counts to 3,000</p>
            </div>
          </div>

          <span className="font-mono text-lg font-black text-pink-600">
            {stats.totalReps.toLocaleString()} <span className="text-xs font-bold text-zinc-400">/ 3k</span>
          </span>
        </div>

        {/* Solid Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-zinc-100 h-3.5 rounded-full overflow-hidden p-0.5 border-2 border-zinc-200">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <span className="text-emerald-700 font-black">{progressPercent}% Done</span>
            {remainingReps > 0 ? (
              <span className="text-pink-600 font-black">{remainingReps.toLocaleString()} to go</span>
            ) : (
              <span className="text-emerald-700 font-black">3,000 Complete!</span>
            )}
          </div>
        </div>

        {/* Quick Bank Reps Widget (Mobile Sized) */}
        <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-zinc-800 uppercase flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>Quick Bank Daily Reps</span>
            </span>
            <span className="text-[10px] text-pink-600 font-bold">+ to 3000</span>
          </div>

          <div className="flex gap-1.5">
            <select
              value={quickRepsExercise}
              onChange={(e) => setQuickRepsExercise(e.target.value)}
              className="bg-white border-2 border-zinc-200 focus:border-emerald-600 rounded-lg text-xs text-zinc-900 font-bold px-2 py-1.5 focus:outline-none flex-1 shadow-2xs"
            >
              <option value="Chair Stands">Chair Stands (Squat mod)</option>
              <option value="Wall Push-ups">Wall Push-ups</option>
              <option value="Seated Knee Lifts">Seated Knee Lifts</option>
              <option value="Push-ups">Floor Push-ups</option>
              <option value="Air Squats">Air Squats</option>
            </select>

            <input
              type="number"
              min="5"
              max="500"
              step="5"
              value={quickRepsInput}
              onChange={(e) => setQuickRepsInput(parseInt(e.target.value, 10) || 0)}
              className="w-14 bg-white border-2 border-zinc-200 focus:border-pink-600 rounded-lg text-xs text-center font-black text-pink-600 px-1 py-1.5 focus:outline-none"
            />
          </div>

          <button
            onClick={handleQuickLog}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 text-xs font-black transition-transform active:scale-95 flex items-center justify-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Bank +{quickRepsInput} Reps</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid (Compact 2x2 for Mobile) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Workouts */}
        <div className="bg-white border-2 border-zinc-200 rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] mb-1">
            <span className="font-black uppercase tracking-wider text-pink-700">Workouts</span>
            <div className="p-1.5 rounded-lg bg-pink-100 text-pink-700">
              <Dumbbell className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-zinc-900 font-mono-numbers">
            {stats.totalWorkouts}
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">Completed</p>
        </div>

        {/* Total Reps */}
        <div className="bg-white border-2 border-zinc-200 rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] mb-1">
            <span className="font-black uppercase tracking-wider text-emerald-800">Total Reps</span>
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-emerald-700 font-mono-numbers">
            {stats.totalReps.toLocaleString()}
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">All exercises</p>
        </div>

        {/* Volume Moved */}
        <div className="bg-white border-2 border-zinc-200 rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] mb-1">
            <span className="font-black uppercase tracking-wider text-pink-700">Volume</span>
            <div className="p-1.5 rounded-lg bg-pink-100 text-pink-700">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-base font-black text-zinc-900 font-mono-numbers truncate">
            {stats.weightUnit === 'lbs'
              ? Math.round(stats.totalVolumeKg * 2.20462).toLocaleString()
              : stats.totalVolumeKg.toLocaleString()}
            <span className="text-[10px] font-normal text-pink-700 ml-0.5">{stats.weightUnit}</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">Weight lifted</p>
        </div>

        {/* Streak */}
        <div className="bg-white border-2 border-zinc-200 rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] mb-1">
            <span className="font-black uppercase tracking-wider text-emerald-800">Streak</span>
            <div className="p-1.5 rounded-lg bg-pink-100 text-pink-700">
              <Flame className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
            </div>
          </div>
          <div className="text-xl font-black text-pink-600 font-mono-numbers">
            {stats.streakDays} <span className="text-[11px] font-normal text-emerald-700">days</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">Active streak</p>
        </div>
      </div>

      {/* Featured Routines Header & Mobile Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-zinc-900 tracking-tight flex items-center space-x-1.5">
            <span>Featured Routines</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
          </h2>
          <button
            onClick={() => onNavigateTab('routines')}
            className="text-[11px] font-black text-pink-600 hover:text-pink-700 flex items-center space-x-0.5"
          >
            <span>All ({PRESET_ROUTINES.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {PRESET_ROUTINES.slice(0, 3).map((routine) => {
            const isAccessible = routine.isAccessible;

            return (
              <div
                key={routine.id}
                className={`bg-white border-2 rounded-xl p-3.5 transition-all shadow-xs ${
                  isAccessible ? 'border-emerald-400' : 'border-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    isAccessible
                      ? 'bg-emerald-600 text-white'
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {routine.category}
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] text-zinc-500 font-bold">
                    <Clock className="w-3 h-3" />
                    <span>~{routine.durationMinutes}m</span>
                  </div>
                </div>

                <h3 className="text-sm font-black text-zinc-900">
                  {routine.name}
                </h3>
                <p className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2 leading-snug font-medium">
                  {routine.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-bold">
                    {routine.exercises.length} movements
                  </span>
                  <button
                    onClick={() => onStartRoutine(routine)}
                    className={`px-3 py-1.5 rounded-lg font-black text-xs transition-transform active:scale-95 flex items-center space-x-1 text-white shadow-xs ${
                      isAccessible
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-pink-600 hover:bg-pink-700'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Workouts Log Preview */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-zinc-900 tracking-tight flex items-center space-x-1.5">
            <span>Recent Activity</span>
            <span className="w-2 h-2 rounded-full bg-pink-600" />
          </h2>
          <button
            onClick={() => onNavigateTab('history')}
            className="text-[11px] font-black text-emerald-800 hover:text-emerald-900 flex items-center space-x-0.5"
          >
            <span>Full History</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {recentWorkouts.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-zinc-200 p-5 text-center bg-white">
            <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-black text-zinc-900 text-xs">No workout sessions logged yet</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
              Start your first session above to track your reps and progress.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentWorkouts.slice(0, 3).map((workout) => (
              <div
                key={workout.id}
                className="bg-white border-2 border-zinc-200 rounded-xl p-3 flex items-center justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <h4 className="font-black text-xs text-zinc-900">{workout.title}</h4>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">
                    {new Date(workout.endTime).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })} • {Math.round(workout.durationSeconds / 60)} mins
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-pink-600 font-mono-numbers">
                    +{workout.totalReps} reps
                  </div>
                  <div className="text-[10px] text-emerald-800 font-bold font-mono-numbers">
                    {stats.weightUnit === 'lbs'
                      ? Math.round(workout.totalVolumeKg * 2.20462).toLocaleString()
                      : workout.totalVolumeKg.toLocaleString()}{' '}
                    {stats.weightUnit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
