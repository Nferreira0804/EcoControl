import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Transaction, FinanceState, UserProfile } from '../types/index';

interface FinanceContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    clearData: () => void;
    profile: UserProfile;
    updateProfile: (profile: Partial<UserProfile>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useLocalStorage<FinanceState>('finance_app_data', {
        transactions: [],
        profile: { name: 'Usuario', currency: 'USD', hasCompletedTutorial: false }
    });

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID()
        };
        setState(prev => ({
            ...prev,
            transactions: [newTransaction, ...prev.transactions]
        }));
    };

    const deleteTransaction = (id: string) => {
        setState(prev => ({
            ...prev,
            transactions: prev.transactions.filter(t => t.id !== id)
        }));
    };

    const clearData = () => {
        setState(prev => ({
            ...prev,
            transactions: []
        }));
    };

    const updateProfile = (updates: Partial<UserProfile>) => {
        setState(prev => ({
            ...prev,
            profile: { ...(prev.profile || { name: 'Usuario', currency: 'USD', hasCompletedTutorial: false }), ...updates }
        }));
    };

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add('dark');
    }, []);

    const value = useMemo(() => ({
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
        clearData,
        profile: state.profile || { name: 'Usuario', currency: 'USD', hasCompletedTutorial: false },
        updateProfile
    }), [state]);

    return (
        <FinanceContext.Provider value={value}>
            <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300">
                {children}
            </div>
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) throw new Error('useFinance must be used within FinanceProvider');
    return context;
};
