import { type ReactNode } from 'react';

// The "Big Number" Cards used in Word Counter and Text Diff
export const StatCard = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string | number;
  colorClass: string;
}) => (
  <div className="bg-white p-5 md:p-8 rounded-[32px] border border-slate-50 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md group">
    <span className={`text-2xl md:text-4xl font-black mb-1 md:mb-2 ${colorClass}`}>
      {value}
    </span>
    <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
      {label}
    </span>
  </div>
);

// The "Sidebar" Platform Cards for Social Media limits
export const SocialCard = ({
  platform,
  limit,
  current,
  icon,
}: {
  platform: string;
  limit: number;
  current: number;
  icon: ReactNode;
}) => {
  const percentage = Math.min((current / limit) * 100, 100);
  const isOver = current > limit;

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 mb-4">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-lg md:text-xl">{icon}</span>
          <span className="text-xs md:text-sm font-extrabold text-slate-700">
            {platform}
          </span>
        </div>
        <span
          className={`text-[10px] md:text-xs font-black ${
            isOver ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          {current} / {limit}
        </span>
      </div>

      <div className="w-full bg-slate-100 h-1.5 md:h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            isOver ? 'bg-rose-500' : 'bg-indigo-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};