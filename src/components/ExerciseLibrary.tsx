import React, { useState } from 'react';
import { 
  Search, 
  Dumbbell, 
  Info, 
  Play, 
  Filter, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { EXERCISE_DATABASE, MUSCLE_GROUPS } from '../data/exercises';
import { Exercise, MuscleGroup, EquipmentType } from '../types';

interface ExerciseLibraryProps {
  onQuickStartExercise: (exercise: Exercise) => void;
}

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  onQuickStartExercise,
}) => {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [inspectExercise, setInspectExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    const matchesSearch = 
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.targetMuscles.some(m => m.toLowerCase().includes(search.toLowerCase())) ||
      ex.category.toLowerCase().includes(search.toLowerCase());

    const matchesMuscle = selectedMuscle === 'all' || ex.category === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'all' || ex.equipment === selectedEquipment;

    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const equipmentList: EquipmentType[] = [
    'barbell',
    'dumbbell',
    'bodyweight',
    'cable',
    'machine',
    'kettlebell',
    'cardio'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Exercise Library
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Explore over 60 compound and isolation movements with anatomical cues and technique guides.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search exercises by name, target muscle (e.g. Quads, Triceps, Chest)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#07080d] border border-zinc-850 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 shadow-md"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-3 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Muscle Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedMuscle('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
              selectedMuscle === 'all'
                ? 'bg-zinc-900 text-emerald-400 border border-zinc-800'
                : 'bg-[#08090e] text-zinc-400 border border-zinc-850 hover:bg-zinc-850 hover:text-white'
            }`}
          >
            All Muscles
          </button>
          {MUSCLE_GROUPS.map((mg) => (
            <button
              key={mg.id}
              onClick={() => setSelectedMuscle(mg.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors shrink-0 capitalize ${
                selectedMuscle === mg.id
                  ? 'bg-zinc-900 text-emerald-400 border border-zinc-800'
                  : 'bg-[#08090e] text-zinc-400 border border-zinc-850 hover:bg-zinc-850 hover:text-white'
              }`}
            >
              {mg.label}
            </button>
          ))}
        </div>

        {/* Equipment Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 pl-1">
            Equipment:
          </span>
          <button
            onClick={() => setSelectedEquipment('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 ${
              selectedEquipment === 'all'
                ? 'bg-zinc-850 text-white font-bold border border-zinc-750'
                : 'bg-[#0a0b12] text-zinc-400 border border-zinc-850 hover:text-white'
            }`}
          >
            All
          </button>
          {equipmentList.map((eq) => (
            <button
              key={eq}
              onClick={() => setSelectedEquipment(eq)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 capitalize ${
                selectedEquipment === eq
                  ? 'bg-zinc-850 text-white font-bold border border-zinc-750'
                  : 'bg-[#0a0b12] text-zinc-400 border border-zinc-850 hover:text-white'
              }`}
            >
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Count */}
      <div className="text-xs text-zinc-500">
        Showing <span className="font-bold text-zinc-300">{filteredExercises.length}</span> exercises
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="group bg-[#08090e] border border-zinc-850 hover:border-zinc-750 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/60"
          >
            <div>
              <div className="flex items-start justify-between gap-2 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-400">
                  {exercise.category} · {exercise.equipment}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {exercise.defaultSets}×{exercise.defaultReps}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">
                {exercise.name}
              </h3>

              <div className="mt-2 flex flex-wrap gap-1">
                {exercise.targetMuscles.map((m, i) => (
                  <span key={i} className="text-[10px] text-zinc-400 bg-[#0d0e15] border border-zinc-850 px-1.5 py-0.5 rounded">
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-xs text-zinc-400 mt-3 line-clamp-2 italic">
                "{exercise.tips}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-850 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500">
                Rest: {exercise.defaultRestSec}s
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setInspectExercise(exercise)}
                  className="p-2 rounded-xl bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  title="View full form & anatomy"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onQuickStartExercise(exercise)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center space-x-1 shadow-md shadow-emerald-950/40 transition-transform hover:scale-105 active:scale-95"
                >
                  <Play className="w-3 h-3 fill-black" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Detail Modal */}
      {inspectExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-[#08090e] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                  {inspectExercise.category} · {inspectExercise.equipment}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {inspectExercise.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectExercise(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Muscles */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Target Muscles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {inspectExercise.targetMuscles.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-[#0d0e15] border border-zinc-800 text-zinc-300 font-medium text-xs">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Execution Instructions:
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-zinc-300 bg-[#050609] p-3.5 rounded-xl border border-zinc-850 leading-relaxed">
                {inspectExercise.instructions.map((step, idx) => (
                  <li key={idx} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>

            {/* Pro Tips */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 leading-relaxed">
              <strong>💡 Performance Cue:</strong> {inspectExercise.tips}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setInspectExercise(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const ex = inspectExercise;
                  setInspectExercise(null);
                  onQuickStartExercise(ex);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-950/40 transition-transform hover:scale-105"
              >
                Start Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
