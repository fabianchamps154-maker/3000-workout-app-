import { CompletedWorkout, PersonalRecord, Routine, UserProfile, UserStats } from '../types';
import { PRESET_ROUTINES } from '../data/routines';

const STORAGE_KEYS = {
  STATS: 'workout3000_stats',
  ROUTINES: 'workout3000_routines',
  HISTORY: 'workout3000_history',
  PRS: 'workout3000_prs',
};

export const DEFAULT_PROFILE: UserProfile = {
  bodyType: 'Mesomorph',
  bodyWeightKg: 75,
  fitnessGoal: 'Hypertrophy & Muscle Gain',
  experienceLevel: 'Intermediate',
  targetDailyReps: 100,
  isPersonalized: false,
};

const DEFAULT_STATS: UserStats = {
  totalWorkouts: 0,
  totalReps: 0,
  totalVolumeKg: 0,
  totalTimeMinutes: 0,
  streakDays: 0,
  lastWorkoutDate: undefined,
  weightUnit: 'kg',
  soundEnabled: true,
  unlockedBadges: [],
  accessibleMode: false,
  profile: DEFAULT_PROFILE,
};

export const getStoredStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return { 
      ...DEFAULT_STATS, 
      ...parsed,
      profile: parsed.profile ? { ...DEFAULT_PROFILE, ...parsed.profile } : DEFAULT_PROFILE
    };
  } catch {
    return DEFAULT_STATS;
  }
};

export const saveStats = (stats: UserStats): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
};

