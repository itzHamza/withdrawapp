import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Transaction } from '../types';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialGraphProps {
  transactions: Transaction[];
}

export const FinancialGraph: React.FC<FinancialGraphProps> = ({ transactions }) => {
  const { isDarkMode } = useTheme();

  const processTransactions = () => {
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const dates = new Set(sortedTransactions.map(t => t.date));
    const uniqueDates = Array.from(dates).sort();

    let runningBalance = 0;
    const balanceData = uniqueDates.map(date => {
      const dayTransactions = sortedTransactions.filter(t => t.date === date);
      const dayBalance = dayTransactions.reduce((acc, t) => 
        acc + (t.type === 'income' ? t.amount : -t.amount), 0
      );
      runningBalance += dayBalance;
      return runningBalance;
    });

    return {
      labels: uniqueDates.map(date => new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
      })),
      balanceData
    };
  };

  const { labels, balanceData } = processTransactions();

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Balance Over Time',
        data: balanceData,
        borderColor: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Balance: ${context.formattedValue} DZD`,
        },
        backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value} DZD`,
          color: isDarkMode ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.2)',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.2)',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Balance Trend</h3>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};