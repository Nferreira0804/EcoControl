import React from 'react';
import { Sidebar } from './Sidebar';
import { Tutorial } from './Tutorial';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Tutorial />
            <Sidebar />
            <main className="flex-1 ml-64 p-8 transition-all duration-300">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
