'use client';

import { useState, useEffect } from 'react';
import { Database, Server, RefreshCw, CheckCircle, Activity, Brain, Box, ArrowRight, HardDrive } from 'lucide-react';
import clsx from 'clsx';

function PulsingLine({ active, delay = 0, reverse = false }: { active: boolean; delay?: number; reverse?: boolean }) {
  return (
    <div className="relative w-full h-1 bg-[var(--border-color)] overflow-hidden rounded-full min-w-[50px]">
      {active && (
        <div
          className={clsx(
            "absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#00A5D9] to-transparent opacity-70",
            reverse ? "animate-pulse-line-reverse" : "animate-pulse-line"
          )}
          style={{ animationDelay: `${delay}ms` }}
        />
      )}
    </div>
  );
}

const systems = [
  { id: 'oracle', name: 'Oracle Fusion', type: 'Primary ERP', status: 'Online', icon: Database, color: 'text-[#00A5D9]', bg: 'bg-[#00A5D9]/10', border: 'border-[#00A5D9]/30' },
  { id: 'marble', name: 'Marble Wave', type: 'B2B/Partners', status: 'Online', icon: Server, color: 'text-[#002C6A] dark:text-blue-400', bg: 'bg-[#002C6A]/10 dark:bg-blue-400/10', border: 'border-[#002C6A]/30 dark:border-blue-400/30' },
  { id: 'civil', name: 'Legacy Civil', type: 'Decommissioning', status: 'Syncing', icon: HardDrive, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' }
];

export default function DataIntegrationFlow() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<{ time: string; msg: string; type: string }[]>([]);

  useEffect(() => {
    if (!isSyncing) return;
    
    // Simulate log streaming
    const newLogs = [
      { time: new Date().toLocaleTimeString(), msg: 'Authorized Oracle Fusion Webhook (Bearer token valid)', type: 'info' },
      { time: new Date().toLocaleTimeString(), msg: 'Received 1,204 inventory deltas from WH-01 and WH-02', type: 'success' },
      { time: new Date().toLocaleTimeString(), msg: 'Marble Wave API polling... 15 sales orders detected', type: 'info' },
      { time: new Date().toLocaleTimeString(), msg: 'Civil system sync (Legacy Migration) - batch 4/10', type: 'warning' },
      { time: new Date().toLocaleTimeString(), msg: 'AI Engine analyzing inventory thresholds...', type: 'info' },
      { time: new Date().toLocaleTimeString(), msg: 'Generated 2 new replenishment recommendations', type: 'success' },
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < newLogs.length) {
        setLogs(prev => [newLogs[currentLog], ...prev]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsSyncing(false), 2000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isSyncing]);

  const triggerSync = () => {
    setLogs([]);
    setIsSyncing(true);
  };

  return (
    <div className="space-y-8 animate-fade-in w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tight">Data Integration Map</h1>
        <p className="text-[var(--text-muted)] text-sm font-medium mt-1">
          Live simulation of data ingestion from Oracle Fusion and secondary platforms
        </p>
      </div>

      <div className="premium-card p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-[var(--text-main)]">System Architecture</h2>
          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className={clsx(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border",
              isSyncing 
                ? "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] opacity-70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00A5D9] to-[#0083B0] text-white border-[#00A5D9]/50 shadow-md shadow-[#00A5D9]/20 hover:scale-105 active:scale-95"
            )}
          >
            <RefreshCw size={16} className={clsx(isSyncing && "animate-spin")} />
            {isSyncing ? 'Syncing Ecosystem...' : 'Simulate Live Sync'}
          </button>
        </div>

        {/* Integration Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 relative">
          
          {/* Column 1: Sources */}
          <div className="flex-1 flex flex-col gap-6 w-full md:w-auto relative z-10">
            {systems.map((sys) => {
              const Icon = sys.icon;
              return (
                <div key={sys.id} className="relative group">
                  <div className={clsx("p-4 rounded-2xl border transition-all duration-300 bg-[var(--bg-card)] shadow-sm group-hover:shadow-md", sys.border)}>
                    <div className="flex items-center gap-4">
                      <div className={clsx("p-3 rounded-xl flex-shrink-0", sys.bg, sys.color)}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--text-main)]">{sys.name}</h3>
                        <p className="text-xs font-semibold text-[var(--text-muted)]">{sys.type}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={clsx("w-2.5 h-2.5 rounded-full", isSyncing ? "bg-emerald-500 animate-pulse" : sys.status === 'Online' ? "bg-emerald-500" : "bg-amber-500")} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Data Lake & Engine */}
          <div className="flex flex-col items-center justify-center w-full md:w-32 relative z-0 md:-mx-4 hidden md:flex">
             <div className="h-full flex flex-col justify-between py-12 absolute inset-0 space-y-24">
                 <PulsingLine active={isSyncing} delay={0} />
                 <PulsingLine active={isSyncing} delay={300} />
                 <PulsingLine active={isSyncing} delay={600} />
             </div>
          </div>

          {/* Center Hub */}
          <div className="relative z-10 w-full md:w-auto flex flex-col items-center">
            <div className={clsx(
              "p-8 rounded-[2rem] border-2 shadow-2xl flex flex-col items-center bg-[var(--bg-surface)] w-64 text-center transition-all duration-500",
              isSyncing ? "border-[#00A5D9] shadow-[#00A5D9]/20" : "border-[var(--border-color)]"
            )}>
               <div className="relative mb-6">
                 <div className={clsx("absolute inset-0 rounded-full blur-xl transition-all duration-500", isSyncing ? "bg-[#00A5D9]/40 opacity-100 animate-pulse" : "bg-[var(--border-color)] opacity-0")} />
                 <div className={clsx("p-5 rounded-full relative z-10 transition-colors duration-500", isSyncing ? "bg-gradient-to-br from-[#00A5D9] to-blue-600 text-white" : "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)]")}>
                   <Brain size={48} />
                 </div>
               </div>
               <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight mb-1">AI Context Engine</h3>
               <p className="text-xs font-bold text-[var(--text-muted)]">Data Normalization & Predictive Analytics</p>

               {/* Processing states */}
               <div className="mt-6 flex flex-col gap-2 w-full text-xs font-bold text-left">
                  <div className="flex justify-between items-center px-3 py-1.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
                    <span className="text-[var(--text-muted)]">Sanitize SQL</span>
                    <CheckCircle size={12} className={isSyncing ? "text-emerald-500" : "text-[var(--border-color)]"} />
                  </div>
                  <div className="flex justify-between items-center px-3 py-1.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
                    <span className="text-[var(--text-muted)]">Machine Learning Pool</span>
                    <CheckCircle size={12} className={isSyncing ? "text-emerald-500" : "text-[var(--border-color)]"} />
                  </div>
               </div>
            </div>
          </div>

          {/* Column 3: Output lines */}
          <div className="flex flex-col items-center justify-center w-full md:w-24 relative z-0 md:-mx-4 hidden md:flex">
             <PulsingLine active={isSyncing} delay={200} />
          </div>

          {/* Column 4: Platform Modules */}
          <div className="flex-1 flex flex-col gap-5 w-full md:w-auto z-10">
            {[
              { icon: Activity, label: "Live Dashboards", desc: "Executive KPI views" },
              { icon: Box, label: "Inventory Logic", desc: "Reorder points & metrics" },
              { icon: ArrowRight, label: "Action Queues", desc: "Suggested Transfers/POs" }
            ].map((mod, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm w-full transition-all duration-300 hover:-translate-y-0.5">
                <div className={clsx("p-2.5 rounded-lg", isSyncing ? "bg-emerald-500/10 text-emerald-500" : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)]")}>
                  <mod.icon size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-[var(--text-main)]">{mod.label}</h4>
                   <p className="text-[11px] font-semibold text-[var(--text-muted)] mt-0.5 uppercase tracking-wide">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Terminal Logs */}
      <div className="premium-card overflow-hidden">
        <div className="bg-[#0f172a] px-5 py-3 border-b border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-3 text-xs font-mono font-bold text-gray-400">mobily-sync-daemon (Live)</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">{isSyncing ? 'ACTIVE' : 'IDLE'}</span>
        </div>
        <div className="p-5 font-mono text-sm bg-[#0f172a] h-64 overflow-y-auto w-full text-slate-300 space-y-2 relative">
           {logs.length === 0 && !isSyncing && (
             <div className="text-slate-500 absolute inset-0 flex items-center justify-center">
               Standby. Click 'Simulate Live Sync' to generate integration trace.
             </div>
           )}
           {logs.filter(Boolean).map((log, i) => (
             <div key={i} className="flex items-start gap-4 animate-fade-in">
               <span className="text-slate-500 flex-shrink-0">[{log.time}]</span>
               <span className={clsx(
                 "flex-1",
                 log.type === 'info' && "text-blue-400",
                 log.type === 'success' && "text-emerald-400",
                 log.type === 'warning' && "text-amber-400"
               )}>{log.msg}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
