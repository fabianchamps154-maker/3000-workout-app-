import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Dumbbell, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface FitnessToolsProps {
  onNavigate?: (tab: 'history') => void;
}

export const FitnessTools: React.FC<FitnessToolsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'1rm' | 'plates' | 'timer'>('1rm');

  // 1RM State
  const [liftWeight, setLiftWeight] = useState<number>(100);
  const [liftReps, setLiftReps] = useState<number>(5);

  const epley1RM = Math.round(liftWeight * (1 + liftReps / 30));
  const brzycki1RM = Math.round(liftWeight * (36 / (37 - Math.min(liftReps, 36))));
  const estimated1RM = Math.round((epley1RM + brzycki1RM) / 2);

  const percentageTiers = [
    { pct: 95, reps: '1-2 reps', goal: 'Max Strength' },
    { pct: 90, reps: '3-4 reps', goal: 'Heavy Power' },
    { pct: 85, reps: '5-6 reps', goal: 'Strength Base' },
    { pct: 80, reps: '7-8 reps', goal: 'Hypertrophy Power' },
    { pct: 75, reps: '9-10 reps', goal: 'Hypertrophy Base' },
    { pct: 70, reps: '11-12 reps', goal: 'Endurance' },
    { pct: 60, reps: '15-20 reps', goal: 'Conditioning' },
    { pct: 50, reps: 'Warmup', goal: 'Speed / Warmup' },
  ];

  // Plate Calculator State
  const [targetPlateWeight, setTargetPlateWeight] = useState<number>(100);
  const [barWeight, setBarWeight] = useState<number>(20);

  const plateDenominations = [
    { weight: 25, color: 'bg-rose-700 text-white', label: '25kg', border: 'border-rose-900' },
    { weight: 20, color: 'bg-blue-700 text-white', label: '20kg', border: 'border-blue-900' },
    { weight: 15, color: 'bg-amber-600 text-black', label: '15kg', border: 'border-amber-800' },
    { weight: 10, color: 'bg-emerald-700 text-white', label: '10kg', border: 'border-emerald-900' },
    { weight: 5, color: 'bg-zinc-300 text-black', label: '5kg', border: 'border-zinc-400' },
    { weight: 2.5, color: 'bg-zinc-900 text-white border-2 border-zinc-700', label: '2.5kg', border: 'border-zinc-600' },
    { weight: 1.25, color: 'bg-zinc-800 text-zinc-300', label: '1.25kg', border: 'border-zinc-700' }
  ];

  const calculatePlatesPerSide = () => {
    let weightPerSide = Math.max(0, (targetPlateWeight - barWeight) / 2);
    const result: { plate: typeof plateDenominations[0]; count: number }[] = [];

    plateDenominations.forEach((p) => {
      const count = Math.floor(weightPerSide / p.weight);
      if (count > 0) {
        result.push({ plate: p, count });
        weightPerSide -= count * p.weight;
      }
    });

    return { plates: result, remainingRemainder: weightPerSide };
  };

  const plateCalcResult = calculatePlatesPerSide();

  // Standalone Timer State
  const [timerDuration, setTimerDuration] = useState<number>(60);
  const [timerRemaining, setTimerRemaining] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          const next = prev - 1;
          if (next === 3 || next === 2 || next === 1) {
            soundEffects.playCountdownBeep();
          }
          if (next <= 0) {
            soundEffects.playRestComplete();
            setTimerRunning(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerRemaining]);

  const handleStartTimerPreset = (secs: number) => {
    setTimerDuration(secs);
    setTimerRemaining(secs);
    setTimerRunning(true);
  };

  const formatTimerClock = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 pb-12 max-w-2xl sm:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Athlete Tools
          </h1>
          <p className="text-xs text-zinc-400">
            Calculators & interval timer
          </p>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('history')}
            className="px-3 py-1.5 rounded-xl bg-[#0e0f17] border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Logs</span>
            <ArrowRight className="w-3 h-3 text-zinc-500" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-[#06070a] p-1 rounded-2xl border border-zinc-850 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('1rm')}
          className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center space-x-1 ${
            activeTab === '1rm' ? 'bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold' : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>1RM</span>
        </button>

        <button
          onClick={() => setActiveTab('plates')}
          className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center space-x-1 ${
            activeTab === 'plates' ? 'bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold' : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Plates</span>
        </button>

        <button
          onClick={() => setActiveTab('timer')}
          className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center space-x-1 ${
            activeTab === 'timer' ? 'bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold' : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Timer</span>
        </button>
      </div>

      {/* 1RM CALCULATOR */}
      {activeTab === '1rm' && (
        <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Weight Lifted (kg)
                </label>
                {/* Touch Stepper Chips */}
                <div className="flex items-center space-x-1">
                  {[-10, -2.5, 2.5, 10].map((d) => (
                    <button
                      key={d}
                      onClick={() => setLiftWeight(Math.max(0, liftWeight + d))}
                      className="px-2 py-0.5 rounded-lg bg-[#0e0f17] border border-zinc-800 text-[10px] font-mono text-zinc-400 active:scale-90"
                    >
                      {d > 0 ? `+${d}` : d}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min="5"
                step="2.5"
                value={liftWeight}
                onChange={(e) => setLiftWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Reps (1 - 12)
                </label>
                <div className="flex items-center space-x-1">
                  {[-1, 1].map((d) => (
                    <button
                      key={d}
                      onClick={() => setLiftReps(Math.min(15, Math.max(1, liftReps + d)))}
                      className="px-2.5 py-0.5 rounded-lg bg-[#0e0f17] border border-zinc-800 text-[10px] font-mono text-zinc-400 active:scale-90"
                    >
                      {d > 0 ? `+${d}` : d}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min="1"
                max="15"
                value={liftReps}
                onChange={(e) => setLiftReps(parseInt(e.target.value) || 1)}
                className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 1RM Result Banner */}
          <div className="p-4 rounded-2xl bg-[#050609] border border-zinc-800 flex items-center justify-between gap-2 text-left">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                ESTIMATED ONE REP MAX (1RM)
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white mt-0.5">
                {estimated1RM} <span className="text-base text-emerald-400">kg</span>
                <span className="text-xs font-normal text-zinc-500 ml-2">
                  (~{Math.round(estimated1RM * 2.20462)} lbs)
                </span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 text-right">
              <div>Epley: <span className="text-zinc-300 font-bold">{epley1RM}kg</span></div>
              <div>Brzycki: <span className="text-zinc-300 font-bold">{brzycki1RM}kg</span></div>
            </div>
          </div>

          {/* Training Percentages Table */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
              Working Load Percentages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {percentageTiers.map((tier) => (
                <div key={tier.pct} className="p-2.5 rounded-xl bg-[#0b0c12] border border-zinc-850 text-center">
                  <span className="text-xs font-mono text-emerald-400 font-bold">{tier.pct}% 1RM</span>
                  <div className="font-mono text-base font-extrabold text-white">
                    {Math.round(estimated1RM * (tier.pct / 100))} kg
                  </div>
                  <span className="text-[9px] text-zinc-500 block">{tier.reps}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BARBELL PLATE LOADER */}
      {activeTab === 'plates' && (
        <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Target Barbell Weight (kg)
                </label>
                <div className="flex items-center space-x-1">
                  {[-10, -5, 5, 10].map((d) => (
                    <button
                      key={d}
                      onClick={() => setTargetPlateWeight(Math.max(20, targetPlateWeight + d))}
                      className="px-2 py-0.5 rounded-lg bg-[#0e0f17] border border-zinc-800 text-[10px] font-mono text-zinc-400 active:scale-90"
                    >
                      {d > 0 ? `+${d}` : d}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min="20"
                step="2.5"
                value={targetPlateWeight}
                onChange={(e) => setTargetPlateWeight(parseFloat(e.target.value) || 20)}
                className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Barbell Type
              </label>
              <select
                value={barWeight}
                onChange={(e) => setBarWeight(parseFloat(e.target.value))}
                className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={20}>20 kg (Men's Standard Olympic Bar)</option>
                <option value={15}>15 kg (Women's Olympic Bar)</option>
                <option value={10}>10 kg (Technique Bar)</option>
              </select>
            </div>
          </div>

          {/* Plate Loading Summary */}
          <div className="p-4 rounded-2xl bg-[#050609] border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase text-zinc-400 font-bold">
                Per Sleeve Load:
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {Math.max(0, (targetPlateWeight - barWeight) / 2)} kg
              </span>
            </div>

            {/* Visual Barbell Sleeve */}
            <div className="py-4 flex items-center justify-center overflow-x-auto no-scrollbar">
              <div className="flex items-center space-x-1.5 bg-[#030305] p-3 rounded-2xl border border-zinc-850 min-w-max">
                <div className="w-6 h-12 bg-zinc-600 rounded-l-md flex items-center justify-center text-[9px] text-black font-mono font-bold rotate-90 shrink-0">
                  BAR
                </div>

                {plateCalcResult.plates.length === 0 ? (
                  <span className="text-[11px] text-zinc-600 px-3">Bare bar (no plates)</span>
                ) : (
                  plateCalcResult.plates.map(({ plate, count }, pIdx) => (
                    Array.from({ length: count }).map((_, cIdx) => (
                      <div
                        key={`${pIdx}-${cIdx}`}
                        className={`w-7 sm:w-8 rounded flex flex-col items-center justify-center font-mono font-extrabold text-[10px] shadow-md border shrink-0 ${plate.color} ${plate.border} ${
                          plate.weight === 25 ? 'h-20' :
                          plate.weight === 20 ? 'h-18' :
                          plate.weight === 15 ? 'h-16' :
                          plate.weight === 10 ? 'h-14' :
                          plate.weight === 5 ? 'h-12' :
                          plate.weight === 2.5 ? 'h-10' : 'h-8'
                        }`}
                        title={`${plate.label}`}
                      >
                        <span className="rotate-180 writing-mode-vertical text-[9px]">{plate.label}</span>
                      </div>
                    ))
                  ))
                )}
              </div>
            </div>

            {/* Breakdown List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
              {plateCalcResult.plates.map(({ plate, count }, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-[#0b0c12] border border-zinc-850 text-xs flex items-center justify-between">
                  <span className="font-bold text-white">{plate.label}</span>
                  <span className="font-mono text-emerald-400 font-bold">{count} side</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INTERVAL REST TIMER */}
      {activeTab === 'timer' && (
        <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-6 space-y-4 shadow-xl text-center animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-white">HIIT & Rest Countdown Timer</h2>
            <p className="text-xs text-zinc-400">Audible 3-second countdown alerts</p>
          </div>

          <div className="py-6">
            <div className="font-mono text-6xl sm:text-7xl font-extrabold tracking-tight text-white">
              {formatTimerClock(timerRemaining)}
            </div>
            <div className="text-xs text-zinc-500 font-mono mt-1">
              {timerRunning ? 'Timer Active' : 'Ready'}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-950/40 active:scale-95"
            >
              {timerRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-black" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>Start</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerRemaining(timerDuration);
              }}
              className="p-3 rounded-2xl bg-[#0e0f17] border border-zinc-800 text-zinc-400 hover:text-white active:scale-95"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Presets */}
          <div className="pt-3 border-t border-zinc-850 space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Quick Interval Presets
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[30, 45, 60, 90, 120, 180].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStartTimerPreset(s)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-colors active:scale-95 ${
                    timerDuration === s && !timerRunning
                      ? 'bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold'
                      : 'bg-[#0e0f17] border border-zinc-850 text-zinc-400 hover:text-white'
                  }`}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
