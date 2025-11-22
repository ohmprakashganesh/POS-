import React, { useState, useMemo } from 'react';

import { STATIC_SUBSCRIPTION_DATA } from '@/data/mockData';
import { it } from 'zod/v4/locales';
import { OptionComponent, SelectComponent } from '@/features/ui/Select';
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

  const filteredData = useMemo(() => {

    let dataToFilter = STATIC_SUBSCRIPTION_DATA;

    if (statusFilter !== 'All') {
      dataToFilter = dataToFilter.filter(item => item.status === statusFilter);
    }
    
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
            totalSubscribers: avgTotal, 
            activeSubscribers: avgActive, 
            revenue: totalRevenue, 
            churned: totalChurned,
            status: 'N/A',
            plan: 'N/A'
        }];
    }
    
    return dataToFilter;
  }, [timeRange, statusFilter]);
  
  // 2. Summary Calculation
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
  
  const generateReport = () => {
    setIsGenerating(true);
    // Simulate a brief loading period
    setTimeout(() => {
      setIsGenerating(false);
      //  add the real time data here
    }, 500);
  };



  const renderSummaryCards = (summary) => {
     const cards = [
    {
      title: "Total Subscribers (Latest)",
      value: summary.totalSubscribers.toLocaleString(),
      note: `As of ${filteredData[filteredData.length - 1]?.month || "N/A"}`,
      className: "bg-primary-foreground text-muted-hover",
      border: "border border-muted/40",
    },
    {
      title: "Active Subscribers (Latest)",
      value: summary.activeSubscribers.toLocaleString(),
      note: `${(
        (summary.activeSubscribers / summary.totalSubscribers) *
        100
      ).toFixed(1)}% Active Rate`,
      className: "bg-white",
      border: "border-l-4 border-green-500",
    },
    {
      title: `Total Revenue (${timeRange})`,
      value: `$${summary.totalRevenue.toLocaleString()}`,
      note: "Aggregated over the period",
      border: "border-l-4 border-yellow-500",
    },
    {
      title: `Churn Rate (${timeRange})`,
      value: `${summary.churnRate}%`,
      note: "Total churned subscribers",
    },
  ];
  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card,ind)=>(
      <div className="bg-white text-dark dark:text-white dark:bg-dark p-6 rounded-xl shadow-md">
        <p className="text-xl font-medium   ">{card.title}</p>
        <p className="text-2xl font-bold  mt-1">{card.value}</p>
        <span className="text-muted-hover text-xs mt-2  block">As of {card.note}</span>
      </div>
 
      ))}

        </div>
  )
  };

  const renderReportTable = (data) =>{
    const tableHeaders = [
  "Period",
  "Total Subscribers",
  "Active Subscribers",
  "Revenue",
  "Status Sample",
  "Plan Sample",
];
return (
    <div className="mt-4 rounded-xl shadow-md overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4 bg-background text-dark dark:text-white">Subscription Breakdown</h3>
     <table className="min-w-full bg-white dark:bg-dark">
        <thead className=' '>
          <tr className="bg-secondary ">
            {tableHeaders.map((head, i) => (
              <th
                key={i}
                className="px-2 py-3  text-left text-xs font-medium text-primary-foreground uppercase tracking-wider"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" text-muted-hover divide-muted/40">
          {data.map((row) => (
            <tr key={row.id || row.month} className="hover:bg-background">
              <td className="p-2 whitespace-nowrap text-sm ">{row.month}</td>
              <td className="p-2 whitespace-nowrap text-sm ">{row.totalSubscribers.toLocaleString()}</td>
              <td className="p-2 whitespace-nowrap text-sm ">{row.activeSubscribers.toLocaleString()}</td>
              <td className="p-2 whitespace-nowrap text-sm  ">${row.revenue.toLocaleString()}</td>
              <td className="p-2 whitespace-nowrap text-sm ">{row.status}</td>
              <td className="p-2 whitespace-nowrap text-sm ">{row.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

  return (
    <div className="rounded-md  min-h-screen">
      <h1 className="text-2xl font-bold text-dark dark:text-white">Subscription Analytics Report</h1>

      {/* 1. Filters & Controls Section */}
      <div className=" p-2 rounded-xl  mb-2">
        <h2 className="text-xl  mb-4 text-muted-hover font-semibold">Report Criteria</h2>
        <div className="flex md:gap-10 sm:justify-start  md:justify-start lg:justify-start lg:gap-10 justify-between bg-background  gap-10 items-end">

    
<div className=''>
  <label
    htmlFor="timeRange"
    className="block text-sm font-medium text-muted"
  >
    Time Range
  </label>

  <SelectComponent
    id="timeRange"
    value={timeRange}
    onChange={(e) => setTimeRange(e.target.value)}
    className="mt-1 w-[150px] md:w-[200px] bg-white dark:bg-dark border border-muted/40 text-muted rounded-md"
  >
    {TIME_RANGES.map((range) => (
      <OptionComponent key={range} value={range}>
        {range}
      </OptionComponent>
    ))}
  </SelectComponent>
</div>

{/* Status Filter */}
<div>
  <label
    htmlFor="statusFilter"
    className="block text-sm font-medium text-muted"
  >
    Subscription Status
  </label>

  <SelectComponent
    id="statusFilter"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="mt-1 w-[150px] md:w-[200px] bg-white dark:bg-dark border border-muted/40 text-muted rounded-md"
  >
    {SUBSCRIPTION_STATUSES.map((status) => (
      <OptionComponent key={status} value={status}>
        {status}
      </OptionComponent>
    ))}
  </SelectComponent>
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
    onClick={() => {
      if (!filteredData || filteredData.length === 0) {
        alert("No data available to export");
        return;
      }

      // Get headers dynamically from the first object
      const headers = Object.keys(filteredData[0]);

      // Map rows to CSV lines
      const rows = filteredData.map(row =>
        headers.map(header => JSON.stringify(row[header] ?? "")).join(",")
      );

      // Join headers + rows
      const csvContent = [headers.join(","), ...rows].join("\n");

      // Create a downloadable blob
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `Subscription_Report_${timeRange}_${statusFilter}.csv`;
      link.click();

      URL.revokeObjectURL(url); // cleanup
    }}
    className=" bg-primary text-white py-2 px-4 rounded-md text-sm font-medium shadow-md transition duration-150"
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