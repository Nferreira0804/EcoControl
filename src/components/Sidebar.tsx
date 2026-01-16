import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ArrowLeftRight,
    PieChart as ChartIcon,
    Settings,
    Wallet
} from 'lucide-react';

export const Sidebar: React.FC = () => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Panel' },
        { to: '/transactions', icon: ArrowLeftRight, label: 'Transacciones' },
        { to: '/reports', icon: ChartIcon, label: 'Reportes' },
    ];

    return (
        <aside className="w-64 h-screen py-8 px-4 flex flex-col glass fixed left-0 top-0 border-r border-slate-800 z-50">
            <div className="flex items-center gap-3 px-2 mb-10 text-white">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <Wallet size={24} />
                </div>
                <span className="text-xl font-black tracking-tight">EcoControl</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
              ${isActive
                                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                                : 'text-slate-500 hover:bg-slate-800 hover:text-slate-100'}
            `}
                    >
                        <item.icon size={20} />
                        <span className="font-semibold">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="pt-6 border-t border-slate-800 space-y-2">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
              ${isActive
                            ? 'bg-secondary text-white shadow-md shadow-secondary/20 h-auto'
                            : 'text-slate-500 hover:bg-slate-800 hover:text-slate-100'}
            `}
                >
                    <Settings size={20} />
                    <span className="font-semibold">Configuración</span>
                </NavLink>
            </div>
        </aside>
    );
};
