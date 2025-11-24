import React, { useState, useEffect } from "react";
import { CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";
import Input from "@/features/ui/Input";
import Button from "@/features/ui/Button";
import { useTranslation } from "react-i18next";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const SalesReports = () => {
  const { t } = useTranslation();
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
          { date: "Day 1", sales: 2540, orders: 12 },
          { date: "Day 2", sales: 1870, orders: 8 },
          { date: "Day 3", sales: 3210, orders: 15 },
          { date: "Day 4", sales: 2890, orders: 13 },
          { date: "Day 5", sales: 2150, orders: 10 },
          { date: "Day 6", sales: 3400, orders: 16 },
        ],
        weekly: [
          { week: "week 1", sales: 12540, orders: 58 },
          { week: "week 2", sales: 11870, orders: 52 },
          { week: "week 3", sales: 13210, orders: 61 },
          { week: "Week 4", sales: 12890, orders: 59 },
          { week: "week 5", sales: 13500, orders: 65 },
          { week: "week 6", sales: 14230, orders: 70 },
        ],
        monthly: [
          { month: "Jan", sales: 50510, orders: 230 },
          { month: "Feb", sales: 48760, orders: 215 },
          { month: "Mar", sales: 52340, orders: 245 },
          { month: "Apr", sales: 54000, orders: 255 },
          { month: "May", sales: 56020, orders: 270 },
          { month: "June", sales: 57500, orders: 280 },
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

  // 2. A formatter function for the value axis/tooltip
  const salesValueFormatter = (value) => {
    // Simple function to format the value as currency (e.g., $15k)
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return isLoading ? (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  ) : (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("report.title")}</h1>
        <p className="text-muted">{t("report.description")}</p>
      </div>
      {/* Filters */}
      <div className="grid items-end grid-cols-1 md:grid-cols-4 gap-4">
        <SelectComponent
          label={t("report.type")}
          value={reportType}
          className=" bg-white dark:bg-dark"
          onChange={(e) => setReportType(e.target.value)}
        >
          <OptionComponent value="daily">{t("report.daily")}</OptionComponent>
          <OptionComponent value="weekly">{t("report.weekly")}</OptionComponent>
          <OptionComponent value="monthly">
            {t("report.monthly")}
          </OptionComponent>
        </SelectComponent>
        <Input
          label={t("report.startDate")}
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
          className=" bg-white dark:bg-dark"
        />

        <Input
          label={t("report.endDate")}
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
          className=" bg-white dark:bg-dark"
        />

        <div className="flex items-end">
          <Button>{t("report.generateReport")}</Button>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark rounded-md shadow-sm flex items-center p-5 gap-4">
          <ChartBarIcon className="size-8 text-primary" />
          <div className="details">
            <p className="font-medium ">{t("report.totalSales")}</p>
            <p className="text-2xl font-bold"> ${totalSales.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark rounded-md shadow-sm flex items-center p-5 gap-4">
          <CalendarIcon className="size-8 text-secondary" />
          <div className="details">
            <p className="font-medium">{t("report.totalOrders")}</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-purple-600 font-bold text-sm size-10 bg-purple-500/10 rounded-full flex items-center justify-center">
            {t("report.avg")}
          </span>
          <div className="details">
            <p className="font-medium ">{t("report.averageOrderValue")}</p>
            <p className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
      {/* Sales Chart */}
      {salesData.length <= 2 ? (
        <div className="no-date w-full h-72 flex flex-col items-center justify-center">
          <ChartBarIcon className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Not enough data to display chart
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Add more data to see trends
          </p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          <SalesChart reportType={reportType} salesData={salesData} />
          <OrderChart reportType={reportType} salesData={salesData} />
        </div>
      )}

      {salesData.length > 0 && (
        <>
          {/* Sales Data Table */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              {t("report.detailedSales")}
            </h3>
            <div className="overflow-x-auto  rounded-md shadow-sm">
              <table className="table">
                <thead >
                  <tr className="table-head-row">
                    <th className="table-th">
                      {reportType === "daily"
                        ? t("report.date")
                        : reportType === "weekly"
                        ? t("report.week")
                        : t("report.month")}
                    </th>
                    <th className="table-th">{t("report.salesAmount")}</th>
                    <th className="table-th">{t("report.numberOfOrders")}</th>
                    <th className="table-th">{t("report.averageOrderValue")}</th>
                  </tr>
                </thead >
                <tbody className="table-body">
                  {salesData.map((item, index) => (
                    <tr key={index} className="table-body-row">
                      <td className="table-td ">
                        {item.date || item.week || item.month}
                      </td>
                      <td className="table-td ">
                        {item.sales.toLocaleString()}
                      </td>
                      <td className="table-td ">
                        {item.orders}
                      </td>
                      <td className="table-td ">
                        {(item.sales / item.orders).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Options */}
          <div className="flex justify-end gap-4 mb-5">
            <Button outline>{t("report.exportToCSV")}</Button>
            <Button outline>{t("report.printReport")}</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesReports;

function SalesChart({ salesData, reportType }) {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">Sales Overview</h3>

      <div className="w-full max-w-150 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            {/* <CartesianGrid strokeDasharray="3" className="stroke-muted" /> */}
            <XAxis
              dataKey={
                reportType === "daily"
                  ? "date"
                  : reportType === "weekly"
                  ? "week"
                  : "month"
              }
              tick={{ fill: "currentColor" }}
            />
            <YAxis tick={{ fill: "currentColor" }} />
            <Tooltip
              cursor={{ fill: "rgba(25, 118, 210, 0.2)" }}
              contentStyle={{
                backgroundColor: "var(--color-background)",
                borderRadius: "8px",
                border: "none",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              itemStyle={{ color: "var(--color-foreground)" }}
            />
            <Bar
              dataKey="sales"
              radius={[5, 5, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function OrderChart({ salesData, reportType }) {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">
        Orders Overview
      </h3>
      <div className="w-full max-w-xl h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            {/* <CartesianGrid strokeDasharray="3 3" className="stroke-muted" /> */}

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-background)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              itemStyle={{ color: "var(--color-foreground)" }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />

            <XAxis
              dataKey={
                reportType === "daily"
                  ? "date"
                  : reportType === "weekly"
                  ? "week"
                  : "month"
              }
              tick={{ fill: "currentColor" }}
            />

            <YAxis tick={{ fill: "currentColor" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
