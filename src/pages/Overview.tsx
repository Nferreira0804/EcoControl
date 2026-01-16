import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TransactionChart, CategoryChart } from '../components/Charts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const Overview: React.FC = () => {
    const { transactions, profile } = useFinance();

    const totals = transactions.reduce((acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
    }, { income: 0, expense: 0 });

    const balance = totals.income - totals.expense;
    const symbol = profile.currency === 'USD' ? '$' : profile.currency === 'EUR' ? '€' : '£';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">¡Hola, {profile.name}!</h1>
                <p className="text-slate-500 font-medium">Esto es lo que está pasando con tu dinero hoy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden group border-b-4 border-b-primary shadow-2xl shadow-primary/5">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <Wallet size={120} />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Balance Total</p>
                    <h2 className="text-4xl font-black">{symbol}{balance.toLocaleString()}</h2>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border-l-4 border-l-primary/30">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <TrendingUp size={16} className="text-primary" /> Ingresos Totales
                    </p>
                    <h2 className="text-4xl font-black text-primary">{symbol}{totals.income.toLocaleString()}</h2>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border-l-4 border-l-accent/30">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <TrendingDown size={16} className="text-accent" /> Gastos Totales
                    </p>
                    <h2 className="text-4xl font-black text-accent">{symbol}{totals.expense.toLocaleString()}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 glass p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-bold mb-8">Análisis de Flujo</h3>
                    <TransactionChart transactions={transactions} />
                </div>
                <div className="lg:col-span-4 glass p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-bold mb-8">Gastos por Categoría</h3>
                    <CategoryChart transactions={transactions} />
                </div>
            </div>
        </div>
    );
};
