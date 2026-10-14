import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  TrendingUp, 
  Target, 
  Zap,
  HelpCircle,
  Clock,
  Dumbbell,
  Utensils
} from 'lucide-react';
import { CompletedWorkoutLog, UserProfile, WorkoutRoutine } from '../types';
import { AIFoodScanner } from './AIFoodScanner';

interface AICoachHubProps {
  profile: UserProfile;
  logs: CompletedWorkoutLog[];
  routines: WorkoutRoutine[];
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

interface CoachInsights {
  greeting: string;
  goalSummary: string;
  progressHighlights: string[];
  nextAction: string;
  motivationalQuote: string;
}

export const AICoachHub: React.FC<AICoachHubProps> = ({
  profile,
  logs,
  routines,
  onStartRoutine,
  onUpdateProfile,
}) => {
  const [sectionMode, setSectionMode] = useState<'coach' | 'nutrition'>('coach');
  const [insights, setInsights] = useState<CoachInsights | null>(null);
  const [loadingInsights, setLoadingInsights] = useState<boolean>(false);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'coach'; text: string }[]>([]);


  const totalReps = logs.reduce((acc, l) => acc + (l.totalReps || 0), 0);
  const totalVolume = logs.reduce((acc, l) => acc + (l.totalVolumeKg || 0), 0);

  // Fetch or generate AI insights
  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const res = await fetch('/api/ai/coach-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          logs,
          monthlyGoal: profile.monthlyGoal || 3000,
        }),
      });

      const data = await res.json();
      if (data.insights) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error('Error fetching insights:', err);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleAskQuestion = async (queryText?: string) => {
    const q = queryText || userQuestion;
    if (!q.trim() || chatLoading) return;

    const newHistory = [...chatHistory, { sender: 'user' as const, text: q.trim() }];
    setChatHistory(newHistory);
    setUserQuestion('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/ask-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.trim(),
          context: {
            totalReps,
            streakDays: profile.streakDays,
            totalVolume,
          },
        }),
      });

      const data = await res.json();
      if (data.answer) {
        setChatHistory([...newHistory, { sender: 'coach' as const, text: data.answer }]);
      }
    } catch (err) {
      setChatHistory([
        ...newHistory,
        { 
          sender: 'coach' as const, 
          text: 'Pace your repetitions steadily: aim for 60-80 reps per day across 4 sessions weekly to crush your 3,000 milestone.' 
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const quickQuestions = [
    'How should I pace my 3,000 reps this week?',
    'What routine is best for upper body growth?',
    'How much rest between heavy compound sets?',
    'Tips to avoid grip fatigue on deadlifts?'
  ];

  return (
    <div className="space-y-4 pb-12 animate-fade-in max-w-2xl sm:max-w-4xl mx-auto">
      {/* Top Combined Section Switcher */}
      <div className="flex p-1 bg-[#090b12] border border-zinc-850 rounded-2xl max-w-md mx-auto shadow-md">
        <button
          onClick={() => setSectionMode('coach')}
          className={`flex-1 py-2 px-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-95 min-w-0 ${
            sectionMode === 'coach'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950/60'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Personal AI Coach</span>
        </button>
        <button
          onClick={() => setSectionMode('nutrition')}
          className={`flex-1 py-2 px-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-95 min-w-0 ${
            sectionMode === 'nutrition'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950/60'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">AI Food Scanner</span>
        </button>
      </div>

      {sectionMode === 'nutrition' ? (
        <AIFoodScanner profile={profile} onUpdateProfile={onUpdateProfile} />
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Strength & Progress Coach</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                Goals & Performance Intel
              </h1>
            </div>

            <button
              onClick={fetchInsights}
              disabled={loadingInsights}
              className="p-2 rounded-xl bg-[#0e0f17] border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 active:scale-95 transition-all flex items-center space-x-1 text-xs"
              title="Refresh Analysis"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loadingInsights ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Main AI Insights Card */}
          <div className="bg-gradient-to-br from-[#08090e] via-[#090b12] to-[#050609] border border-zinc-850 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            {loadingInsights ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs text-zinc-400 font-mono animate-pulse">
                  Analyzing workout volume, rep trajectory & streak...
                </p>
              </div>
            ) : insights ? (
              <div className="space-y-4">
                {/* Greeting & Headline */}
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                    Coach Briefing
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {insights.greeting}
                  </h2>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {insights.goalSummary}
                  </p>
                </div>

                {/* Progress Highlights */}
                <div className="p-3.5 rounded-2xl bg-[#050609] border border-zinc-850 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                    Key Milestone Highlights:
                  </span>
                  <div className="space-y-1.5">
                    {insights.progressHighlights?.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Action Recommendation */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                      Next Tactical Focus:
                    </span>
                    <p className="text-xs text-zinc-200 mt-0.5">
                      {insights.nextAction}
                    </p>
                  </div>

                  {routines.length > 0 && (
                    <button
                      onClick={() => onStartRoutine(routines[0])}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center space-x-1.5 shrink-0 shadow-md shadow-emerald-950/40 active:scale-95"
                    >
                      <Dumbbell className="w-3 h-3" />
                      <span>Launch Next Session</span>
                    </button>
                  )}
                </div>

                {/* Mindset Quote */}
                {insights.motivationalQuote && (
                  <div className="text-[11px] text-zinc-500 italic text-center pt-1">
                    "{insights.motivationalQuote}"
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-zinc-500">
                Tap refresh to generate your customized AI goal assessment.
              </div>
            )}
          </div>

          {/* Ask the Coach Section */}
          <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Ask Your AI Strength Coach</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Gemini 3.8</span>
            </div>

            {/* Quick Question Chips */}
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(q)}
                  className="text-[10px] sm:text-xs py-1 px-2.5 rounded-xl bg-[#0c0d14] border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 text-left active:scale-95 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat History */}
            {chatHistory.length > 0 && (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-1">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0f111c] border border-zinc-800 text-white ml-6 text-right'
                        : 'bg-[#050609] border border-emerald-900/30 text-zinc-200 mr-6'
                    }`}
                  >
                    <span className="block text-[9px] font-mono uppercase mb-0.5 text-zinc-500">
                      {msg.sender === 'user' ? 'You' : 'AI Coach'}
                    </span>
                    {msg.text}
                  </div>
                ))}
                {chatLoading && (
                  <div className="p-3 rounded-2xl bg-[#050609] border border-zinc-850 text-xs text-zinc-500 mr-6 animate-pulse">
                    Coach is analyzing your training data...
                  </div>
                )}
              </div>
            )}

            {/* Question Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about workouts, pacing, progressive overload..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="flex-1 bg-[#050609] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!userQuestion.trim() || chatLoading}
                className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black flex items-center justify-center active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

