import React, { useState } from 'react';
import { 
  Trophy, 
  Zap, 
  CheckCircle2, 
  Plus,
  Armchair,
  Medal,
  Shield,
  Award,
  Crown,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserStats } from '../types';
import { CHALLENGE_MILESTONES } from '../data/routines';

interface Challenge3000ViewProps {
  stats: UserStats;
  onQuickLogReps: (reps: number, label: string) => void;
}

export const Challenge3000View: React.FC<Challenge3000ViewProps> = ({
  stats,
  onQuickLogReps,
}) => {
  const [repsCount, setRepsCount] = useState<number>(20);
  const [exerciseName, setExerciseName] = useState<string>('Chair Sit-to-Stands');

  const target = 3000;
  const progressPercent = Math.min(100, Math.round((stats.totalReps / target) * 100));
  const remaining = Math.max(0, target - stats.totalReps);

  const handleBankReps = () => {
    if (repsCount <= 0) return;
    try {
      confetti({
        particleCount: 60,
        spread: 65,
        colors: ['#db2777', '#059669', '#f43f5e', '#10b981'],
        origin: { y: 0.7 },
      });
    } catch {}
    onQuickLogReps(repsCount, `${repsCount} ${exerciseName}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner (Solid Colors) */}
      <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-zinc-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-black border border-pink-300">
            <Trophy className="w-4 h-4 text-pink-600" />
            <span>THE 3000-REP ROAD TO GLORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            The Spartan 3000 Challenge
          </h1>
          <p className="text-zinc-600 text-sm leading-relaxed font-medium">
            3,000 disciplined repetitions across your workouts and daily sets. Conquer the gauntlet, earn elite warrior medals, and build lifelong athletic consistency. Every gentle chair stand, wall push-up, and lift counts equally!
          </p>
        </div>

        {/* Big Progress Gauge (Solid Clean Styling) */}
        <div className="mt-8 bg-zinc-50 border-2 border-zinc-200 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div>
              <span className="text-xs font-black text-zinc-500 uppercase tracking-wider">Overall Milestone Progress</span>
              <div className="text-3xl font-black text-zinc-900 font-mono-numbers mt-1 flex items-baseline space-x-2">
                <span className="text-pink-600">{stats.totalReps.toLocaleString()}</span>
                <span className="text-zinc-400 text-lg">/ 3,000 Reps</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-zinc-500 uppercase tracking-wider">Remaining</span>
              <div className="text-xl font-black text-zinc-700 font-mono-numbers mt-1">
                {remaining === 0 ? (
                  <span className="text-emerald-700 font-black">GOAL COMPLETED!</span>
                ) : (
                  <span>{remaining.toLocaleString()} reps to go</span>
                )}
              </div>
            </div>
          </div>

          {/* Bar (Solid Emerald) */}
          <div className="w-full bg-zinc-200 h-5 rounded-full overflow-hidden p-1 border border-zinc-300">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-black font-mono text-zinc-500 mt-2">
            <span>0 Reps</span>
            <span className="text-pink-600 font-extrabold">{progressPercent}% Achieved</span>
            <span>3,000 Reps</span>
          </div>
        </div>
      </div>

      {/* Quick Bank Log Tool (Solid Colors) */}
      <div className="bg-white border-2 border-zinc-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-zinc-900">Bank Reps Outside Formal Workouts</h3>
            <p className="text-xs text-zinc-500 font-medium">Completed chair stands, wall push-ups, or walking lunges during your day? Bank them directly here!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-black text-zinc-700 uppercase mb-1">Movement</label>
            <select
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-pink-600 rounded-xl px-3 py-2.5 text-sm text-zinc-900 font-bold focus:outline-none"
            >
              <optgroup label="Accessible & Non-Equipment (Senior & Chair Friendly)">
                <option value="Chair Sit-to-Stands">Chair Sit-to-Stands</option>
                <option value="Wall Push-ups">Wall Push-ups</option>
                <option value="Seated Water Bottle Curls">Seated Water Bottle Curls</option>
                <option value="Seated Towel Rows">Seated Towel Rows</option>
                <option value="Countertop Heel Raises">Countertop Heel Raises</option>
                <option value="Seated Knee Lifts">Seated Knee Lifts</option>
                <option value="Bed Pelvic Bridges">Bed Pelvic Bridges</option>
              </optgroup>
              <optgroup label="Standard Bodyweight & Gym">
                <option value="Push-ups">Floor Push-ups</option>
                <option value="Air Squats">Air Squats</option>
                <option value="Pull-ups">Pull-ups</option>
                <option value="Dips">Chair / Bench Dips</option>
                <option value="Walking Lunges">Walking Lunges</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-zinc-700 uppercase mb-1">Reps Completed</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="5"
                max="500"
                step="5"
                value={repsCount}
                onChange={(e) => setRepsCount(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-pink-600 rounded-xl px-3 py-2.5 text-sm font-black font-mono text-pink-600 text-center focus:outline-none"
              />
              <div className="flex space-x-1">
                {[10, 20, 50].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRepsCount(preset)}
                    className="px-2.5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-xs font-mono font-black text-zinc-700 rounded-xl border border-zinc-300"
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleBankReps}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black text-sm py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log +{repsCount} Reps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tiers & Milestone Badges (Solid Cards) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-zinc-900 tracking-tight">Milestone Hall & Badges</h2>
          <p className="text-xs text-zinc-500 font-medium">Unlock these medals as you climb to 3,000 reps and beyond</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHALLENGE_MILESTONES.map((milestone) => {
            const isUnlocked = stats.totalReps >= milestone.reps;

            const getMilestoneIcon = (reps: number) => {
              if (reps <= 250) return <Medal className="w-5 h-5" />;
              if (reps <= 750) return <Shield className="w-5 h-5" />;
              if (reps <= 1500) return <Award className="w-5 h-5" />;
              if (reps <= 2250) return <Crown className="w-5 h-5" />;
              if (reps <= 3000) return <Trophy className="w-5 h-5" />;
              return <Sparkles className="w-5 h-5" />;
            };

            return (
              <div
                key={milestone.reps}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-xs ${
                  isUnlocked
                    ? 'bg-pink-50 border-pink-300'
                    : 'bg-white border-zinc-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                        isUnlocked ? 'bg-pink-600 text-white' : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {getMilestoneIcon(milestone.reps)}
                      </div>
                      <span className="text-xs font-black text-zinc-700">{milestone.badge}</span>
                    </div>
                    <span className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md ${
                      isUnlocked ? 'bg-pink-600 text-white' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {milestone.reps.toLocaleString()} REPS
                    </span>
                  </div>

                  <h3 className="font-black text-base text-zinc-900">{milestone.title}</h3>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed font-medium">{milestone.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs">
                  {isUnlocked ? (
                    <span className="text-emerald-700 font-black flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unlocked & Conquered</span>
                    </span>
                  ) : (
                    <span className="text-zinc-500 font-bold font-mono">
                      {Math.max(0, milestone.reps - stats.totalReps).toLocaleString()} reps remaining
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
