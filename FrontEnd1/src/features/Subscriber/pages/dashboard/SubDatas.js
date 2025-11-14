// metricCards.js
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const getMetricCards = (t, metrics) => [
  {
    title: t("dashboard.metrics.todaysSales"),
    value: metrics.todaySales,
    change: 12,
    icon: ShoppingCartIcon,
    color: "blue",
    description: t("dashboard.metrics.salesToday"),
  },
  {
    title: t("dashboard.metrics.monthlyRevenue"),
    value: metrics.monthlySales,
    change: 8,
    icon: CurrencyDollarIcon,
    color: "green",
    description: t("dashboard.metrics.thisMonth"),
  },
  {
    title: t("dashboard.metrics.netProfit"),
    value: metrics.profit,
    change: 15,
    icon: ChartBarIcon,
    color: "emerald",
    description: t("dashboard.metrics.afterExpenses"),
  },
  {
    title: t("dashboard.metrics.totalCustomers"),
    value: metrics.totalCustomers,
    change: 5,
    icon: UsersIcon,
    color: "purple",
    description: t("dashboard.metrics.registeredCustomers"),
  },
];
