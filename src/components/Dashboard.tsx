import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TransactionChart, CategoryChart } from './Charts';
import { TransactionForm, TransactionList } from './Transactions';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { transactions } = useFinance();

    const totals = transactions.reduce((acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
    }, { income: 0, expense: 0 });

    const balance = totals.income - totals.expense;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Finances</h1>
                    <p className="text-slate-500 font-medium">Welcome back, track your progress today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20">
                        <Plus size={20} /> Nueva Transacción
                    </button>
                    <button className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all">
                        <Wallet size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Stats & Charts */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-3xl group hover:border-primary/50 transition-all cursor-default overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Wallet size={80} />
                            </div>
                            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
                            <h2 className="text-3xl font-black">${balance.toLocaleString()}</h2>
                        </div>
                        <div className="glass p-6 rounded-3xl group hover:border-primary/50 transition-all cursor-default">
                            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                <TrendingUp size={14} className="text-primary" /> Income
                            </p>
                            <h2 className="text-3xl font-black text-primary">${totals.income.toLocaleString()}</h2>
                        </div>
                        <div className="glass p-6 rounded-3xl group hover:border-accent/50 transition-all cursor-default">
                            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                <TrendingDown size={14} className="text-accent" /> Expenses
                            </p>
                            <h2 className="text-3xl font-black text-accent">${totals.expense.toLocaleString()}</h2>
                        </div>
                    </div>

                    {/* Main Chart */}
                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-xl font-bold mb-8">Performance Overview</h3>
                        <TransactionChart transactions={transactions} />
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass p-8 rounded-3xl">
                            <h3 className="text-xl font-bold mb-8">Spending by Category</h3>
                            <CategoryChart transactions={transactions} />
                        </div>
                        <div className="glass p-8 rounded-3xl flex flex-col justify-center items-center text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                                <TrendingUp size={40} />
                            </div>
                            <h4 className="text-lg font-bold">Financial Health</h4>
                            <p className="text-sm text-slate-400 max-w-[200px]">
                                You've saved 24% more than last month. Keep it up!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Add & List */}
                <div className="lg:col-span-4 space-y-8">
                    <TransactionForm />
                    <div>
                        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                        <TransactionList />
                    </div>
                </div>
            </div>
        </div>
    );
};
