export type TransactionType = 'income' | 'expense';

export type Category = 'Vivienda' | 'Comida' | 'Transporte' | 'Entretenimiento' | 'Servicios' | 'Salud' | 'Salario' | 'Inversión' | 'Otros';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: Category;
    description: string;
    date: string;
}

export interface UserProfile {
    name: string;
    currency: 'USD' | 'EUR' | 'GBP';
    hasCompletedTutorial: boolean;
}

export type FinanceState = {
    transactions: Transaction[];
    profile: UserProfile;
};
