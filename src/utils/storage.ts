import { CompletedWorkoutLog, WorkoutRoutine, UserProfile, FoodDiaryEntry } from '../types';
import { PRESET_ROUTINES } from '../data/presetRoutines';

const STORAGE_KEYS = {
  ROUTINES: 'workout3000_routines',
  LOGS: 'workout3000_logs',
  PROFILE: 'workout3000_profile',
  ACTIVE_SESSION: 'workout3000_active_session',
  FOOD_DIARY: 'workout3000_food_diary',
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Athlete',
  weightKg: 78,
  unit: 'kg',
  streakDays: 4,
  lastWorkoutDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  monthlyGoal: 3000,
  fitnessGoal: 'muscle_building',
  nutritionTargets: {
    dailyCalories: 2600,
    dailyProteinGrams: 165,
    dailyCarbsGrams: 280,
    dailyFatGrams: 75,
  },
};


// Seed initial history logs so the dashboard, charts, and milestones look alive and engaging
const INITIAL_LOGS: CompletedWorkoutLog[] = [
  {
    id: 'log-seed-1',
    routineId: 'push-power-3000',
    routineName: 'Push Armor 3000',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    durationSeconds: 2820, // 47 mins
    totalVolumeKg: 6480,
    totalReps: 184,
    estimatedCalories: 390,
    challengePoints: 184,
    exercisesCompleted: 6,
    notes: 'Bench press felt smooth. Hit all reps with solid pause on chest.',
    exercises: []
  },
  {
    id: 'log-seed-2',
    routineId: 'pull-titan-3000',
    routineName: 'Titan Pull 3000',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    durationSeconds: 3100, // 51 mins
    totalVolumeKg: 7200,
    totalReps: 168,
    estimatedCalories: 430,
    challengePoints: 168,
    exercisesCompleted: 6,
    notes: 'Deadlifts were heavy but form held firm. Pull-ups felt explosive.',
    exercises: []
  },
  {
    id: 'log-seed-3',
    routineId: 'spartan-3000',
    routineName: 'Spartan 3000 Challenge',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    durationSeconds: 2880, // 48 mins
    totalVolumeKg: 5800,
    totalReps: 280,
    estimatedCalories: 450,
    challengePoints: 280,
    exercisesCompleted: 6,
    notes: 'Full Spartan challenge circuit completed with steady pacing.',
    exercises: []
  }
];

export const storage = {
  getRoutines(): WorkoutRoutine[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROUTINES);
      if (data) {
        const parsed: WorkoutRoutine[] = JSON.parse(data);
        // Exclude removed preset routines even if cached in client localStorage
        return parsed.filter(
          r => r.id !== 'leg-annihilator-3000' && r.id !== 'metabolic-hiit-3000'
        );
      }
    } catch (e) {
      console.warn('Error reading routines from storage', e);
    }
    return PRESET_ROUTINES;
  },

  saveRoutines(routines: WorkoutRoutine[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
    } catch (e) {
      console.warn('Error saving routines', e);
    }
  },

  getLogs(): CompletedWorkoutLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading logs from storage', e);
    }
    return INITIAL_LOGS;
  },

  saveLogs(logs: CompletedWorkoutLog[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    } catch (e) {
      console.warn('Error saving logs', e);
    }
  },

  addLog(log: CompletedWorkoutLog): CompletedWorkoutLog[] {
    const logs = storage.getLogs();
    const updated = [log, ...logs];
    storage.saveLogs(updated);

    // Update streak in profile
    const profile = storage.getProfile();
    const today = new Date().toDateString();
    const lastDate = profile.lastWorkoutDate ? new Date(profile.lastWorkoutDate).toDateString() : null;
    
    let newStreak = profile.streakDays;
    if (lastDate !== today) {
      newStreak = (profile.streakDays || 0) + 1;
    }

    storage.saveProfile({
      ...profile,
      streakDays: newStreak,
      lastWorkoutDate: new Date().toISOString(),
    });

    return updated;
  },

  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Error reading profile', e);
    }
    return DEFAULT_PROFILE;
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Error saving profile', e);
    }
  },

  getFoodDiary(): FoodDiaryEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOOD_DIARY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading food diary from storage', e);
    }
    return INITIAL_FOOD_DIARY;
  },

  saveFoodDiary(entries: FoodDiaryEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FOOD_DIARY, JSON.stringify(entries));
    } catch (e) {
      console.warn('Error saving food diary', e);
    }
  },

  addFoodDiaryEntry(entry: FoodDiaryEntry): FoodDiaryEntry[] {
    const existing = storage.getFoodDiary();
    const updated = [entry, ...existing];
    storage.saveFoodDiary(updated);
    return updated;
  },

  deleteFoodDiaryEntry(id: string): FoodDiaryEntry[] {
    const existing = storage.getFoodDiary();
    const updated = existing.filter(e => e.id !== id);
    storage.saveFoodDiary(updated);
    return updated;
  },

  resetAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ROUTINES);
      localStorage.removeItem(STORAGE_KEYS.LOGS);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
      localStorage.removeItem(STORAGE_KEYS.FOOD_DIARY);
    } catch (e) {
      console.warn('Error resetting storage', e);
    }
  }
};

