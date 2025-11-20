import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const monthlyRevenue = [1200, 1900, 1500, 2200, 2600, 3000, 2800, 3500, 3300, 4000, 4200, 4500];
const yearlyRevenue = [12000, 150565600, 17500, 2209900, 26800,409089540,4985934,304093,3009899];

const TimelineRevenueChart = ({mode}) => {
  const labels = mode === "monthly"
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    : ["2020", "2021", "2022", "2023", "2024"];

  const data = {
    labels,
    datasets: [
      {
        label: mode === "monthly" ? "Monthly Revenue" : "Yearly Revenue",
        data: mode === "monthly" ? monthlyRevenue : yearlyRevenue,
        fill: false,
        borderColor: " hsl(210, 65%, 58%)", // Blue
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: " hsl(210, 65%, 58%)",
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-background dark:bg-back text-muted-hover rounded-xl shadow-lg">


      {/* Line Chart */}
      <Line data={data} />
    </div>
  );
};

export default TimelineRevenueChart;
