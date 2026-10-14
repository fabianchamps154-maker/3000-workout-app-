import React, { useState } from 'react';
import { 
  Search, 
  Dumbbell, 
  Info, 
  X, 
  Sparkles, 
  Armchair, 
  ShieldCheck, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HeartHandshake
} from 'lucide-react';
import { Exercise, MuscleGroup, EquipmentType } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';
import { ExerciseVisualDiagram } from './ExerciseVisualDiagram';

export const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [quickFilter, setQuickFilter] = useState<'all' | 'seated' | 'elderly' | 'household'>('all');
  const [activeExerciseModal, setActiveExerciseModal] = useState<Exercise | null>(null);
  const [cardExpandedId, setCardExpandedId] = useState<string | null>(null);

  const muscles: (MuscleGroup | 'All')[] = [
    'All',
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Arms',
    'Core',
    'Full Body',
    'Cardio'
  ];

  const equipments: (EquipmentType | 'All')[] = [
    'All',
    'Household / None',
    'Bodyweight',
    'Dumbbell',
    'Barbell',
    'Kettlebell'
  ];

  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    const matchesSearch = 
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.targetMuscles.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ex.accessibleAlternative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.accessibleAlternative.householdItem.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMuscle = selectedMuscle === 'All' || ex.category === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;

    let matchesQuick = true;
    if (quickFilter === 'seated') matchesQuick = Boolean(ex.isSeatedFriendly || ex.accessibleAlternative.isSeatedOrWheelchairFriendly);
    if (quickFilter === 'elderly') matchesQuick = Boolean(ex.isElderlyFriendly || ex.isLowImpact);
    if (quickFilter === 'household') matchesQuick = ex.equipment === 'Household / None' || ex.equipment === 'Bodyweight';

    return matchesSearch && matchesMuscle && matchesEquipment && matchesQuick;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header (Solid Colors) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Exercise Library & Visual Cues
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm mt-0.5 font-medium">
            Illustrated technique diagrams and household non-equipment modifications for elderly and disabled athletes
          </p>
        </div>

        {/* Quick Mode Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setQuickFilter(quickFilter === 'seated' ? 'all' : 'seated')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1.5 shadow-2xs ${
              quickFilter === 'seated'
                ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-emerald-500'
            }`}
          >
            <Armchair className="w-4 h-4" />
            <span>Seated / Wheelchair Ready</span>
          </button>

          <button
            onClick={() => setQuickFilter(quickFilter === 'elderly' ? 'all' : 'elderly')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all flex items-center space-x-1.5 shadow-2xs ${
              quickFilter === 'elderly'
                ? 'bg-pink-600 border-pink-700 text-white shadow-xs'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-pink-500'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Senior Safe & Low-Impact</span>
          </button>
        </div>
      </div>

      {/* Search & Filters (Solid Clean Styling) */}
      <div className="space-y-3.5 bg-white border-2 border-zinc-200 p-5 rounded-2xl shadow-xs">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercise, muscle, or household substitute (e.g. Chair, Wall, Towel, Bottle, Squat)..."
            className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-pink-600 focus:bg-white"
          />
        </div>

        {/* Muscle group filter pill row */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-black text-zinc-600 uppercase tracking-wider">Muscle Group:</span>
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {muscles.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-colors border-2 ${
                  selectedMuscle === m
                    ? 'bg-pink-600 text-white border-pink-700 shadow-xs'
                    : 'bg-zinc-50 text-zinc-700 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment filter pill row */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-black text-zinc-600 uppercase tracking-wider">Equipment Filter:</span>
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {equipments.map(eq => (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-colors border-2 ${
                  selectedEquipment === eq
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-zinc-50 text-zinc-700 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExercises.map(exercise => {
          const isCardExpanded = cardExpandedId === exercise.id;

          return (
            <div
              key={exercise.id}
              className="bg-white border-2 border-zinc-200 hover:border-pink-500 rounded-2xl p-5 group transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-100 text-pink-700 border border-pink-300">
                    {exercise.category}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    {exercise.isElderlyFriendly && (
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Gentle</span>
                      </span>
                    )}
                    {exercise.isSeatedFriendly && (
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center space-x-1">
                        <Armchair className="w-3 h-3 text-emerald-600" />
                        <span>Seated</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 
                  onClick={() => setActiveExerciseModal(exercise)}
                  className="font-black text-base text-zinc-900 hover:text-pink-600 transition-colors cursor-pointer"
                >
                  {exercise.name}
                </h3>

                <div className="mt-2 space-y-1 text-xs">
                  <div className="text-zinc-700 font-bold">
                    <span className="text-zinc-400 font-medium">Target: </span>
                    {exercise.targetMuscles.join(', ')}
                  </div>
                </div>

                {/* Household Non-Equipment Callout Box (Solid Emerald) */}
                <div className="mt-3.5 p-3 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-xs">
                  <div className="font-black text-emerald-900 flex items-center space-x-1.5 mb-1">
                    <Armchair className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>No-Equipment Household Mod:</span>
                  </div>
                  <div className="text-zinc-900 font-black text-xs">
                    {exercise.accessibleAlternative.title}
                  </div>
                  <p className="text-[11px] text-zinc-600 mt-0.5 font-medium">
                    Item: <strong className="text-emerald-950 font-black">{exercise.accessibleAlternative.householdItem}</strong>
                  </p>
                </div>

                {/* Inline Visual Diagram Dropdown if toggled */}
                {isCardExpanded && (
                  <div className="mt-4 pt-3 border-t-2 border-zinc-200">
                    <ExerciseVisualDiagram 
                      exercise={exercise} 
                      defaultToAccessible={Boolean(exercise.isElderlyFriendly || exercise.isSeatedFriendly)}
                    />
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3.5 border-t-2 border-zinc-100 flex items-center justify-between text-xs text-zinc-600 font-bold">
                <span className="font-mono-numbers">
                  {exercise.defaultSets} sets × {exercise.defaultReps} reps
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCardExpandedId(isCardExpanded ? null : exercise.id)}
                    className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-[11px] font-black border border-zinc-300 flex items-center space-x-1 shadow-2xs"
                  >
                    <span>{isCardExpanded ? 'Hide Diagram' : 'Preview'}</span>
                    {isCardExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setActiveExerciseModal(exercise)}
                    className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-[11px] font-black flex items-center space-x-1 shadow-xs transition-all active:scale-95"
                  >
                    <span>Full Cues</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-zinc-200 bg-white rounded-3xl">
          <p className="text-zinc-600 text-sm font-black">No movements matched your filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedMuscle('All');
              setSelectedEquipment('All');
              setQuickFilter('all');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-zinc-200 text-xs font-black text-zinc-800 hover:bg-zinc-300"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Full Exercise Details Modal with Visual Diagram */}
      {activeExerciseModal && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-zinc-300 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b-2 border-zinc-200 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-600 text-white">
                  {activeExerciseModal.category}
                </span>
                <h3 className="font-black text-lg text-zinc-900">{activeExerciseModal.name}</h3>
              </div>
              <button
                onClick={() => setActiveExerciseModal(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-xl hover:bg-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Visual Diagram Component */}
              <ExerciseVisualDiagram
                exercise={activeExerciseModal}
                defaultToAccessible={Boolean(activeExerciseModal.isElderlyFriendly || activeExerciseModal.isSeatedFriendly)}
              />

              <div>
                <h4 className="text-xs font-black text-zinc-600 uppercase tracking-wider mb-2">
                  Target Muscle Groups
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeExerciseModal.targetMuscles.map((tm, idx) => (
                    <span key={idx} className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-300">
                      Primary: {tm}
                    </span>
                  ))}
                  {activeExerciseModal.secondaryMuscles?.map((sm, idx) => (
                    <span key={idx} className="text-xs font-bold bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg border border-zinc-200">
                      Secondary: {sm}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-zinc-600 uppercase tracking-wider mb-2">
                  Standard Exercise Steps
                </h4>
                <ol className="space-y-2 text-xs text-zinc-700 list-decimal list-inside leading-relaxed bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-200 font-medium">
                  {activeExerciseModal.instructions.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {activeExerciseModal.tips.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-zinc-600 uppercase tracking-wider mb-2">
                    Safety & Posture Pro Tips
                  </h4>
                  <div className="space-y-1.5">
                    {activeExerciseModal.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-pink-900 bg-pink-50 border-2 border-pink-200 p-3 rounded-xl font-medium">
                        <Sparkles className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t-2 border-zinc-200 bg-zinc-50 flex justify-end">
              <button
                onClick={() => setActiveExerciseModal(null)}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-black shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
