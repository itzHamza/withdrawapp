import React from 'react';
import { Wallet } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { balance } = useTransactions();
  
  return (
    <header className="bg-gradient-to-r from-blue-800 to-indigo-900 dark:from-gray-900 dark:to-gray-800 text-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <Wallet className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">Finance Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm sm:text-base">
              <span className="font-medium">Current Date:</span>{' '}
              {new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};