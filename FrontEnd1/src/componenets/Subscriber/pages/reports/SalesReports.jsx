import React, { useState, useEffect } from "react";
import { CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { BarChart } from "@mui/x-charts/BarChart";
import { Container, Typography, Paper, Grow } from "@mui/material";
import { motion } from "framer-motion";
import { OptionComponent, SelectComponent } from "@/componenets/ui/Select";
import Input from "@/componenets/ui/Input";
import Button from "@/componenets/ui/Button";

const SalesReports = () => {
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-01-31",
  });
  const [reportType, setReportType] = useState("daily");
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadSalesData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data based on report type
      const mockData = {
        daily: [
          { date: "2024-01-01", sales: 2540, orders: 12 },
          { date: "2024-01-02", sales: 1870, orders: 8 },
          { date: "2024-01-03", sales: 3210, orders: 15 },
          { date: "2024-01-04", sales: 2890, orders: 13 },
          { date: "2024-01-05", sales: 2150, orders: 10 },
        ],
        weekly: [
          { week: "Week 1", sales: 12540, orders: 58 },
          { week: "Week 2", sales: 11870, orders: 52 },
          { week: "Week 3", sales: 13210, orders: 61 },
          { week: "Week 4", sales: 12890, orders: 59 },
        ],
        monthly: [
          { month: "January", sales: 50510, orders: 230 },
          { month: "February", sales: 48760, orders: 215 },
          { month: "March", sales: 52340, orders: 245 },
        ],
      };

      setSalesData(mockData[reportType]);
      setIsLoading(false);
    };

    loadSalesData();
  }, [reportType, dateRange]);

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalSales / totalOrders;

  // 1. Define the data structure
  const chartData = [
    { month: "Jan", totalSales: 15000 },
    { month: "Feb", totalSales: 22000 },
    { month: "Mar", totalSales: 18000 },
    { month: "Apr", totalSales: 27000 },
    { month: "May", totalSales: 35000 },
    { month: "Jun", totalSales: 29000 },
  ];

  // 2. A formatter function for the value axis/tooltip
  const salesValueFormatter = (value) => {
    // Simple function to format the value as currency (e.g., $15k)
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return isLoading ? <div className="flex items-center justify-center h-screen w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"/>
          </div>:
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sales Reports</h1>
        <p className="text-muted">Analyze your sales performance</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1">
            Report Type
          </label>
          <SelectComponent
            value={reportType}
            className="bg-white"
            onChange={(e) => setReportType(e.target.value)}
          >
            <OptionComponent value="daily">Daily</OptionComponent>
            <OptionComponent value="weekly">Weekly</OptionComponent>
            <OptionComponent value="monthly">Monthly</OptionComponent>
          </SelectComponent>
        </div>
        <Input label="start Date"  type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            } className="bg-white"/>

     <Input label="End Date" type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            } className="bg-white"/>
          
      

        <div className="flex items-end">
          <Button>Generate Report</Button>
        </div>
      </div>
   
           {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-white to-primary/10 rounded-md shadow-sm flex items-center p-5 gap-4">
          <ChartBarIcon className="size-8 text-primary" />
          <div className="details">
            <p className="font-medium text-muted">Total Salses</p>
            <p className="text-2xl font-bold"> ${totalSales.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-white to-secondary/10 rounded-md shadow-sm flex items-center p-5 gap-4">
          <CalendarIcon className="size-8 text-secondary" />
          <div className="details">
            <p className="font-medium text-muted">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-white to-purple-600/10 rounded-md shadow-sm flex items-center p-5 gap-4">
        <span className="text-purple-600 font-bold text-sm size-10 bg-purple-500/10 rounded-full flex items-center justify-center">AVG</span>
          <div className="details">
            <p className="font-medium text-muted">Average Order Value</p>
            <p className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
{/* Sales Chart */}
      <div className="bg-white  rounded-md shadow-sm p-2">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Sales Overview
        </h3>
          <div className="h-fit bg-red-400   shadow-neutral-50  rounded-lg flex justify-start">
            <div className="bg-green-400  w-[100%]   ">
              <Paper elevation={0}>
                <Typography variant="h6">
                  Quarterly Sales Performance
                </Typography>
                <BarChart
                  borderRadius={16}
                  onAnimationStart={Grow}
                  dataset={chartData} // The array of data objects
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "month", // Key from the dataset to use for the categories
                      label: "Month",
                    },
                  ]}
                  // Y-Axis Configuration (Numerical)
                  yAxis={[
                    {
                      label: "Sales (USD)",
                      valueFormatter: salesValueFormatter, // Apply the formatter to Y-axis labels
                    },
                  ]}
                  // Series Configuration (The actual bars)
                  series={[
                    {
                      dataKey: "totalSales", // Key from the dataset for the bar height
                      label: "Total Sales",
                      valueFormatter: salesValueFormatter, // Apply the formatter to tooltips
                      color: "#1976D2", // Customize bar color (MUI Primary color)
                    },
                  ]}
                  // Chart dimensions
                  width={550}
                  height={300}
                  sx={{
                    "& .MuiBarElement-root": {
                      transformOrigin: "bottom",
                      borderRadius: 16,
                      animation: "growBars 1.5s ease-out forwards",
                    },
                    "@keyframes growBars": {
                      from: { transform: "scaleY(0)" },
                      to: { transform: "scaleY(1)" },
                    },
                  }}
                />
              </Paper>
            </div>
          </div>
      </div>
          
          
     
      

      {/* Sales Data Table */}
      <div>
        
          <h3 className="text-xl md:text-2xl font-semibold mb-3">
            Detailed Sales Data
          </h3>
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-secondary text-secondary-foreground tracking-wider">
              <tr>
                <th className="px-6 py-3 ">
                  {reportType === "daily"
                    ? "Date"
                    : reportType === "weekly"
                    ? "Week"
                    : "Month"}
                </th>
                <th className="px-6 py-3">
                  Sales Amount
                </th>
                <th className="px-6 py-3">
                  Number of Orders
                </th>
                <th className="px-6 py-3">
                  Average Order Value
                </th>
              </tr>
            </thead>
            <tbody className="">
              {salesData.map((item, index) => (
                <tr key={index} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.date || item.week || item.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${item.sales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${(item.sales / item.orders).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end gap-4 mb-5">
        <Button outline>Export to CSV</Button>
        <Button>Print Report</Button>
      </div>
    </div>
};

export default SalesReports;
