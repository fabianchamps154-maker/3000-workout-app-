# 3000 Workout App

A comprehensive, mobile-first workout tracking and fitness application built around the 3,000-Rep Milestone Training System, featuring solid pink-and-green aesthetics, visual technique guides, and non-equipment alternatives for seniors and disabled athletes.

## Key Features

### 1. Mobile App Screen Architecture
- **Smartphone Device Shell**: Formatted specifically to fit a mobile app screen with native status bar (time, signal, wifi, battery, dynamic island), compact app bar, and fixed bottom tab bar.
- **Sticky Bottom Navigation**: Thumb-friendly navigation bar with 5 primary tabs:
  - **Today**: Quick stats, milestone gauge, visual guides, and routine launchpad.
  - **Routines**: Curated splits and custom workout blueprints.
  - **Visuals**: Illustrated vector technique cues and household modifications.
  - **3000**: Spartan 3000-rep challenge meter and quick daily rep bank.
  - **Progress**: Comprehensive history log and Personal Records (PR) board.
- **Floating Active Workout Mini-Bar**: Persistent floating resume widget appears above the bottom bar during any active session for quick 1-tap resumption.

### 2. High-Contrast Solid Pink & Green Palette
- Crisp, bold, solid colors without gradient blurring (`#db2777` solid pink, `#059669` solid emerald green, `#fafafa` bright background, `#18181b` high-contrast typography).
- Clear visual hierarchy with solid status chips, solid progress bars, and accessible border contrasts.

### 3. Visual Technique Diagrams & Non-Equipment Alternatives
- **Illustrated Vector SVG Diagrams**: Accurate, high-contrast movement figures covering all fundamental biomechanical patterns:
  - **Chest & Push**: Standard Bench/Push-Up ↔ Wall Push-Up & Seated Isometric Chest Squeeze
  - **Legs & Squats**: Barbell Squats ↔ Chair Sit-to-Stand & Seated Knee Extensions
  - **Back & Pull**: Conventional Deadlift ↔ Seated Doorframe Towel Row
  - **Glutes & Hamstrings**: Romanian Deadlift ↔ Chair-Supported Hip Hinge
  - **Arms & Biceps**: Barbell Curl ↔ Seated Soup Can / Water Bottle Curls
  - **Core & Abdominals**: Floor Planks ↔ Seated Alternating Knee Lifts & Torso Twists
  - **Shoulders & Posture**: Overhead Press ↔ Seated Water Bottle Lateral Raises & Wall Angels
  - **Hips & Pelvis**: Heavy Barbell Hip Thrust ↔ Gentle Bed/Mat Pelvic Bridge
- **Accessibility & Elderly Badges**: Every movement is tagged with **Wheelchair / Chair Ready**, **Zero Joint / Spine Strain**, and **Senior Fall-Safe** indicators.
- **Household Substitutions**: Uses common household items (dining chairs, flat walls, 16oz water bottles, bath towels, sofa cushions) so anyone can train without gym equipment.

### 4. Body Somatotype & Weight Personalization
- Calibrate workout pacing, volume, and starting loads to user somatotype:
  - **Ectomorph**: Hypertrophy focus with longer rest periods.
  - **Mesomorph**: Athletic power, balanced hypertrophy, and high volume.
  - **Endomorph**: Conditioning density, metabolic pacing, and shorter rest.
- Weight calibration dynamically computes volume moved in kilograms (kg) or pounds (lbs).

### 5. Interactive Session Timer & Live Tracker
- Live stopwatch, set-by-set weight and repetition logging, and automated rest countdown timers with Web Audio API chime notifications.
- Celebratory confetti and post-workout summary with automated Personal Record (PR) detection.

### 6. Spartan 3000 Rep Milestone Challenge
- Global 3,000-repetition counter tracking every rep across formal workouts and casual daily sets.
- Quick Rep Bank tool to log daily pushups, chair stands, or walking lunges.
- Milestone medals (Initiate, Soldier, Halfway Hero, Vanguard, Spartan 3000 Legend).

### 7. Local Storage & JSON Backup
- Zero cloud account required; all workouts, PRs, profile settings, and custom routines persist locally in `localStorage`.
- 1-click JSON backup export for data portability.

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run TypeScript typecheck
npm run lint

# Production build
npm run build
```
