import React from 'react';
import { 
  Trophy, 
  Flame, 
  Dumbbell, 
  TrendingUp, 
  Play, 
  Clock, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  CalendarDays,
  Bot
} from 'lucide-react';
import { CompletedWorkoutLog, WorkoutRoutine, UserProfile, ActiveWorkoutSession } from '../types';
import { NavTab } from './Navbar';

interface DashboardProps {
  logs: CompletedWorkoutLog[];
  routines: WorkoutRoutine[];
  profile: UserProfile;
  activeSession: ActiveWorkoutSession | null;
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onOpenActiveSession: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  logs,
  routines,
  profile,
  activeSession,
  onStartRoutine,
  onOpenActiveSession,
  onNavigate,
}) => {
  // Calculate total stats
  const totalReps = logs.reduce((acc, log) => acc + (log.totalReps || 0), 0);
  const totalVolume = logs.reduce((acc, log) => acc + (log.totalVolumeKg || 0), 0);
  const totalCalories = logs.reduce((acc, log) => acc + (log.estimatedCalories || 0), 0);
  const totalWorkouts = logs.length;

  const target3000 = profile.monthlyGoal || 3000;
  const progressPercent = Math.min(Math.round((totalReps / target3000) * 100), 100);
  const remainingReps = Math.max(0, target3000 - totalReps);

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    return `${mins} min`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Active Workout In-Progress Banner */}
      {activeSession && (
        <div className="bg-gradient-to-r from-emerald-950/40 via-[#0a0c12] to-[#06070a] border border-emerald-800/40 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Live Workout
                </span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400 font-mono">
                  {Math.floor(activeSession.elapsedSeconds / 60)} min elapsed
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeSession.routineName}
              </h3>
            </div>
          </div>
          <button
            onClick={onOpenActiveSession}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Resume Workout</span>
          </button>
        </div>
      )}

      {/* Hero: The 3000 Milestone Gauge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0b12] via-[#07080e] to-[#040507] border border-zinc-800/80 p-6 sm:p-8 shadow-2xl">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE 3000 MILESTONE CHALLENGE</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Race to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 font-display tracking-wider">3,000 REPS</span>
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                Log compound repetitions, conquer high-volume workout routines, and forge ironclad discipline. Track every rep, kilo, and calorie toward your 3000 Club status.
              </p>
            </div>

            {/* Progress Bar with Milestones */}
            <div className="pt-2 space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-zinc-300 uppercase font-mono tracking-wider">
                  Monthly Rep Milestone
                </span>
                <div className="text-right">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">
                    {totalReps.toLocaleString()}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono"> / {target3000.toLocaleString()} reps</span>
                </div>
              </div>

              {/* Bar */}
              <div className="h-3.5 w-full bg-[#050609] rounded-full overflow-hidden p-0.5 border border-zinc-800/80">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-400 rounded-full transition-all duration-1000 shadow-sm shadow-emerald-500/30"
                  style={{ width: `${Math.max(progressPercent, 3)}%` }}
                />
              </div>

              {/* Milestone Checkpoints */}
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-1">
                <span className={totalReps >= 500 ? 'text-emerald-400 font-bold' : ''}>
                  500<span className="hidden sm:inline"> (Rookie)</span>
                </span>
                <span className={totalReps >= 1000 ? 'text-emerald-400 font-bold' : ''}>
                  1,000<span className="hidden sm:inline"> (Centurion)</span>
                </span>
                <span className={totalReps >= 2000 ? 'text-emerald-400 font-bold' : ''}>
                  2,000<span className="hidden sm:inline"> (Titan)</span>
                </span>
                <span className={totalReps >= 3000 ? 'text-amber-400 font-bold' : ''}>
                  3,000<span className="hidden sm:inline"> (Champion 🏆)</span><span className="sm:hidden"> 🏆</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('challenge')}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 font-semibold text-xs flex items-center space-x-2 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>View 3000 Badges</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>

              <span className="text-[11px] text-zinc-400">
                {remainingReps > 0 
                  ? `${remainingReps.toLocaleString()} reps remaining to goal` 
                  : '🎉 3,000 Rep Milestone achieved this month!'}
              </span>
            </div>
          </div>

          {/* Quick Metric Cards Widget */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-[#08090e]/80 border border-zinc-850 rounded-2xl p-4 hover:border-zinc-800 transition-all">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider font-mono">Volume</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="mt-2">
                <div className="font-mono text-2xl font-extrabold text-white">
                  {(totalVolume / 1000).toFixed(1)}k <span className="text-xs font-normal text-zinc-500">kg</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  {(totalVolume * 2.20462).toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs total
                </div>
              </div>
            </div>

            <div className="bg-[#08090e]/80 border border-zinc-850 rounded-2xl p-4 hover:border-zinc-800 transition-all">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider font-mono">Streak</span>
                <Flame className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="mt-2">
                <div className="font-mono text-2xl font-extrabold text-amber-400">
                  {profile.streakDays} <span className="text-xs font-normal text-zinc-500">days</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  Consistent training
                </div>
              </div>
            </div>

            <div className="bg-[#08090e]/80 border border-zinc-850 rounded-2xl p-4 hover:border-zinc-800 transition-all">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider font-mono">Calories</span>
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="mt-2">
                <div className="font-mono text-2xl font-extrabold text-white">
                  {totalCalories.toLocaleString()} <span className="text-xs font-normal text-zinc-500">kcal</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  Active burn
                </div>
              </div>
            </div>

            <div className="bg-[#08090e]/80 border border-zinc-850 rounded-2xl p-4 hover:border-zinc-800 transition-all">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider font-mono">Workouts</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <div className="mt-2">
                <div className="font-mono text-2xl font-extrabold text-white">
                  {totalWorkouts} <span className="text-xs font-normal text-zinc-500">sessions</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  Logged in history
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Coach Goals & Progress Snapshot Card */}
      <div 
        onClick={() => onNavigate('coach')}
        className="cursor-pointer bg-gradient-to-r from-emerald-950/40 via-[#08090e] to-teal-950/20 border border-emerald-900/40 hover:border-emerald-700/60 rounded-2xl p-4 shadow-lg transition-all active:scale-[0.99] flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>AI Goals & Progress Intelligence</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Personal AI Coach & USDA-Verified Food Scanner
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
              Talk with your strength coach or snap a meal to scan macros with USDA nutrition.
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-lg bg-[#0e0f17] border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Recommended Routines Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Dumbbell className="w-4 h-4 text-emerald-400" />
              <span>Recommended Routines</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Programs designed to maximize reps and athletic conditioning.
            </p>
          </div>
          <button
            onClick={() => onNavigate('routines')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>View All ({routines.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.slice(0, 3).map((routine) => (
            <div
              key={routine.id}
              className="group bg-[#08090e] border border-zinc-850 hover:border-zinc-750 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
            >
              <div>
                <div className="flex items-baseline justify-between text-xs text-zinc-400">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                    {routine.difficulty} · {routine.category}
                  </span>
                  <div className="flex items-center space-x-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{routine.durationMinutes}m</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">
                  {routine.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {routine.description}
                </p>

                {/* Exercises Preview Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {routine.exercises.slice(0, 3).map((ex, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] bg-[#0d0e15] border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md"
                    >
                      {ex.exerciseName}
                    </span>
                  ))}
                  {routine.exercises.length > 3 && (
                    <span className="text-[10px] text-zinc-500 py-0.5 px-1">
                      +{routine.exercises.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-850/80 flex items-center justify-between">
                <div className="text-[11px] text-emerald-400 font-mono font-medium">
                  +{routine.target3000Score} pts / reps
                </div>

                <button
                  onClick={() => onStartRoutine(routine)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
                >
                  <Play className="w-3 h-3 fill-black" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workout History & Tools Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Workouts Log */}
        <div className="lg:col-span-8 bg-[#08090e] border border-zinc-850 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <CalendarDays className="w-4 h-4 text-emerald-400" />
              <span>Recent Workout Logs</span>
            </h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Full History
            </button>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-xs">
              No workouts logged yet. Start your first session above!
            </div>
          ) : (
            <div className="space-y-2.5">
              {logs.slice(0, 3).map((log) => (
                <div
                  key={log.id}
                  className="bg-[#0b0c12]/70 hover:bg-[#0e0f17] border border-zinc-850 rounded-xl p-3.5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                        {formatDate(log.date)}
                      </span>
                      <span className="text-zinc-600">·</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{log.routineName}</h4>
                    </div>
                    {log.notes && (
                      <p className="text-xs text-zinc-400 mt-1 italic">
                        "{log.notes}"
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:flex sm:items-center sm:space-x-4 text-xs font-mono text-zinc-300 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-850/60 shrink-0 text-center sm:text-right">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Time</span>
                      <span className="font-semibold text-white whitespace-nowrap">{formatTime(log.durationSeconds)}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Reps</span>
                      <span className="text-emerald-400 font-bold whitespace-nowrap">{log.totalReps}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Volume</span>
                      <span className="font-semibold text-white whitespace-nowrap">{log.totalVolumeKg.toLocaleString()} <span className="text-[10px] text-zinc-500">kg</span></span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Cal</span>
                      <span className="text-teal-400 font-semibold whitespace-nowrap">{log.estimatedCalories}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tools & Calculators Sidebar */}
        <div className="lg:col-span-4 bg-[#08090e] border border-zinc-850 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Training Utilities</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Precision calculations to optimize your compound lifts and warmups.
            </p>

            <div className="mt-4 space-y-2">
              <div 
                onClick={() => onNavigate('tools')}
                className="cursor-pointer p-3 rounded-xl bg-[#0b0c12] hover:bg-[#11131a] border border-zinc-850 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">1RM Calculator</div>
                  <div className="text-[10px] text-zinc-400">Estimate max squat, bench, deadlift</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              <div 
                onClick={() => onNavigate('tools')}
                className="cursor-pointer p-3 rounded-xl bg-[#0b0c12] hover:bg-[#11131a] border border-zinc-850 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">Barbell Plate Loader</div>
                  <div className="text-[10px] text-zinc-400">Exact Olympic plate configuration</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              <div 
                onClick={() => onNavigate('tools')}
                className="cursor-pointer p-3 rounded-xl bg-[#0b0c12] hover:bg-[#11131a] border border-zinc-850 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">HIIT Rest Interval Timer</div>
                  <div className="text-[10px] text-zinc-400">Audio chimes & countdown presets</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-850 text-center">
            <span className="text-[10px] text-zinc-500 font-mono">
              3000 Workout • Discipline & Volume
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
