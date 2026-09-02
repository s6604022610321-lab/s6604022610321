import React from 'react';
import { Award, Hash, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ScoreBoardProps {
  score: number;
  attempts: number;
  minPossible: number;
  maxPossible: number;
  isWon: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  attempts,
  minPossible,
  maxPossible,
  isWon,
}) => {
  // Determine score color badge
  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div id="game-scoreboard" className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
      {/* Score Card */}
      <div
        id="score-card"
        className={`p-2.5 sm:p-3 rounded-xl border transition-colors flex flex-col items-center justify-center text-center ${getScoreColor()}`}
      >
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-85 mb-0.5 whitespace-nowrap">
          <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span>คะแนน</span>
        </div>
        <motion.div
          key={score}
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight"
        >
          {score}
          <span className="text-[10px] sm:text-xs font-normal opacity-70 ml-0.5">/100</span>
        </motion.div>
      </div>

      {/* Attempts Card */}
      <div
        id="attempts-card"
        className="p-2.5 sm:p-3 rounded-xl border border-indigo-100 bg-indigo-50/70 text-indigo-950 flex flex-col items-center justify-center text-center"
      >
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-indigo-700 mb-0.5 whitespace-nowrap">
          <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span>ทายแล้ว</span>
        </div>
        <motion.div
          key={attempts}
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-indigo-900 tracking-tight"
        >
          {attempts}
          <span className="text-[10px] sm:text-xs font-normal text-indigo-600 ml-0.5">ครั้ง</span>
        </motion.div>
      </div>

      {/* Suggested Range Helper */}
      <div
        id="range-card"
        className="p-2.5 sm:p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 flex flex-col items-center justify-center text-center"
      >
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5 whitespace-nowrap">
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
          <span>ช่วงคำตอบ</span>
        </div>
        <div className="text-sm sm:text-xl font-bold text-slate-800 tracking-tight">
          {isWon ? (
            <span className="text-emerald-600 font-extrabold">สำเร็จ!</span>
          ) : (
            <span className="whitespace-nowrap font-mono text-xs sm:text-lg">
              {minPossible}-{maxPossible}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
