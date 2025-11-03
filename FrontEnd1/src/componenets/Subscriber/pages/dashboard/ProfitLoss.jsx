import React, { useState, useEffect } from 'react';
// FIX: Replaced the occasionally missing TrendingUpIcon and TrendingDownIcon 
// with the more reliably exported ArrowUpIcon and ArrowDownIcon to resolve 
// the compilation error.
import { CurrencyDollarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const formatCurrency = (amount) => {
  return `$${amount.toLocaleString()}`;
};

const ProfitLoss = () => {
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch P&L data based on dateRange
    const loadReportData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for January 2024
      const mockData = {
        revenue: 50510,
        cogs: 30250, // Cost of Goods Sold (60% of revenue)
        grossProfit: 50510 - 30250, // 20260
        expenses: 12340,
        netProfit: (50510 - 30250) - 12340, // 7920
        expensesBreakdown: [
          { category: 'Rent', amount: 5000 },
          { category: 'Salaries', amount: 4000 },
          { category: 'Utilities', amount: 1200 },
          { category: 'Marketing', amount: 1500 },
          { category: 'Other', amount: 640 }
        ],
        topProducts: [
          { name: 'Laptop', revenue: 15000, cost: 10500, profit: 4500 },
          { name: 'Monitor', revenue: 12000, cost: 8400, profit: 3600 },
          { name: 'Headphones', revenue: 8500, cost: 5100, profit: 3400 }
        ]
      };

      setReportData(mockData);
      setIsLoading(false);
    };

    loadReportData();
  }, [dateRange]);

  if (isLoading || !reportData) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading Report Data...</p>
        </div>
      </div>
    );
  }

  const grossMargin = (reportData.grossProfit / reportData.revenue) * 100;
  const netMargin = (reportData.netProfit / reportData.revenue) * 100;

  // Function to determine text color based on profit status
  const getProfitColor = (amount) => (amount >= 0 ? 'text-green-600' : 'text-red-600');

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Profit & Loss Statement</h1>
          <p className="text-lg text-gray-500">Analysis for the period: {dateRange.start} to {dateRange.end}</p>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter Period</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => { /* Load new report with current dates */ }}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-center transition duration-300 transform hover:scale-[1.02]">
            <div className="p-3 bg-green-100 rounded-full">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.revenue)}</p>
            </div>
          </div>

          {/* Gross Profit Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                {/* Updated Icon */}
                <ArrowUpIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gross Profit</p>
                <p className={`text-2xl font-bold ${getProfitColor(reportData.grossProfit)}`}>{formatCurrency(reportData.grossProfit)}</p>
                <p className="text-xs text-gray-500">{grossMargin.toFixed(1)}% Gross Margin</p>
              </div>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                {/* Updated Icon */}
                <ArrowDownIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(reportData.expenses)}</p>
              </div>
            </div>
          </div>

          {/* Net Profit Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${getProfitColor(reportData.netProfit)}`}>{formatCurrency(reportData.netProfit)}</p>
                <p className="text-xs text-gray-500">{netMargin.toFixed(1)}% Net Margin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed P&L Statement and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          
          {/* P&L Statement (4/7 columns) */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Income Statement Summary</h3>
            <div className="space-y-2">
                
                {/* Revenue */}
                <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-medium text-gray-800">Total Revenue</span>
                    <span className="text-lg font-extrabold text-green-700">{formatCurrency(reportData.revenue)}</span>
                </div>
                
                {/* COGS */}
                <div className="flex justify-between items-center py-2 border-t border-gray-100 pt-4">
                    <span className="text-md text-gray-600">Less: Cost of Goods Sold (COGS)</span>
                    <span className="font-semibold text-red-600">({formatCurrency(reportData.cogs)})</span>
                </div>
                
                {/* Gross Profit */}
                <div className="flex justify-between items-center py-3 border-y border-gray-300 font-bold mt-4">
                    <span className="text-xl text-gray-900">Gross Profit</span>
                    <span className={`text-xl ${getProfitColor(reportData.grossProfit)}`}>{formatCurrency(reportData.grossProfit)}</span>
                </div>

                {/* Expenses */}
                <div className="mt-6 pt-4">
                    <h4 className="font-bold text-gray-800 mb-2">Operating Expenses:</h4>
                    {reportData.expensesBreakdown.map((expense, index) => (
                        <div key={index} className="flex justify-between items-center py-1 text-sm border-b border-gray-50 last:border-b-0">
                            <span className="text-gray-600 ml-4">{expense.category}</span>
                            <span className="text-red-500">({formatCurrency(expense.amount)})</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center py-2 font-medium text-md border-t border-gray-200 mt-2">
                        <span className="text-gray-700">Total Expenses</span>
                        <span className="text-red-700">({formatCurrency(reportData.expenses)})</span>
                    </div>
                </div>

                {/* Net Profit */}
                <div className="flex justify-between items-center py-4 border-t-4 border-b-4 border-blue-500 font-extrabold mt-6">
                    <span className="text-2xl text-gray-900">NET PROFIT</span>
                    <span className={`text-2xl ${getProfitColor(reportData.netProfit)}`}>{formatCurrency(reportData.netProfit)}</span>
                </div>

            </div>
          </div>

          {/* Top Products by Profit (3/7 columns) */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Top Products by Profit</h3>
            <div className="space-y-4">
              {reportData.topProducts.map((product, index) => (
                <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-150">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-lg text-gray-900">{index + 1}. {product.name}</h4>
                    <div className="text-right">
                      <div className="font-bold text-lg text-green-700">{formatCurrency(product.profit)}</div>
                      <div className="text-xs text-gray-500">
                        {((product.profit / product.revenue) * 100).toFixed(1)}% Margin
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Revenue: {formatCurrency(product.revenue)}</span>
                    <span>Cost: {formatCurrency(product.cost)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placeholder for future Chart Integration */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expense Distribution Visualization</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <span className="text-blue-700 text-3xl font-bold">π</span>
            </div>
            <p className="mt-3 text-gray-600 font-medium">Visualization Placeholder</p>
            <p className="text-sm text-gray-400">Integrate a chart library (like Recharts or Chart.js) here to visualize expense breakdown.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
