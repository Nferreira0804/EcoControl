import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CategoryChart } from '../components/Charts';
import { PieChart as ChartIcon, FileText, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const Reports: React.FC = () => {
    const { transactions, profile } = useFinance();

    const exportToPDF = () => {
        const doc = new jsPDF();
        const symbol = profile.currency === 'USD' ? '$' : profile.currency === 'EUR' ? '€' : '£';

        // Add Title
        doc.setFontSize(20);
        doc.text('Reporte Financiero - Vault.ai', 14, 22);

        doc.setFontSize(10);
        doc.text(`Usuario: ${profile.name}`, 14, 30);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 35);

        // Totals
        const totals = transactions.reduce((acc, t) => {
            if (t.type === 'income') acc.income += t.amount;
            else acc.expense += t.amount;
            return acc;
        }, { income: 0, expense: 0 });

        doc.text(`Ingresos Totales: ${symbol}${totals.income.toLocaleString()}`, 14, 45);
        doc.text(`Gastos Totales: ${symbol}${totals.expense.toLocaleString()}`, 14, 50);
        doc.text(`Balance: ${symbol}${(totals.income - totals.expense).toLocaleString()}`, 14, 55);

        // Table
        const tableData = transactions.map(t => [
            new Date(t.date).toLocaleDateString(),
            t.description || t.category,
            t.category,
            t.type === 'income' ? `+${symbol}${t.amount}` : `-${symbol}${t.amount}`
        ]);

        autoTable(doc, {
            startY: 65,
            head: [['Fecha', 'Descripción', 'Categoría', 'Monto']],
            body: tableData,
            headStyles: { fillColor: [99, 102, 241] }, // Indigo color
        });

        doc.save(`reporte_${profile.name}_${new Date().getTime()}.pdf`);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black mb-2">Reportes Financieros</h1>
                    <p className="text-slate-500">Análisis profundo de tus hábitos de gasto.</p>
                </div>
                <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                    <Download size={20} /> Exportar PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
                        <ChartIcon size={40} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black">Resumen Mensual</h3>
                        <p className="text-slate-500 mt-2">Visualiza cómo se distribuye tu dinero en las diferentes áreas de tu vida.</p>
                    </div>
                    <div className="w-full max-w-sm">
                        <CategoryChart transactions={transactions} />
                    </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-3xl bg-accent/10 text-accent flex items-center justify-center">
                        <FileText size={40} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black">Desglose de Gastos</h3>
                        <p className="text-slate-500 mt-2">Lista detallada de todas las categorías de gasto en este periodo.</p>
                    </div>
                    <div className="w-full space-y-4">
                        {/* Placeholder for detailed table or more stats */}
                        {['Vivienda', 'Comida', 'Transporte'].map(cat => (
                            <div key={cat} className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl">
                                <span className="font-bold">{cat}</span>
                                <span className="text-slate-500 font-bold">$0.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