export const generatePersonalizedRoutines = (profile: UserProfile): Routine[] => {
  const bw = profile.bodyWeightKg;
  const isEcto = profile.bodyType === 'Ectomorph';
  const isMeso = profile.bodyType === 'Mesomorph';
  const isEndo = profile.bodyType === 'Endomorph';

  // Calibrate weights to bodyweight
  const squatWeight = Math.max(20, Math.round((isMeso ? bw * 1.15 : isEcto ? bw * 0.95 : bw * 0.9) / 2.5) * 2.5);
  const benchWeight = Math.max(20, Math.round((isMeso ? bw * 0.85 : isEcto ? bw * 0.7 : bw * 0.65) / 2.5) * 2.5);
  const deadliftWeight = Math.max(30, Math.round((isMeso ? bw * 1.35 : isEcto ? bw * 1.15 : bw * 1.1) / 2.5) * 2.5);
  const ohpWeight = Math.max(15, Math.round((isMeso ? bw * 0.55 : isEcto ? bw * 0.45 : bw * 0.45) / 2.5) * 2.5);
  const dbPressWeight = Math.max(8, Math.round((bw * 0.22) / 2) * 2);

  const primaryReps = isEcto ? 7 : isMeso ? 9 : 14;
  const restPrimary = isEcto ? 100 : isMeso ? 75 : 50;

  const routine1: Routine = {
    id: `personalized-strength-${profile.bodyType.toLowerCase()}`,
    name: `${profile.bodyType} Power Blueprint (${bw}kg Calibrated)`,
    description: `Scientifically tailored for ${profile.bodyType} physiology: weights calibrated directly to your ${bw}kg body weight with optimal mechanical tension.`,
    category: 'Full Body',
    difficulty: profile.experienceLevel,
    durationMinutes: isEcto ? 45 : isMeso ? 50 : 40,
    tags: ['Personalized', profile.bodyType, `${bw}kg Calibrated`, profile.fitnessGoal],
    isCustom: true,
    personalizedFor: {
      bodyType: profile.bodyType,
      bodyWeightKg: bw,
    },
    exercises: [
      {
        exerciseId: 'barbell-back-squat',
        sets: [
          { reps: primaryReps, weightKg: Math.round(squatWeight * 0.85) },
          { reps: primaryReps, weightKg: squatWeight },
          { reps: primaryReps, weightKg: squatWeight },
          { reps: isEcto ? 6 : 8, weightKg: Math.round(squatWeight * 1.05) },
        ],
        restSec: restPrimary,
      },
      {
        exerciseId: 'barbell-bench-press',
        sets: [
          { reps: primaryReps, weightKg: Math.round(benchWeight * 0.85) },
          { reps: primaryReps, weightKg: benchWeight },
          { reps: primaryReps, weightKg: benchWeight },
          { reps: isEcto ? 6 : 8, weightKg: Math.round(benchWeight * 1.05) },
        ],
        restSec: restPrimary,
      },
      {
        exerciseId: 'bent-over-barbell-row',
        sets: [
          { reps: primaryReps + 1, weightKg: Math.round(benchWeight * 0.8) },
          { reps: primaryReps, weightKg: Math.round(benchWeight * 0.85) },
          { reps: primaryReps, weightKg: Math.round(benchWeight * 0.85) },
        ],
        restSec: restPrimary,
      },
      {
        exerciseId: 'overhead-press',
        sets: [
          { reps: primaryReps, weightKg: ohpWeight },
          { reps: primaryReps, weightKg: ohpWeight },
          { reps: isEcto ? 6 : 8, weightKg: Math.round(ohpWeight * 1.05) },
        ],
        restSec: restPrimary - 10,
      },
      {
        exerciseId: 'push-ups',
        sets: [
          { reps: isEcto ? 12 : isMeso ? 18 : 22, weightKg: 0 },
          { reps: isEcto ? 10 : isMeso ? 15 : 20, weightKg: 0 },
        ],
        restSec: 45,
      }
    ]
  };

  const routine2: Routine = {
    id: `personalized-conditioning-${profile.bodyType.toLowerCase()}`,
    name: `${profile.bodyType} Metabolic Hypertrophy`,
    description: `High-density volume session configured to your body mass to rapidly rack up quality reps towards the 3,000 threshold while spiking cardiovascular endurance.`,
    category: isEndo ? '3000 Challenge' : 'Push',
    difficulty: profile.experienceLevel,
    durationMinutes: isEndo ? 35 : 45,
    tags: ['Personalized', profile.bodyType, 'Metabolic Engine'],
    isCustom: true,
    personalizedFor: {
      bodyType: profile.bodyType,
      bodyWeightKg: bw,
    },
    exercises: [
      {
        exerciseId: 'incline-dumbbell-press',
        sets: [
          { reps: primaryReps, weightKg: dbPressWeight },
          { reps: primaryReps, weightKg: dbPressWeight },
          { reps: primaryReps, weightKg: dbPressWeight + 2 },
        ],
        restSec: restPrimary - 15,
      },
      {
        exerciseId: 'air-squats',
        sets: [
          { reps: isEndo ? 35 : 25, weightKg: 0 },
          { reps: isEndo ? 35 : 25, weightKg: 0 },
          { reps: isEndo ? 30 : 20, weightKg: 0 },
        ],
        restSec: 40,
      },
      {
        exerciseId: 'kettlebell-swings',
        sets: [
          { reps: 20, weightKg: Math.round(bw * 0.22) },
          { reps: 20, weightKg: Math.round(bw * 0.22) },
          { reps: 20, weightKg: Math.round(bw * 0.22) },
        ],
        restSec: 45,
      },
      {
        exerciseId: 'face-pull',
        sets: [
          { reps: 15, weightKg: Math.round(bw * 0.25) },
          { reps: 15, weightKg: Math.round(bw * 0.25) },
        ],
        restSec: 45,
      },
      {
        exerciseId: 'burpees',
        sets: [
          { reps: isEndo ? 15 : 10, weightKg: 0 },
          { reps: isEndo ? 15 : 10, weightKg: 0 },
        ],
        restSec: 45,
      }
    ]
  };

  return [routine1, routine2];
};

export const getStoredRoutines = (): Routine[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    if (!raw) return PRESET_ROUTINES;
    const custom = JSON.parse(raw) as Routine[];
    return [...PRESET_ROUTINES, ...custom.filter(r => r.isCustom)];
  } catch {
    return PRESET_ROUTINES;
  }
};

export const saveCustomRoutine = (routine: Routine): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    const existing: Routine[] = raw ? JSON.parse(raw) : [];
    const updated = [...existing.filter(r => r.id !== routine.id), { ...routine, isCustom: true }];
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save custom routine', e);
  }
};

export const savePersonalizedRoutinesToStore = (routines: Routine[]): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    const existing: Routine[] = raw ? JSON.parse(raw) : [];
    const nonPersonalized = existing.filter(r => !r.personalizedFor);
    const updated = [...nonPersonalized, ...routines];
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save personalized routines', e);
  }
};

export const deleteCustomRoutine = (routineId: string): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    if (!raw) return;
    const existing: Routine[] = JSON.parse(raw);
    const updated = existing.filter(r => r.id !== routineId);
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete custom routine', e);
  }
};

