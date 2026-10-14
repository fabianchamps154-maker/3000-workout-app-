import React, { useState } from 'react';
import { 
  X, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Dumbbell, 
  Flame, 
  Scale, 
  Zap,
  Target,
  Armchair
} from 'lucide-react';
import { BodyType, Difficulty, FitnessGoal, Routine, UserProfile } from '../types';
import { generatePersonalizedRoutines, savePersonalizedRoutinesToStore } from '../utils/storage';

interface BodyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile?: UserProfile;
  weightUnit: 'kg' | 'lbs';
  onProfileUpdated: (profile: UserProfile, newRoutines: Routine[]) => void;
}

export const BodyProfileModal: React.FC<BodyProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  weightUnit,
  onProfileUpdated,
}) => {
  const [bodyType, setBodyType] = useState<BodyType>(currentProfile?.bodyType || 'Mesomorph');
  
  const initialWeight = currentProfile?.bodyWeightKg 
    ? (weightUnit === 'lbs' ? Math.round(currentProfile.bodyWeightKg * 2.20462) : currentProfile.bodyWeightKg)
    : (weightUnit === 'lbs' ? 165 : 75);

  const [weightInput, setWeightInput] = useState<number>(initialWeight);
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>(currentProfile?.fitnessGoal || 'Hypertrophy & Muscle Gain');
  const [experienceLevel, setExperienceLevel] = useState<Difficulty>(currentProfile?.experienceLevel || 'Intermediate');
  const [targetDailyReps, setTargetDailyReps] = useState<number>(currentProfile?.targetDailyReps || 100);
  const [prefersAccessibleMode, setPrefersAccessibleMode] = useState<boolean>(currentProfile?.prefersAccessibleMode || false);

  if (!isOpen) return null;

  const handleSaveAndGenerate = () => {
    const weightInKg = weightUnit === 'lbs' 
      ? Math.round((weightInput / 2.20462) * 10) / 10 
      : weightInput;

    const newProfile: UserProfile = {
      bodyType,
      bodyWeightKg: weightInKg,
      fitnessGoal,
      experienceLevel,
      targetDailyReps,
      isPersonalized: true,
      prefersAccessibleMode,
    };

    const tailoredRoutines = generatePersonalizedRoutines(newProfile);
    savePersonalizedRoutinesToStore(tailoredRoutines);
    onProfileUpdated(newProfile, tailoredRoutines);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-zinc-300 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header (Solid Colors) */}
        <div className="p-5 border-b-2 border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-xs font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-zinc-900">Personalize Your Workout Plan</h3>
              <p className="text-xs text-zinc-500 font-medium">Tailored rep targets, loads & pacing calibrated to your body</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Step 1: Body Type Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5">
              <User className="w-4 h-4 text-pink-600" />
              <span>Select Your Body Somatotype</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Ectomorph */}
              <div
                onClick={() => setBodyType('Ectomorph')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  bodyType === 'Ectomorph'
                    ? 'border-pink-600 bg-pink-50 shadow-xs'
                    : 'border-zinc-200 bg-zinc-50/50 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-zinc-900">Ectomorph</span>
                  {bodyType === 'Ectomorph' && <CheckCircle2 className="w-4 h-4 text-pink-600" />}
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                  Naturally slender, fast metabolism. Needs heavy compounds, longer rests (90–120s) and higher calorie retention.
                </p>
                <span className="inline-block mt-2 text-[10px] font-black text-pink-800 bg-pink-100 px-2 py-0.5 rounded-md">
                  Tension & Rest Focus
                </span>
              </div>

              {/* Mesomorph */}
              <div
                onClick={() => setBodyType('Mesomorph')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  bodyType === 'Mesomorph'
                    ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                    : 'border-zinc-200 bg-zinc-50/50 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-zinc-900">Mesomorph</span>
                  {bodyType === 'Mesomorph' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                  Naturally athletic, broad shoulders. Responds rapidly to pyramid loading, 8–12 reps, and progressive overload.
                </p>
                <span className="inline-block mt-2 text-[10px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Power & Growth
                </span>
              </div>

              {/* Endomorph */}
              <div
                onClick={() => setBodyType('Endomorph')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  bodyType === 'Endomorph'
                    ? 'border-pink-600 bg-pink-50 shadow-xs'
                    : 'border-zinc-200 bg-zinc-50/50 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-sm text-zinc-900">Endomorph</span>
                  {bodyType === 'Endomorph' && <CheckCircle2 className="w-4 h-4 text-pink-600" />}
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                  Solid, sturdy bone structure. Excels with high-density supersets, short rests (45–60s), and metabolic conditioning.
                </p>
                <span className="inline-block mt-2 text-[10px] font-black text-pink-800 bg-pink-100 px-2 py-0.5 rounded-md">
                  Metabolic Density
                </span>
              </div>
            </div>
          </div>

          {/* Step 2: Body Weight & Daily Rep Target */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Your Current Body Weight ({weightUnit})</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={weightInput}
                  onChange={(e) => setWeightInput(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-emerald-600 rounded-xl px-3.5 py-2.5 text-base font-black text-zinc-900 font-mono-numbers focus:outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-400 uppercase">
                  {weightUnit}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium">
                Exercise loads will scale mathematically to your {weightInput} {weightUnit} mass.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-pink-600" />
                <span>Daily 3000-Rep Challenge Target</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="500"
                  step="10"
                  value={targetDailyReps}
                  onChange={(e) => setTargetDailyReps(parseInt(e.target.value, 10) || 50)}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-pink-600 rounded-xl px-3.5 py-2.5 text-base font-black text-zinc-900 font-mono-numbers focus:outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-400 uppercase">
                  Reps / Day
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium">
                Reach the 3,000 threshold in ~{Math.ceil(3000 / (targetDailyReps || 1))} days!
              </p>
            </div>
          </div>

          {/* Step 3: Elderly & Accessibility Mode Checkbox */}
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-start space-x-3">
            <input
              type="checkbox"
              id="accessibleModeCheck"
              checked={prefersAccessibleMode}
              onChange={(e) => setPrefersAccessibleMode(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-2 border-emerald-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="accessibleModeCheck" className="cursor-pointer">
              <span className="font-black text-sm text-emerald-950 flex items-center space-x-1.5">
                <Armchair className="w-4 h-4 text-emerald-700 inline" />
                <span>Enable Elderly & Low-Impact Friendly Focus</span>
              </span>
              <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed font-medium">
                Prioritizes chair-assisted squats, wall push-ups, and non-equipment movements with zero floor-lying or heavy spinal loads.
              </p>
            </label>
          </div>

          {/* Step 4: Fitness Goal & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-pink-600" />
                <span>Primary Goal</span>
              </label>
              <select
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-pink-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 focus:outline-none"
              >
                <option value="Hypertrophy & Muscle Gain">Hypertrophy & Muscle Gain</option>
                <option value="Max Strength & Power">Max Strength & Power</option>
                <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                <option value="Joint Health & Mobility">Joint Health & Mobility</option>
                <option value="Athletic Performance">Athletic Performance</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Dumbbell className="w-4 h-4 text-emerald-600" />
                <span>Experience Level</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as Difficulty)}
                className="w-full bg-zinc-50 border-2 border-zinc-200 focus:border-emerald-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 focus:outline-none"
              >
                <option value="Beginner">Beginner (Gentle / Learning)</option>
                <option value="Intermediate">Intermediate (1–3 Years)</option>
                <option value="Advanced">Advanced (3+ Years)</option>
              </select>
            </div>
          </div>

          {/* Bio Preview banner */}
          <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4 flex items-center space-x-3">
            <Flame className="w-5 h-5 text-pink-600 shrink-0" />
            <p className="text-xs text-zinc-800 leading-relaxed font-medium">
              <strong>Personalized Optimization:</strong> Applying this profile saves custom splits with loads mathematically calibrated to your weight ({weightInput} {weightUnit}), optimized rest intervals, and rep volumes for your {bodyType} physique.
            </p>
          </div>
        </div>

        {/* Footer (Solid Buttons) */}
        <div className="p-4 border-t-2 border-zinc-200 flex items-center justify-end space-x-3 bg-zinc-50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAndGenerate}
            className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-black shadow-xs transition-all transform active:scale-95 flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate & Apply Personalized Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
