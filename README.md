# 💰 Smart Financial Management

A modern, high-performance **Frontend Web Application** designed to help you take total control of your personal finances with elegance and precision.

[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Core Features

- **📊 Intelligent Dashboard:** Get an instant overview of your total balance, income, and accumulated expenses at a single glance.
- **📈 Interactive Analytics:** Deep visual analysis of your cash flow and expense distribution by category using **Recharts**.
- **💸 Transaction Management:** Record, filter, and manage your financial movements with speed and ease.
- **📝 Detailed Reporting:** Generate a comprehensive breakdown of your spending habits and financial health.
- **📄 PDF Export:** Download professional financial reports of your activity with a single click using **jsPDF**.
- **🔒 Local Persistence:** Your data stays with you. Secured in your browser via **LocalStorage** for maximum privacy and offline accessibility.
- **🎨 Premium UI:** A refined dark interface featuring smooth animations and **glassmorphism** design patterns.

---

## 🚀 Technical Stack

- **Framework:** React 18 (Component-based architecture).
- **Core Language:** TypeScript for robust, type-safe development.
- **Build Tool:** Vite (Ultra-fast development server).
- **Styling:** Tailwind CSS for a responsive and highly customizable UI.
- **Data Viz:** Recharts for dynamic and interactive charts.
- **Iconography:** Lucide React for consistent and elegant icons.
- **Internal Logic:** date-fns for specialized date manipulation.
- **Exports:** jsPDF & jsPDF-AutoTable for dynamic report generation.

---

## 🛠️ Getting Started & Installation

Follow these steps to run Vault.ai locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vault-ai.git
cd vault-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:5173](http://localhost:5173) to start managing your finances.

---

## 📂 Project Architecture

```bash
/src
  ├── components   # Reusable UI components (Charts, Layout, Tutorial)
  ├── context      # Global state management via FinanceContext
  ├── hooks        # Custom hooks (useLocalStorage, useFinance)
  ├── pages        # Main application views (Overview, Transactions, Reports, Settings)
  └── types        # TypeScript definitions for data consistency
```

---

## 📄 License

This project is open-source and available under the **MIT License**.

Built with ✨ for **Financial Empowerment**.

