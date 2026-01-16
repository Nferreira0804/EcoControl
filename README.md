# 💰 Vault.ai - Gestión Financiera Inteligente

Esta es una aplicación web front moderna diseñada para ayudarte a tomar el control total de tus finanzas personales.

---

## ✨ Características Principales

- **Panel de Control (Overview)**: Visualiza tu balance total, ingresos y gastos acumulados de un vistazo.
- **Gráficos Interactivos**: Análisis visual de tu flujo de caja y distribución de gastos por categoría utilizando Recharts.
- **Gestión de Transacciones**: Registra, filtra y elimina transacciones de forma sencilla y rápida.
- **Reportes Detallados**: Genera un desglose profundo de tus hábitos financieros.
- **Exportación a PDF**: Descarga reportes profesionales de tus movimientos con un solo clic.
- **Persistencia Local**: Tus datos se guardan de forma segura en tu navegador mediante LocalStorage.
- **Diseño Premium**: Interfaz oscura refinada con animaciones suaves y componentes "glassmorphism".

---

## 🚀 Tecnologías Utilizadas

- **React 18**: Biblioteca principal para la interfaz de usuario.
- **TypeScript**: Tipado estático para un desarrollo más robusto y seguro.
- **Vite**: Herramienta de construcción ultra rápida para el desarrollo frontend.
- **Tailwind CSS**: Framework de CSS para un diseño moderno y altamente personalizable.
- **Recharts**: Biblioteca de gráficos para la visualización de datos.
- **Lucide React**: Set de iconos elegantes y consistentes.
- **jsPDF & jsPDF-AutoTable**: Herramientas para la generación dinámica de reportes en PDF.
- **date-fns**: Manipulación y formateo de fechas de manera sencilla.

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio** (o descargar los archivos):
   ```bash
   git clone <url-del-repositorio>
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   Visita `http://localhost:5173` para empezar a usar la aplicación.

---

## 📁 Estructura del Proyecto

- `src/components`: Componentes reutilizables como gráficos, layout y tutorial.
- `src/context`: Contexto global (`FinanceContext`) para la gestión del estado financiero.
- `src/hooks`: Hooks personalizados como `useLocalStorage`.
- `src/pages`: Vistas principales de la aplicación (Overview, Transactions, Reports, Settings).
- `src/types`: Definiciones de tipos de TypeScript para mantener la consistencia de los datos.

---

