import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (amount: number, type: TransactionType, description: string, date: string) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, amount: number, type: TransactionType, description: string, date: string) => void;
  balance: number;
  totalIncome: number;
  totalExpense: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  paginatedTransactions: Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (amount: number, type: TransactionType, description: string, date: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount,
      type,
      description,
      date,
      createdAt: Date.now(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const editTransaction = (id: string, amount: number, type: TransactionType, description: string, date: string) => {
    setTransactions(
      transactions.map(transaction =>
        transaction.id === id
          ? { ...transaction, amount, type, description, date }
          : transaction
      )
    );
  };

  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income'
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        balance,
        totalIncome,
        totalExpense,
        currentPage,
        totalPages,
        setCurrentPage,
        paginatedTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};