import React, { useState } from 'react';
import { X, Plus, Trash2, Dumbbell } from 'lucide-react';
import { Difficulty, Routine, RoutineExercise } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';

interface RoutineBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRoutine: (routine: Routine) => void;
  weightUnit: 'kg' | 'lbs';
}

export const RoutineBuilderModal: React.FC<RoutineBuilderModalProps> = ({
  isOpen,
  onClose,
  onSaveRoutine,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Full Body');
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [exercises, setExercises] = useState<RoutineExercise[]>([]);
  const [selectedExIdToAdd, setSelectedExIdToAdd] = useState(EXERCISE_DATABASE[0]?.id || '');

  if (!isOpen) return null;

  const handleAddExercise = () => {
    if (!selectedExIdToAdd) return;
    const base = EXERCISE_DATABASE.find(e => e.id === selectedExIdToAdd);
    if (!base) return;

    const newEx: RoutineExercise = {
      exerciseId: base.id,
      restSec: base.defaultRestSec,
      sets: Array.from({ length: base.defaultSets }).map(() => ({
        reps: base.defaultReps,
        weightKg: base.defaultWeightKg,
      })),
    };

    setExercises([...exercises, newEx]);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleUpdateSetsCount = (index: number, delta: number) => {
    const updated = [...exercises];
    const target = updated[index];
    if (delta > 0) {
      const lastSet = target.sets[target.sets.length - 1];
      target.sets.push({
        reps: lastSet ? lastSet.reps : 10,
        weightKg: lastSet ? lastSet.weightKg : 20,
      });
    } else if (target.sets.length > 1) {
      target.sets.pop();
    }
    setExercises(updated);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a routine name');
      return;
    }
    if (exercises.length === 0) {
      alert('Please add at least one exercise to the routine');
      return;
    }

    const newRoutine: Routine = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Custom workout routine created by user.',
      category,
      difficulty,
      durationMinutes,
      exercises,
      tags: [category, difficulty, `${exercises.length} Exercises`],
      isCustom: true,
    };

    onSaveRoutine(newRoutine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-pink-200 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
              <Dumbbell className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-zinc-900">Create Custom Routine</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-1 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1">Routine Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Heavy Back & Arm Blaster"
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-pink-500 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Focus points, intensity, goals..."
              rows={2}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-pink-500 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-500 rounded-xl px-2 py-2 text-xs text-zinc-900 focus:outline-none"
              >
                <option value="Push">Push</option>
                <option value="Pull">Pull</option>
                <option value="Legs">Legs</option>
                <option value="Full Body">Full Body</option>
                <option value="Core">Core</option>
                <option value="Cardio">Cardio</option>
                <option value="3000 Challenge">3000 Challenge</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-500 rounded-xl px-2 py-2 text-xs text-zinc-900 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1">Duration (Min)</label>
              <input
                type="number"
                min="15"
                max="180"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10) || 45)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-pink-500 rounded-xl px-2 py-2 text-xs text-zinc-900 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Add Exercise Section */}
          <div className="pt-2 border-t border-zinc-100">
            <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">
              Add Exercises
            </label>
            <div className="flex gap-2">
              <select
                value={selectedExIdToAdd}
                onChange={(e) => setSelectedExIdToAdd(e.target.value)}
                className="flex-1 bg-zinc-50 border border-zinc-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none"
              >
                {EXERCISE_DATABASE.map(ex => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name} ({ex.category} • {ex.equipment})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddExercise}
                className="px-3.5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Selected Exercises List */}
          <div className="space-y-2">
            {exercises.map((item, idx) => {
              const exData = EXERCISE_DATABASE.find(e => e.id === item.exerciseId);
              return (
                <div
                  key={`${item.exerciseId}-${idx}`}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-zinc-900">{exData?.name}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      {item.sets.length} sets • Rest {item.restSec}s
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-zinc-200">
                      <button
                        type="button"
                        onClick={() => handleUpdateSetsCount(idx, -1)}
                        className="text-zinc-500 hover:text-zinc-900 text-xs px-1"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-emerald-700">{item.sets.length} sets</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateSetsCount(idx, 1)}
                        className="text-zinc-500 hover:text-zinc-900 text-xs px-1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(idx)}
                      className="p-1 text-zinc-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 flex justify-end space-x-2 bg-zinc-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-black shadow-xs transition-all active:scale-95"
          >
            Save Routine
          </button>
        </div>
      </div>
    </div>
  );
};
