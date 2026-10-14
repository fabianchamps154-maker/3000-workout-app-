# 🏋️‍♂️ 3000 Workout App

> High-volume workout tracker, custom routine builder, guided workout player, and the **3,000 Reps Milestone Challenge**.

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com)

---

## 🚀 Overview

**3000 Workout App** is an athletic training platform built for lifters, athletes, and fitness enthusiasts pursuing high training volume, consistency, and measurable progression.

At the core of the app is **The 3,000 Milestone Club**—a monthly goal tracking system challenging athletes to log 3,000 repetitions across compound and functional movements, racking up volume and unlocking tiered achievements.

---

## ✨ Features

### 1. ⚡ Live Interactive Workout Player
- **Set-by-Set Logging:** Real-time logging of weight (kg/lbs) and repetitions with quick set checkoffs.
- **Automated Rest Countdown:** When a set is checked off, the rest timer automatically triggers with progress visualization.
- **Zero-Latency Audio Synthesizer:** Built-in Web Audio API alerts for countdown ticks (3.. 2.. 1..) and rest completion chimes without external assets.
- **Dynamic Workout Customization:** Add or delete sets and insert exercises on the fly.
- **Celebration Summary:** Confetti effects and detailed performance breakdowns (total volume, reps, estimated calories burned, points earned).
- **Background Minimization:** Keep the timer running while browsing other routines or exercise guides.

### 2. 🏆 The 3000 Milestone Club
- **Volume & Rep Progress:** Real-time gauge tracking progress toward the 3,000-rep monthly milestone.
- **Pacing Intelligence:** Calculates recommended daily and per-session quotas to stay on track.
- **Milestone Tier Badges:**
  - 🥉 **Rookie 500:** 500 reps logged
  - 🥈 **Centurion 1,000:** 1,000 reps logged
  - 🥇 **Titan 2,000:** 2,000 reps logged
  - 👑 **The 3000 Champion:** 3,000 reps completed
- **Alternative 3000 Metrics:** Track 30,000 kg total volume lifted, 3,000 active calories burned, or 3,000 workout minutes.

### 3. 📋 Signature Routines & Custom Builder
- **Pre-Configured Routines:**
  - **Spartan 3000 Challenge:** Flagship high-volume full-body conditioning benchmark.
  - **Push Armor 3000:** Heavy compound chest, shoulders, and triceps hypertrophy.
  - **Titan Pull 3000:** Deadlifts, pull-ups, rows, and arm thickness protocol.
  - **Zero-Equipment Beast:** Bodyweight and core calisthenics.
- **Custom Routine Creator:** Build bespoke workouts with configurable target sets, reps, starting weights, and rest intervals.
- **Routine Duplication:** Clone and modify existing routines.

### 4. 📚 Comprehensive Exercise Database
- 60+ exercises categorized by muscle groups (Chest, Back, Legs, Shoulders, Arms, Core, Cardio).
- Filter by muscle group and equipment type (Barbell, Dumbbell, Bodyweight, Cable, Machine, Kettlebell).
- Detailed anatomical instructions, target muscle lists, and form cues.
- 1-click "Quick Start" launch for any individual exercise.

### 5. 🧮 Athletic Training Calculators
- **One-Rep Max (1RM) Calculator:** Combines Epley and Brzycki equations to calculate your estimated maximum lift and generates a complete training load percentage table (50% to 95%).
- **Barbell Plate Loader:** Calculates the exact Olympic plates (25kg, 20kg, 15kg, 10kg, 5kg, 2.5kg, 1.25kg) required per sleeve and renders a visual barbell diagram.
- **HIIT & Rest Interval Timer:** Standalone customizable interval timer with auditory countdown beeps.

### 6. 📊 Analytics, History & Data Privacy
- View chronological workout sessions with drill-down modals for individual sets.
- Aggregate metrics: Total workouts, total volume lifted, total reps, and average duration.
- **Full Data Portability:** Export workout history to JSON backup and import anytime.
- **Local-First:** All data persists securely in local storage.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visuals:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio:** Web Audio API (Synthesizer)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v20 or v22 recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/fabianchamps154-maker/3000-workout-app-.git
cd 3000-workout-app-

# Install dependencies
npm install
```

### Running in Development
```bash
npm run dev
```
The application will be running at `http://localhost:3000`.

### Building for Production
```bash
npm run build
```

### Linting & Type Checking
```bash
npm run lint
```

---

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation, streak counter & active session pill
│   │   ├── Dashboard.tsx       # 3000 Progress gauge, quick stats & launch cards
│   │   ├── WorkoutPlayer.tsx   # Live set tracker, rest timer & sound alerts
│   │   ├── RoutinesView.tsx    # Signature & custom routine library
│   │   ├── ExerciseLibrary.tsx # 60+ exercises with technique guides
│   │   ├── Challenge3000.tsx   # 3000 Club milestones & badge unlocks
│   │   ├── HistoryView.tsx     # Past workout logs & JSON export/import
│   │   └── FitnessTools.tsx    # 1RM calculator, plate loader & interval timer
│   ├── data/
│   │   ├── exercises.ts        # Comprehensive exercise catalog
│   │   └── presetRoutines.ts   # Signature preset workout templates
│   ├── utils/
│   │   ├── audio.ts            # Web Audio API alert synthesizer
│   │   └── storage.ts          # LocalStorage persistence & seed data
│   ├── types.ts                # TypeScript definitions & interfaces
│   ├── App.tsx                 # Main application controller
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles & Tailwind CSS v4 imports
├── index.html              # HTML shell & athletic font imports
├── metadata.json           # AI Studio app metadata
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

MIT License. Built for athletes everywhere.
