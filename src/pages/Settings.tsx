import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { User, Globe, Trash2, Download, Upload, Check } from 'lucide-react';

export const Settings: React.FC = () => {
    const { profile, updateProfile, clearData, transactions } = useFinance();
    const [name, setName] = useState(profile.name);
    const [showSaved, setShowSaved] = useState(false);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ name });
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const exportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ transactions, profile }));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "finance_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-3xl font-black mb-2">Configuración</h1>
                <p className="text-slate-500">Personaliza tu experiencia y gestiona tus datos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Perfil */}
                <section className="glass p-8 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <User size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Perfil de Usuario</h3>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Nombre Visible</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
                                placeholder="Tu Nombre"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                            {showSaved ? <><Check size={20} /> ¡Guardado!</> : 'Guardar Cambios'}
                        </button>
                    </form>
                </section>

                {/* Preferencias */}
                <section className="glass p-8 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Preferencias</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Moneda</label>
                            <div className="grid grid-cols-3 gap-3">
                                {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                                    <button
                                        key={curr}
                                        onClick={() => updateProfile({ currency: curr })}
                                        className={`py-3 rounded-2xl font-bold transition-all ${profile.currency === curr
                                                ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                                                : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£'} {curr}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Management */}
                <section className="lg:col-span-2 glass p-8 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-accent/10 text-accent rounded-2xl">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Datos y Privacidad</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={exportData}
                            className="p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                            <Download className="text-slate-400 group-hover:text-primary transition-colors" />
                            <div className="text-center">
                                <p className="font-bold">Exportar Datos</p>
                                <p className="text-xs text-slate-500 mt-1">Descargar respaldo JSON</p>
                            </div>
                        </button>

                        <button className="p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-secondary hover:bg-secondary/5 transition-all group cursor-not-allowed opacity-60">
                            <Upload className="text-slate-400 group-hover:text-secondary transition-colors" />
                            <div className="text-center">
                                <p className="font-bold">Importar Datos</p>
                                <p className="text-xs text-slate-500 mt-1">Próximamente...</p>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                if (confirm('¿Estás seguro? Esto borrará todas las transacciones para siempre.')) clearData();
                            }}
                            className="p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 hover:border-accent hover:bg-accent/5 transition-all group"
                        >
                            <Trash2 className="text-slate-400 group-hover:text-accent transition-colors" />
                            <div className="text-center">
                                <p className="font-bold text-accent">Borrar Todo</p>
                                <p className="text-xs text-slate-500 mt-1">Acción permanente</p>
                            </div>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};
