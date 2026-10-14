import React from 'react';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Sparkles, 
  TrendingUp,
  Dumbbell
} from 'lucide-react';
import { PersonalRecord } from '../types';

interface WorkoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  durationSeconds: number;
  totalReps: number;
  totalVolumeKg: number;
  newPRs?: PersonalRecord[];
  newMilestones?: string[];
  weightUnit: 'kg' | 'lbs';
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  isOpen,
  onClose,
  title,
  durationSeconds,
  totalReps,
  totalVolumeKg,
  newPRs = [],
  newMilestones = [],
  weightUnit,
}) => {
  if (!isOpen) return null;

  const displayVolume = weightUnit === 'lbs' 
    ? `${Math.round(totalVolumeKg * 2.20462).toLocaleString()} lbs` 
    : `${totalVolumeKg.toLocaleString()} kg`;

  const minutes = Math.round(durationSeconds / 60);

  return (
    <div className="fixed inset-0 z-60 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border-2 border-zinc-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center space-y-6">
        {/* Solid badge */}
        <div className="w-16 h-16 rounded-2xl bg-pink-600 flex items-center justify-center mx-auto shadow-xs text-white font-black">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-pink-700 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            Workout Completed
          </span>
          <h2 className="text-2xl font-black text-zinc-900 mt-2 tracking-tight">{title}</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">Outstanding discipline! Your metrics have been logged.</p>
        </div>

        {/* Big numbers summary (Solid Clean Cards) */}
        <div className="grid grid-cols-3 gap-2 bg-zinc-50 border-2 border-zinc-200 rounded-2xl p-4 font-mono-numbers">
          <div>
            <div className="text-xs text-zinc-500 uppercase font-black">Reps</div>
            <div className="text-xl font-black text-pink-600 mt-1">+{totalReps}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 uppercase font-black">Time</div>
            <div className="text-xl font-black text-emerald-700 mt-1">{minutes}m</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 uppercase font-black">Volume</div>
            <div className="text-sm font-black text-zinc-900 mt-2 truncate">{displayVolume}</div>
          </div>
        </div>

        {/* PRs Achieved (Solid Emerald) */}
        {newPRs.length > 0 && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-left space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-950 font-black text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Personal Records Smashed!</span>
            </div>
            <div className="space-y-1 text-xs text-zinc-700">
              {newPRs.map((pr, idx) => (
                <div key={idx} className="flex justify-between font-mono">
                  <span className="font-bold">{pr.exerciseName}:</span>
                  <span className="text-emerald-800 font-black">
                    {weightUnit === 'lbs' ? Math.round(pr.weightKg * 2.20462) : pr.weightKg} {weightUnit} × {pr.reps} reps
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3 rounded-2xl shadow-xs transition-all active:scale-95"
        >
          Done & Return to Dashboard
        </button>
      </div>
    </div>
  );
};
