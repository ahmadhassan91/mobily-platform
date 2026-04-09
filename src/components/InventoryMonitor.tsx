'use client';

import { useState } from 'react';
import {
  Warehouse, Package, ChevronDown, ChevronRight,
  AlertTriangle, CheckCircle, Minus, Search,
} from 'lucide-react';
import { warehouses, outlets, products, stockLevels, outletStock, msisdnPools } from '@/lib/mockData';
import clsx from 'clsx';

type View = 'warehouse' | 'outlet' | 'msisdn';

function StockBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)]" style={{ minWidth: 80 }}>
      <div
        className="h-full rounded-full transition-all duration-700 bg-gradient-to-r"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color, backgroundImage: `linear-gradient(90deg, ${color}90 0%, ${color} 100%)` }}
      />
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'critical') return <AlertTriangle size={20} className="text-white drop-shadow-sm" />;
  if (status === 'warning') return <Minus size={20} className="text-white drop-shadow-sm" />;
  return <CheckCircle size={20} className="text-white drop-shadow-sm" />;
}

export default function InventoryMonitor() {
  const [view, setView] = useState<View>('warehouse');
  const [search, setSearch] = useState('');
  const [expandedWH, setExpandedWH] = useState<string | null>('WH-01');
  const [expandedOutlet, setExpandedOutlet] = useState<string | null>(null);

  const skuMap = Object.fromEntries(products.map(p => [p.sku, p]));

  const tabs: { id: View; label: string }[] = [
    { id: 'warehouse', label: 'Warehouses' },
    { id: 'outlet', label: 'Outlets' },
    { id: 'msisdn', label: 'Number Pool (MSISDN)' },
  ];

  const filteredWarehouses = warehouses.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.city.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOutlets = outlets.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-main)]">Inventory Monitor</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1 font-medium">
          Real-time stock levels across warehouses, outlets, and MSISDN pools
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Total Warehouses', value: warehouses.length, color: '#00A5D9' },
          { label: 'Total Outlets', value: outlets.length, color: '#002C6A' },
          { label: 'Critical Stock', value: outletStock.filter(s => s.qty < s.reorderPoint).length, color: '#ef4444' },
          { label: 'SIM Pool Utilisation', value: '74%', color: '#10b981' },
        ].map((c) => (
          <div key={c.label} className="premium-card p-5">
            <p className="text-3xl font-black" style={{ color: c.color }}>{c.value}</p>
            <p className="text-[var(--text-muted)] text-xs font-bold mt-2 uppercase tracking-wide">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={clsx('px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200', view === t.id ? 'shadow-sm' : '')}
              style={
                view === t.id
                  ? { background: 'linear-gradient(135deg,#00A5D9,#0083B0)', color: '#FFFFFF' }
                  : { color: 'var(--text-muted)' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        {view !== 'msisdn' && (
          <div className="relative group">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[#00A5D9] transition-colors" />
            <input
              type="text"
              placeholder="Search locations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none w-64 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] focus:border-[#00A5D9] focus:ring-2 focus:ring-[#00A5D9]/20 transition-all placeholder-[var(--text-muted)] font-medium"
            />
          </div>
        )}
      </div>

      {/* Warehouse View */}
      {view === 'warehouse' && (
        <div className="space-y-4">
          {filteredWarehouses.map(wh => {
            const utilPct = Math.round((wh.used / wh.capacity) * 100);
            const whStocks = stockLevels.filter(s => s.warehouseId === wh.id);
            const isExpanded = expandedWH === wh.id;

            return (
              <div key={wh.id} className={clsx("premium-card overflow-hidden group", isExpanded && "ring-2 ring-[#00A5D9]/30")}>
                <button
                  className="w-full flex items-center gap-6 p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left"
                  onClick={() => setExpandedWH(isExpanded ? null : wh.id)}
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00A5D9] to-[#0083B0] text-white flex-shrink-0 shadow-lg shadow-[#00A5D9]/20 group-hover:scale-105 transition-transform">
                    <Warehouse size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <p className="font-bold text-[var(--text-main)] text-xl tracking-tight">{wh.name}</p>
                      <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">{wh.city}</span>
                    </div>
                    <div className="flex items-center gap-5 mt-3">
                      <div className="flex-1" style={{ maxWidth: 280 }}>
                        <StockBar pct={utilPct} color={utilPct > 80 ? '#ef4444' : utilPct > 60 ? '#f59e0b' : '#10b981'} />
                      </div>
                      <span className="text-[var(--text-muted)] text-xs font-bold whitespace-nowrap">
                        {utilPct}% CAPACITY · {(wh.used / 1000).toFixed(0)}K / {(wh.capacity / 1000).toFixed(0)}K UNITS
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-xs px-4 py-1.5 rounded-full font-bold bg-emerald-500 text-white shadow-md shadow-emerald-500/20 whitespace-nowrap">
                      {whStocks.length} SKUs Tracked
                    </span>
                    <div className="p-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] group-hover:bg-[#00A5D9] group-hover:text-white group-hover:border-[#00A5D9] transition-colors">
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-[var(--border-color)] bg-[var(--bg-surface)]/30">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[var(--bg-surface)]/80 border-b border-[var(--border-color)]">
                          {['SKU', 'Product', 'Category', 'In Stock', 'Reorder Point', 'Utilisation', 'Status'].map(h => (
                            <th key={h} className="text-left px-6 py-4 text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {whStocks.map((s, i) => {
                          const prod = skuMap[s.sku];
                          const pct = Math.round((s.qty / s.maxCapacity) * 100);
                          const belowReorder = s.qty < s.reorderPoint;
                          return (
                            <tr key={s.sku} className={clsx("hover:bg-black/5 dark:hover:bg-white/5 transition-colors", i > 0 && "border-t border-[var(--border-color)]")}>
                              <td className="px-6 py-4">
                                <span className="text-[#00A5D9] text-xs font-bold font-mono px-2 py-1 rounded bg-[#00A5D9]/10">{s.sku}</span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-[var(--text-main)]">{prod?.name}</td>
                              <td className="px-6 py-4">
                                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">{prod?.category}</span>
                              </td>
                              <td className="px-6 py-4 font-black text-[var(--text-main)] text-base">{s.qty.toLocaleString()}</td>
                              <td className="px-6 py-4 font-medium text-[var(--text-muted)]">{s.reorderPoint.toLocaleString()}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <StockBar pct={pct} color={belowReorder ? '#ef4444' : '#00A5D9'} />
                                  <span className="text-[var(--text-muted)] text-xs font-bold">{pct}%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={clsx('text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap', belowReorder ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20')}>
                                  {belowReorder ? '⚠ Restock' : '✓ OK'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Outlet View */}
      {view === 'outlet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {filteredOutlets.map(outlet => {
            const stocks = outletStock.filter(s => s.outletId === outlet.id);
            const isExpanded = expandedOutlet === outlet.id;

            const isCritical = outlet.status === 'critical';
            const isWarning = outlet.status === 'warning';
            const borderColor = isCritical ? 'border-red-500' : isWarning ? 'border-amber-500' : 'border-emerald-500/30';
            const iconBg = isCritical ? 'bg-gradient-to-br from-red-500 to-red-600 border-red-600 shadow-lg shadow-red-500/30' : isWarning ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-600 shadow-lg shadow-amber-500/30' : 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-600 shadow-lg shadow-emerald-500/30';

            return (
              <div key={outlet.id} className={clsx("rounded-2xl border overflow-hidden transition-all duration-300 relative group bg-[var(--bg-card)]", isExpanded ? "shadow-lg" : "shadow-sm hover:shadow-md", borderColor)}>
                 <div className={clsx("absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-10 transition-opacity", 
                   isCritical ? "bg-red-500 group-hover:opacity-10" :
                   isWarning ? "bg-amber-500 group-hover:opacity-10" :
                   "bg-emerald-500 group-hover:opacity-10"
                 )}/>
                <button
                  className="w-full relative flex items-center gap-5 p-5 text-left bg-transparent"
                  onClick={() => setExpandedOutlet(isExpanded ? null : outlet.id)}
                >
                  <div className={clsx("p-3 rounded-xl border flex-shrink-0 z-10 group-hover:scale-105 transition-transform", iconBg)}>
                    <StatusIcon status={outlet.status} />
                  </div>
                  <div className="flex-1 z-10">
                    <div className="flex items-center justify-between mb-1 text-[var(--text-main)]">
                      <p className="font-bold text-lg tracking-tight">{outlet.name}</p>
                      <span className={clsx("text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm", 
                        isCritical ? "text-red-700 bg-red-50 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30" : 
                        isWarning ? "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30" : 
                        "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                      )}>
                        {outlet.status}
                      </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm font-semibold">
                      {outlet.city} · {outlet.type}
                    </p>
                  </div>
                  <div className="z-10 bg-[var(--bg-surface)] p-2 rounded-full border border-[var(--border-color)] text-[var(--text-main)] group-hover:bg-[#00A5D9] group-hover:text-white group-hover:border-[#00A5D9] transition-colors shadow-sm">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>

                {isExpanded && stocks.length > 0 && (
                  <div className="px-5 pb-5 space-y-4 pt-2 border-t border-[var(--border-color)]/50">
                    {stocks.map(s => {
                      const prod = skuMap[s.sku];
                      const daysLeft = s.dailySales > 0 ? (s.qty / s.dailySales).toFixed(1) : '∞';
                      const isLow = s.qty < s.reorderPoint;
                      return (
                        <div key={s.sku} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
                          <div className="flex justify-between mb-2">
                            <span className="text-[var(--text-main)] font-semibold text-sm">{prod?.name}</span>
                            <span className={clsx("text-sm font-bold", isLow ? 'text-red-500' : 'text-emerald-500')}>
                              {s.qty} units
                            </span>
                          </div>
                          <StockBar pct={Math.min((s.qty / (s.reorderPoint * 3)) * 100, 100)} color={isLow ? '#ef4444' : '#10b981'} />
                          <div className="flex justify-between mt-2.5">
                             <p className="text-[var(--text-muted)] text-xs font-medium">Sales: {s.dailySales}/day</p>
                             <p className={clsx("text-xs font-bold", isLow ? "text-red-500": "text-[var(--text-muted)]")}>{daysLeft} days left</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MSISDN View */}
      {view === 'msisdn' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {msisdnPools.map((pool, i) => {
            const pct = Math.round((pool.allocated / pool.total) * 100);
            const freePct = Math.round(((pool.total - pool.allocated - pool.reserved) / pool.total) * 100);
            const color = pool.type.includes('Voice') ? '#00A5D9' : pool.type.includes('Data') ? '#002C6A' : pool.color;

            return (
              <div key={i} className="premium-card p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-black text-[var(--text-main)] text-2xl tracking-tight">{pool.type}</h3>
                    <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mt-1.5">Number Pool</p>
                  </div>
                  <div className="text-5xl font-black tabular-nums transition-colors" style={{ color: pct > 85 ? '#ef4444' : color }}>
                    {pct}%
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[var(--text-muted)] text-xs font-bold uppercase">Allocated</span>
                      <span className="text-[var(--text-main)] text-sm font-bold">{pool.allocated.toLocaleString()}</span>
                    </div>
                    <StockBar pct={pct} color={pct > 85 ? '#ef4444' : color} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-color)]">
                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mb-0.5">Reserved</p>
                        <p className="text-xs font-bold text-[var(--text-main)]">{pool.reserved.toLocaleString()}</p>
                    </div>
                    <div className="bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-color)]">
                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mb-0.5">Free</p>
                        <p className="text-xs font-bold text-emerald-500">~{freePct}%</p>
                    </div>
                    <div className="bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-color)]">
                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mb-0.5">Total</p>
                        <p className="text-xs font-bold text-[var(--text-main)]">{pool.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className={clsx(
                  'text-xs px-4 py-2.5 rounded-xl font-bold text-center w-full border',
                  pct > 85 ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' : 
                  pct > 70 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : 
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                )}>
                  {pct > 85 ? '⚠ NEAR CAPACITY — PROCUREMENT REQUIRED' : pct > 70 ? 'MONITOR CLOSELY' : '✓ HEALTHY HEADROOM'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
