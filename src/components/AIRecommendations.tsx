'use client';

import { useState } from 'react';
import {
  Brain, Zap, ShoppingCart, RefreshCw, CheckCircle,
  XCircle, AlertTriangle, TrendingUp, Clock, ChevronDown, ChevronUp,
} from 'lucide-react';
import { aiRecommendations } from '@/lib/mockData';
import clsx from 'clsx';

type Status = 'all' | 'pending' | 'approved' | 'dismissed';
type RecType = 'all' | 'replenishment' | 'purchase_order' | 'transfer';

const priorityConfig = {
  critical: { bg: 'bg-red-500/5', border: 'border-red-500/20', color: 'text-red-500', label: 'Critical', dot: 'bg-red-500' },
  high:     { bg: 'bg-amber-500/5', border: 'border-amber-500/20', color: 'text-amber-500', label: 'High', dot: 'bg-amber-500' },
  medium:   { bg: 'bg-blue-500/5', border: 'border-blue-500/20', color: 'text-blue-500', label: 'Medium', dot: 'bg-blue-500' },
};

const typeConfig = {
  replenishment: { icon: RefreshCw,    label: 'Replenishment',   colorClass: 'text-emerald-500',   bgBorder: 'bg-emerald-500/10 border-emerald-500/20' },
  purchase_order:{ icon: ShoppingCart, label: 'Purchase Order',  colorClass: 'text-[#00A5D9]',     bgBorder: 'bg-[#00A5D9]/10 border-[#00A5D9]/20' },
  transfer:      { icon: TrendingUp,   label: 'Transfer',        colorClass: 'text-purple-500',    bgBorder: 'bg-purple-500/10 border-purple-500/20' },
};

