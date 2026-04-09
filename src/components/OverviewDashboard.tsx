'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';
import {
  Package, ShoppingCart, AlertTriangle, MapPin,
  Warehouse, TrendingUp, Zap, Activity,
} from 'lucide-react';
import KpiCard from '@/components/KpiCard';
import { salesTrend, kpis, aiRecommendations, outlets, warehouses, stockLevels, msisdnPools } from '@/lib/mockData';

const warehouseUtil = warehouses.map(w => ({
  name: w.name.replace('Main Warehouse', 'Main WH').replace(' Hub', ''),
  used: Math.round((w.used / w.capacity) * 100),
  free: Math.round(((w.capacity - w.used) / w.capacity) * 100),
}));

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

export default function OverviewDashboard() {
  const criticalAlerts = aiRecommendations.filter(r => r.priority === 'critical' && r.status === 'pending');
  const criticalOutlets = outlets.filter(o => o.status === 'critical');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)]">Supply Chain Overview</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1 font-medium">
            Live intelligence across all warehouses, outlets, and partners
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Oracle Fusion Sync
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Active Orders"
          value={kpis.activeOrders.toLocaleString()}
          subtitle="Across all channels"
          icon={<ShoppingCart size={22} />}
          accent="cyan"
          trend={{ value: '+12%', positive: true }}
          delay={0}
        />
        <KpiCard
          title="Critical Alerts"
          value={kpis.criticalAlerts}
          subtitle="Require immediate action"
          icon={<AlertTriangle size={22} />}
          accent="red"
          pulse
          delay={1}
        />
        <KpiCard
          title="Outlets Monitored"
          value={kpis.outletsMonitored}
          subtitle="Real-time stock tracking"
          icon={<MapPin size={22} />}
          accent="blue"
          trend={{ value: '+4', positive: true }}
          delay={2}
        />
        <KpiCard
          title="Pending Approvals"
          value={kpis.pendingApprovals}
          subtitle="AI recommendations"
          icon={<Zap size={22} />}
          accent="purple"
          pulse
          delay={3}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Warehouse Fill Rate"
          value={`${kpis.warehouseFillRate}%`}
          subtitle="Across 3 locations"
          icon={<Warehouse size={22} />}
          accent="green"
          trend={{ value: '+2.1%', positive: true }}
          delay={0}
        />
        <KpiCard
          title="Today's Sales"
          value={kpis.todaySales.toLocaleString()}
          subtitle="Units dispatched"
          icon={<Activity size={22} />}
          accent="cyan"
          trend={{ value: '+8%', positive: true }}
          delay={1}
        />
        <KpiCard
          title="Weekly Revenue"
          value={`SAR ${(kpis.weeklyRevenue / 1000000).toFixed(1)}M`}
          subtitle="Channel shipment value"
          icon={<TrendingUp size={22} />}
          accent="green"
          trend={{ value: '+14%', positive: true }}
          delay={2}
        />
        <KpiCard
          title="Stockouts This Month"
          value={kpis.stockoutsThisMonth}
          subtitle="vs 8 last month"
          icon={<Package size={22} />}
          accent="blue"
          trend={{ value: '75%', positive: true }}
          delay={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend */}
        <div className="premium-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-[var(--text-main)] text-lg">Sales Volume Trend</h2>
              <p className="text-[var(--text-muted)] text-sm font-medium">Last 12 months · All channels</p>
            </div>
            <select
              className="text-sm font-medium rounded-xl px-3 py-1.5 outline-none border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)]"
            >
              <option>12 months</option>
              <option>6 months</option>
              <option>3 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="voiceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A5D9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00A5D9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dataGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#002C6A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#002C6A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} tickLine={false} axisLine={false} dy={10} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="voiceSIM" stroke="#00A5D9" strokeWidth={3} fill="url(#voiceGrad)" name="Voice SIM" />
              <Area type="monotone" dataKey="dataSIM" stroke="#002C6A" strokeWidth={3} fill="url(#dataGrad)" name="Data SIM" />
              <Legend
                formatter={(v) => <span className="text-[var(--text-muted)] font-medium ml-1">{v}</span>}
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: 20 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* MSISDN Usage */}
        <div className="premium-card p-6">
          <h2 className="font-bold text-[var(--text-main)] text-lg mb-1">Number Pool Utilisation</h2>
          <p className="text-[var(--text-muted)] text-sm font-medium mb-6">MSISDN inventory tracking</p>
          
          <div className="space-y-5">
            {msisdnPools.map((pool, i) => {
              const pct = Math.round((pool.allocated / pool.total) * 100);
              // Switch original standard colors to fit theme where needed
              const color = pool.type.includes('Voice') ? '#00A5D9' : pool.type.includes('Data') ? '#002C6A' : pool.color;
              return (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[var(--text-main)] text-sm font-semibold">{pool.type}</span>
                    <span style={{ color: color }} className="font-bold text-sm">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r"
                      style={{ width: `${pct}%`, backgroundColor: color, backgroundImage: `linear-gradient(90deg, ${color}80 0%, ${color} 100%)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Warehouse + Critical Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouse Capacity */}
        <div className="premium-card p-6">
          <h2 className="font-bold text-[var(--text-main)] text-lg mb-6">Warehouse Capacity</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={warehouseUtil} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }} tickLine={false} axisLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--bg-surface)'}} />
              <Bar dataKey="used" name="Used %" fill="#00A5D9" radius={[0, 4, 4, 0]} barSize={24} />
              <Bar dataKey="free" name="Free %" fill="var(--border-color)" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Alerts */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[var(--text-main)] text-lg">Action Items</h2>
            <span className="text-xs px-3 py-1 rounded-full font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              {criticalAlerts.length} urgent
            </span>
          </div>
          <div className="space-y-4">
            {criticalAlerts.map((rec) => (
              <div
                key={rec.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20"
              >
                <div className="mt-1">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--text-main)] text-sm font-bold">{rec.title}</p>
                  <p className="text-red-500/80 text-xs font-semibold mt-1 flex items-center gap-1">
                     Potential Loss: {rec.potentialLoss}
                  </p>
                </div>
                <button
                  className="text-xs px-4 py-2 rounded-lg font-bold flex-shrink-0 transition-transform active:scale-95 bg-red-500 text-white shadow-md shadow-red-500/20"
                >
                  Review
                </button>
              </div>
            ))}
            {criticalOutlets.map((outlet) => (
              <div
                key={outlet.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]"
              >
                <div className="mt-1">
                  <MapPin size={18} className="text-[#00A5D9]" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-main)] text-sm font-bold">{outlet.name}</p>
                  <p className="text-[var(--text-muted)] text-xs font-medium mt-1">{outlet.city} · Stock critically low</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