const INITIAL_FOOD_DIARY: FoodDiaryEntry[] = [
  {
    id: 'meal-seed-1',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    mealType: 'post_workout',
    name: 'Post-Workout Chicken & Brown Rice Bowl',
    totalCalories: 585,
    totalProtein: 48,
    totalCarbs: 62,
    totalFat: 14,
    uncertaintyRange: { minCalories: 520, maxCalories: 640 },
    fitnessGoal: 'muscle_building',
    hasUsdaVerifiedItems: true,
    supportiveFeedback: 'Outstanding protein density (48g) to kickstart muscle protein synthesis following high-volume training. Complex carbs provide glycogen replenishment.',
    items: [
      {
        id: 'item-1',
        name: 'Grilled Chicken Breast',
        portionGrams: 180,
        portionUncertaintyGrams: 20,
        cookingMethod: 'grilled',
        visibleIngredients: ['Chicken breast', 'black pepper'],
        calories: 243,
        protein: 41,
        carbs: 0,
        fat: 7,
        isVerifiedUSDA: true,
        usdaMatch: {
          fdcId: 1941501,
          description: 'GRILLED CHICKEN BREAST',
          dataType: 'Branded',
          caloriesPer100g: 135,
          proteinPer100g: 22.8,
          carbsPer100g: 0,
          fatPer100g: 3.9,
        }
      },
      {
        id: 'item-2',
        name: 'Cooked Brown Rice',
        portionGrams: 160,
        portionUncertaintyGrams: 25,
        cookingMethod: 'boiled_steamed',
        visibleIngredients: ['Brown rice', 'water'],
        calories: 216,
        protein: 4.8,
        carbs: 46,
        fat: 1.8,
        isVerifiedUSDA: true,
        usdaMatch: {
          fdcId: 2708422,
          description: 'Rice, brown, cooked',
          dataType: 'Foundation',
          caloriesPer100g: 135,
          proteinPer100g: 3.0,
          carbsPer100g: 28.8,
          fatPer100g: 1.1,
        }
      },
      {
        id: 'item-3',
        name: 'Steamed Broccoli',
        portionGrams: 120,
        portionUncertaintyGrams: 15,
        cookingMethod: 'boiled_steamed',
        visibleIngredients: ['Broccoli florets'],
        calories: 42,
        protein: 3.4,
        carbs: 8.4,
        fat: 0.5,
        isVerifiedUSDA: true,
        usdaMatch: {
          fdcId: 170379,
          description: 'Broccoli, cooked, boiled, drained',
          dataType: 'SR Legacy',
          caloriesPer100g: 35,
          proteinPer100g: 2.8,
          carbsPer100g: 7.0,
          fatPer100g: 0.4,
        }
      }
    ]
  },
  {
    id: 'meal-seed-2',
    date: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    mealType: 'breakfast',
    name: 'Oatmeal with Blueberries & Greek Yogurt',
    totalCalories: 460,
    totalProtein: 28,
    totalCarbs: 64,
    totalFat: 9,
    uncertaintyRange: { minCalories: 420, maxCalories: 500 },
    fitnessGoal: 'muscle_building',
    hasUsdaVerifiedItems: true,
    supportiveFeedback: 'Balanced morning energy with sustained release carbs and high-quality dairy protein.',
    items: [
      {
        id: 'item-4',
        name: 'Rolled Oats (Cooked)',
        portionGrams: 200,
        portionUncertaintyGrams: 20,
        cookingMethod: 'boiled_steamed',
        visibleIngredients: ['Oats', 'water'],
        calories: 158,
        protein: 5.5,
        carbs: 28,
        fat: 3,
        isVerifiedUSDA: true,
      },
      {
        id: 'item-5',
        name: 'Greek Yogurt (Nonfat)',
        portionGrams: 170,
        portionUncertaintyGrams: 15,
        cookingMethod: 'raw',
        visibleIngredients: ['Greek yogurt'],
        calories: 100,
        protein: 17,
        carbs: 6,
        fat: 0.7,
        isVerifiedUSDA: true,
      },
      {
        id: 'item-6',
        name: 'Fresh Blueberries',
        portionGrams: 80,
        portionUncertaintyGrams: 10,
        cookingMethod: 'raw',
        visibleIngredients: ['Blueberries'],
        calories: 46,
        protein: 0.6,
        carbs: 11.5,
        fat: 0.3,
        isVerifiedUSDA: true,
      }
    ]
  },
  {
    id: 'meal-seed-3',
    date: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    mealType: 'dinner',
    name: 'Pan-Seared Salmon with Roasted Asparagus & Quinoa',
    totalCalories: 640,
    totalProtein: 44,
    totalCarbs: 48,
    totalFat: 28,
    uncertaintyRange: { minCalories: 580, maxCalories: 710 },
    fitnessGoal: 'muscle_building',
    hasUsdaVerifiedItems: true,
    supportiveFeedback: 'Rich in omega-3 fatty acids for joint and systemic recovery, plus dense complete protein.',
    items: [
      {
        id: 'item-7',
        name: 'Atlantic Salmon Fillet',
        portionGrams: 180,
        portionUncertaintyGrams: 20,
        cookingMethod: 'pan_fried',
        visibleIngredients: ['Salmon', 'olive oil', 'lemon'],
        calories: 374,
        protein: 36,
        carbs: 0,
        fat: 24,
        isVerifiedUSDA: true,
      },
      {
        id: 'item-8',
        name: 'Cooked Quinoa',
        portionGrams: 150,
        portionUncertaintyGrams: 20,
        cookingMethod: 'boiled_steamed',
        visibleIngredients: ['Quinoa'],
        calories: 180,
        protein: 6.6,
        carbs: 32,
        fat: 2.8,
        isVerifiedUSDA: true,
      }
    ]
  }
];

