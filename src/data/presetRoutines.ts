import { WorkoutRoutine } from '../types';

export const PRESET_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'spartan-3000',
    name: 'Spartan 3000 Challenge',
    tagline: 'High-Volume Full-Body Conditioning Benchmark',
    description: 'The flagship workout designed to push stamina, functional power, and grit. Accumulates high reps across compound movements toward your 3,000 monthly goal.',
    category: 'conditioning',
    difficulty: 'Advanced',
    durationMinutes: 48,
    target3000Score: 280, // Reps contributing to 3000 goal
    tags: ['Signature', 'High Volume', 'Full Body', 'Metabolic'],
    exercises: [
      {
        exerciseId: 'pull-ups',
        exerciseName: 'Overhand Pull-Ups',
        targetSets: 4,
        targetReps: 10,
        restSeconds: 75,
        notes: 'Strict form; zero swinging or kipping.'
      },
      {
        exerciseId: 'barbell-deadlift',
        exerciseName: 'Conventional Barbell Deadlift',
        targetSets: 4,
        targetReps: 8,
        targetWeightKg: 80,
        restSeconds: 120,
        notes: 'Solid hinge; reset breath between every repetition.'
      },
      {
        exerciseId: 'push-ups',
        exerciseName: 'Classic Push-Ups',
        targetSets: 4,
        targetReps: 25,
        restSeconds: 60,
        notes: 'Lock out fully at top and tap chest at bottom.'
      },
      {
        exerciseId: 'box-jumps',
        exerciseName: 'Plyometric Box Jumps',
        targetSets: 4,
        targetReps: 12,
        restSeconds: 60,
        notes: 'Land soft as a feather.'
      },
      {
        exerciseId: 'kettlebell-swings',
        exerciseName: 'Russian Kettlebell Swings',
        targetSets: 4,
        targetReps: 25,
        targetWeightKg: 20,
        restSeconds: 60,
        notes: 'Violent hip snap.'
      },
      {
        exerciseId: 'hanging-leg-raises',
        exerciseName: 'Hanging Leg Raises',
        targetSets: 3,
        targetReps: 15,
        restSeconds: 60,
        notes: 'Control the descent.'
      }
    ]
  },
  {
    id: 'push-power-3000',
    name: 'Push Armor 3000',
    tagline: 'Chest, Shoulders & Triceps Hypertrophy',
    description: 'Heavy compound pressing followed by intense accessory volume to build an armored upper body.',
    category: 'power',
    difficulty: 'Intermediate',
    durationMinutes: 52,
    target3000Score: 210,
    tags: ['Chest', 'Shoulders', 'Triceps', 'Hypertrophy'],
    exercises: [
      {
        exerciseId: 'bench-press-barbell',
        exerciseName: 'Barbell Bench Press',
        targetSets: 4,
        targetReps: 8,
        targetWeightKg: 75,
        restSeconds: 120,
        notes: 'Arch slightly, tuck elbows 45 deg, explode off chest.'
      },
      {
        exerciseId: 'incline-dumbbell-press',
        exerciseName: 'Incline Dumbbell Press',
        targetSets: 3,
        targetReps: 10,
        targetWeightKg: 24,
        restSeconds: 90,
        notes: 'Control eccentric for 3 seconds.'
      },
      {
        exerciseId: 'overhead-barbell-press',
        exerciseName: 'Overhead Barbell Press (OHP)',
        targetSets: 3,
        targetReps: 8,
        targetWeightKg: 45,
        restSeconds: 90,
        notes: 'Squeeze glutes and abs to avoid lumbar hyperextension.'
      },
      {
        exerciseId: 'lateral-raise-dumbbell',
        exerciseName: 'Dumbbell Lateral Raise',
        targetSets: 4,
        targetReps: 15,
        targetWeightKg: 10,
        restSeconds: 60,
        notes: 'Slight lean forward, lead with elbows.'
      },
      {
        exerciseId: 'dips-chest',
        exerciseName: 'Chest Dips',
        targetSets: 3,
        targetReps: 12,
        restSeconds: 75,
        notes: 'Torso angled forward 30 degrees.'
      },
      {
        exerciseId: 'tricep-rope-pushdown',
        exerciseName: 'Cable Tricep Rope Pushdown',
        targetSets: 3,
        targetReps: 15,
        targetWeightKg: 20,
        restSeconds: 60,
        notes: 'Flare ends apart at the bottom for maximal squeeze.'
      }
    ]
  },
  {
    id: 'pull-titan-3000',
    name: 'Titan Pull 3000',
    tagline: 'Back Width, Thickness & Biceps Density',
    description: 'Deadlift foundation supported by vertical and horizontal pulling variations for comprehensive posterior chain development.',
    category: 'power',
    difficulty: 'Intermediate',
    durationMinutes: 50,
    target3000Score: 190,
    tags: ['Back', 'Biceps', 'Posterior Chain', 'Strength'],
    exercises: [
      {
        exerciseId: 'barbell-deadlift',
        exerciseName: 'Conventional Barbell Deadlift',
        targetSets: 3,
        targetReps: 6,
        targetWeightKg: 100,
        restSeconds: 150,
        notes: 'Heavy working sets with locked form.'
      },
      {
        exerciseId: 'pull-ups',
        exerciseName: 'Overhand Pull-Ups',
        targetSets: 4,
        targetReps: 8,
        restSeconds: 90,
        notes: 'Chest touches the bar if possible.'
      },
      {
        exerciseId: 'barbell-bent-over-row',
        exerciseName: 'Barbell Bent-Over Row',
        targetSets: 4,
        targetReps: 10,
        targetWeightKg: 60,
        restSeconds: 90,
        notes: 'Torso stationary at 45 degrees.'
      },
      {
        exerciseId: 'face-pulls',
        exerciseName: 'Cable Face Pulls',
        targetSets: 3,
        targetReps: 15,
        targetWeightKg: 15,
        restSeconds: 60,
        notes: 'External rotation at end range for rotator cuff.'
      },
      {
        exerciseId: 'barbell-bicep-curl',
        exerciseName: 'Barbell Bicep Curl',
        targetSets: 3,
        targetReps: 10,
        targetWeightKg: 30,
        restSeconds: 60,
        notes: 'Zero elbow drift.'
      },
      {
        exerciseId: 'hammer-curls',
        exerciseName: 'Dumbbell Hammer Curls',
        targetSets: 3,
        targetReps: 12,
        targetWeightKg: 14,
        restSeconds: 60,
        notes: 'Build forearms and brachialis thickness.'
      }
    ]
  },
  {
    id: 'calisthenics-core-3000',
    name: 'Zero-Equipment Beast',
    tagline: 'Bodyweight Mastery & Core Density',
    description: 'No gym required. Master relative strength with push-ups, pull-ups, and core movements anywhere.',
    category: 'hybrid',
    difficulty: 'Beginner',
    durationMinutes: 30,
    target3000Score: 250,
    tags: ['Bodyweight', 'No Gym', 'Core', 'Beginner Friendly'],
    exercises: [
      {
        exerciseId: 'push-ups',
        exerciseName: 'Classic Push-Ups',
        targetSets: 4,
        targetReps: 20,
        restSeconds: 60,
        notes: 'Keep shoulders packed.'
      },
      {
        exerciseId: 'pull-ups',
        exerciseName: 'Overhand Pull-Ups',
        targetSets: 4,
        targetReps: 8,
        restSeconds: 75,
        notes: 'If tough, use resistance band or do negatives.'
      },
      {
        exerciseId: 'hanging-leg-raises',
        exerciseName: 'Hanging Leg Raises',
        targetSets: 3,
        targetReps: 12,
        restSeconds: 60,
        notes: 'Focus on abdominal flexion.'
      },
      {
        exerciseId: 'plank-hold',
        exerciseName: 'Forearm Plank Hold',
        targetSets: 3,
        targetReps: 60,
        restSeconds: 45,
        notes: 'Tighten glutes and draw navel inward.'
      }
    ]
  }
];
