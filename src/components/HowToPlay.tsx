import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export const HowToPlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const steps = [
    { number: '1', title: 'กดเริ่มเกมใหม่', detail: 'ระบบจะสุ่มตัวเลขเป้าหมาย 1 ถึง 100 และรีเซ็ตคะแนนเริ่มต้นที่ 100 คะแนน' },
    { number: '2', title: 'กรอกตัวเลข 1-100', detail: 'พิมพ์ตัวเลขที่คุณต้องการทายลงในช่องตรงกลาง' },
    { number: '3', title: 'กดปุ่มทาย', detail: 'กดปุ่ม "ทาย" หรือกดปุ่ม Enter บนคีย์บอร์ดเพื่อส่งคำตอบ' },
    { number: '4', title: 'ดูคำใบ้ว่าควรทายมากขึ้นหรือน้อยลง', detail: 'ระบบจะบอก "⬆️ มากกว่านี้" หรือ "⬇️ น้อยกว่านี้" เพื่อช่วยบอกทิศทาง' },
    { number: '5', title: 'ทายให้ถูกด้วยจำนวนครั้งที่น้อยที่สุด', detail: 'ทุกครั้งที่ทายผิดจะถูกหัก 10 คะแนน ยิ่งทายถูกไวยิ่งได้คะแนนสูง!' },
  ];

  return (
    <div
      id="how-to-play-section"
      className="w-full bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs transition-all"
    >
      <button
        id="toggle-how-to-play-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              วิธีเล่น (How to Play)
            </h3>
            <p className="text-xs text-slate-500">กฎกติกาและขั้นตอนการเล่นเกม 5 ขั้นตอน</p>
          </div>
        </div>
        <div className="text-slate-400 group-hover:text-slate-600 transition-colors p-1">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                {step.number}
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span>{step.title}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>เริ่มต้นที่ 100 คะแนน | ทายผิดหักครั้งละ 10 คะแนน | คะแนนต่ำสุด 0 คะแนน</span>
          </div>
        </div>
      )}
    </div>
  );
};
