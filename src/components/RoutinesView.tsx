import React, { useState } from 'react';
import { 
  Plus, 
  Play, 
  Clock, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { WorkoutRoutine, RoutineExercise } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';

interface RoutinesViewProps {
  routines: WorkoutRoutine[];
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onSaveRoutine: (routine: WorkoutRoutine) => void;
  onDeleteRoutine: (routineId: string) => void;
}

export const RoutinesView: React.FC<RoutinesViewProps> = ({
  routines,
  onStartRoutine,
  onSaveRoutine,
  onDeleteRoutine,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Routine Form State
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDuration, setNewDuration] = useState(45);
  const [newExercises, setNewExercises] = useState<RoutineExercise[]>([]);
  const [exerciseSearch, setExerciseSearch] = useState('');

  const filteredRoutines = routines.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'custom') return r.isCustom;
    return r.category === filter || r.difficulty.toLowerCase() === filter.toLowerCase();
  });

  const handleAddExerciseToNewRoutine = (exId: string, exName: string) => {
    const exMeta = EXERCISE_DATABASE.find(e => e.id === exId);
    const newEx: RoutineExercise = {
      exerciseId: exId,
      exerciseName: exName,
      targetSets: exMeta?.defaultSets || 3,
      targetReps: exMeta?.defaultReps || 10,
      targetWeightKg: 20,
      restSeconds: exMeta?.defaultRestSec || 60,
    };
    setNewExercises([...newExercises, newEx]);
  };

  const handleRemoveExerciseFromNewRoutine = (idx: number) => {
    setNewExercises(newExercises.filter((_, i) => i !== idx));
  };

  const handleSaveCustomRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newExercises.length === 0) return;

    const customRoutine: WorkoutRoutine = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      tagline: newTagline.trim() || 'Custom Training Protocol',
      description: newDesc.trim() || 'Custom user crafted workout routine.',
      category: 'hybrid',
      difficulty: newDifficulty,
      durationMinutes: newDuration,
      target3000Score: newExercises.reduce((sum, ex) => sum + (ex.targetSets * ex.targetReps), 0),
      isCustom: true,
      exercises: newExercises,
      tags: ['Custom', 'User Created'],
    };

    onSaveRoutine(customRoutine);
    setShowCreateModal(false);
    // Reset form
    setNewName('');
    setNewTagline('');
    setNewDesc('');
    setNewExercises([]);
  };

  const handleDuplicate = (routine: WorkoutRoutine) => {
    const duplicated: WorkoutRoutine = {
      ...routine,
      id: `copy-${Date.now()}`,
      name: `${routine.name} (Copy)`,
      isCustom: true,
      tags: [...routine.tags, 'Custom'],
    };
    onSaveRoutine(duplicated);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Workout Routines
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Choose a signature high-volume protocol or design your own custom routine.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create Custom Routine</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {['all', 'conditioning', 'power', 'legs', 'custom'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-colors shrink-0 ${
              filter === f
                ? 'bg-zinc-900 text-emerald-400 border border-zinc-800'
                : 'bg-[#08090e] text-zinc-400 border border-zinc-850 hover:bg-zinc-850 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All Routines' : f}
          </button>
        ))}
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoutines.map((routine) => (
          <div
            key={routine.id}
            className="bg-[#08090e] border border-zinc-850 hover:border-zinc-750 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/60"
          >
            <div>
              <div className="flex items-start justify-between gap-2 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                  {routine.difficulty} · {routine.category}
                </span>

                <div className="flex items-center space-x-1 text-xs text-zinc-500 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{routine.durationMinutes}m</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mt-2">
                {routine.name}
              </h3>
              <p className="text-xs text-zinc-500 font-medium italic mt-0.5">
                {routine.tagline}
              </p>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                {routine.description}
              </p>

              {/* Exercises List Summary */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {routine.exercises.length} Exercises Included:
                </span>
                <div className="space-y-1">
                  {routine.exercises.slice(0, 4).map((ex, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-zinc-300 bg-[#0d0e15] border border-zinc-850 px-2.5 py-1 rounded-md">
                      <span className="truncate pr-2">{ex.exerciseName}</span>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                        {ex.targetSets} × {ex.targetReps}
                      </span>
                    </div>
                  ))}
                  {routine.exercises.length > 4 && (
                    <div className="text-[11px] text-emerald-400 font-semibold px-1">
                      +{routine.exercises.length - 4} more exercises...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-850 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleDuplicate(routine)}
                  className="p-2 rounded-lg bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Duplicate Routine"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {routine.isCustom && (
                  <button
                    onClick={() => onDeleteRoutine(routine.id)}
                    className="p-2 rounded-lg bg-[#0e0f17] border border-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition-colors"
                    title="Delete Custom Routine"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedRoutine(routine)}
                  className="p-2 rounded-lg bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Inspect Routine"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onStartRoutine(routine)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-3 h-3 fill-black" />
                <span>Start Routine</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Routine Detail Modal */}
      {selectedRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-[#08090e] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                  {selectedRoutine.difficulty} · {selectedRoutine.durationMinutes} mins
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedRoutine.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {selectedRoutine.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedRoutine(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Full Exercise Plan ({selectedRoutine.exercises.length})
              </h4>
              <div className="space-y-2">
                {selectedRoutine.exercises.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0b0c12] border border-zinc-850 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{ex.exerciseName}</div>
                      {ex.notes && <div className="text-[11px] text-zinc-500 italic">{ex.notes}</div>}
                    </div>
                    <div className="text-right font-mono text-xs text-emerald-400 font-bold shrink-0">
                      {ex.targetSets} sets × {ex.targetReps} reps
                      <span className="text-zinc-500 block font-normal text-[10px]">{ex.restSeconds}s rest</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setSelectedRoutine(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const r = selectedRoutine;
                  setSelectedRoutine(null);
                  onStartRoutine(r);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-950/40 transition-transform hover:scale-105"
              >
                Launch Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Custom Routine Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-[#08090e] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Create Custom Routine</h3>
                <p className="text-xs text-zinc-400">Design your personalized sequence and target reps.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomRoutine} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Routine Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., 3000 Core & Arm Crusher"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                    className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="Focus on high repetitions, core stability and arms..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Added Exercises List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Routine Exercises ({newExercises.length}) *
                  </label>
                  <span className="text-[10px] text-zinc-500">At least 1 exercise required</span>
                </div>

                {newExercises.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-zinc-800 text-center text-xs text-zinc-500">
                    No exercises added yet. Use the exercise search below to add exercises.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {newExercises.map((ex, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#0c0d14] border border-zinc-800 flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{ex.exerciseName}</span>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            value={ex.targetSets}
                            onChange={(e) => {
                              const updated = [...newExercises];
                              updated[idx].targetSets = parseInt(e.target.value) || 1;
                              setNewExercises(updated);
                            }}
                            className="w-12 bg-[#050609] border border-zinc-800 rounded px-1.5 py-0.5 text-center text-white"
                          />
                          <span className="text-zinc-500">sets</span>
                          <input
                            type="number"
                            min="1"
                            value={ex.targetReps}
                            onChange={(e) => {
                              const updated = [...newExercises];
                              updated[idx].targetReps = parseInt(e.target.value) || 1;
                              setNewExercises(updated);
                            }}
                            className="w-12 bg-[#050609] border border-zinc-800 rounded px-1.5 py-0.5 text-center text-white"
                          />
                          <span className="text-zinc-500">reps</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveExerciseFromNewRoutine(idx)}
                            className="p-1 text-zinc-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Exercise Selector */}
              <div className="space-y-2 pt-2 border-t border-zinc-850">
                <span className="text-xs font-semibold text-zinc-300 block">
                  Add Exercise From Database
                </span>
                <input
                  type="text"
                  placeholder="Search exercise database..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />

                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {EXERCISE_DATABASE.filter(ex => 
                    ex.name.toLowerCase().includes(exerciseSearch.toLowerCase())
                  ).slice(0, 6).map((ex) => (
                    <div
                      key={ex.id}
                      onClick={() => handleAddExerciseToNewRoutine(ex.id, ex.name)}
                      className="px-3 py-1.5 rounded-lg bg-[#0b0c12] hover:bg-[#11131c] border border-zinc-850 cursor-pointer flex items-center justify-between text-xs text-zinc-300 hover:text-white"
                    >
                      <span>{ex.name}</span>
                      <span className="text-emerald-400 text-xs font-bold">+ Add</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save & Cancel */}
              <div className="flex items-center space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={newExercises.length === 0 || !newName.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-bold text-xs shadow-lg shadow-emerald-950/40 transition-transform hover:scale-105"
                >
                  Save Custom Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
