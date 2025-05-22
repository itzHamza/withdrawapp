import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { TransactionType } from '../types';

export const TransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<TransactionType>('income');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !description || !date) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    addTransaction(numericAmount, type, description, date);

    setAmount('');
    setDescription('');
    setType('income');
    setDate(new Date().toISOString().split('T')[0]);
    setIsFormVisible(false);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>{isFormVisible ? 'Cancel' : 'New Transaction'}</span>
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="income"
                      checked={type === 'income'}
                      onChange={() => setType('income')}
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <span className="ml-2 text-gray-700">Income</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="expense"
                      checked={type === 'expense'}
                      onChange={() => setType('expense')}
                      className="form-radio h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Expense</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this transaction for?"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg font-medium transition duration-300 ${
                  type === 'income'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};