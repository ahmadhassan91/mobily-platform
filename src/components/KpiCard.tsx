'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  accent?: 'cyan' | 'blue' | 'green' | 'amber' | 'red' | 'purple';
  pulse?: boolean;
  delay?: number;
}

const accentMap = {
  cyan:   { bg: 'bg-[#00A5D9]/10', iconBg: 'bg-[#00A5D9]/20', colorClass: 'text-[#00A5D9]', border: 'border-[#00A5D9]/20', glow: 'shadow-[#00A5D9]/30' },
  blue:   { bg: 'bg-[#002C6A]/10', iconBg: 'bg-[#002C6A]/20', colorClass: 'text-[#002C6A] dark:text-blue-400', border: 'border-[#002C6A]/20 dark:border-blue-400/20', glow: 'shadow-[#002C6A]/30 dark:shadow-blue-400/30' },
  green:  { bg: 'bg-emerald-500/10', iconBg: 'bg-emerald-500/20', colorClass: 'text-emerald-500', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/30' },
  amber:  { bg: 'bg-amber-500/10', iconBg: 'bg-amber-500/20', colorClass: 'text-amber-500', border: 'border-amber-500/20', glow: 'shadow-amber-500/30' },
  red:    { bg: 'bg-red-500/10', iconBg: 'bg-red-500/20', colorClass: 'text-red-500', border: 'border-red-500/20', glow: 'shadow-red-500/30' },
  purple: { bg: 'bg-purple-500/10', iconBg: 'bg-purple-500/20', colorClass: 'text-purple-500', border: 'border-purple-500/20', glow: 'shadow-purple-500/30' },
};

export default function KpiCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accent = 'cyan',
  pulse = false,
  delay = 0,
}: KpiCardProps) {
  // Graceful fallback to avoid undefined errors
  const a = accentMap[accent] || accentMap['cyan'];

  return (
    <div
      className={clsx(
        'relative premium-card p-5 cursor-default group',
        a.bg,
        delay === 0 && 'animate-fade-in',
        delay === 1 && 'animate-fade-in-delay-1',
        delay === 2 && 'animate-fade-in-delay-2',
        delay === 3 && 'animate-fade-in-delay-3',
        delay === 4 && 'animate-fade-in-delay-4',
      )}
    >
      {/* Pulse indicator */}
      {pulse && (
        <span className={clsx("absolute top-5 right-5 w-2.5 h-2.5 rounded-full shadow-md", a.bg.replace('/10', ''), a.glow)}>
          <span className={clsx("absolute inset-0 rounded-full animate-ping opacity-75", a.bg.replace('/10', ''))} />
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={clsx('p-3 rounded-xl border', a.iconBg, a.colorClass, a.border)}>
          {icon}
        </div>
      </div>

      <div>
        <p className="text-3xl font-black tracking-tight mb-1 text-[var(--text-main)] group-hover:scale-105 transition-transform origin-left w-fit">
          {value}
        </p>
        <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wide mt-2">{title}</p>
        {subtitle && (
          <p className="text-[var(--text-muted)] text-[10px] font-semibold mt-1 opacity-75">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div
          className={clsx(
            "mt-4 flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md w-fit",
            trend.positive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
          )}
        >
          <span>{trend.positive ? '↑' : '↓'}</span>
          <span>{trend.value} vs last month</span>
        </div>
      )}
    </div>
  );
}
