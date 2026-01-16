import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import type { TransactionType, Category } from '../types';
import { Plus, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const CATEGORIES: Category[] = [
    'Vivienda', 'Comida', 'Transporte', 'Entretenimiento',
    'Servicios', 'Salud', 'Salario', 'Inversión', 'Otros'
];

export const TransactionForm: React.FC = () => {
    const { addTransaction } = useFinance();
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>('expense');
    const [category, setCategory] = useState<Category>('Comida');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || isNaN(Number(amount))) return;

        addTransaction({
            amount: Number(amount),
            type,
            category,
            description,
            date: new Date().toISOString()
        });

        setAmount('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-6 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold mb-4">Nueva Transacción</h3>

            <div className="flex gap-2">
                {(['expense', 'income'] as TransactionType[]).map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${type === t
                            ? (t === 'income' ? 'bg-primary text-white' : 'bg-accent text-white')
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                    >
                        {t === 'income' ? 'Ingreso' : 'Gasto'}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider px-1">Monto</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
                        placeholder="0.00"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider px-1">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer font-semibold"
                    >
                        {CATEGORIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider px-1">Descripción</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
                        placeholder="¿En qué lo gastaste?"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20} /> Añadir Entrada
                </button>
            </div>
        </form>
    );
};

export const TransactionList: React.FC = () => {
    const { transactions, deleteTransaction, profile } = useFinance();
    const symbol = profile.currency === 'USD' ? '$' : profile.currency === 'EUR' ? '€' : '£';

    return (
        <div className="space-y-3">
            {transactions.map((t) => (
                <div key={t.id} className="glass p-4 rounded-2xl flex items-center justify-between group animate-in slide-in-from-right duration-300">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                            {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                        </div>
                        <div>
                            <p className="font-bold">{t.description || t.category}</p>
                            <p className="text-xs text-slate-400">{format(parseISO(t.date), 'MMM dd, yyyy')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <p className={`font-bold ${t.type === 'income' ? 'text-primary' : 'text-accent'}`}>
                            {t.type === 'income' ? '+' : '-'}{symbol}{t.amount.toLocaleString()}
                        </p>
                        <button
                            onClick={() => deleteTransaction(t.id)}
                            className="text-slate-300 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
            {transactions.length === 0 && (
                <div className="text-center py-10 text-slate-400 italic">No hay transacciones aún...</div>
            )}
        </div>
    );
};
