import { Routine } from '../types';

export const PRESET_ROUTINES: Routine[] = [
  // ELDERLY & ACCESSIBLE NO-EQUIPMENT HERO ROUTINE
  {
    id: 'golden-vitality-accessible',
    name: 'Golden Vitality: Chair & Low-Impact Strength',
    description: 'Designed specifically for elderly individuals, rehabilitation, and users needing low-impact, joint-friendly movements. Uses only a sturdy chair and wall.',
    category: 'Accessible / Elderly',
    difficulty: 'Beginner',
    durationMinutes: 25,
    tags: ['Accessible', 'Elderly Friendly', 'Chair & Wall', 'Zero Equipment', 'Joint Safe'],
    isAccessible: true,
    exercises: [
      {
        exerciseId: 'chair-sit-to-stand',
        sets: [
          { reps: 8, weightKg: 0 },
          { reps: 8, weightKg: 0 },
          { reps: 8, weightKg: 0 }
        ],
        restSec: 60
      },
      {
        exerciseId: 'wall-push-ups',
        sets: [
          { reps: 10, weightKg: 0 },
          { reps: 10, weightKg: 0 },
          { reps: 10, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'seated-overhead-press',
        sets: [
          { reps: 10, weightKg: 1 },
          { reps: 10, weightKg: 1 },
          { reps: 10, weightKg: 1 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'countertop-calf-raise',
        sets: [
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'seated-row',
        sets: [
          { reps: 10, weightKg: 0 },
          { reps: 10, weightKg: 0 }
        ],
        restSec: 45
      }
    ]
  },
  {
    id: 'seated-mobility-rehab',
    name: 'Seated & Bed Mobility Engine (Wheelchair Friendly)',
    description: '100% seated or bed-supported movements. Ideal for wheelchair athletes, post-injury recovery, and seniors maintaining independence.',
    category: 'Accessible / Elderly',
    difficulty: 'Beginner',
    durationMinutes: 20,
    tags: ['Wheelchair Ready', 'Seated Only', 'Rehab & Seniors', 'Mobility'],
    isAccessible: true,
    exercises: [
      {
        exerciseId: 'seated-torso-twist',
        sets: [
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 }
        ],
        restSec: 30
      },
      {
        exerciseId: 'seated-overhead-press',
        sets: [
          { reps: 10, weightKg: 1 },
          { reps: 10, weightKg: 1 },
          { reps: 10, weightKg: 1 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'seated-row',
        sets: [
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'lying-glute-bridge',
        sets: [
          { reps: 10, weightKg: 0 },
          { reps: 10, weightKg: 0 }
        ],
        restSec: 60
      }
    ]
  },
  {
    id: 'senior-chair-vitality',
    name: 'Senior Chair Vitality & Fall-Proof Strength',
    description: 'Comprehensive whole-body routine using only a chair and water bottles. Boosts functional leg strength, shoulder mobility, and gentle cardio without floor bending.',
    category: 'Accessible / Elderly',
    difficulty: 'Beginner',
    durationMinutes: 20,
    tags: ['Chair Friendly', 'Fall Prevention', 'Water Bottles', 'Joint Safe', 'Senior Health'],
    isAccessible: true,
    exercises: [
      {
        exerciseId: 'chair-sit-to-stand',
        sets: [
          { reps: 8, weightKg: 0 },
          { reps: 8, weightKg: 0 },
          { reps: 8, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'wall-push-ups',
        sets: [
          { reps: 10, weightKg: 0 },
          { reps: 10, weightKg: 0 },
          { reps: 10, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'seated-water-bottle-lateral-raises',
        sets: [
          { reps: 10, weightKg: 1 },
          { reps: 10, weightKg: 1 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'seated-knee-lifts',
        sets: [
          { reps: 12, weightKg: 0 },
          { reps: 12, weightKg: 0 }
        ],
        restSec: 30
      },
      {
        exerciseId: 'seated-shadow-boxing',
        sets: [
          { reps: 20, weightKg: 0 },
          { reps: 20, weightKg: 0 }
        ],
        restSec: 45
      }
    ]
  },
  {
    id: 'spartan-3000-push',
    name: 'Push Power 3000',
    description: 'Heavy chest, shoulder, and tricep blasting routine designed for explosive upper body pushing power and muscle hypertrophy.',
    category: 'Push',
    difficulty: 'Intermediate',
    durationMinutes: 50,
    tags: ['Chest', 'Shoulders', 'Triceps', 'Hypertrophy'],
    exercises: [
      {
        exerciseId: 'barbell-bench-press',
        sets: [
          { reps: 10, weightKg: 50 },
          { reps: 8, weightKg: 60 },
          { reps: 8, weightKg: 70 },
          { reps: 6, weightKg: 75 }
        ],
        restSec: 90
      },
      {
        exerciseId: 'incline-dumbbell-press',
        sets: [
          { reps: 10, weightKg: 20 },
          { reps: 10, weightKg: 22 },
          { reps: 8, weightKg: 24 }
        ],
        restSec: 75
      },
      {
        exerciseId: 'overhead-press',
        sets: [
          { reps: 8, weightKg: 35 },
          { reps: 8, weightKg: 40 },
          { reps: 6, weightKg: 42 }
        ],
        restSec: 90
      },
      {
        exerciseId: 'push-ups',
        sets: [
          { reps: 20, weightKg: 0 },
          { reps: 15, weightKg: 0 }
        ],
        restSec: 45
      }
    ]
  },
  {
    id: 'titan-3000-pull',
    name: 'Pull & Back Hypertrophy',
    description: 'Back thickness, width, and arm building session targeting lats, rhomboids, rear delts, and biceps.',
    category: 'Pull',
    difficulty: 'Intermediate',
    durationMinutes: 55,
    tags: ['Back', 'Lats', 'Biceps', 'Rear Delts'],
    exercises: [
      {
        exerciseId: 'barbell-deadlift',
        sets: [
          { reps: 8, weightKg: 80 },
          { reps: 6, weightKg: 100 },
          { reps: 5, weightKg: 110 }
        ],
        restSec: 120
      },
      {
        exerciseId: 'pull-ups',
        sets: [
          { reps: 8, weightKg: 0 },
          { reps: 8, weightKg: 0 },
          { reps: 6, weightKg: 0 }
        ],
        restSec: 90
      },
      {
        exerciseId: 'barbell-bicep-curl',
        sets: [
          { reps: 10, weightKg: 22 },
          { reps: 10, weightKg: 25 },
          { reps: 8, weightKg: 28 }
        ],
        restSec: 60
      }
    ]
  },
  {
    id: 'colossus-3000-legs',
    name: 'Iron Leg Dominance',
    description: 'Complete lower body workout targeting quads, hamstrings, glutes, and calves with heavy compounds.',
    category: 'Legs',
    difficulty: 'Advanced',
    durationMinutes: 55,
    tags: ['Squats', 'Quads', 'Hamstrings', 'Glutes'],
    exercises: [
      {
        exerciseId: 'barbell-back-squat',
        sets: [
          { reps: 10, weightKg: 60 },
          { reps: 8, weightKg: 80 },
          { reps: 6, weightKg: 90 },
          { reps: 5, weightKg: 100 }
        ],
        restSec: 120
      },
      {
        exerciseId: 'air-squats',
        sets: [
          { reps: 20, weightKg: 0 },
          { reps: 20, weightKg: 0 },
          { reps: 20, weightKg: 0 }
        ],
        restSec: 60
      }
    ]
  },
  {
    id: 'rep-gauntlet-3000',
    name: 'The 3000-Rep Milestone Gauntlet',
    description: 'Special challenge session designed to bank 150+ reps directly toward your 3000-Rep milestone goal! High tempo, bodyweight & kettlebell grit.',
    category: '3000 Challenge',
    difficulty: 'Intermediate',
    durationMinutes: 40,
    tags: ['3000 Challenge', 'High Reps', 'Conditioning'],
    exercises: [
      {
        exerciseId: 'air-squats',
        sets: [
          { reps: 25, weightKg: 0 },
          { reps: 25, weightKg: 0 },
          { reps: 25, weightKg: 0 },
          { reps: 25, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'push-ups',
        sets: [
          { reps: 20, weightKg: 0 },
          { reps: 20, weightKg: 0 },
          { reps: 15, weightKg: 0 }
        ],
        restSec: 45
      },
      {
        exerciseId: 'kettlebell-swings',
        sets: [
          { reps: 25, weightKg: 16 },
          { reps: 25, weightKg: 16 },
          { reps: 25, weightKg: 16 }
        ],
        restSec: 45
      }
    ]
  }
];

export const CHALLENGE_MILESTONES = [
  { reps: 250, title: 'Iron Initiate', badge: 'Iron Medal', description: 'Crossed the first 250 reps threshold!' },
  { reps: 750, title: 'Steel Soldier', badge: 'Steel Shield', description: '750 reps clocked — momentum is building!' },
  { reps: 1500, title: 'Halfway Hero', badge: 'Silver Star', description: '1,500 reps done — 50% through the 3000 Journey!' },
  { reps: 2250, title: 'Colossus Vanguard', badge: 'Gold Crown', description: '2,250 reps — the finish line of 3000 is within grasp!' },
  { reps: 3000, title: 'Spartan 3000 Legend', badge: 'Master Trophy', description: '3,000 REPS COMPLETED! Elite athlete tier unlocked!' },
  { reps: 5000, title: 'Mythic 5000 Ascendant', badge: 'Mythic Apex', description: 'Transcended beyond the 3000 threshold into legend!' },
];
