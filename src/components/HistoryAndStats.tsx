import React, { useState } from 'react';
import { 
  History, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  CheckCircle2
} from 'lucide-react';
import { CompletedWorkout, PersonalRecord, UserStats } from '../types';

interface HistoryAndStatsProps {
  history: CompletedWorkout[];
  prs: Record<string, PersonalRecord>;
  stats: UserStats;
  onClearHistory?: () => void;
  weightUnit: 'kg' | 'lbs';
}

export const HistoryAndStats: React.FC<HistoryAndStatsProps> = ({
  history,
  prs,
  stats,
  weightUnit,
}) => {
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'history' | 'prs'>('history');

  const displayWeight = (kg: number) => {
    if (weightUnit === 'lbs') {
      return `${Math.round(kg * 2.20462)} lbs`;
    }
    return `${kg} kg`;
  };

  const handleExportJSON = () => {
    const data = {
      stats,
      history,
      prs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `3000-workout-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">History & Records</h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
            Track your journey, personal records, and cumulative training volume
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-bold border border-zinc-200 transition-colors flex items-center space-x-1.5 shadow-xs"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-zinc-200 pb-3">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 ${
            activeTab === 'history'
              ? 'bg-pink-100 text-pink-700 border border-pink-300 shadow-2xs'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <History className="w-4 h-4 text-pink-600" />
          <span>Completed Workouts ({history.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 ${
            activeTab === 'prs'
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Trophy className="w-4 h-4 text-emerald-600" />
          <span>Personal Records ({Object.keys(prs).length})</span>
        </button>
      </div>

      {/* TAB 1: WORKOUT HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-200 rounded-3xl bg-white">
              <History className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <p className="text-zinc-700 text-sm font-bold">No workouts completed yet</p>
              <p className="text-xs text-zinc-400 mt-1">Complete your first session to see it logged here.</p>
            </div>
          ) : (
            history.map((workout) => {
              const isExpanded = expandedWorkoutId === workout.id;
              const dateStr = new Date(workout.endTime).toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={workout.id}
                  className="bg-white border border-zinc-200 hover:border-pink-300 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <div
                    onClick={() => setExpandedWorkoutId(isExpanded ? null : workout.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-zinc-50/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-bold text-base text-zinc-900">{workout.title}</h3>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-zinc-500 mt-1 ml-6.5 font-mono-numbers">
                        <span>{dateStr}</span>
                        <span>•</span>
                        <span>{Math.round(workout.durationSeconds / 60)} mins</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right font-mono-numbers">
                        <div className="text-sm font-bold text-pink-600">+{workout.totalReps} reps</div>
                        <div className="text-xs text-emerald-700 font-semibold">{displayWeight(workout.totalVolumeKg)} vol</div>
                      </div>
                      <div className="text-zinc-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Workout Breakdown */}
                  {isExpanded && (
                    <div className="bg-zinc-50/70 border-t border-zinc-100 p-4 sm:p-5 space-y-4">
                      {workout.notes && (
                        <div className="p-3 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700">
                          <span className="font-bold text-zinc-500 block mb-0.5">Notes:</span>
                          {workout.notes}
                        </div>
                      )}

                      <div className="space-y-3">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
                          Exercises Performed ({workout.exercises.length})
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {workout.exercises.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="bg-white border border-zinc-200 rounded-xl p-3 shadow-2xs"
                            >
                              <div className="font-bold text-xs text-zinc-900 mb-2">{ex.exerciseName}</div>
                              <div className="flex flex-wrap gap-1.5">
                                {ex.sets.filter(s => s.completed).map((s, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="text-[11px] font-mono bg-zinc-50 text-zinc-700 px-2 py-1 rounded-md border border-zinc-200 font-semibold"
                                  >
                                    Set {sIdx + 1}: {s.reps}r {s.weightKg > 0 ? `@ ${displayWeight(s.weightKg)}` : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: PERSONAL RECORDS */}
      {activeTab === 'prs' && (
        <div className="space-y-4">
          {Object.keys(prs).length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-200 rounded-3xl bg-white">
              <Trophy className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <p className="text-zinc-700 text-sm font-bold">No personal records logged yet</p>
              <p className="text-xs text-zinc-400 mt-1">
                PRs are automatically detected and saved as you log weighted sets in workouts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(prs).map((record) => (
                <div
                  key={record.exerciseId}
                  className="bg-white border border-emerald-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-xs">
                        PR
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {new Date(record.achievedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-zinc-900">{record.exerciseName}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-baseline justify-between font-mono-numbers">
                    <span className="text-2xl font-black text-emerald-700">
                      {displayWeight(record.weightKg)}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">
                      for {record.reps} reps
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
