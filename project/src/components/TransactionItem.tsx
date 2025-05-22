import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { Transaction, TransactionType } from '../types';
import { formatCurrency, formatDate } from '../utils/formatCurrency';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { deleteTransaction, editTransaction } = useTransactions();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(transaction.amount.toString());
  const [editedDescription, setEditedDescription] = useState(transaction.description);
  const [editedType, setEditedType] = useState<TransactionType>(transaction.type);
  const [editedDate, setEditedDate] = useState(transaction.date);

  const handleSave = () => {
    const numericAmount = parseFloat(editedAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    editTransaction(
      transaction.id,
      numericAmount,
      editedType,
      editedDescription,
      editedDate
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAmount(transaction.amount.toString());
    setEditedDescription(transaction.description);
    setEditedType(transaction.type);
    setEditedDate(transaction.date);
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {isEditing ? (
        // Editing mode
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <select
              value={editedType}
              onChange={(e) => setEditedType(e.target.value as TransactionType)}
              className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              step="0.01"
              min="0.01"
              className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-900 mr-3"
              title="Save"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-900"
              title="Cancel"
            >
              <X className="h-5 w-5" />
            </button>
          </td>
        </>
      ) : (
        // Display mode
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
          </td>
          <td className="px-6 py-4">
            <div className="text-sm text-gray-900">{transaction.description}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                transaction.type === 'income'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {transaction.type === 'income' ? 'Income' : 'Expense'}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div
              className={`text-sm font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 hover:text-indigo-900 mr-3"
              title="Edit"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="text-red-600 hover:text-red-900"
              title="Delete"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};