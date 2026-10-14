import { Exercise } from '../types';

export const EXERCISE_DATABASE: Exercise[] = [
  // ACCESSIBLE & ELDERLY LOW-IMPACT ESSENTIALS (FEATURED FIRST)
  {
    id: 'chair-sit-to-stand',
    name: 'Chair Sit-to-Stand (Assisted Squat)',
    category: 'Legs',
    equipment: 'Household / None',
    targetMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core Balance'],
    instructions: [
      'Sit tall on a sturdy dining chair with feet flat and shoulder-width apart.',
      'Cross arms across your chest or lightly hold chair armrests for support.',
      'Lean your torso slightly forward and push through your feet to stand tall.',
      'Pause for 1 second, then slowly lower your hips back onto the chair with control.'
    ],
    tips: [
      'Avoid slamming down into the chair; practice sitting as gently as possible.',
      'Keep knees in line with toes.'
    ],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 60,
    diagramType: 'chair',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Leg Kicks / Knee Extensions',
      householdItem: 'Sturdy Living Room Chair',
      instructions: [
        'Remain fully seated with back resting comfortably against the chair.',
        'Straighten one knee out in front of you until leg is parallel to floor.',
        'Hold the squeeze for 2 seconds, then slowly lower foot to floor.',
        'Switch to the other leg. Zero standing or balance required.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Completely seated quadriceps strengthener with zero knee or hip joint impact.'
    }
  },
  {
    id: 'wall-push-ups',
    name: 'Wall Push-Ups (Joint-Friendly Push)',
    category: 'Chest',
    equipment: 'Household / None',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps', 'Core Stability'],
    instructions: [
      'Stand facing a flat wall about an arm-length away.',
      'Place palms flat against the wall at shoulder height and width.',
      'Slowly bend your elbows to bring your face and chest towards the wall.',
      'Press firmly through your palms to return to full arm extension.'
    ],
    tips: [
      'Step closer to the wall for an easier effort; step further back to increase challenge.',
      'Keeps all floor strain away from wrists and lower back.'
    ],
    defaultReps: 12,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 45,
    diagramType: 'wall',
    isSeatedFriendly: false,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Chest Squeeze & Wall Push-Away',
      householdItem: 'Wall or Small Pillow / Cushion',
      instructions: [
        'Sit tall in a chair or wheelchair facing a wall or holding a firm pillow.',
        'Press palms together tightly in front of your chest (or press hands against the wall).',
        'Hold maximum muscular chest squeeze for 5 seconds, then relax.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Isometric pectoral contraction with zero floor bending, wrist flexion, or fall risk.'
    }
  },
  {
    id: 'seated-overhead-press',
    name: 'Seated Arm & Shoulder Press',
    category: 'Shoulders',
    equipment: 'Household / None',
    targetMuscles: ['Deltoids (Shoulders)'],
    secondaryMuscles: ['Triceps', 'Upper Back'],
    instructions: [
      'Sit comfortably upright in a chair with back supported.',
      'Hold two water bottles, soup cans, or light dumbbells at ear height.',
      'Press arms smoothly overhead until elbows are softly extended.',
      'Slowly lower weights back to ear level.'
    ],
    tips: [
      'If you have limited shoulder mobility, press forward at a 45-degree angle instead of straight up.',
      'Keep your neck and jaw relaxed.'
    ],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 2,
    defaultRestSec: 60,
    diagramType: 'press',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Ceiling Reaches',
      householdItem: 'None (Bodyweight only)',
      instructions: [
        'Sit tall in chair or wheelchair.',
        'Reach one hand overhead reaching for the ceiling, stretching the side of the body.',
        'Lower hand gently and alternate with opposite arm.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Gentle shoulder mobility and postural decompression with zero external load.'
    }
  },
  {
    id: 'seated-row',
    name: 'Seated Resistance Towel Row',
    category: 'Back',
    equipment: 'Household / None',
    targetMuscles: ['Rhomboids', 'Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Posterior Deltoids'],
    instructions: [
      'Sit tall on a chair. Loop a long bath towel or resistance band around the balls of your feet.',
      'Grip both towel ends with palms facing each other.',
      'Pull towel ends towards your ribs, squeezing shoulder blades together firmly.',
      'Pause for 2 seconds, then slowly release with control.'
    ],
    tips: [
      'Sitting tall without slouching gently activates postural spine muscles.',
      'Drive with the elbows rather than yanking with hands.'
    ],
    defaultReps: 12,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 45,
    diagramType: 'pull',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Doorframe Row or Scapular Squeeze',
      householdItem: 'Doorframe or Living Room Chair',
      instructions: [
        'Sit upright with arms bent at 90 degrees at your sides like goal posts.',
        'Pinch your shoulder blades together as if holding a pencil between them.',
        'Hold the contraction for 3 seconds, then release.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Upper back posture correction and rhomboid engagement without any equipment.'
    }
  },
  {
    id: 'countertop-calf-raise',
    name: 'Countertop Supported Heel Raise',
    category: 'Legs',
    equipment: 'Household / None',
    targetMuscles: ['Gastrocnemius', 'Soleus (Calves)'],
    secondaryMuscles: ['Ankle Stabilizers', 'Foot Arches'],
    instructions: [
      'Stand tall facing a sturdy kitchen countertop or table with both hands resting lightly on the surface for balance.',
      'Slowly rise up onto the balls of both feet as high as comfortable.',
      'Hold for 1 second at the peak.',
      'Lower your heels back to the floor with slow control.'
    ],
    tips: [
      'The countertop provides 100% balance security to eliminate any fall risk.',
      'Crucial for walking stability and fall prevention.'
    ],
    defaultReps: 15,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 45,
    diagramType: 'chair',
    isSeatedFriendly: false,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Toe & Heel Taps',
      householdItem: 'Sturdy Chair',
      instructions: [
        'Sit with feet flat on the floor.',
        'Lift heels as high as possible while keeping toes planted, then drop heels.',
        'Immediately lift toes as high as possible while keeping heels planted.',
        'Alternate rhythmically.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Circulation booster and lower leg strengthening with zero standing requirement.'
    }
  },
  {
    id: 'lying-glute-bridge',
    name: 'Bed or Mat Gentle Glute Bridge',
    category: 'Legs',
    equipment: 'Household / None',
    targetMuscles: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Lower Back', 'Pelvic Floor'],
    instructions: [
      'Lie comfortably on your back on a firm bed or yoga mat with knees bent and feet flat.',
      'Rest arms flat by your sides.',
      'Press through heels to lift hips 2–4 inches off the mattress/mat.',
      'Squeeze glutes at the top for 2 seconds, then slowly lower hips back down.'
    ],
    tips: [
      'Can be performed comfortably in bed before getting up in the morning.',
      'Strengthens the glutes and lower back without compressing the spine.'
    ],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 60,
    diagramType: 'bridge',
    isSeatedFriendly: false,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Glute Clenches (Isometric)',
      householdItem: 'Chair or Bed',
      instructions: [
        'Sit upright in your chair.',
        'Squeeze both buttock cheeks together as hard as comfortable.',
        'Hold the clench for 5 seconds, breathe calmly, then relax for 5 seconds.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Non-moving glute muscle activation suitable for wheelchair users or bed rest.'
    }
  },
  {
    id: 'seated-torso-twist',
    name: 'Seated Torso Twist (Spinal Mobility)',
    category: 'Core',
    equipment: 'Household / None',
    targetMuscles: ['Obliques', 'Spinal Rotators'],
    secondaryMuscles: ['Transverse Abdominis'],
    instructions: [
      'Sit tall with feet flat on floor and hands lightly placed across your chest.',
      'Gently turn your torso to the right as far as comfortable, keeping hips stationary.',
      'Pause for 2 seconds, return to center, then turn smoothly to the left.',
      'Maintain an upright posture throughout.'
    ],
    tips: [
      'Gentle rotation maintains spinal flexibility and aids daily reaching motions.',
      'Never force the rotation; move only within a pain-free range.'
    ],
    defaultReps: 12,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 30,
    diagramType: 'core',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Belly Breathing & Core Brace',
      householdItem: 'Chair',
      instructions: [
        'Sit tall with one hand on your stomach.',
        'Inhale deeply through your nose, expanding your belly.',
        'Exhale through pursed lips while gently drawing belly button toward spine.',
        'Hold the brace for 3 seconds.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Safe deep core stabilization for rehabilitation and gentle abdominal toning.'
    }
  },

  // STANDARD GYM & COMPOUND MOVEMENTS WITH ACCESSIBLE MODIFICATIONS
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoid', 'Triceps Brachii'],
    instructions: [
      'Lie flat on the bench with feet firmly planted on the floor.',
      'Grip the bar slightly wider than shoulder-width with eyes directly underneath.',
      'Unrack the barbell and slowly lower it with control to mid-chest level.',
      'Press upward powerfully until arms are extended, keeping shoulder blades pinched.'
    ],
    tips: ['Keep your wrists straight and avoid bouncing the bar off your chest.', 'Retract your scapula for shoulder safety.'],
    defaultReps: 8,
    defaultSets: 4,
    defaultWeightKg: 60,
    defaultRestSec: 90,
    diagramType: 'press',
    accessibleAlternative: {
      title: 'Wall Push-Up or Seated Water Bottle Press',
      householdItem: 'Wall or Two 1-Liter Water Bottles',
      instructions: [
        'Stand arm-length from a flat wall and press chest in and away, OR',
        'Sit in an armchair and press two water bottles horizontally away from chest.',
        'Zero barbell weight or floor lying required.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Gentle chest and arm pressing with zero joint compression.'
    }
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    equipment: 'Dumbbell',
    targetMuscles: ['Upper Chest (Clavicular Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    instructions: [
      'Set an adjustable bench to roughly a 30-45 degree incline.',
      'Hold dumbbells at shoulder height with palms facing forward.',
      'Drive the weights up towards the ceiling, squeezing upper pecs at the top.',
      'Lower under controlled tempo back to upper chest level.'
    ],
    tips: ['Do not set the incline too steep to avoid excessive front delt strain.', 'Maintain a natural lower back arch.'],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 20,
    defaultRestSec: 75,
    diagramType: 'press',
    accessibleAlternative: {
      title: 'Seated Incline Bottle Press',
      householdItem: 'Comfortable Recliner or Armchair',
      instructions: [
        'Lean slightly back in a supportive armchair.',
        'Hold two cans of soup or water bottles at chest height.',
        'Press forward and slightly upward at a 45-degree angle.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Upper chest pressing with comfortable back support.'
    }
  },
  {
    id: 'push-ups',
    name: 'Floor Push-Ups',
    category: 'Chest',
    equipment: 'Bodyweight',
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Core', 'Anterior Deltoids'],
    instructions: [
      'Start in a high plank position with hands slightly wider than shoulders.',
      'Lower your chest to the floor by bending your elbows at approximately 45 degrees.',
      'Push forcefully away from the floor back to the starting plank position.'
    ],
    tips: ['Keep your core engaged to prevent your lower back from sagging.', 'Keep neck neutral.'],
    defaultReps: 15,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 60,
    diagramType: 'wall',
    accessibleAlternative: {
      title: 'Incline Countertop or Wall Push-Up',
      householdItem: 'Kitchen Countertop or Wall',
      instructions: [
        'Place hands on kitchen counter at a comfortable angle.',
        'Lower chest toward edge and press away smoothly.',
        'Eliminates need to get down to or up from the floor.'
      ],
      isSeatedOrWheelchairFriendly: false,
      isLowImpact: true,
      targetAdaptation: 'Safe angle that protects wrists, elbows, and eliminates floor transition.'
    }
  },
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'Back',
    equipment: 'Barbell',
    targetMuscles: ['Erector Spinae', 'Latissimus Dorsi'],
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Traps'],
    instructions: [
      'Stand with feet hip-width apart and bar over mid-foot.',
      'Hinge at hips to grip the bar just outside your shins.',
      'Engage your lats, pull the slack out of the barbell, and keep spine neutral.',
      'Drive your feet into the floor, extending hips and knees synchronously to stand tall.'
    ],
    tips: ['Never round your lower back.', 'Keep the barbell glued close to your body throughout the lift.'],
    defaultReps: 6,
    defaultSets: 3,
    defaultWeightKg: 80,
    defaultRestSec: 120,
    diagramType: 'pull',
    accessibleAlternative: {
      title: 'Broomstick or Seated Hip Hinge',
      householdItem: 'Light Broomstick or Towel',
      instructions: [
        'Sit upright on a chair with feet flat, OR stand holding a light broomstick across collarbone.',
        'Hinge forward from the hips with a flat back, feeling a gentle hamstring stretch.',
        'Squeeze glutes to return to upright position. Zero spinal loading.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Hip hinge motor pattern training without heavy compressive spine force.'
    }
  },
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    category: 'Back',
    equipment: 'Bodyweight',
    targetMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rhomboids'],
    instructions: [
      'Grip the pull-up bar overhand with hands slightly wider than shoulder width.',
      'From a dead hang, engage your shoulder blades downward.',
      'Pull yourself up until your chin clears the bar.',
      'Lower under control to full arm extension.'
    ],
    tips: ['Avoid kicking your legs or swinging.', 'Think about pulling your elbows down into your back pockets.'],
    defaultReps: 6,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 90,
    diagramType: 'pull',
    accessibleAlternative: {
      title: 'Doorframe Towel Row',
      householdItem: 'Sturdy Doorframe or Towel',
      instructions: [
        'Stand facing an open doorway and grasp both sides of the doorframe at chest height.',
        'Lean torso back slightly with straight arms.',
        'Pull your chest toward the doorframe by squeezing your back muscles.',
        'Step closer to make it gentler, or lean back further for more challenge.'
      ],
      isSeatedOrWheelchairFriendly: false,
      isLowImpact: true,
      targetAdaptation: 'Horizontal bodyweight row that requires zero hanging grip strength.'
    }
  },
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    equipment: 'Barbell',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Core'],
    instructions: [
      'Rest barbell across upper traps and unrack with a solid stance.',
      'Set feet shoulder-width apart with toes turned slightly outward.',
      'Descend by breaking at hips and knees until thighs are at or below parallel.',
      'Push the ground away through midfoot and heels to return to standing.'
    ],
    tips: ['Keep chest proud and knees tracking in line with your toes.', 'Breathe deep into your diaphragm.'],
    defaultReps: 8,
    defaultSets: 4,
    defaultWeightKg: 70,
    defaultRestSec: 120,
    diagramType: 'squat',
    accessibleAlternative: {
      title: 'Assisted Chair Stand or Wall Sit',
      householdItem: 'Kitchen Chair with Armrests',
      instructions: [
        'Place a chair behind you.',
        'Lower yourself down until your buttocks lightly tap the seat, then stand back up.',
        'Use armrests with your hands if you need balance reassurance.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Functional lower-body independence and quad strength without bar pressure.'
    }
  },
  {
    id: 'overhead-press',
    name: 'Barbell Overhead Press',
    category: 'Shoulders',
    equipment: 'Barbell',
    targetMuscles: ['Anterior Deltoids', 'Lateral Deltoids'],
    secondaryMuscles: ['Triceps', 'Core'],
    instructions: [
      'Stand with feet shoulder-width apart holding barbell at upper collarbone.',
      'Brace core and glutes tightly.',
      'Press the barbell straight overhead, tilting head back slightly to clear chin, then pushing head through at lockout.',
      'Lower bar with control back to collarbone.'
    ],
    tips: ['Do not hyperextend your lower back; maintain a solid core pillar.'],
    defaultReps: 8,
    defaultSets: 3,
    defaultWeightKg: 35,
    defaultRestSec: 90,
    diagramType: 'press',
    accessibleAlternative: {
      title: 'Seated Water Bottle Press',
      householdItem: 'Two Small Water Bottles & Chair',
      instructions: [
        'Sit upright in a chair to take all compressive stress off lower back.',
        'Hold two 500ml water bottles at shoulder height.',
        'Smoothly press overhead and return.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Shoulder stability without lower-back strain or standing fatigue.'
    }
  },
  {
    id: 'barbell-bicep-curl',
    name: 'Barbell Bicep Curl',
    category: 'Arms',
    equipment: 'Barbell',
    targetMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Forearms'],
    instructions: [
      'Stand tall holding a barbell with underhand shoulder-width grip.',
      'Pin elbows close to sides and curl bar upwards toward chest.',
      'Squeeze biceps hard at top without letting elbows swing forward.',
      'Lower under steady control.'
    ],
    tips: ['Keep upper arms stationary; avoid using hip momentum.'],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 20,
    defaultRestSec: 60,
    diagramType: 'curl',
    accessibleAlternative: {
      title: 'Seated Soup Can Curls',
      householdItem: 'Two Cans of Soup or Water Bottles',
      instructions: [
        'Sit comfortably in your chair with arms hanging naturally at your sides.',
        'Hold cans of soup and curl upward, squeezing bicep at top.',
        'Lower smoothly. Great for hand grip and elbow joint health.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Joint-friendly arm strength that can be performed entirely seated.'
    }
  },
  {
    id: 'air-squats',
    name: 'Air Squats',
    category: 'Legs',
    equipment: 'Bodyweight',
    targetMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Calves'],
    instructions: [
      'Stand with feet slightly wider than shoulders.',
      'Squat down deeply, keeping chest high and heels pinned.',
      'Drive back up to full standing lockout.'
    ],
    tips: ['Great for rapid rep volume counting.'],
    defaultReps: 20,
    defaultSets: 4,
    defaultWeightKg: 0,
    defaultRestSec: 30,
    diagramType: 'squat',
    accessibleAlternative: {
      title: 'Chair Tap Squat',
      householdItem: 'Sturdy Chair',
      instructions: [
        'Perform squat with chair right behind you for full confidence.',
        'Tap seat gently with hips before returning to standing.'
      ],
      isSeatedOrWheelchairFriendly: false,
      isLowImpact: true,
      targetAdaptation: 'Safe depth-limited squat with built-in safety seat.'
    }
  },
  {
    id: 'kettlebell-swings',
    name: 'Kettlebell Swings',
    category: 'Full Body',
    equipment: 'Kettlebell',
    targetMuscles: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Shoulders'],
    instructions: [
      'Stand feet shoulder-width, kettlebell one foot in front on floor.',
      'Hinge hips back, hike bell between legs like a football.',
      'Snap hips forward explosively, swinging bell to chest level using hip thrust power.',
      'Let bell swing back between legs and repeat fluidly.'
    ],
    tips: ['Power comes from hips snapping forward, not lifting with arms.'],
    defaultReps: 20,
    defaultSets: 4,
    defaultWeightKg: 16,
    defaultRestSec: 45,
    diagramType: 'pull',
    accessibleAlternative: {
      title: 'Standing Hip Thrust with Cushion Squeeze',
      householdItem: 'Sofa Cushion or Pillow',
      instructions: [
        'Stand tall with feet hip-width apart holding a soft pillow against your thighs.',
        'Push hips back slightly, then squeeze glutes and drive hips forward tall.',
        'Zero ballistic impact or heavy swinging object.'
      ],
      isSeatedOrWheelchairFriendly: false,
      isLowImpact: true,
      targetAdaptation: 'Low-impact hip extension that builds glute endurance safely.'
    }
  },
  {
    id: 'seated-knee-lifts',
    name: 'Seated Alternating Knee Lifts',
    category: 'Core',
    equipment: 'Household / None',
    targetMuscles: ['Lower Abdominals', 'Hip Flexors'],
    secondaryMuscles: ['Core Stabilizers'],
    instructions: [
      'Sit tall on a sturdy chair with feet flat and spine lengthened.',
      'Place hands on armrests or edges of seat for stability.',
      'Slowly lift your right knee towards your chest as high as comfortable.',
      'Pause for 1 second, lower down, and repeat with the left knee.'
    ],
    tips: ['Keep your chest lifted; avoid slouching your upper back.'],
    defaultReps: 12,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 45,
    diagramType: 'core',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Heel Taps / Foot Slides',
      householdItem: 'Smooth Floor or Towel under feet',
      instructions: [
        'Remain comfortably seated in chair or wheelchair.',
        'Slide one foot out forward onto the heel, then slide it back under you.',
        'Engages core and hip musculature with zero leg lifting off the ground.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Zero hip flexion strain, 100% accessible seated core and mobility exercise.'
    }
  },
  {
    id: 'seated-water-bottle-lateral-raises',
    name: 'Seated Water-Bottle Lateral Raises',
    category: 'Shoulders',
    equipment: 'Household / None',
    targetMuscles: ['Lateral Deltoids'],
    secondaryMuscles: ['Trapezius', 'Rotator Cuff'],
    instructions: [
      'Sit comfortably upright with feet flat.',
      'Hold two 500ml water bottles or soup cans at your sides.',
      'With elbows slightly bent, raise arms out to the sides until parallel with floor.',
      'Slowly lower back down under 2-3 seconds of control.'
    ],
    tips: ['Raise only to shoulder height; keep neck relaxed.'],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 1,
    defaultRestSec: 45,
    diagramType: 'raise',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Wall Angels / Arm Sweeps',
      householdItem: 'Wall or Chair Back',
      instructions: [
        'Sit with back against chair or wall.',
        'Place back of hands against wall at ear level and slide upward gently.',
        'Zero added weight; delivers exceptional thoracic mobility and posture support.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Rotator cuff and posture restoration without any external weights.'
    }
  },
  {
    id: 'supported-chair-hip-hinge',
    name: 'Chair-Supported Hip Hinge',
    category: 'Legs',
    equipment: 'Household / None',
    targetMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower Back Support'],
    instructions: [
      'Stand facing the back of a sturdy chair, placing hands lightly on the top rail.',
      'Keep knees soft and push your hips backwards towards the wall behind you.',
      'Lower your torso until you feel a gentle stretch in the back of your thighs.',
      'Squeeze your glutes and stand back up tall.'
    ],
    tips: ['Chair eliminates any risk of losing balance.'],
    defaultReps: 10,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 45,
    diagramType: 'hinge',
    isSeatedFriendly: false,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Hamstring Towel Stretch & Squeeze',
      householdItem: 'Bath Towel & Chair',
      instructions: [
        'Sit on chair, extend one leg out with heel on floor.',
        'Loop a bath towel around ball of foot, gently pull towel while sitting tall.',
        'Hold for 10-15 seconds and breathe gently.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Completely seated posterior chain mobility for seniors with balance concerns.'
    }
  },
  {
    id: 'seated-shadow-boxing',
    name: 'Seated Shadow Boxing & Arm Punches',
    category: 'Cardio',
    equipment: 'Household / None',
    targetMuscles: ['Shoulders', 'Upper Back'],
    secondaryMuscles: ['Cardiovascular System', 'Core'],
    instructions: [
      'Sit upright in your chair with elbows bent and fists gently by your chin.',
      'Extend right arm forward in a controlled punch, then pull back.',
      'Extend left arm forward, alternating punches smoothly.',
      'Breathe rhythmically throughout.'
    ],
    tips: ['Keep punches fluid; do not hyperextend or snap your elbows.'],
    defaultReps: 20,
    defaultSets: 3,
    defaultWeightKg: 0,
    defaultRestSec: 45,
    diagramType: 'press',
    isSeatedFriendly: true,
    isElderlyFriendly: true,
    isLowImpact: true,
    accessibleAlternative: {
      title: 'Seated Arm Reaches with Deep Breathing',
      householdItem: 'Comfortable Chair / Wheelchair',
      instructions: [
        'Sit relaxed with arms resting on lap.',
        'Reach one arm gently across your chest, breathe in deeply, and return.',
        'Alternate sides gently for joint circulation and cardiopulmonary wellness.'
      ],
      isSeatedOrWheelchairFriendly: true,
      isLowImpact: true,
      targetAdaptation: 'Gentle aerobic circulation with zero joint impact or sudden exertion.'
    }
  }
];
