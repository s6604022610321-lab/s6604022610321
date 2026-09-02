import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, RotateCcw, AlertCircle, Lightbulb } from 'lucide-react';
import { GameStatus } from '../types';

interface GuessFormProps {
  onGuess: (num: number) => void;
  status: GameStatus;
  minPossible: number;
  maxPossible: number;
  onReset: () => void;
}

export const GuessForm: React.FC<GuessFormProps> = ({
  onGuess,
  status,
  minPossible,
  maxPossible,
  onReset,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFinished = status === 'WON' || status === 'GAME_OVER';

  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFinished, status]);

  const validateInput = (value: string): { isValid: boolean; parsedNumber?: number; error?: string } => {
    const trimmed = value.trim();

    // 1. ตรวจสอบว่ามีการกรอกข้อมูลหรือไม่
    if (!trimmed) {
      return { isValid: false, error: 'กรุณากรอกตัวเลขก่อนกดทาย' };
    }

    // 2. ตรวจสอบเลขติดลบ
    if (trimmed.startsWith('-')) {
      return { isValid: false, error: 'กรุณากรอกตัวเลขบวกระหว่าง 1 ถึง 100 (ห้ามเป็นเลขติดลบ)' };
    }

    // 3. ตรวจสอบทศนิยม (ต้องเป็นเลขจำนวนเต็ม)
    if (trimmed.includes('.')) {
      return { isValid: false, error: 'กรุณากรอกเป็นเลขจำนวนเต็มเท่านั้น (ห้ามใส่จุดทศนิยม)' };
    }

    // 4. ตรวจสอบว่าเป็นตัวเลขล้วนหรือไม่ (ห้ามมีตัวอักษรหรือสัญลักษณ์)
    if (!/^\d+$/.test(trimmed)) {
      return { isValid: false, error: 'กรุณากรอกเป็นตัวเลข 0-9 เท่านั้น' };
    }

    const parsed = Number(trimmed);

    // 5. ตรวจสอบ NaN หรือจำนวนเต็ม
    if (!Number.isInteger(parsed)) {
      return { isValid: false, error: 'กรุณากรอกเป็นเลขจำนวนเต็ม' };
    }

    // 6. ตรวจสอบว่าต้องอยู่ระหว่าง 1 - 100
    if (parsed < 1) {
      return { isValid: false, error: 'ตัวเลขต้องไม่น้อยกว่า 1 (กรอกได้ตั้งแต่ 1 - 100)' };
    }

    if (parsed > 100) {
      return { isValid: false, error: 'ตัวเลขต้องไม่เกิน 100 (กรอกได้ตั้งแต่ 1 - 100)' };
    }

    return { isValid: true, parsedNumber: parsed };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFinished) return;

    const result = validateInput(inputValue);

    if (!result.isValid) {
      setErrorMsg(result.error || 'ข้อมูลไม่ถูกต้อง');
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
      return;
    }

    setErrorMsg(null);
    onGuess(result.parsedNumber!);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Quick binary search midpoint helper suggestion for students
  const midpoint = Math.floor((minPossible + maxPossible) / 2);
  const showMidpointHelper = !isFinished && (minPossible > 1 || maxPossible < 100);

  return (
    <form id="guess-form" onSubmit={handleSubmit} className="w-full space-y-3.5 sm:space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="guess-input"
          className="block text-xs sm:text-sm font-semibold text-slate-700 text-center"
        >
          กรอกตัวเลขที่ต้องการทาย (1 - 100)
        </label>
        
        <div className="relative flex items-center justify-center max-w-xs mx-auto">
          <input
            ref={inputRef}
            id="guess-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            disabled={isFinished}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="1 - 100"
            aria-invalid={errorMsg !== null}
            aria-describedby={errorMsg ? 'guess-input-error' : undefined}
            className={`w-full text-center text-3xl sm:text-4xl font-extrabold py-3 sm:py-3.5 px-4 rounded-xl border-2 transition-all outline-hidden ${
              isFinished
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                : errorMsg
                ? 'bg-rose-50/50 border-rose-400 text-slate-900 focus:bg-white focus:border-rose-600 focus:ring-4 focus:ring-rose-100'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
            }`}
          />
        </div>

        {errorMsg && (
          <div
            id="guess-input-error"
            role="alert"
            className="flex items-center justify-center gap-1.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium text-center animate-shake max-w-xs mx-auto shadow-2xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {showMidpointHelper && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-500 text-center">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>คำแนะนำ:</span>
          <button
            type="button"
            onClick={() => {
              setInputValue(String(midpoint));
              setErrorMsg(null);
              if (inputRef.current) inputRef.current.focus();
            }}
            className="text-indigo-700 hover:text-indigo-900 font-semibold bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 px-2 py-0.5 rounded border border-indigo-200 transition-colors cursor-pointer"
          >
            ลองค่ากึ่งกลาง ({midpoint})
          </button>
        </div>
      )}

      {/* Action Buttons: Clear, prominent Guess and New Game buttons optimized for mobile */}
      <div className="flex flex-col xs:flex-row items-stretch gap-2 sm:gap-2.5 pt-1">
        <button
          id="guess-submit-button"
          type="submit"
          disabled={isFinished}
          className={`flex-1 min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-base transition-all cursor-pointer select-none active:scale-[0.98] ${
            isFinished
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg'
          }`}
        >
          <SendHorizontal className="w-5 h-5 shrink-0" />
          <span>ทายตัวเลข</span>
        </button>

        <button
          id="reset-game-button"
          type="button"
          onClick={() => {
            setErrorMsg(null);
            setInputValue('');
            onReset();
          }}
          className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 sm:px-5 rounded-xl font-semibold text-sm sm:text-base text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] border border-slate-300/80 transition-all cursor-pointer select-none"
        >
          <RotateCcw className="w-4 h-4 text-slate-600 shrink-0" />
          <span>เริ่มเกมใหม่</span>
        </button>
      </div>
    </form>
  );
};