export default function AIRecommendations() {
  const [recs, setRecs] = useState(aiRecommendations);
  const [statusFilter, setStatusFilter] = useState<Status>('all');
  const [typeFilter, setTypeFilter] = useState<RecType>('all');
  const [expandedId, setExpandedId] = useState<string | null>('REC-001');

  const filtered = recs.filter(r => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    return matchStatus && matchType;
  });

  const approve = (id: string) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const dismiss = (id: string) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: 'dismissed' } : r));
  };

  const pendingCount = recs.filter(r => r.status === 'pending').length;
  const criticalCount = recs.filter(r => r.priority === 'critical' && r.status === 'pending').length;
  const approvedCount = recs.filter(r => r.status === 'approved').length;
  const totalPotentialLoss = recs
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => {
      const match = r.potentialLoss.match(/[\d,]+/);
      return sum + (match ? parseInt(match[0].replace(',', '')) : 0);
    }, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-[#00A5D9]/10 border border-[#00A5D9]/20">
                <Brain size={24} className="text-[#00A5D9]" />
            </div>
            <h1 className="text-3xl font-black text-[var(--text-main)]">AI Recommendations</h1>
          </div>
          <p className="text-[var(--text-muted)] text-sm mt-2 font-medium">
            AI-generated supply chain actions · Review and approve to execute
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A5D9]/10 border border-[#00A5D9]/20 shadow-inner">
          <Zap size={16} className="text-[#00A5D9]" />
          <span className="text-[#00A5D9] text-sm font-bold">AI Engine Active</span>
          <span className="w-2 h-2 rounded-full bg-[#00A5D9] animate-pulse ml-2" />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Pending Actions', value: pendingCount, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Critical Priority', value: criticalCount, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { label: 'Approved Today', value: approvedCount, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { label: 'At-Risk Value', value: `SAR ${(totalPotentialLoss / 1000).toFixed(0)}K`, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        ].map(c => (
          <div key={c.label} className={clsx("premium-card p-5 border shadow-sm", c.bg, c.border)}>
            <p className={clsx("text-3xl font-black", c.color)}>{c.value}</p>
            <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wide mt-2">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 p-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl">
            {(['all', 'pending', 'approved', 'dismissed'] as Status[]).map(s => (
            <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  "px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-all",
                  statusFilter === s ? "bg-[var(--bg-card)] text-[#00A5D9] shadow-md border border-[var(--border-color)]" : "text-[var(--text-muted)] hover:text-[#00A5D9] border border-transparent"
                )}
            >
                {s}
            </button>
            ))}
        </div>
        <div className="w-px h-8 bg-[var(--border-color)] mx-2 hidden sm:block" />
        <div className="flex gap-1.5">
            {(['all', 'replenishment', 'purchase_order', 'transfer'] as RecType[]).map(t => (
            <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={clsx(
                    "px-4 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border",
                    typeFilter === t
                    ? "bg-[#00A5D9]/10 text-[#00A5D9] border-[#00A5D9]/30 shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5"
                )}
            >
                {t === 'all' ? 'All Types' : t.replace('_', ' ')}
            </button>
            ))}
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-5">
        {filtered.map((rec) => {
          const p = priorityConfig[rec.priority as keyof typeof priorityConfig];
          const t = typeConfig[rec.type as keyof typeof typeConfig];
          const TypeIcon = t.icon;
          const isExpanded = expandedId === rec.id;

          return (
            <div
              key={rec.id}
              className={clsx('premium-card overflow-hidden transition-all duration-300 border-2', p.bg, p.border, rec.status !== 'pending' && 'opacity-60 grayscale-[0.2]')}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start gap-5">
                  {/* Priority dot */}
                  <div className="relative mt-1.5 flex-shrink-0">
                    <div className={clsx("w-3 h-3 rounded-full", p.dot)} />
                    {rec.status === 'pending' && rec.priority === 'critical' && (
                      <div className={clsx("absolute inset-0 rounded-full animate-ping opacity-50", p.dot)} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text-main)] text-lg mb-2">{rec.title}</h3>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={clsx("flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold border", t.bgBorder, t.colorClass)}>
                        <TypeIcon size={12} />
                        {t.label}
                      </span>
                      <span className={clsx("text-xs px-3 py-1 rounded-full font-bold border", p.color, p.border, "bg-[var(--bg-surface)]")}>
                        {p.label} Priority
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-[#00A5D9] bg-[#00A5D9]/10 px-3 py-1 rounded-full border border-[#00A5D9]/20">
                        <Brain size={12} />
                        {rec.confidence}% Confidence
                      </span>
                    </div>

                    {/* Action box */}
                    <div
                      className="p-5 rounded-xl mb-5 font-mono text-sm font-semibold border bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-main)] shadow-inner flex items-center"
                    >
                      <span className="text-[#00A5D9] mr-3 text-lg">▸</span> {rec.action}
                    </div>

                    {/* Impact */}
                    <div className="flex flex-wrap gap-5 text-sm font-semibold">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">{rec.impact}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertTriangle size={14} className="text-red-500" />
                        <span className="text-red-600 dark:text-red-400">{rec.potentialLoss}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 flex-shrink-0 min-w-[140px] pl-4 border-l border-[var(--border-color)]/50">
                    {rec.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => approve(rec.id)}
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 border border-emerald-400"
                        >
                          <CheckCircle size={18} className="drop-shadow-sm" />
                          Approve
                        </button>
                        <button
                          onClick={() => dismiss(rec.id)}
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-muted)] border border-[var(--border-color)] shadow-sm"
                        >
                          <XCircle size={18} />
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <div
                        className={clsx(
                          "flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border",
                          rec.status === 'approved'
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)]"
                        )}
                      >
                        {rec.status === 'approved' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                      </div>
                    )}

                    <button
                        onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                        className="mt-auto flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                    >
                        {isExpanded ? 'Hide Details' : 'View Reasoning'}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-6 pb-6 bg-[var(--bg-surface)]/50 border-t border-[var(--border-color)]">
                  <div className="pt-5 space-y-4">
                    <div>
                      <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-2">Analysis Reasoning</p>
                      <p className="text-[var(--text-main)] text-sm font-medium leading-relaxed max-w-4xl">{rec.description}</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#00A5D9]/5 border border-[#00A5D9]/20 w-fit">
                      <Clock size={16} className="text-[#00A5D9]" />
                      <p className="text-[#00A5D9] text-sm font-semibold">
                        Action automatically syncs to Oracle Fusion once approved.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="premium-card p-16 text-center border-dashed border-2">
            <Brain size={48} className="mx-auto mb-4 text-[var(--border-color)]" />
            <p className="text-[var(--text-muted)] font-bold text-lg">No recommendations match filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
