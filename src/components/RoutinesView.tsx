import React, { useState } from 'react';
import { 
  Dumbbell, 
  Clock, 
  Play, 
  Plus, 
  Filter, 
  Trash2, 
  Info, 
  ChevronRight,
  Flame,
  X,
  UserCheck,
  Armchair,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Routine } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';
import { RoutineBuilderModal } from './RoutineBuilderModal';
import { ExerciseVisualDiagram } from './ExerciseVisualDiagram';

interface RoutinesViewProps {
  routines: Routine[];
  onStartRoutine: (routine: Routine) => void;
  onSaveCustomRoutine: (routine: Routine) => void;
  onDeleteCustomRoutine: (routineId: string) => void;
  weightUnit: 'kg' | 'lbs';
  onOpenBodyProfileModal: () => void;
}

export const RoutinesView: React.FC<RoutinesViewProps> = ({
  routines,
  onStartRoutine,
  onSaveCustomRoutine,
  onDeleteCustomRoutine,
  weightUnit,
  onOpenBodyProfileModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showBuilder, setShowBuilder] = useState(false);
  const [inspectRoutine, setInspectRoutine] = useState<Routine | null>(null);
  const [inspectExpandedExId, setInspectExpandedExId] = useState<string | null>(null);

  const categories = ['All', 'Accessible / Elderly', 'Upper Body', 'Lower Body', 'Push / Pull', 'Full Body', 'Custom'];

  const filteredRoutines = routines.filter((r) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Custom') return r.isCustom;
    if (selectedCategory === 'Accessible / Elderly') return r.isAccessible || r.category.includes('Accessible') || r.category.includes('Elderly');
    return r.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header (Solid Colors) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">Workout Routines</h1>
          <p className="text-zinc-600 text-xs sm:text-sm mt-0.5 font-medium">
            Select a tailored routine, switch to low-impact accessible movements, or design a custom blueprint
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenBodyProfileModal}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs sm:text-sm border-2 border-pink-300 transition-all flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <UserCheck className="w-4 h-4 text-pink-600" />
            <span>Personalize by Body Type</span>
          </button>

          <button
            onClick={() => setShowBuilder(true)}
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Custom</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs (Solid Colors) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, idx) => {
          const isSelected = selectedCategory === cat;
          const isAccessibleTab = cat === 'Accessible / Elderly';

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                isSelected
                  ? isAccessibleTab
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-pink-600 text-white shadow-xs'
                  : 'bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 border-2 border-zinc-200 shadow-2xs'
              }`}
            >
              {isAccessibleTab && <Armchair className="w-3.5 h-3.5" />}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Routines Grid (Solid Clean Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoutines.map((routine, rIdx) => {
          const totalSetsCount = routine.exercises.reduce((acc, e) => acc + e.sets.length, 0);
          const isAccessible = routine.isAccessible || routine.category.includes('Accessible') || routine.category.includes('Elderly');
          const isPinkAccent = rIdx % 2 === 0;

          return (
            <div
              key={routine.id}
              className={`bg-white border-2 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-xs relative ${
                isAccessible
                  ? 'border-emerald-400 hover:border-emerald-500'
                  : routine.personalizedFor
                  ? 'border-emerald-400 hover:border-emerald-500'
                  : isPinkAccent
                  ? 'border-pink-300 hover:border-pink-500'
                  : 'border-zinc-200 hover:border-zinc-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md text-white ${
                      isAccessible 
                        ? 'bg-emerald-600'
                        : isPinkAccent 
                        ? 'bg-pink-600' 
                        : 'bg-emerald-600'
                    }`}>
                      {routine.category}
                    </span>

                    {routine.isCustom && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                        Custom
                      </span>
                    )}

                    {isAccessible && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                        <Armchair className="w-3 h-3 text-emerald-600" />
                        <span>Zero Equipment</span>
                      </span>
                    )}

                    {routine.personalizedFor && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Calibrated
                      </span>
                    )}
                  </div>

                  {routine.isCustom && (
                    <button
                      onClick={() => onDeleteCustomRoutine(routine.id)}
                      className="text-zinc-400 hover:text-rose-500 p-1 rounded-lg"
                      title="Delete routine"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3 className="font-black text-lg text-zinc-900 group-hover:text-pink-600 transition-colors">
                  {routine.name}
                </h3>

                <p className="text-xs text-zinc-600 mt-1 leading-relaxed font-medium line-clamp-2">
                  {routine.description}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {routine.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t-2 border-zinc-100 text-center font-mono-numbers">
                  <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-200">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">Time</span>
                    <span className="text-xs font-black text-zinc-800">~{routine.durationMinutes}m</span>
                  </div>
                  <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-200">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">Movements</span>
                    <span className="text-xs font-black text-zinc-800">{routine.exercises.length}</span>
                  </div>
                  <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-200">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">Sets</span>
                    <span className="text-xs font-black text-pink-600">{totalSetsCount}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Solid Colors) */}
              <div className="mt-5 pt-3 border-t-2 border-zinc-100 flex items-center space-x-2">
                <button
                  onClick={() => {
                    setInspectRoutine(routine);
                    setInspectExpandedExId(routine.exercises[0]?.exerciseId || null);
                  }}
                  className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs border border-zinc-300 transition-colors flex items-center space-x-1 shadow-2xs"
                >
                  <Info className="w-3.5 h-3.5 text-pink-600" />
                  <span>Visual Preview</span>
                </button>

                <button
                  onClick={() => onStartRoutine(routine)}
                  className={`flex-1 px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center justify-center space-x-1.5 shadow-xs active:scale-95 text-white ${
                    isAccessible
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : isPinkAccent
                      ? 'bg-pink-600 hover:bg-pink-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Routine</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Detail Modal with Visual Guide Previews */}
      {inspectRoutine && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-zinc-300 rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b-2 border-zinc-200 flex items-center justify-between bg-zinc-50">
              <div>
                <h3 className="font-black text-lg text-zinc-900">{inspectRoutine.name}</h3>
                <p className="text-xs text-zinc-500 font-medium">
                  {inspectRoutine.category} • {inspectRoutine.difficulty} • ~{inspectRoutine.durationMinutes} mins
                </p>
              </div>
              <button
                onClick={() => setInspectRoutine(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-xl hover:bg-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-xl border-2 border-zinc-200 font-medium">
                {inspectRoutine.description}
              </p>

              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-zinc-800 uppercase tracking-wider">
                  Exercise Movements & Visual Previews ({inspectRoutine.exercises.length})
                </h4>
                <span className="text-[11px] text-zinc-500 font-medium">Click any exercise to view diagrams</span>
              </div>

              <div className="space-y-3">
                {inspectRoutine.exercises.map((rex, idx) => {
                  const exData = EXERCISE_DATABASE.find(e => e.id === rex.exerciseId);
                  const isExpanded = inspectExpandedExId === rex.exerciseId;
                  const isExEven = idx % 2 === 0;

                  return (
                    <div
                      key={idx}
                      className="bg-white border-2 border-zinc-200 rounded-2xl overflow-hidden shadow-2xs"
                    >
                      <div
                        onClick={() => setInspectExpandedExId(isExpanded ? null : rex.exerciseId)}
                        className="p-3.5 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`w-5 h-5 rounded text-[11px] font-mono font-black text-white flex items-center justify-center ${
                              isExEven ? 'bg-pink-600' : 'bg-emerald-600'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="font-black text-sm text-zinc-900">
                              {exData ? exData.name : rex.exerciseId}
                            </span>
                            {exData?.isElderlyFriendly && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300">
                                Gentle
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-600 mt-0.5 ml-7 font-medium">
                            Target: {exData?.targetMuscles.join(', ')} • Rest: {rex.restSec}s
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono font-black text-emerald-700">
                            {rex.sets.length} sets × {rex.sets[0]?.reps || 10} reps
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                        </div>
                      </div>

                      {/* Expandable Visual Technique Guide inside preview modal */}
                      {isExpanded && exData && (
                        <div className="p-4 border-t-2 border-zinc-200 bg-white">
                          <ExerciseVisualDiagram exercise={exData} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t-2 border-zinc-200 bg-zinc-50 flex justify-end space-x-3">
              <button
                onClick={() => setInspectRoutine(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = inspectRoutine;
                  setInspectRoutine(null);
                  onStartRoutine(target);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center space-x-1.5 shadow-xs active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Routine</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Routine Builder Modal */}
      <RoutineBuilderModal
        isOpen={showBuilder}
        onClose={() => setShowBuilder(false)}
        onSaveRoutine={onSaveCustomRoutine}
        weightUnit={weightUnit}
      />
    </div>
  );
};
