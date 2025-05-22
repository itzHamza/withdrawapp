import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatCurrency';
import { FinancialGraph } from './FinancialGraph';

export const Dashboard: React.FC = () => {
  const { balance, totalIncome, totalExpense, transactions } = useTransactions();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Current Balance</h3>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-500 dark:text-red-400'}`}>
            {formatCurrency(balance)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Total Income</h3>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <ArrowUpCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Total Expense</h3>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
              <ArrowDownCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      <FinancialGraph transactions={transactions} />
    </section>
  );
};