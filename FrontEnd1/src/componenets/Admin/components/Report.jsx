import React, { useState, useMemo } from 'react';

import { STATIC_SUBSCRIPTION_DATA } from '@/data/mockData';
// ----------------------------------------------------------------------
// STATIC MOCK DATA
// ----------------------------------------------------------------------


const SUBSCRIPTION_STATUSES = ['All', 'Active', 'Pending', 'DeActive'];
const TIME_RANGES = ['Monthly', 'Yearly']; // Simplified for static data

// ----------------------------------------------------------------------
// COMPONENT START
// ----------------------------------------------------------------------

const Report = () => {
  const [timeRange, setTimeRange] = useState('Monthly');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. Filtering Logic using useMemo
  const filteredData = useMemo(() => {
    // For this static example, 'Yearly' will just aggregate 'Monthly' data.
    // In a real app, 'Yearly' would fetch different data.
    let dataToFilter = STATIC_SUBSCRIPTION_DATA;

    // Filter by Status
    if (statusFilter !== 'All') {
      dataToFilter = dataToFilter.filter(item => item.status === statusFilter);
    }
    
    // For Yearly, we aggregate the filtered data
    if (timeRange === 'Yearly') {
        const totalRevenue = dataToFilter.reduce((acc, item) => acc + item.revenue, 0);
        const totalSubscribers = dataToFilter.reduce((acc, item) => acc + item.totalSubscribers, 0);
        const totalActive = dataToFilter.reduce((acc, item) => acc + item.activeSubscribers, 0);
        const totalChurned = dataToFilter.reduce((acc, item) => acc + item.churned, 0);

        // Calculate averages for yearly view
        const avgTotal = Math.round(totalSubscribers / dataToFilter.length);
        const avgActive = Math.round(totalActive / dataToFilter.length);
        
        return [{
            month: 'Full Year 2024',
            totalSubscribers: avgTotal, // Showing average monthly total
            activeSubscribers: avgActive, // Showing average monthly active
            revenue: totalRevenue, // Showing total yearly revenue
            churned: totalChurned,
            status: 'N/A',
            plan: 'N/A'
        }];
    }
    
    // For Monthly, just return the filtered data
    return dataToFilter;
  }, [timeRange, statusFilter]);
  
  // 2. Summary Calculation
  // Calculate summary metrics based on the filtered data set
  const summaryMetrics = useMemo(() => {
    if (filteredData.length === 0) return null;
    
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalSubscribers = filteredData[filteredData.length - 1]?.totalSubscribers || 0; // Latest total
    const activeSubscribers = filteredData[filteredData.length - 1]?.activeSubscribers || 0; // Latest active
    const churnRate = (filteredData.reduce((sum, item) => sum + item.churned, 0) / totalSubscribers) * 100;
    
    return {
      totalRevenue,
      totalSubscribers,
      activeSubscribers,
      churnRate: isFinite(churnRate) ? churnRate.toFixed(2) : '0.00',
    };
  }, [filteredData]);
  
  // Function to simulate report generation (mainly for the loading state)
  const generateReport = () => {
    setIsGenerating(true);
    // Simulate a brief loading period
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this is where you'd trigger data fetching and set the state.
    }, 500);
  };


  // ----------------------------------------------------------------------
  // RENDER HELPERS
  // ----------------------------------------------------------------------

  const renderSummaryCards = (summary) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Subscribers Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
        <p className="text-sm font-medium text-gray-500">Total Subscribers (Latest)</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{summary.totalSubscribers.toLocaleString()}</p>
        <span className="text-gray-500 text-xs mt-2 block">As of {filteredData[filteredData.length - 1]?.month || 'N/A'}</span>
      </div>
      
      {/* Active Subscribers Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
        <p className="text-sm font-medium text-gray-500">Active Subscribers (Latest)</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{summary.activeSubscribers.toLocaleString()}</p>
        <span className="text-green-600 text-xs mt-2 block">{(summary.activeSubscribers / summary.totalSubscribers * 100).toFixed(1)}% Active Rate</span>
      </div>
      
      {/* Total Revenue Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
        <p className="text-sm font-medium text-gray-500">Total Revenue ({timeRange})</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">${summary.totalRevenue.toLocaleString()}</p>
        <span className="text-gray-500 text-xs mt-2 block">Aggregated over the period</span>
      </div>

       {/* Churn Rate Card */}
       <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
        <p className="text-sm font-medium text-gray-500">Churn Rate ({timeRange})</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{summary.churnRate}%</p>
        <span className="text-red-500 text-xs mt-2 block">Total churned subscribers</span>
      </div>
    </div>
  );

  const renderReportTable = (data) => (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Subscription Breakdown</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Subscribers</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Subscribers</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Sample</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Sample</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id || row.month} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{row.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.totalSubscribers.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{row.activeSubscribers.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">${row.revenue.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ----------------------------------------------------------------------
  // MAIN RENDER
  // ----------------------------------------------------------------------

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Subscription Analytics Report</h1>

      {/* 1. Filters & Controls Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">


        <h2 className="text-xl font-semibold mb-4 text-gray-800">Report Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

          {/* Time Range Filter (Monthly/Yearly) */}
          <div>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700">Reporting Period</label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {TIME_RANGES.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Subscription Status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {SUBSCRIPTION_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
     
        </div>
      </div>

      

      {!isGenerating && summaryMetrics && (
        <>
          {/* Key Metrics / Summary Cards */}
          {renderSummaryCards(summaryMetrics)}

          {/* Detailed Table */}
          {filteredData.length > 0 ? (
            renderReportTable(filteredData)
          ) : (
            <div className="text-center py-10 mt-8 text-xl text-red-500 bg-white rounded-xl shadow-lg">
              No data found for the selected filters (Status: {statusFilter}).
            </div>
          )}

          {/* Optional: Export Button */}
          <div className="mt-6 text-right">
             <button
               onClick={() => alert(`Exporting ${timeRange} data with Status=${statusFilter}`)}
               className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-md transition duration-150"
             >
               Export to CSV
             </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;