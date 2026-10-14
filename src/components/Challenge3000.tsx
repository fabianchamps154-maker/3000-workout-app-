import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Target, 
  Calendar, 
  Award, 
  CheckCircle, 
  Lock, 
  TrendingUp, 
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CompletedWorkoutLog, UserProfile } from '../types';

interface Challenge3000Props {
  logs: CompletedWorkoutLog[];
  profile: UserProfile;
  onUpdateGoal: (newGoal: number) => void;
  onStartQuickWorkout: () => void;
}

export const Challenge3000: React.FC<Challenge3000Props> = ({
  logs,
  profile,
  onUpdateGoal,
  onStartQuickWorkout,
}) => {
  const [customGoalInput, setCustomGoalInput] = useState(profile.monthlyGoal.toString());
  const [showGoalEditor, setShowGoalEditor] = useState(false);

  // Totals
  const totalReps = logs.reduce((acc, log) => acc + (log.totalReps || 0), 0);
  const totalVolumeKg = logs.reduce((acc, log) => acc + (log.totalVolumeKg || 0), 0);
  const totalCalories = logs.reduce((acc, log) => acc + (log.estimatedCalories || 0), 0);
  const totalMinutes = Math.round(logs.reduce((acc, log) => acc + (log.durationSeconds || 0), 0) / 60);

  const goal = profile.monthlyGoal || 3000;
  const progressPercent = Math.min(Math.round((totalReps / goal) * 100), 100);
  const repsRemaining = Math.max(0, goal - totalReps);

  // Milestones
  const milestones = [
    {
      level: 1,
      name: 'Rookie 500',
      reps: 500,
      reward: 'Bronze Badge',
      description: 'First 500 reps logged in the system. The foundation is poured.',
      unlocked: totalReps >= 500,
      icon: '🥉',
    },
    {
      level: 2,
      name: 'Centurion 1,000',
      reps: 1000,
      reward: 'Silver Badge',
      description: '1,000 clean repetitions. Exceptional momentum and habit formation.',
      unlocked: totalReps >= 1000,
      icon: '🥈',
    },
    {
      level: 3,
      name: 'Titan 2,000',
      reps: 2000,
      reward: 'Gold Badge',
      description: 'Two thousand reps. Muscular endurance and work capacity are peaking.',
      unlocked: totalReps >= 2000,
      icon: '🥇',
    },
    {
      level: 4,
      name: 'The 3000 Champion',
      reps: 3000,
      reward: 'Diamond Trophy',
      description: 'The pinnacle of volume training. 3,000 reps achieved this month.',
      unlocked: totalReps >= 3000,
      icon: '👑',
    },
  ];

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customGoalInput);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateGoal(parsed);
      setShowGoalEditor(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#090b10] via-[#07080d] to-[#040507] border border-zinc-800/80 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 3000 VOLUME PHILOSOPHY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-display tracking-wider">3000 Milestone Club</span>
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            In fitness, consistency beats intensity. The 3000 Challenge transforms abstract workout routines into a tangible, thrilling quest: log <strong>3,000 repetitions</strong> across compound movements, pushups, pullups, and lifts.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartQuickWorkout}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
            >
              Log Reps Now
            </button>

            <button
              onClick={() => setShowGoalEditor(!showGoalEditor)}
              className="px-4 py-2.5 rounded-xl bg-[#0e0f17] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-colors"
            >
              Adjust Target ({goal.toLocaleString()} reps)
            </button>
          </div>

          {showGoalEditor && (
            <form onSubmit={handleSaveGoal} className="pt-2 flex items-center space-x-2 animate-fade-in">
              <input
                type="number"
                min="500"
                step="250"
                value={customGoalInput}
                onChange={(e) => setCustomGoalInput(e.target.value)}
                className="w-32 bg-[#050609] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black font-bold text-xs"
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Primary Goal Gauge */}
      <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Current Reps Progress</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              Aggregated across all logged workouts and sets
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {totalReps.toLocaleString()}
            </span>
            <span className="text-zinc-500 text-xs font-mono"> / {goal.toLocaleString()}</span>
            <div className="text-xs font-semibold text-zinc-400">
              {progressPercent}% Complete
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-[#050609] rounded-full overflow-hidden p-0.5 border border-zinc-800/80">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-400 rounded-full transition-all duration-1000 shadow-sm shadow-emerald-500/30"
              style={{ width: `${Math.max(progressPercent, 3)}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
            <span>0</span>
            <span>1,000</span>
            <span>2,000</span>
            <span>{goal.toLocaleString()}</span>
          </div>
        </div>

        {/* Daily Pacing Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-[#0b0c12] border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase font-mono">Remaining</span>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {repsRemaining.toLocaleString()} <span className="text-xs text-zinc-500">reps</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              To hit {goal.toLocaleString()} target
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0c12] border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase font-mono">Recommended Pace</span>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
              ~65 reps <span className="text-xs text-zinc-500">/ day</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Or ~200 reps across 3-4 sessions
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0c12] border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase font-mono">Current Status</span>
            <div className="text-lg font-bold font-mono text-teal-300 mt-1">
              {totalReps >= 3000 ? 'Champion 🏆' : totalReps >= 2000 ? 'Titan Tier' : totalReps >= 1000 ? 'Centurion Tier' : 'Rookie Tier'}
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Next badge at {milestones.find(m => !m.unlocked)?.reps || 'All Unlocked!'}
            </p>
          </div>
        </div>
      </div>

      {/* Milestone Badges & Unlocks */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Hall of Milestones & Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div
              key={m.level}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                m.unlocked
                  ? 'bg-[#08090e] border-emerald-900/50 shadow-lg shadow-black/60'
                  : 'bg-[#06070a] border-zinc-900 opacity-40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.icon}</span>
                  {m.unlocked ? (
                    <span className="flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>UNLOCKED</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-[10px] font-mono font-bold text-zinc-600">
                      <Lock className="w-3 h-3" />
                      <span>LOCKED</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white mt-3">{m.name}</h3>
                <span className="text-xs font-mono text-emerald-400 font-semibold">{m.reps.toLocaleString()} Reps</span>
                <p className="text-xs text-zinc-400 mt-2">{m.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-850 text-[10px] font-mono text-zinc-500">
                Reward: <span className="text-zinc-300 font-semibold">{m.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Companion Metrics towards 3000 */}
      <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Alternative 3000 Metrics</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Lifters and conditioning enthusiasts can also target 30,000 kg volume or 3,000 active calories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#0b0c12] p-4 rounded-2xl border border-zinc-850">
            <div className="flex items-center space-x-1.5 text-teal-400 text-xs font-semibold uppercase font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>3,000 Kcal Burn</span>
            </div>
            <div className="font-mono text-xl font-bold text-white mt-2">
              {totalCalories.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ 3,000 kcal</span>
            </div>
            <div className="w-full bg-[#050609] h-2 rounded-full overflow-hidden mt-3 border border-zinc-800">
              <div 
                className="bg-teal-400 h-full rounded-full" 
                style={{ width: `${Math.min(100, (totalCalories / 3000) * 100)}%` }} 
              />
            </div>
          </div>

          <div className="bg-[#0b0c12] p-4 rounded-2xl border border-zinc-850">
            <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold uppercase font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>30,000 Kg Volume</span>
            </div>
            <div className="font-mono text-xl font-bold text-white mt-2">
              {totalVolumeKg.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ 30,000 kg</span>
            </div>
            <div className="w-full bg-[#050609] h-2 rounded-full overflow-hidden mt-3 border border-zinc-800">
              <div 
                className="bg-emerald-400 h-full rounded-full" 
                style={{ width: `${Math.min(100, (totalVolumeKg / 30000) * 100)}%` }} 
              />
            </div>
          </div>

          <div className="bg-[#0b0c12] p-4 rounded-2xl border border-zinc-850">
            <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-semibold uppercase font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>3,000 Minutes</span>
            </div>
            <div className="font-mono text-xl font-bold text-white mt-2">
              {totalMinutes.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">/ 3,000 min</span>
            </div>
            <div className="w-full bg-[#050609] h-2 rounded-full overflow-hidden mt-3 border border-zinc-800">
              <div 
                className="bg-amber-400 h-full rounded-full" 
                style={{ width: `${Math.min(100, (totalMinutes / 3000) * 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
