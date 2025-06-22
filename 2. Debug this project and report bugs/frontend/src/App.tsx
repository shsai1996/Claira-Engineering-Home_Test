import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import TransactionTable from './components/TransactionTable';
import Dashboard from './components/Dashboard';
import Copilot from './components/Copilot';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { apiService } from './services/api';
import { Transaction, DashboardSummary } from './types';

const AppContent: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'transactions' | 'copilot' | 'profile'>('upload');
  const [loading, setLoading] = useState(false);
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [transactionsData, summaryData] = await Promise.all([
        apiService.getTransactions(),
        apiService.getDashboardSummary()
      ]);
      
      setTransactions(transactionsData);
      setDashboardSummary(summaryData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    loadData();
    setActiveTab('dashboard');
  };

  const handleTransactionUpdate = () => {
    loadData();
  };

  const handleLogout = () => {
    logout();
    setTransactions([]);
    setDashboardSummary(null);
  };

  const tabs = [
    { id: 'upload', label: '📁 Upload', component: <FileUpload onUploadSuccess={handleUploadSuccess} /> },
    { id: 'dashboard', label: '📊 Dashboard', component: <Dashboard summary={dashboardSummary} /> },
    { id: 'transactions', label: '💳 Transactions', component: <TransactionTable transactions={transactions} onTransactionUpdate={handleTransactionUpdate} /> },
    { id: 'copilot', label: '🤖 Copilot', component: <Copilot /> },
    { id: 'profile', label: '👤 Profile', component: <UserProfile /> }
  ];

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Finance Copilot</h1>
              <p className="text-gray-600 dark:text-gray-400">Analyze your expenses with AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-4">
              {dashboardSummary && (
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">${dashboardSummary.total_expenses.toFixed(2)}</p>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user.username}!</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : (
          <div>
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Personal Finance Copilot - Built with React + TypeScript & FastAPI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 