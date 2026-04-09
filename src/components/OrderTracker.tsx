'use client';

import { useState } from 'react';
import { Search, ArrowRight, Clock, CheckCircle, AlertCircle, Package, Truck } from 'lucide-react';
import { orders } from '@/lib/mockData';
import clsx from 'clsx';

type OrderType = 'All' | 'Sales Order' | 'Transfer Order' | 'Return Order' | 'Purchase Order';
type StatusFilter = 'All' | 'Pending' | 'Processing' | 'In Transit' | 'Shipped' | 'Approved' | 'Received' | 'Pending Approval';

const typeColors: Record<string, { bg: string; colorClass: string; border: string }> = {
  'Sales Order':    { bg: 'bg-[#00A5D9]/10',  colorClass: 'text-[#00A5D9]', border: 'border-[#00A5D9]/20' },
  'Transfer Order': { bg: 'bg-[#002C6A]/10',  colorClass: 'text-[#002C6A] dark:text-blue-400', border: 'border-[#002C6A]/20 dark:border-blue-400/20' },
  'Return Order':   { bg: 'bg-purple-500/10', colorClass: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20' },
  'Purchase Order': { bg: 'bg-emerald-500/10',colorClass: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
};

const statusConfig: Record<string, { bg: string; colorClass: string; icon: any; border: string }> = {
  'Processing':      { bg: 'bg-[#00A5D9]/10', colorClass: 'text-[#00A5D9]', icon: Clock, border: 'border-[#00A5D9]/20' },
  'Pending':         { bg: 'bg-amber-500/10', colorClass: 'text-amber-600 dark:text-amber-400', icon: AlertCircle, border: 'border-amber-500/20' },
  'In Transit':      { bg: 'bg-blue-500/10',  colorClass: 'text-blue-600 dark:text-blue-400', icon: Truck, border: 'border-blue-500/20' },
  'Shipped':         { bg: 'bg-emerald-500/10', colorClass: 'text-emerald-600 dark:text-emerald-400', icon: CheckCircle, border: 'border-emerald-500/20' },
  'Approved':        { bg: 'bg-emerald-500/10', colorClass: 'text-emerald-600 dark:text-emerald-400', icon: CheckCircle, border: 'border-emerald-500/20' },
  'Received':        { bg: 'bg-emerald-500/10', colorClass: 'text-emerald-600 dark:text-emerald-400', icon: CheckCircle, border: 'border-emerald-500/20' },
  'Pending Approval':{ bg: 'bg-red-500/10', colorClass: 'text-red-600 dark:text-red-400', icon: AlertCircle, border: 'border-red-500/20' },
};

const orderTypeSummary = [
  { label: 'Sales Orders',    count: orders.filter(o => o.type === 'Sales Order').length,    icon: Package, defaultHex: '#00A5D9' },
  { label: 'Transfer Orders', count: orders.filter(o => o.type === 'Transfer Order').length,  icon: Truck,   defaultHex: '#002C6A' },
  { label: 'Purchase Orders', count: orders.filter(o => o.type === 'Purchase Order').length,  icon: CheckCircle, defaultHex: '#10b981' },
  { label: 'Return Orders',   count: orders.filter(o => o.type === 'Return Order').length,   icon: AlertCircle, defaultHex: '#8b5cf6' },
];

export default function OrderTracker() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<OrderType>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.from.toLowerCase().includes(search.toLowerCase()) || o.to.toLowerCase().includes(search.toLowerCase()) || o.sku.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || o.type === typeFilter;
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalValue = filtered.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-main)]">Order Tracker</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1 font-medium">
          Sales orders, transfers, purchase orders and returns across the network
        </p>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {orderTypeSummary.map(item => {
          const Icon = item.icon;
          const isSelected = typeFilter === item.label.replace(/s$/, '');
          return (
            <button
              key={item.label}
              onClick={() => setTypeFilter(item.label.replace(/s$/, '') as OrderType)}
              className={clsx(
                "rounded-xl p-5 text-left transition-all hover:-translate-y-1 bg-[var(--bg-card)] shadow-sm",
                isSelected ? "ring-2 ring-[#00A5D9] ring-offset-2 ring-offset-[var(--bg-main)]" : "border border-[var(--border-color)]"
              )}
            >
              <Icon size={24} color={item.defaultHex} className={isSelected ? 'text-[#00A5D9]' : ''} />
              <p className="text-2xl font-black text-[var(--text-main)] mt-3">{item.count}</p>
              <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wide mt-1">{item.label}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[#00A5D9] transition-colors" />
          <input
            type="text"
            placeholder="Search by order ID, location, SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium outline-none bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] focus:border-[#00A5D9] focus:ring-2 focus:ring-[#00A5D9]/20 transition-all placeholder-[var(--text-muted)]"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as OrderType)}
          className="px-4 py-3 rounded-xl text-sm font-medium outline-none bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] focus:border-[#00A5D9] focus:ring-2 focus:ring-[#00A5D9]/20 transition-all min-w-[160px]"
        >
          {['All', 'Sales Order', 'Transfer Order', 'Purchase Order', 'Return Order'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-3 rounded-xl text-sm font-medium outline-none bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] focus:border-[#00A5D9] focus:ring-2 focus:ring-[#00A5D9]/20 transition-all min-w-[180px]"
        >
          {['All', 'Pending Approval', 'Pending', 'Processing', 'In Transit', 'Shipped', 'Approved', 'Received'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between pl-1">
        <p className="text-[var(--text-muted)] text-sm font-semibold tracking-wide">
          {filtered.length} Orders · Total Value:{' '}
          <strong className="text-[var(--text-main)] text-base ml-1">SAR {totalValue.toLocaleString()}</strong>
        </p>
      </div>

      {/* Orders Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
                <tr className="bg-[var(--bg-surface)]/80 border-b border-[var(--border-color)]">
                {['Order ID', 'Type', 'From → To', 'SKU', 'Quantity', 'Value (SAR)', 'Date', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {h}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {filtered.map((order, i) => {
                const tc = typeColors[order.type] || typeColors['Sales Order'];
                const sc = statusConfig[order.status] || statusConfig['Pending'];
                const StatusIcon = sc.icon;
                return (
                    <tr
                    key={order.id}
                    className={clsx("hover:bg-black/5 dark:hover:bg-white/5 transition-colors", i > 0 && "border-t border-[var(--border-color)]")}
                    >
                    <td className="px-6 py-4">
                        <span className="text-[#00A5D9] font-mono text-xs font-bold px-2 py-1 bg-[#00A5D9]/10 rounded">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className={clsx("text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap border", tc.bg, tc.colorClass, tc.border)}>
                        {order.type}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-[var(--text-main)]">{order.from}</span>
                        <ArrowRight size={14} className="text-[var(--text-muted)] flex-shrink-0" />
                        <span className="text-[var(--text-main)]">{order.to}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-[var(--text-muted)] text-xs font-mono font-bold">{order.sku}</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="font-bold text-[var(--text-main)] text-base">{order.qty.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="font-bold text-[var(--text-main)] text-base">{order.value.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-[var(--text-muted)] text-xs font-medium">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className={clsx("flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-bold w-fit whitespace-nowrap border", sc.bg, sc.colorClass, sc.border)}>
                        <StatusIcon size={12} />
                        {order.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {order.status === 'Pending Approval' && (
                        <button className="text-xs px-4 py-2 rounded-lg font-bold transition-transform active:scale-95 whitespace-nowrap bg-gradient-to-r from-[#00A5D9] to-[#0083B0] text-white shadow-md shadow-[#00A5D9]/20 hover:shadow-lg hover:shadow-[#00A5D9]/30">
                            Approve
                        </button>
                        )}
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[var(--text-muted)] font-medium">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            No orders match your search criteria
          </div>
        )}
      </div>
    </div>
  );
}
