'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Brain,
  TrendingUp,
  Bell,
  Settings,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from './ThemeProvider';

const navItems = [
  { id: 'overview',      label: 'Overview',        icon: LayoutDashboard },
  { id: 'inventory',     label: 'Inventory',        icon: Package },
  { id: 'orders',        label: 'Orders',           icon: ShoppingCart },
  { id: 'ai',            label: 'AI Recommendations', icon: Brain },
  { id: 'roi',           label: 'ROI Tracker',      icon: TrendingUp },
];

interface SidebarProps {
  active: string;
  onChange: (id: string) => void;
}

export default function Sidebar({ active, onChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [alerts] = useState(3);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity md:hidden',
          collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={() => setCollapsed(true)}
      />

      <aside
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)' }}
        className={clsx(
          'fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 shadow-xl shadow-[var(--shadow-color)]',
          collapsed ? 'w-20' : 'w-72'
        )}
      >
        {/* Logo */}
        <div
          className="flex items-center px-6 py-8"
          style={{ borderBottom: '1px solid var(--border-color)' }}
        >
          <div className={clsx("flex items-center justify-center relative transition-all duration-300 w-full", collapsed ? "h-10" : "h-24 px-4")}>
            <Image 
              src="/pngegg.png" 
              alt="Mobily Logo" 
              fill 
              className={clsx(
                "object-center object-contain drop-shadow-md",
                theme === 'dark' && "brightness-[0] invert-[1]"
              )} 
            />
          </div>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            style={{ color: 'var(--text-muted)' }}
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={clsx(
                  'w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-200 group relative',
                  isActive
                    ? 'shadow-md shadow-[#00A5D9]/20 scale-[1.02]'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 hover:translate-x-1'
                )}
                style={
                  isActive
                    ? { background: 'linear-gradient(135deg, #00A5D9, #0083B0)', color: '#FFFFFF' }
                    : { color: 'var(--text-muted)' }
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  className={clsx("transition-transform duration-200", isActive && "scale-110")}
                  style={{ flexShrink: 0 }}
                  color={isActive ? '#FFFFFF' : undefined}
                />
                {!collapsed && (
                  <span className="flex-1 text-left tracking-wide">{item.label}</span>
                )}
                {!collapsed && item.id === 'ai' && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(239,68,68,0.15)', color: isActive ? '#FFFFFF' : '#ef4444' }}
                  >
                    {alerts}
                  </span>
                )}
                {!collapsed && isActive && (
                  <ChevronRight size={18} color="#FFFFFF" className="opacity-70 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-6 space-y-2 relative" style={{ borderTop: '1px solid var(--border-color)' }}>
          {/* subtle gradient glow behind the settings area in dark mode to make it premium */}
          {theme === 'dark' && !collapsed && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#00A5D9]/5 to-transparent pointer-events-none" />
          )}

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
            style={{ color: 'var(--text-muted)' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          
          <button
            className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </button>

          {/* User Profile */}
          {!collapsed && (
            <div
              className="flex items-center gap-4 rounded-2xl px-4 py-3.5 mt-6 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 relative"
                style={{ background: 'linear-gradient(135deg, #00A5D9, #0083B0)', color: '#FFFFFF' }}
              >
                H
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[var(--bg-card)] rounded-full" />
              </div>
              <div className="min-w-0">
                <p style={{ color: 'var(--text-main)', fontSize: 14, fontWeight: 700 }} className="truncate">Hassan Al Emam</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} className="truncate">Supply Chain Director</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
