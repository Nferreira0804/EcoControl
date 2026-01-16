import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { TransactionsPage } from './pages/TransactionsPage';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import './index.css';

function App() {
  return (
    <Router>
      <FinanceProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </FinanceProvider>
    </Router>
  );
}

export default App;
