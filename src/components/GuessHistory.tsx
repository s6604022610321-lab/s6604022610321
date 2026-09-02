import React from 'react';
import { History, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { GuessHistoryItem } from '../types';

interface GuessHistoryProps {
  history: GuessHistoryItem[];
}

export const GuessHistory: React.FC<GuessHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div id="guess-history-card" className="w-full bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs sm:text-sm">
          <History className="w-4 h-4 text-slate-500 shrink-0" />
          <span>ประวัติการทาย ({history.length} ครั้ง)</span>
        </div>
        <span className="text-[11px] text-slate-400">ล่าสุดอยู่บน</span>
      </div>

      <div className="max-h-48 sm:max-h-52 overflow-y-auto pr-1 space-y-1.5 sm:space-y-2">
        {history.map((item) => {
          const isCorrect = item.feedback === 'CORRECT';
          const isHigher = item.feedback === 'HIGHER';

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border text-xs sm:text-sm transition-all ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 font-medium'
                  : isHigher
                  ? 'bg-amber-50/40 border-amber-200/70 text-amber-950'
                  : 'bg-sky-50/40 border-sky-200/70 text-sky-950'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <span className="text-[11px] text-slate-400 font-mono w-5 sm:w-6 text-center shrink-0">
                  #{item.attemptNumber}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-800 px-1.5 sm:px-2 py-0.5 bg-white rounded-md border border-slate-200/60 shadow-2xs shrink-0">
                  {item.guessNumber}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-100 text-emerald-700'
                      : isHigher
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <Check className="w-3 h-3 shrink-0" />
                      <span>ถูกต้อง</span>
                    </>
                  ) : isHigher ? (
                    <>
                      <ArrowUp className="w-3 h-3 shrink-0" />
                      <span>มากกว่านี้</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-3 h-3 shrink-0" />
                      <span>น้อยกว่านี้</span>
                    </>
                  )}
                </span>
              </div>

              <div className="text-[11px] sm:text-xs text-slate-500 font-mono shrink-0 ml-1">
                เหลือ {item.scoreAfter} แต้ม
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
