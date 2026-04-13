'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import OverviewDashboard from '@/components/OverviewDashboard';
import InventoryMonitor from '@/components/InventoryMonitor';
import OrderTracker from '@/components/OrderTracker';
import AIRecommendations from '@/components/AIRecommendations';
import ROITracker from '@/components/ROITracker';
import DataIntegrationFlow from '@/components/DataIntegrationFlow';
import AICopilot from '@/components/AICopilot';
import { Bell, Search, Calendar } from 'lucide-react';

type ActiveTab = 'overview' | 'integration' | 'inventory' | 'orders' | 'ai' | 'roi';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen flex text-[var(--text-main)]" style={{ background: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <Sidebar active={activeTab} onChange={(id) => setActiveTab(id as ActiveTab)} />

      <div className="flex-1 flex flex-col min-h-screen md:pl-72 pl-20 transition-all duration-300">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[var(--bg-surface)]/80 backdrop-blur-xl border-b border-[var(--border-color)]"
        >
          {/* Left: Date + Title */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] font-medium tracking-wide"
            >
              <Calendar size={14} />
              <span>{dateStr}</span>
            </div>
          </div>

          {/* Right: Search + Alerts */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[#00A5D9] transition-colors" />
              <input
                type="text"
                placeholder="Search orders, SKUs, outlets..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm w-64 outline-none border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:border-[#00A5D9] focus:ring-2 focus:ring-[#00A5D9]/20 transition-all placeholder-[var(--text-muted)]"
              />
            </div>
            
            <button
              className="relative p-2.5 rounded-xl transition-all border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Bell size={18} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: '#ef4444', boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }}
              />
            </button>

            {/* System status badge */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold tracking-wide"
              style={{ background: 'var(--badge-success-bg)', color: 'var(--badge-success-text)', border: '1px solid var(--border-color)' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto max-w-7xl mx-auto w-full relative">
          {activeTab === 'overview'    && <OverviewDashboard />}
          {activeTab === 'integration' && <DataIntegrationFlow />}
          {activeTab === 'inventory'   && <InventoryMonitor />}
          {activeTab === 'orders'      && <OrderTracker />}
          {activeTab === 'ai'          && <AIRecommendations />}
          {activeTab === 'roi'         && <ROITracker />}
        </main>

        {/* Footer */}
        <footer
          className="px-8 py-5 flex items-center justify-between text-xs font-medium border-t border-[var(--border-color)] text-[var(--text-muted)]"
        >
          <span>Mobily Supply Intelligence Platform · v1.0</span>
        </footer>

        {/* Global AI Copilot Widget */}
        <AICopilot />
      </div>
    </div>
  );
}
