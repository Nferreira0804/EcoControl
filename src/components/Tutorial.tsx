import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinance } from '../context/FinanceContext';
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const STEPS = [
    {
        title: '¡Bienvenido a Vault.ai!',
        description: 'Tu nuevo centro de control financiero. Vamos a darte un tour rápido para que saques el máximo provecho.',
        icon: '🚀'
    },
    {
        title: 'Panel Principal',
        description: 'Aquí verás un resumen gráfico de tus ingresos y gastos. Los gráficos son interactivos, ¡pruébalos!',
        icon: '📊'
    },
    {
        title: 'Gestiona Transacciones',
        description: 'Añade tus entradas y salidas de dinero fácilmente. Tus datos se guardan de forma segura en tu navegador.',
        icon: '💸'
    },
    {
        title: 'Personalización',
        description: 'Cambia tu nombre, moneda y el tema visual desde la sección de Configuración.',
        icon: '⚙️'
    }
];

export const Tutorial: React.FC = () => {
    const { profile, updateProfile } = useFinance();
    const [currentStep, setCurrentStep] = useState(0);

    if (profile.hasCompletedTutorial) return null;

    const next = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            updateProfile({ hasCompletedTutorial: true });
        }
    };

    const skip = () => updateProfile({ hasCompletedTutorial: true });

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="glass max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        />
                    </div>

                    <button
                        onClick={skip}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="text-center space-y-6">
                        <div className="text-6xl">{STEPS[currentStep].icon}</div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black">{STEPS[currentStep].title}</h2>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {STEPS[currentStep].description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <button
                                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                className={`flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
                            >
                                <ChevronLeft size={16} /> Anterior
                            </button>

                            <button
                                onClick={next}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                {currentStep === STEPS.length - 1 ? (
                                    <>¡Empezar! <CheckCircle2 size={18} /></>
                                ) : (
                                    <>Siguiente <ChevronRight size={18} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
