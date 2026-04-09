'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Users, TrendingUp, Package, Clock, Zap, DollarSign, CheckCircle, BarChart2 } from 'lucide-react';
import { roiMetrics } from '@/lib/mockData';
import clsx from 'clsx';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="premium-card p-3 text-sm">
        <p className="text-[var(--text-muted)] font-semibold mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color, marginBottom: 2 }}>
            {p.name}: <strong className="text-[var(--text-main)]">{p.value?.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const poApprovalTimeline = [
  { month: 'Oct', manual: 52, automated: 0 },
  { month: 'Nov', manual: 49, automated: 3 },
  { month: 'Dec', manual: 38, automated: 16 },
  { month: 'Jan', manual: 27, automated: 24 },
  { month: 'Feb', manual: 18, automated: 30 },
  { month: 'Mar', manual: 12, automated: 34 },
  { month: 'Apr', manual: 8,  automated: 34 },
];

export default function ROITracker() {
  const savedPct = Math.round((roiMetrics.hoursSaved / roiMetrics.manualHoursPerWeek) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-main)]">ROI & Efficiency Tracker</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1 font-medium">
          Quantified business impact of the Supply Chain Intelligence Platform
        </p>
      </div>

      {/* Hero ROI Banner */}
      <div className="premium-card p-8 bg-gradient-to-br from-[#00A5D9]/10 to-emerald-500/10 border-[#00A5D9]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl rounded-full bg-[#00A5D9] pointer-events-none" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <p className="text-6xl font-black text-[#00A5D9] group-hover:scale-110 transition-transform">{roiMetrics.fteSaved}</p>
            <p className="text-lg font-bold text-[var(--text-main)] mt-3">FTE Equiv. Saved</p>
            <p className="text-[var(--text-muted)] text-sm font-medium mt-1">Platform outputs work of {roiMetrics.fteSaved} staff members</p>
          </div>
          <div className="text-center md:border-x border-[var(--border-color)] group px-4">
            <p className="text-6xl font-black text-emerald-500 group-hover:scale-110 transition-transform">
              {(roiMetrics.stockoutValueSaved / 1000000).toFixed(1)}M
            </p>
            <p className="text-lg font-bold text-[var(--text-main)] mt-3">SAR Stockout Value Saved</p>
            <p className="text-[var(--text-muted)] text-sm font-medium mt-1">{roiMetrics.stockoutsAvoided} critical stockouts prevented</p>
          </div>
          <div className="text-center group">
            <p className="text-6xl font-black text-purple-500 group-hover:scale-110 transition-transform">{savedPct}%</p>
            <p className="text-lg font-bold text-[var(--text-main)] mt-3">Manual Work Automated</p>
            <p className="text-[var(--text-muted)] text-sm font-medium mt-1">{roiMetrics.hoursSaved}h/week saved across team</p>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Hours Saved / Wk', value: `${roiMetrics.hoursSaved}h`, icon: Clock, color: 'text-[#00A5D9]', bg: 'bg-[#00A5D9]/10', border: 'border-[#00A5D9]/20' },
          { label: 'Manual Wkload', value: `${roiMetrics.automatedHoursPerWeek}h`, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', sub: 'down from 142h' },
          { label: 'PO Auto Approval', value: `${roiMetrics.approvalRate}%`, icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { label: 'Avg Approval Time', value: roiMetrics.avgTimeToApprove, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', sub: `vs ${roiMetrics.avgTimeBefore} before` },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={clsx("premium-card p-5 border shadow-sm", card.bg, card.border)}>
              <div className={clsx("p-2 rounded-lg w-fit mb-3 bg-white/50 dark:bg-black/20", card.border, card.color)}>
                  <Icon size={20} />
              </div>
              <p className={clsx("text-3xl font-black", card.color)}>{card.value}</p>
              <p className="text-[var(--text-main)] text-sm font-bold mt-1">{card.label}</p>
              {card.sub && <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-1 uppercase">{card.sub}</p>}
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Comparison */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-[var(--text-main)] text-lg mb-1">Manual vs. Automated Workload</h2>
            <p className="text-[var(--text-muted)] text-sm font-medium mb-6">Hours per week required to manage operations</p>

            <div className="flex gap-6 mb-5">
                <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[var(--text-main)] font-semibold text-sm">Before Platform</span>
                    <span className="text-red-500 font-bold text-lg">{roiMetrics.manualHoursPerWeek}h</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden bg-red-500/10 border border-red-500/20">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 w-full" />
                </div>
                </div>
            </div>
            <div className="flex gap-6 mb-8">
                <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[var(--text-main)] font-semibold text-sm">After Platform</span>
                    <span className="text-emerald-500 font-bold text-lg">{roiMetrics.automatedHoursPerWeek}h</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)]">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${(roiMetrics.automatedHoursPerWeek / roiMetrics.manualHoursPerWeek) * 100}%` }} />
                </div>
                </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#00A5D9]/5 border border-[#00A5D9]/20 text-center">
            <p className="text-4xl font-black text-[#00A5D9] mb-1">{savedPct}% reduction</p>
            <p className="text-[var(--text-muted)] text-sm font-medium">
              Equivalent to <strong className="text-[var(--text-main)]">freeing {roiMetrics.fteSaved} full-time employees</strong>
            </p>
          </div>
        </div>

        {/* PO Automation Trend */}
        <div className="premium-card p-6">
          <h2 className="font-bold text-[var(--text-main)] text-lg mb-1">PO Automation Ramp-Up</h2>
          <p className="text-[var(--text-muted)] text-sm font-medium mb-6">Manual entry vs. AI-suggested Purchase Orders</p>
          
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={poApprovalTimeline} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
              <defs>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A5D9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00A5D9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="manualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }} tickLine={false} axisLine={false} dy={10} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="manual" stroke="#ef4444" strokeWidth={2} fill="url(#manualGrad)" name="Manual POs" />
              <Area type="monotone" dataKey="automated" stroke="#00A5D9" strokeWidth={3} fill="url(#aiGrad)" name="AI POs" />
              <Legend formatter={(v) => <span className="text-[var(--text-muted)] font-bold text-xs ml-1">{v}</span>} iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: 15 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leadership Talking Points */}
      <div className="premium-card p-6 bg-gradient-to-r from-[#002C6A]/5 to-transparent border-[#002C6A]/10">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#002C6A]/10 rounded-xl text-[#002C6A] dark:text-blue-400">
                <BarChart2 size={24} />
            </div>
            <h2 className="font-black text-[var(--text-main)] text-xl">Leadership Presentation Notes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'No New Headcount', desc: `Absorbs ${roiMetrics.fteSaved} FTE of workload directly.` },
            { title: 'Faster Decisions', desc: `Approvals down to ${roiMetrics.avgTimeToApprove} average.` },
            { title: 'Single Pane of Glass', desc: 'Unified view of Warehouses, Outlets & Partners.' },
            { title: 'Revenue Protection', desc: `SAR ${(roiMetrics.stockoutValueSaved / 1000000).toFixed(1)}M recovered.` },
          ].map((tp, i) => (
            <div key={i} className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black bg-[#00A5D9] text-white shadow-lg shadow-[#00A5D9]/20">
                    {i + 1}
                </div>
                <p className="text-[var(--text-main)] text-sm font-bold mt-1">{tp.title}</p>
                <p className="text-[var(--text-muted)] text-xs font-medium">{tp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
