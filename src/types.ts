export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Arms'
  | 'Core'
  | 'Cardio'
  | 'Full Body';

export type EquipmentType =
  | 'Barbell'
  | 'Dumbbell'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight'
  | 'Kettlebell'
  | 'Household / None';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type BodyType = 'Ectomorph' | 'Mesomorph' | 'Endomorph';

export type FitnessGoal = 
  | 'Hypertrophy & Muscle Gain' 
  | 'Max Strength & Power' 
  | 'Fat Loss & Conditioning' 
  | 'Athletic Performance'
  | 'Joint Health & Mobility';

export interface AccessibleAlternative {
  title: string;
  householdItem: string; // e.g. "Sturdy Kitchen Chair", "Wall", "Water Bottles", "Towel"
  instructions: string[];
  isSeatedOrWheelchairFriendly: boolean;
  isLowImpact: boolean;
  targetAdaptation: string;
}

export interface UserProfile {
  bodyType: BodyType;
  bodyWeightKg: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: Difficulty;
  targetDailyReps: number;
  isPersonalized: boolean;
  prefersAccessibleMode?: boolean; // For elderly and disabled users
}

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  equipment: EquipmentType;
  targetMuscles: string[];
  secondaryMuscles?: string[];
  instructions: string[];
  tips: string[];
  defaultReps: number;
  defaultSets: number;
  defaultWeightKg: number;
  defaultRestSec: number;
  diagramType: 'press' | 'squat' | 'pull' | 'hinge' | 'curl' | 'core' | 'raise' | 'chair' | 'wall' | 'bridge';
  isSeatedFriendly?: boolean;
  isElderlyFriendly?: boolean;
  isLowImpact?: boolean;
  accessibleAlternative: AccessibleAlternative;
}

export interface SetData {
  id: string;
  setNumber: number;
  reps: number;
  weightKg: number;
  completed: boolean;
  isWarmup?: boolean;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: {
    reps: number;
    weightKg: number;
  }[];
  restSec: number;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  durationMinutes: number;
  exercises: RoutineExercise[];
  tags: string[];
  isCustom?: boolean;
  isAccessible?: boolean;
  personalizedFor?: {
    bodyType: BodyType;
    bodyWeightKg: number;
  };
}

export interface ActiveExerciseSession {
  exerciseId: string;
  exerciseName: string;
  category: MuscleGroup;
  restSec: number;
  sets: SetData[];
}

export interface CompletedWorkout {
  id: string;
  title: string;
  routineId?: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: SetData[];
  }[];
  totalReps: number;
  totalVolumeKg: number;
  notes?: string;
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  achievedAt: number;
}

export interface UserStats {
  totalWorkouts: number;
  totalReps: number;
  totalVolumeKg: number;
  totalTimeMinutes: number;
  streakDays: number;
  lastWorkoutDate?: string;
  weightUnit: 'kg' | 'lbs';
  soundEnabled: boolean;
  unlockedBadges: string[];
  accessibleMode: boolean; // Accessible & elderly non-equipment mode toggle
  profile?: UserProfile;
}

export interface ChallengeMilestone {
  reps: number;
  title: string;
  badge: string;
  description: string;
}
