import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Dumbbell, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  ChevronRight, 
  X,
  FileText
} from 'lucide-react';
import { CompletedWorkoutLog } from '../types';

interface HistoryViewProps {
  logs: CompletedWorkoutLog[];
  onDeleteLog: (logId: string) => void;
  onClearAll: () => void;
  onImportLogs: (logs: CompletedWorkoutLog[]) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  logs,
  onDeleteLog,
  onClearAll,
  onImportLogs,
}) => {
  const [selectedLog, setSelectedLog] = useState<CompletedWorkoutLog | null>(null);

  // Totals
  const totalReps = logs.reduce((acc, log) => acc + (log.totalReps || 0), 0);
  const totalVolume = logs.reduce((acc, log) => acc + (log.totalVolumeKg || 0), 0);
  const totalTimeSecs = logs.reduce((acc, log) => acc + (log.durationSeconds || 0), 0);
  const avgDurationMin = logs.length > 0 ? Math.round(totalTimeSecs / logs.length / 60) : 0;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      });
    } catch {
      return 'Date Unknown';
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  // Export JSON backup
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `workout-3000-history-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportLogs(parsed);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Data Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Workout History & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Complete record of your training volume, reps, and sessions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded-xl bg-[#0e0f17] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            title="Download JSON export"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Data</span>
          </button>

          <label className="px-3 py-1.5 rounded-xl bg-[#0e0f17] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-teal-400" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={onClearAll}
            className="px-3 py-1.5 rounded-xl bg-[#0e0f17] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            title="Clear all stored logs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#08090e] border border-zinc-850 rounded-2xl p-4 sm:p-5">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Total Workouts</span>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
            {logs.length}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Total Reps Logged</span>
          <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
            {totalReps.toLocaleString()}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Total Volume Lifted</span>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
            {Math.round(totalVolume).toLocaleString()} <span className="text-xs text-zinc-500">kg</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Avg Session Duration</span>
          <div className="font-mono text-xl sm:text-2xl font-bold text-teal-300 mt-1">
            {avgDurationMin} <span className="text-xs text-zinc-500">mins</span>
          </div>
        </div>
      </div>

      {/* Workout Logs List */}
      <div className="space-y-2.5">
        {logs.length === 0 ? (
          <div className="text-center py-12 bg-[#08090e] border border-zinc-850 rounded-2xl p-6 text-zinc-500 text-xs">
            No completed workouts found. Finish your first workout to start tracking history!
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className="group bg-[#08090e] border border-zinc-850 hover:border-zinc-750 rounded-2xl p-4 sm:p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-mono font-semibold text-zinc-400">
                    {formatDate(log.date)}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {log.routineName}
                  </h3>
                </div>

                {log.notes && (
                  <p className="text-xs text-zinc-400 mt-1.5 italic">
                    "{log.notes}"
                  </p>
                )}

                <div className="text-xs text-zinc-500 mt-2 flex items-center space-x-3">
                  <span>{log.exercisesCompleted || log.exercises.length} exercises performed</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-6 border-t sm:border-t-0 border-zinc-850/60 pt-2 sm:pt-0">
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-mono">
                  <div className="text-left sm:text-right">
                    <span className="text-zinc-500 block text-[9px] uppercase">Time</span>
                    <span className="text-white font-bold whitespace-nowrap">{formatTime(log.durationSeconds)}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-zinc-500 block text-[9px] uppercase">Reps</span>
                    <span className="text-emerald-400 font-bold whitespace-nowrap">{log.totalReps}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-zinc-500 block text-[9px] uppercase">Volume</span>
                    <span className="text-white font-bold whitespace-nowrap">{log.totalVolumeKg.toLocaleString()} <span className="text-[10px] text-zinc-500">kg</span></span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLog(log.id);
                    }}
                    className="p-2 rounded-lg text-zinc-600 hover:text-rose-400 transition-colors"
                    title="Delete log"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Log Drilldown Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-[#08090e] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400">
                  {formatDate(selectedLog.date)}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedLog.routineName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 bg-[#050609] p-3 rounded-2xl text-center font-mono text-xs border border-zinc-850">
              <div>
                <span className="text-zinc-500 text-[9px] block">DURATION</span>
                <span className="font-bold text-white">{formatTime(selectedLog.durationSeconds)}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[9px] block">TOTAL REPS</span>
                <span className="font-bold text-emerald-400">{selectedLog.totalReps}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[9px] block">VOLUME LIFTED</span>
                <span className="font-bold text-white">{selectedLog.totalVolumeKg.toLocaleString()} kg</span>
              </div>
            </div>

            {selectedLog.notes && (
              <div className="p-3.5 rounded-xl bg-[#0c0d14] border border-zinc-850 text-xs text-zinc-300 italic">
                "{selectedLog.notes}"
              </div>
            )}

            {/* Exercises Sets Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                Session Exercise Breakdown
              </span>

              {selectedLog.exercises && selectedLog.exercises.length > 0 ? (
                <div className="space-y-2">
                  {selectedLog.exercises.map((ex, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#0b0c12] border border-zinc-850">
                      <div className="font-bold text-xs sm:text-sm text-white mb-2">{ex.exerciseName}</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-mono">
                        {ex.sets.map((s, sIdx) => (
                          <div 
                            key={sIdx}
                            className={`p-1.5 rounded text-center text-[11px] ${
                              s.completed ? 'bg-emerald-950/30 border border-emerald-900/40 text-emerald-300' : 'bg-[#050609] text-zinc-500'
                            }`}
                          >
                            Set {s.setNumber}: {s.weightKg}kg × {s.reps}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-zinc-500 italic">
                  Compound volume logged: {selectedLog.totalReps} reps completed.
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedLog(null)}
              className="w-full py-2.5 rounded-xl bg-[#0e0f17] border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
