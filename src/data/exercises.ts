import { Exercise, MuscleGroup } from '../types';

export const EXERCISE_DATABASE: Exercise[] = [
  // CHEST
  {
    id: 'bench-press-barbell',
    name: 'Barbell Bench Press',
    category: 'chest',
    equipment: 'barbell',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoid', 'Triceps'],
    secondaryMuscles: ['Core', 'Lats'],
    instructions: [
      'Lie flat on the bench with eyes directly under the racked bar.',
      'Grip the bar slightly wider than shoulder-width with wrapped thumbs.',
      'Retract your scapula, plant feet firmly into the floor, and unrack.',
      'Lower the bar with control to your lower sternum.',
      'Drive your feet into the floor and press upward powerfully to full lockout.'
    ],
    tips: 'Keep your elbows tucked at roughly 45–60 degrees, not flared out at 90 degrees.',
    defaultSets: 4,
    defaultReps: 8,
    defaultRestSec: 120,
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'chest',
    equipment: 'dumbbell',
    targetMuscles: ['Clavicular Pectoral (Upper Chest)', 'Anterior Deltoid', 'Triceps'],
    instructions: [
      'Set an adjustable bench to a 30° to 45° incline angle.',
      'Clean dumbbells to your shoulders and sit down firmly.',
      'Press both dumbbells overhead with palms facing away or slightly inward.',
      'Lower under control until elbows are level with your torso, feeling a deep chest stretch.',
      'Squeeze upper chest together as you press back to top.'
    ],
    tips: 'Avoid too steep of an incline (>45°) which shifts the load entirely to front deltoids.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 90,
  },
  {
    id: 'cable-chest-fly',
    name: 'High-to-Low Cable Fly',
    category: 'chest',
    equipment: 'cable',
    targetMuscles: ['Sternal Pectoral (Lower Chest)', 'Inner Pectoralis'],
    instructions: [
      'Set cable pulleys at head height and grab handles.',
      'Step forward with a staggered stance, slight forward lean from hips.',
      'Keeping a slight bend in your elbows, sweep hands downward and together.',
      'Cross or touch hands in front of your hips and contract your chest hard.',
      'Slowly open arms wide to feel a full pectoral stretch.'
    ],
    tips: 'Maintain constant elbow angle throughout the entire fly movement.',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
  },
  {
    id: 'push-ups',
    name: 'Classic Push-Ups',
    category: 'chest',
    equipment: 'bodyweight',
    targetMuscles: ['Chest', 'Triceps', 'Anterior Deltoid', 'Core'],
    instructions: [
      'Start in a high plank position with hands slightly wider than shoulder-width.',
      'Engage glutes and core to keep your body in a straight line.',
      'Lower chest to about an inch off the ground, elbows at 45 degrees.',
      'Push the ground away forcefully to return to the starting plank.'
    ],
    tips: 'Do not let your hips sag or hike up; keep a rigid hollow-body core.',
    defaultSets: 3,
    defaultReps: 20,
    defaultRestSec: 60,
  },
  {
    id: 'dips-chest',
    name: 'Chest Dips',
    category: 'chest',
    equipment: 'bodyweight',
    targetMuscles: ['Lower Chest', 'Triceps', 'Shoulders'],
    instructions: [
      'Grip the parallel dip bars and hoist yourself up.',
      'Lean your torso forward at about 30 degrees with knees bent.',
      'Lower down until shoulders are slightly lower than elbows.',
      'Push through the palms and straighten arms without hyperextending elbows.'
    ],
    tips: 'Leaning forward emphasizes chest; staying upright emphasizes triceps.',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 90,
  },

  // BACK
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'back',
    equipment: 'barbell',
    targetMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Hamstrings', 'Glutes', 'Traps'],
    instructions: [
      'Stand with feet hip-width apart, mid-foot directly under the bar.',
      'Hinge at hips, bend knees slightly, and grip bar just outside legs.',
      'Pull chest up, pull shoulder blades down and back, brace core 360 degrees.',
      'Drive through floor, extending hips and knees simultaneously.',
      'Lock out with hips tall and shoulders neutral; do not over-arch lumbar spine.'
    ],
    tips: 'Drag the barbell up your shins and thighs in a straight vertical path.',
    defaultSets: 4,
    defaultReps: 5,
    defaultRestSec: 150,
  },
  {
    id: 'pull-ups',
    name: 'Overhand Pull-Ups',
    category: 'back',
    equipment: 'bodyweight',
    targetMuscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids', 'Biceps'],
    instructions: [
      'Hang from an overhead pull-up bar with an overhand grip slightly wider than shoulders.',
      'Initiate pull by retracting and depressing scapulae.',
      'Drive elbows down towards hips and pull until chin clears the bar.',
      'Pause for a fraction of a second at top, then lower smoothly to full hang.'
    ],
    tips: 'Avoid swinging or kicking legs; maintain controlled tempo.',
    defaultSets: 4,
    defaultReps: 8,
    defaultRestSec: 90,
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    category: 'back',
    equipment: 'barbell',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Traps', 'Rear Delts'],
    instructions: [
      'Hold a barbell with shoulder-width pronated grip.',
      'Hinge forward until torso is around 45 degrees to the floor.',
      'Pull bar towards your navel, driving elbows up and back.',
      'Squeeze shoulder blades tightly at top.',
      'Lower bar with control until arms are fully extended.'
    ],
    tips: 'Keep lower back neutral and core firmly braced throughout.',
    defaultSets: 4,
    defaultReps: 8,
    defaultRestSec: 90,
  },
  {
    id: 'lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    category: 'back',
    equipment: 'cable',
    targetMuscles: ['Latissimus Dorsi', 'Upper Back', 'Biceps'],
    instructions: [
      'Sit comfortably and adjust thigh pad snugly over knees.',
      'Grip the wide bar with overhand grip wider than shoulders.',
      'Lean back slightly (10-15 degrees) and draw bar down to upper chest.',
      'Lead with elbows and squeeze lats hard at bottom.',
      'Allow bar to return under control to complete stretch at top.'
    ],
    tips: 'Do not swing your whole torso backwards to heave the weight down.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75,
  },
  {
    id: 'single-arm-dumbbell-row',
    name: 'Single-Arm Dumbbell Row',
    category: 'back',
    equipment: 'dumbbell',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Rear Deltoid'],
    instructions: [
      'Place one knee and same-side hand on a flat bench.',
      'Hold dumbbell in opposite hand, arm hanging straight down.',
      'Pull dumbbell up towards hip pocket, keeping elbow tight to ribcage.',
      'Squeeze back musculature at the top.',
      'Lower weight slowly back to bottom stretch.'
    ],
    tips: 'Pull towards the hip, not straight up to the chest.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60,
  },

  // LEGS
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    category: 'legs',
    equipment: 'barbell',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Adductors', 'Hamstrings'],
    instructions: [
      'Rest bar comfortably across upper traps or rear delts.',
      'Set feet shoulder-width apart with toes flared slightly out (15-30°).',
      'Brace abdomen, break at knees and hips together.',
      'Squat down until hip crease is at or below top of knees (parallel).',
      'Drive through mid-foot and stand tall with glute contraction.'
    ],
    tips: 'Keep knees tracking in line with your toes throughout the descent and ascent.',
    defaultSets: 4,
    defaultReps: 6,
    defaultRestSec: 150,
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    category: 'legs',
    equipment: 'barbell',
    targetMuscles: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    instructions: [
      'Stand holding bar at thigh height with feet hip-width.',
      'With soft knees, push hips directly backward as if touching a wall.',
      'Lower bar close to shins until you feel a deep hamstring stretch.',
      'Contract glutes and hamstrings to drive hips forward back to standing.'
    ],
    tips: 'Movement is a pure hip hinge, not a knee bend squat.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 90,
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'legs',
    equipment: 'dumbbell',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    instructions: [
      'Stand 2-3 feet in front of a flat bench holding dumbbells.',
      'Place top of rear foot laces-down onto the bench.',
      'Descend by bending front knee until rear knee hovers above floor.',
      'Push through front heel to return to top.'
    ],
    tips: 'Lean slightly forward at torso to bias glute engagement.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75,
  },
  {
    id: 'leg-press',
    name: '45-Degree Leg Press',
    category: 'legs',
    equipment: 'machine',
    targetMuscles: ['Quadriceps', 'Glutes', 'Adductors'],
    instructions: [
      'Sit securely in seat with lower back pinned to backrest.',
      'Place feet shoulder-width in middle of sled plate.',
      'Release safety handles and lower sled until knees reach 90 degrees.',
      'Press sled back up without hyperextending or locking out knees.'
    ],
    tips: 'Never allow lower back or hips to lift off the seat pad.',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 90,
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    category: 'legs',
    equipment: 'machine',
    targetMuscles: ['Gastrocnemius', 'Soleus'],
    instructions: [
      'Position balls of feet on platform edge, shoulders under pads.',
      'Lower heels below platform level for maximum calf stretch.',
      'Explode upward onto tips of toes and hold contraction for 1 second.',
      'Lower down smoothly over 3 seconds.'
    ],
    tips: 'A 1-second pause at both top and bottom eliminates elastic rebound.',
    defaultSets: 4,
    defaultReps: 15,
    defaultRestSec: 60,
  },

  // SHOULDERS
  {
    id: 'overhead-barbell-press',
    name: 'Overhead Barbell Press (OHP)',
    category: 'shoulders',
    equipment: 'barbell',
    targetMuscles: ['Anterior Deltoid', 'Lateral Deltoid', 'Triceps', 'Upper Chest'],
    instructions: [
      'Stand with feet shoulder-width, bar resting on front deltoids.',
      'Brace core and squeeze glutes hard.',
      'Press bar vertically overhead, moving head slightly back to clear bar path.',
      'Lock out arms with bar directly over crown of head.',
      'Lower bar with control back to collarbone level.'
    ],
    tips: 'Do not lean back excessively through the lumbar spine.',
    defaultSets: 4,
    defaultReps: 6,
    defaultRestSec: 120,
  },
  {
    id: 'lateral-raise-dumbbell',
    name: 'Dumbbell Lateral Raise',
    category: 'shoulders',
    equipment: 'dumbbell',
    targetMuscles: ['Lateral Deltoid (Side Delt)'],
    instructions: [
      'Stand tall holding dumbbells by sides with neutral grip.',
      'With slight bend in elbows, raise arms out to sides until parallel to floor.',
      'Lead with elbows and pinkies slightly higher than thumbs.',
      'Pause at apex, then lower slowly over 2-3 seconds.'
    ],
    tips: 'Think about pushing the dumbbells away from your sides rather than lifting up.',
    defaultSets: 4,
    defaultReps: 15,
    defaultRestSec: 60,
  },
  {
    id: 'face-pulls',
    name: 'Cable Face Pulls',
    category: 'shoulders',
    equipment: 'cable',
    targetMuscles: ['Posterior Deltoid', 'Rotator Cuff', 'Rhomboids', 'Traps'],
    instructions: [
      'Attach rope to high pulley, grasp ends with thumbs pointing back.',
      'Step back, pull rope straight toward eyes/forehead while separating hands.',
      'Externally rotate shoulders at end so hands are beside ears in double-bicep pose.',
      'Hold contraction for 1 second, then control back to start.'
    ],
    tips: 'Outstanding for shoulder health, posture, and rear delt hypertrophy.',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 60,
  },
  {
    id: 'arnold-press',
    name: 'Arnold Dumbbell Press',
    category: 'shoulders',
    equipment: 'dumbbell',
    targetMuscles: ['Anterior Deltoid', 'Lateral Deltoid', 'Triceps'],
    instructions: [
      'Sit on upright bench with dumbbells at chest level, palms facing you.',
      'As you press overhead, rotate wrists outward until palms face forward at top.',
      'Reverse rotation smoothly as you lower dumbbells back to chest.'
    ],
    tips: 'Smooth fluid rotation through the entire range of motion.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75,
  },

  // ARMS
  {
    id: 'barbell-bicep-curl',
    name: 'Barbell Bicep Curl',
    category: 'arms',
    equipment: 'barbell',
    targetMuscles: ['Biceps Brachii', 'Brachialis'],
    instructions: [
      'Stand holding barbell with supinated shoulder-width grip.',
      'Pin elbows to sides and curl bar upward toward chest.',
      'Squeeze biceps peak at top without swinging elbows forward.',
      'Lower under control to full arm extension.'
    ],
    tips: 'Avoid rocking torso back and forth to heave the weight.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60,
  },
  {
    id: 'tricep-rope-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    category: 'arms',
    equipment: 'cable',
    targetMuscles: ['Triceps Lateral & Medial Heads'],
    instructions: [
      'Attach rope to upper pulley and grab ends with neutral grip.',
      'Tuck elbows at sides with slight forward torso lean.',
      'Extend arms downward, flaring rope ends apart at bottom for full contraction.',
      'Allow hands to return up to chest level with elbows remaining motionless.'
    ],
    tips: 'Keep upper arms completely stationary throughout the movement.',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Bicep Curl',
    category: 'arms',
    equipment: 'dumbbell',
    targetMuscles: ['Biceps Brachii Long Head'],
    instructions: [
      'Sit on an incline bench set to 45 degrees, arms hanging straight down.',
      'Curl dumbbells upward while keeping upper arms vertical.',
      'Supinate wrists at top and squeeze.',
      'Lower all the way down to complete bicep stretch.'
    ],
    tips: 'The incline position stretches the long head of the bicep for maximal peak development.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60,
  },
  {
    id: 'skull-crushers',
    name: 'Lying EZ-Bar Skull Crushers',
    category: 'arms',
    equipment: 'barbell',
    targetMuscles: ['Triceps Long Head', 'Triceps Medial Head'],
    instructions: [
      'Lie flat on bench holding EZ-curl bar above chest with arms extended.',
      'Angling upper arms slightly back toward head, bend elbows to lower bar to forehead/crown.',
      'Keep elbows narrow; do not let them flare wide.',
      'Extend forearms forcefully back to starting angle.'
    ],
    tips: 'Angling upper arms 10-15 degrees backward maintains continuous triceps tension at the top.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75,
  },
  {
    id: 'hammer-curls',
    name: 'Dumbbell Hammer Curls',
    category: 'arms',
    equipment: 'dumbbell',
    targetMuscles: ['Brachioradialis', 'Brachialis', 'Forearms'],
    instructions: [
      'Stand holding dumbbells with palms facing each other (neutral grip).',
      'Curl dumbbells upward while keeping palms facing inward.',
      'Squeeze forearms and outer arm at top.',
      'Lower with control.'
    ],
    tips: 'Builds arm thickness and forearm grip strength.',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
  },

  // CORE
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg Raises',
    category: 'core',
    equipment: 'bodyweight',
    targetMuscles: ['Rectus Abdominis (Lower Abs)', 'Hip Flexors', 'Obliques'],
    instructions: [
      'Hang from pull-up bar with overhand grip and engaged shoulders.',
      'Keeping legs straight or with slight knee bend, raise feet toward bar level.',
      'Curl pelvis up at top to fully recruit abdominal wall.',
      'Lower legs slowly without swinging back and forth.'
    ],
    tips: 'Do not use momentum; curl the pelvis up rather than simply lifting thighs.',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
  },
  {
    id: 'ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    category: 'core',
    equipment: 'bodyweight',
    targetMuscles: ['Deep Core', 'Transverse Abdominis', 'Lats'],
    instructions: [
      'Kneel on mat with hands on ab wheel handles directly under shoulders.',
      'Roll wheel forward, extending body into straight line as far as controllable.',
      'Contract abs and pull hips back to starting position.'
    ],
    tips: 'Maintain posterior pelvic tilt (slight round in lower back) to protect spine.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60,
  },
  {
    id: 'plank-hold',
    name: 'Forearm Plank Hold',
    category: 'core',
    equipment: 'bodyweight',
    targetMuscles: ['Core', 'Transverse Abdominis', 'Shoulders', 'Glutes'],
    instructions: [
      'Place forearms on floor with elbows directly beneath shoulders.',
      'Extend legs back, toes tucked, body forming a rigid straight bridge.',
      'Squeeze glutes, quads, and brace abdominal wall.',
      'Breathe steadily while holding position for target time.'
    ],
    tips: 'Pull elbows toward toes isometrically to multiply core activation.',
    defaultSets: 3,
    defaultReps: 60, // seconds
    defaultRestSec: 45,
  },

  // CARDIO & CONDITIONING / 3000 HYBRID
  {
    id: 'kettlebell-swings',
    name: 'Russian Kettlebell Swings',
    category: 'cardio',
    equipment: 'kettlebell',
    targetMuscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Core', 'Shoulders'],
    instructions: [
      'Stand feet shoulder-width, kettlebell one foot in front on floor.',
      'Hinge hips back and hike bell between legs.',
      'Drive hips forward with explosive hip extension, snapping bell to chest height.',
      'Let bell swing naturally down and hinge back into next rep.'
    ],
    tips: 'Power comes from hips and glutes, not lifting with arms.',
    defaultSets: 4,
    defaultReps: 25,
    defaultRestSec: 45,
  },
  {
    id: 'burpees',
    name: 'Full Chest-to-Floor Burpees',
    category: 'cardio',
    equipment: 'bodyweight',
    targetMuscles: ['Full Body', 'Chest', 'Quads', 'Cardiovascular System'],
    instructions: [
      'From standing, drop into squat and place hands on ground.',
      'Jump feet back into plank and lower chest to floor.',
      'Push up, jump feet back towards hands.',
      'Explode vertically with arms overhead and clap.'
    ],
    tips: 'Maintain steady rhythmic pacing for endurance workouts.',
    defaultSets: 4,
    defaultReps: 15,
    defaultRestSec: 45,
  },
  {
    id: 'box-jumps',
    name: 'Plyometric Box Jumps',
    category: 'cardio',
    equipment: 'bodyweight',
    targetMuscles: ['Calves', 'Quads', 'Glutes', 'Central Nervous System'],
    instructions: [
      'Stand facing 20-30 inch plyo box with athletic stance.',
      'Swing arms back, hinge hips, and explode upward.',
      'Land softly on top of box with knees slightly bent in half-squat.',
      'Stand to full hip extension, step down safely one foot at a time.'
    ],
    tips: 'Focus on soft, quiet landing mechanics to protect joints.',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60,
  },
  {
    id: 'jump-rope',
    name: 'Speed Jump Rope',
    category: 'cardio',
    equipment: 'cardio',
    targetMuscles: ['Calves', 'Cardio', 'Forearms', 'Coordination'],
    instructions: [
      'Hold handles at hip height, elbows close to ribs.',
      'Turn rope with wrists, not whole arms.',
      'Stay light on balls of feet, jumping only 1-2 inches off floor.',
      'Keep continuous fluid rhythm.'
    ],
    tips: 'Turn the rope from the wrists, keeping shoulders relaxed.',
    defaultSets: 3,
    defaultReps: 100,
    defaultRestSec: 45,
  }
];

export const MUSCLE_GROUPS: { id: MuscleGroup; label: string; count: number }[] = [
  { id: 'chest', label: 'Chest', count: 5 },
  { id: 'back', label: 'Back', count: 5 },
  { id: 'legs', label: 'Legs', count: 5 },
  { id: 'shoulders', label: 'Shoulders', count: 4 },
  { id: 'arms', label: 'Arms', count: 5 },
  { id: 'core', label: 'Core', count: 3 },
  { id: 'cardio', label: 'Cardio & HIIT', count: 4 },
  { id: 'full-body', label: 'Full Body', count: 8 },
];
