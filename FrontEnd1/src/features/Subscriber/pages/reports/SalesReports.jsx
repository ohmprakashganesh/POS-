import React, { useState, useEffect, useRef } from "react";
import { CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";
import Input from "@/features/ui/Input";
import PrintTable from "./PrintTable";
import PrintButton from "./PrintButton";
import Button from "@/features/ui/Button";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { ArrowLeftIcon, RotateCcw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// 🌟 Single Source of Daily Data 🌟
const fullSalesData = [
  { date: "2024-01-01", sales: 2540, orders: 12 },
  { date: "2024-01-02", sales: 1870, orders: 8 },
  { date: "2024-01-03", sales: 3210, orders: 15 },
  { date: "2024-01-04", sales: 2890, orders: 13 },
  { date: "2024-01-05", sales: 2150, orders: 10 },
  { date: "2024-01-06", sales: 3400, orders: 16 },
  { date: "2024-01-07", sales: 3100, orders: 14 },
  { date: "2024-01-08", sales: 2750, orders: 11 },
  { date: "2024-01-09", sales: 2980, orders: 13 },
  { date: "2024-01-10", sales: 3500, orders: 17 },
  { date: "2024-01-11", sales: 2400, orders: 10 },
  { date: "2024-01-12", sales: 3800, orders: 18 },
  { date: "2024-01-13", sales: 2250, orders: 9 },
  { date: "2024-01-14", sales: 3050, orders: 14 },
  { date: "2024-01-15", sales: 3300, orders: 15 },
  { date: "2024-01-16", sales: 2600, orders: 12 },
  { date: "2024-01-17", sales: 3750, orders: 18 },
  { date: "2024-01-18", sales: 2050, orders: 9 },
  { date: "2024-01-19", sales: 3900, orders: 19 },
  { date: "2024-01-20", sales: 2800, orders: 13 },
  { date: "2024-01-21", sales: 3150, orders: 14 },
  { date: "2024-01-22", sales: 2450, orders: 11 },
  { date: "2024-01-23", sales: 3550, orders: 16 },
  { date: "2024-01-24", sales: 2950, orders: 13 },
  { date: "2024-01-25", sales: 3250, orders: 15 },
  { date: "2024-01-26", sales: 2700, orders: 12 },
  { date: "2024-01-27", sales: 4000, orders: 20 },
  { date: "2024-01-28", sales: 2350, orders: 10 },
  { date: "2024-01-29", sales: 3650, orders: 17 },
  { date: "2024-01-30", sales: 2500, orders: 11 },
  { date: "2024-01-31", sales: 3450, orders: 16 },
];

// Helper to format date into "YYYY-MM-DD" string
const formatDate = (date) => date.toISOString().split('T')[0];

const SalesReports = () => {
  const printRef=useRef();
  const location= useLocation();
  const from= location.state?.from;
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState({
    start: formatDate(new Date(fullSalesData[0].date)),
    end: formatDate(new Date(fullSalesData[fullSalesData.length - 1].date)),
  });
  const [reportType, setReportType] = useState("daily");
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [confirmedDateRange, setConfirmedDateRange] = useState(dateRange);

  const getWeeklyData = (data) => {
    const weeks = {};
    data.forEach((item, index) => {
      const weekIndex = Math.floor(index / 7);
      const weekKey = `Week ${weekIndex + 1}`;
      if (!weeks[weekKey]) {
        weeks[weekKey] = { week: weekKey, sales: 0, orders: 0 };
      }
      weeks[weekKey].sales += item.sales;
      weeks[weekKey].orders += item.orders;
    });
    return Object.values(weeks);
  };

  const getMonthlyData = (data) => {
    const months = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    data.forEach((item) => {
      const monthIndex = new Date(item.date).getMonth();
      const monthKey = monthNames[monthIndex];
      if (!months[monthKey]) {
        months[monthKey] = { month: monthKey, sales: 0, orders: 0 };
      }
      months[monthKey].sales += item.sales;
      months[monthKey].orders += item.orders;
    });
    return Object.values(months);
  };

  useEffect(() => {
    const loadSalesData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 1. Apply Date Filter (only relevant for daily reports, but limits the source data)
      let filteredData = fullSalesData;

      if (confirmedDateRange.start && confirmedDateRange.end) {
        filteredData = fullSalesData.filter((item) => {
          const itemDate = new Date(item.date);
          const startDate = new Date(confirmedDateRange.start);
          const endDate = new Date(confirmedDateRange.end);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999); 
          
          return itemDate >= startDate && itemDate <= endDate;
        });
      }


      let dataToSet;
      if (reportType === "daily") {
        dataToSet = filteredData;
      } else if (reportType === "weekly") {
        dataToSet = getWeeklyData(filteredData);
      } else if (reportType === "monthly") {
        dataToSet = getMonthlyData(filteredData);
      }

      setSalesData(dataToSet);
      setIsLoading(false);
    };

    loadSalesData();
  }, [reportType, confirmedDateRange]);

  const handleFilter = () => {
    setConfirmedDateRange(dateRange);
  };

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return isLoading ? (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  ) : (
    <div className="space-y-6">
   
       
      <div className="flex gap-10 ">
            {from && (
           <Link
          to={from}
          className="bg-primary/10 w-fit h-fit hover:bg-primary/30 rounded-full"
        >
          <ArrowLeftIcon className="size-10 p-2" strokeWidth={2.5} />
        </Link>
      )}
        <div>
         <h1 className="text-2xl font-bold">{t("report.title")}</h1>
        <p className="text-muted">{t("report.description")}</p>
        </div>
       
      </div>
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
          reset={
            <RotateCcw
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                setDateRange((prev) => ({ ...prev, start: "" }));
              }}
            />
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
          reset={
            <RotateCcw
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                setDateRange((prev) => ({ ...prev, end: "" }));
              }}
            />
          }
          className=" bg-white dark:bg-dark"
        />

        <div className="flex items-end">
             <Button onClick={handleFilter}>
       {t("report.applyFilter")}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark rounded-md shadow-sm flex items-center p-5 gap-4">
          <ChartBarIcon className="size-8 text-primary" />
          <div className="details">
            <p className="font-medium ">{t("report.totalSales")}</p>
            <p className="text-2xl font-bold"> {totalSales.toLocaleString()}</p>
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
            <p className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {salesData.length <= 2 ? (
        <div className="no-date w-full h-72 flex flex-col items-center justify-center">
          <ChartBarIcon className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-500 dark: text-gray-400 text-lg font-medium">
           {t("report.noData")} 
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
          {t("report.addData")} 
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
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              {t("report.detailedSales")}
            </h3>
            <div className="overflow-x-auto  rounded-md shadow-sm">
              <table className="table">
                <thead>
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
                </thead>
                <tbody className="table-body">
                  {salesData.map((item, index) => (
                    <tr key={index} className="table-body-row">
                      <td className="table-td">
                        {item.date || item.week || item.month}
                      </td>
                      <td className="table-td">
                        {item.sales.toLocaleString()}
                      </td>
                      <td className="table-td">{item.orders}</td>
                      <td className="table-td">
                        {item.orders > 0
                          ? (item.sales / item.orders).toFixed(2)
                          : "0.00"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-4 mb-5">
             <div>
    <PrintButton printRef={printRef} t={t} />
    <div className="hidden">
    <PrintTable  salesData={salesData} reportType={reportType} t={t} ref={printRef} />

    </div>
  </div>
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