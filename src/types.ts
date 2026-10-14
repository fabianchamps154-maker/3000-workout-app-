export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'cardio'
  | 'full-body';

export type EquipmentType = 
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'bodyweight'
  | 'kettlebell'
  | 'bands'
  | 'cardio';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  equipment: EquipmentType;
  targetMuscles: string[];
  secondaryMuscles?: string[];
  instructions: string[];
  tips: string;
  defaultSets: number;
  defaultReps: number;
  defaultRestSec: number;
  iconName?: string;
}

export interface RoutineExercise {
  exerciseId: string;
  exerciseName: string;
  targetSets: number;
  targetReps: number;
  targetWeightKg?: number;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: MuscleGroup | 'conditioning' | 'power' | 'hybrid';
  difficulty: DifficultyLevel;
  durationMinutes: number;
  target3000Score: number; // e.g. reps or points contributed
  isCustom?: boolean;
  exercises: RoutineExercise[];
  tags: string[];
}

export interface WorkoutSet {
  setNumber: number;
  reps: number;
  weightKg: number;
  completed: boolean;
  rpe?: number; // Rate of perceived exertion 1-10
}

export interface SessionExercise {
  exerciseId: string;
  exerciseName: string;
  category: MuscleGroup;
  sets: WorkoutSet[];
  restSeconds: number;
  completed: boolean;
}

export interface ActiveWorkoutSession {
  id: string;
  routineId?: string;
  routineName: string;
  startTime: number; // timestamp
  elapsedSeconds: number;
  isPaused: boolean;
  exercises: SessionExercise[];
  currentExerciseIndex: number;
  currentSetIndex: number;
  restTimer: {
    isActive: boolean;
    remainingSeconds: number;
    totalSeconds: number;
  };
}

export interface CompletedWorkoutLog {
  id: string;
  routineId?: string;
  routineName: string;
  date: string; // ISO string
  durationSeconds: number;
  totalVolumeKg: number;
  totalReps: number;
  estimatedCalories: number;
  challengePoints: number;
  exercisesCompleted: number;
  exercises: SessionExercise[];
  notes?: string;
}

export type FitnessGoal = 'muscle_building' | 'maintenance' | 'weight_management' | 'endurance';

export type CookingMethod = 
  | 'grilled' 
  | 'baked' 
  | 'boiled_steamed' 
  | 'pan_fried' 
  | 'deep_fried' 
  | 'raw' 
  | 'roasted' 
  | 'air_fried';

export interface USDAFoodMatch {
  fdcId: number;
  description: string;
  dataType?: string;
  brandName?: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  servingSize?: number;
  servingSizeUnit?: string;
}

export interface MealFoodItem {
  id: string;
  name: string;
  portionGrams: number;
  portionUncertaintyGrams: number;
  cookingMethod: string;
  visibleIngredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isVerifiedUSDA: boolean;
  usdaMatch?: USDAFoodMatch;
}

export interface MealNutritionAnalysis {
  mealName: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  uncertaintyRange: {
    minCalories: number;
    maxCalories: number;
    minProtein: number;
    maxProtein: number;
    minCarbs: number;
    maxCarbs: number;
    minFat: number;
    maxFat: number;
  };
  items: MealFoodItem[];
  goalFeedback: {
    goal: FitnessGoal;
    summary: string;
    highlights: string[];
    recommendations: string[];
    proteinTargetContributionPercent?: number;
  };
  verifiedStatus: 'fully_verified' | 'partially_verified' | 'unverified';
}

export interface FoodDiaryEntry {
  id: string;
  date: string; // ISO string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'post_workout';
  name: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  uncertaintyRange?: {
    minCalories: number;
    maxCalories: number;
  };
  items: MealFoodItem[];
  fitnessGoal: FitnessGoal;
  supportiveFeedback: string;
  imageThumbnail?: string;
  hasUsdaVerifiedItems: boolean;
}

export interface NutritionTargets {
  dailyCalories: number;
  dailyProteinGrams: number;
  dailyCarbsGrams: number;
  dailyFatGrams: number;
}

export interface Challenge3000Goal {
  id: string;
  title: string;
  unit: string;
  target: number; // 3000
  current: number;
  type: 'reps' | 'calories' | 'minutes' | 'volume';
  description: string;
  badge: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  weightKg: number;
  unit: 'kg' | 'lbs';
  streakDays: number;
  lastWorkoutDate?: string;
  monthlyGoal: number; // e.g. 3000 reps or calories
  fitnessGoal?: FitnessGoal;
  nutritionTargets?: NutritionTargets;
}

