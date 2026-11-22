'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // e.g. "2026-12-25"
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 my-6">
      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-rose-200/60 rounded-xl px-3 sm:px-4 py-2.5 shadow-sm min-w-[64px] sm:min-w-[76px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500">Hari</span>
      </div>

      <span className="text-xl font-bold text-rose-400">:</span>

      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-rose-200/60 rounded-xl px-3 sm:px-4 py-2.5 shadow-sm min-w-[64px] sm:min-w-[76px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500">Jam</span>
      </div>

      <span className="text-xl font-bold text-rose-400">:</span>

      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-rose-200/60 rounded-xl px-3 sm:px-4 py-2.5 shadow-sm min-w-[64px] sm:min-w-[76px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500">Menit</span>
      </div>

      <span className="text-xl font-bold text-rose-400">:</span>

      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-rose-200/60 rounded-xl px-3 sm:px-4 py-2.5 shadow-sm min-w-[64px] sm:min-w-[76px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-700">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500">Detik</span>
      </div>
    </div>
  );
}
