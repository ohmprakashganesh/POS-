import React, { useState, useEffect } from 'react';
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const SalesReports = () => {
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });
  const [reportType, setReportType] = useState('daily');
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadSalesData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on report type
      const mockData = {
        daily: [
          { date: '2024-01-01', sales: 2540, orders: 12 },
          { date: '2024-01-02', sales: 1870, orders: 8 },
          { date: '2024-01-03', sales: 3210, orders: 15 },
          { date: '2024-01-04', sales: 2890, orders: 13 },
          { date: '2024-01-05', sales: 2150, orders: 10 },
        ],
        weekly: [
          { week: 'Week 1', sales: 12540, orders: 58 },
          { week: 'Week 2', sales: 11870, orders: 52 },
          { week: 'Week 3', sales: 13210, orders: 61 },
          { week: 'Week 4', sales: 12890, orders: 59 },
        ],
        monthly: [
          { month: 'January', sales: 50510, orders: 230 },
          { month: 'February', sales: 48760, orders: 215 },
          { month: 'March', sales: 52340, orders: 245 },
        ]
      };

      setSalesData(mockData[reportType]);
      setIsLoading(false);
    };

    loadSalesData();
  }, [reportType, dateRange]);

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalSales / totalOrders;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Reports</h1>
        <p className="text-gray-600">Analyze your sales performance</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">AVG</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">${averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Sales chart visualization</p>
              <p className="text-sm text-gray-400">(Chart.js integration would go here)</p>
            </div>
          </div>
        )}
      </div>

      {/* Sales Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Sales Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {reportType === 'daily' ? 'Date' : reportType === 'weekly' ? 'Week' : 'Month'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Order Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.date || item.week || item.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.sales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(item.sales / item.orders).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Export to CSV
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Print Report
        </button>
      </div>
    </div>
  );
};

export default SalesReports;