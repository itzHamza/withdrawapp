import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';

function App() {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <Layout>
          <Dashboard />
          <TransactionForm />
          <TransactionList />
        </Layout>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;