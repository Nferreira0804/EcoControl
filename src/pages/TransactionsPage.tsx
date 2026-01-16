import React from 'react';
import { TransactionForm, TransactionList } from '../components/Transactions';

export const TransactionsPage: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black mb-2">Gestionar Transacciones</h1>
                <p className="text-slate-500">Añade, elimina y filtra tus registros financieros.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                    <TransactionForm />
                </div>
                <div className="lg:col-span-8">
                    <div className="glass p-8 rounded-[2.5rem] min-h-[600px]">
                        <h3 className="text-xl font-bold mb-6">Actividad Reciente</h3>
                        <TransactionList />
                    </div>
                </div>
            </div>
        </div>
    );
};