export const getStoredHistory = (): CompletedWorkout[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveCompletedWorkout = (workout: CompletedWorkout): {
  newPRs: PersonalRecord[];
  newMilestones: string[];
} => {
  const history = getStoredHistory();
  const updatedHistory = [workout, ...history];
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));

  // Update PRs
  const currentPRs = getStoredPRs();
  const newPRs: PersonalRecord[] = [];

  workout.exercises.forEach(ex => {
    ex.sets.forEach(set => {
      if (set.completed && set.weightKg > 0) {
        const existing = currentPRs[ex.exerciseId];
        if (!existing || set.weightKg > existing.weightKg || (set.weightKg === existing.weightKg && set.reps > existing.reps)) {
          const newRecord: PersonalRecord = {
            exerciseId: ex.exerciseId,
            exerciseName: ex.exerciseName,
            weightKg: set.weightKg,
            reps: set.reps,
            achievedAt: workout.endTime,
          };
          currentPRs[ex.exerciseId] = newRecord;
          newPRs.push(newRecord);
        }
      }
    });
  });
  localStorage.setItem(STORAGE_KEYS.PRS, JSON.stringify(currentPRs));

  // Update Stats & Streaks
  const stats = getStoredStats();
  const workoutDateStr = new Date(workout.endTime).toISOString().split('T')[0];
  let streak = stats.streakDays;

  if (stats.lastWorkoutDate) {
    const lastDate = new Date(stats.lastWorkoutDate);
    const currDate = new Date(workoutDateStr);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  const prevTotalReps = stats.totalReps;
  const updatedTotalReps = prevTotalReps + workout.totalReps;
  const updatedVolume = stats.totalVolumeKg + workout.totalVolumeKg;
  const updatedMinutes = stats.totalTimeMinutes + Math.round(workout.durationSeconds / 60);

  // Check 3000 Milestone badges
  const milestoneThresholds = [
    { reps: 250, badge: 'Iron Initiate' },
    { reps: 750, badge: 'Steel Soldier' },
    { reps: 1500, badge: 'Halfway Hero' },
    { reps: 2250, badge: 'Colossus Vanguard' },
    { reps: 3000, badge: 'Spartan 3000 Legend' },
    { reps: 5000, badge: 'Mythic 5000 Ascendant' },
  ];

  const unlockedBadges = [...stats.unlockedBadges];
  const newMilestones: string[] = [];

  milestoneThresholds.forEach(m => {
    if (updatedTotalReps >= m.reps && !unlockedBadges.includes(m.badge)) {
      unlockedBadges.push(m.badge);
      newMilestones.push(m.badge);
    }
  });

  const updatedStats: UserStats = {
    ...stats,
    totalWorkouts: stats.totalWorkouts + 1,
    totalReps: updatedTotalReps,
    totalVolumeKg: updatedVolume,
    totalTimeMinutes: updatedMinutes,
    streakDays: streak,
    lastWorkoutDate: workoutDateStr,
    unlockedBadges,
  };

  saveStats(updatedStats);

  return { newPRs, newMilestones };
};

export const getStoredPRs = (): Record<string, PersonalRecord> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const addQuickReps = (repsCount: number, label: string = 'Quick Reps'): { newMilestones: string[] } => {
  const stats = getStoredStats();
  const prevTotalReps = stats.totalReps;
  const updatedTotalReps = prevTotalReps + repsCount;

  const milestoneThresholds = [
    { reps: 250, badge: 'Iron Initiate' },
    { reps: 750, badge: 'Steel Soldier' },
    { reps: 1500, badge: 'Halfway Hero' },
    { reps: 2250, badge: 'Colossus Vanguard' },
    { reps: 3000, badge: 'Spartan 3000 Legend' },
    { reps: 5000, badge: 'Mythic 5000 Ascendant' },
  ];

  const unlockedBadges = [...stats.unlockedBadges];
  const newMilestones: string[] = [];

  milestoneThresholds.forEach(m => {
    if (updatedTotalReps >= m.reps && !unlockedBadges.includes(m.badge)) {
      unlockedBadges.push(m.badge);
      newMilestones.push(m.badge);
    }
  });

  saveStats({
    ...stats,
    totalReps: updatedTotalReps,
    unlockedBadges,
  });

  // Log as mini session
  const miniWorkout: CompletedWorkout = {
    id: `quick-${Date.now()}`,
    title: label,
    startTime: Date.now() - 60000,
    endTime: Date.now(),
    durationSeconds: 60,
    exercises: [
      {
        exerciseId: 'quick-log',
        exerciseName: label,
        sets: [
          {
            id: 'qs1',
            setNumber: 1,
            reps: repsCount,
            weightKg: 0,
            completed: true,
          }
        ]
      }
    ],
    totalReps: repsCount,
    totalVolumeKg: 0,
    notes: 'Quick challenge boost',
  };

  const history = getStoredHistory();
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([miniWorkout, ...history]));

  return { newMilestones };
};
