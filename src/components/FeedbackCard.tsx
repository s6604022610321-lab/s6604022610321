import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpCircle, ArrowDownCircle, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { GuessFeedbackType, GameStatus } from '../types';

interface FeedbackCardProps {
  lastFeedback: GuessFeedbackType;
  lastGuess: number | null;
  status: GameStatus;
  score: number;
  attempts: number;
  onReset: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  lastFeedback,
  lastGuess,
  status,
  score,
  attempts,
  onReset,
}) => {
  return (
    <div id="feedback-container" className="w-full">
      <AnimatePresence mode="wait">
        {status === 'WON' ? (
          <motion.div
            key="won-state"
            id="feedback-won"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg shadow-emerald-500/20 text-center relative overflow-hidden"
          >
            {/* Background sparkle effects */}
            <div className="absolute top-2 right-3 text-emerald-200/40">
              <Sparkles className="w-12 h-12" />
            </div>

            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xs rounded-full mb-3 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              🎉 ถูกต้อง!
            </h3>
            <p className="text-emerald-50 text-sm sm:text-base font-medium mb-4">
              คำตอบคือ <span className="font-bold underline text-white text-lg">{lastGuess}</span> ยินดีด้วยคุณทำสำเร็จแล้ว!
            </p>

            <div className="bg-white/15 backdrop-blur-xs rounded-xl p-3 max-w-xs mx-auto mb-4 border border-white/20">
              <div className="grid grid-cols-2 gap-2 text-center divide-x divide-white/20">
                <div className="px-1">
                  <div className="text-emerald-100 text-[11px] sm:text-xs">คะแนนสุดท้าย</div>
                  <div className="text-xl sm:text-2xl font-bold">{score} <span className="text-xs font-normal">คะแนน</span></div>
                </div>
                <div className="px-1">
                  <div className="text-emerald-100 text-[11px] sm:text-xs">ใช้ไปทั้งหมด</div>
                  <div className="text-xl sm:text-2xl font-bold">{attempts} <span className="text-xs font-normal">ครั้ง</span></div>
                </div>
              </div>
            </div>

            <button
              id="won-restart-button"
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto min-h-[44px] px-8 py-2.5 bg-white text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              เล่นใหม่อีกรอบ
            </button>
          </motion.div>
        ) : status === 'GAME_OVER' ? (
          <motion.div
            key="game-over-state"
            id="feedback-game-over"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-900 shadow-xs"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mb-2 text-rose-600">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-rose-700 mb-1">คะแนนหมดแล้ว!</h4>
            <p className="text-rose-600 text-sm mb-3">
              คุณทายครบ 10 ครั้งจนคะแนนเหลือ 0 ลองเริ่มใหม่อีกครั้งเพื่อทำสถิติที่ดีขึ้น
            </p>
            <button
              id="gameover-restart-button"
              type="button"
              onClick={onReset}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer text-sm"
            >
              เริ่มเกมใหม่
            </button>
          </motion.div>
        ) : lastFeedback === 'HIGHER' ? (
          <motion.div
            key={`higher-${attempts}`}
            id="feedback-higher"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl flex items-center gap-3.5 shadow-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
              <ArrowUpCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-amber-900 flex items-center gap-1.5">
                <span>⬆️ มากกว่านี้</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-700">
                ตัวเลข <span className="font-semibold text-amber-950">{lastGuess}</span> น้อยเกินไป คำตอบที่แท้จริงมีค่าสูงกว่านี้!
              </p>
            </div>
          </motion.div>
        ) : lastFeedback === 'LOWER' ? (
          <motion.div
            key={`lower-${attempts}`}
            id="feedback-lower"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-300 rounded-2xl flex items-center gap-3.5 shadow-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 shadow-xs">
              <ArrowDownCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-sky-900 flex items-center gap-1.5">
                <span>⬇️ น้อยกว่านี้</span>
              </div>
              <p className="text-xs sm:text-sm text-sky-700">
                ตัวเลข <span className="font-semibold text-sky-950">{lastGuess}</span> มากเกินไป คำตอบที่แท้จริงมีค่าน้อยกว่านี้!
              </p>
            </div>
          </motion.div>
        ) : (
          <div
            id="feedback-idle"
            className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center text-slate-500 text-sm"
          >
            🎯 กรอกตัวเลข 1 - 100 ด้านล่าง แล้วกดปุ่ม <span className="font-semibold text-indigo-600">"ทาย"</span> เพื่อเริ่มเกม
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
