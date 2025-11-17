import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Building, ChartBarIcon, CheckCircleIcon, CreditCard, UserIcon, UsersIcon } from "lucide-react";

  export const metricCards = [
    {
      title: "Total Subscribers",
      value: 100,
      change: 12,
      icon: UsersIcon,
      color: "green",
      description: "All time subscribers"
    },
    {
      title: "Active Subscribers",
      value: 12,
      change: 8,
      icon: CheckCircleIcon,
      color: "green",
      description: "Currently active"
    },
    {
      title: "Monthly Revenue",
      value: 2289796,
      change: 15,
      icon: CurrencyDollarIcon,
      color: "green",
      description: "This month"
    },
    {
      title: "Total Revenue",
      value: 1232323,
      change: 23,
      icon: ChartBarIcon,
      color: "green",
      description: "All time"
    }
  ];

  export const recentSubscriptions = [ 
      { id: 1, business: "Tech Store Nepal", plan: "Pro", amount: 79.00, status: "active", date: "2024-01-15" },
        { id: 2, business: "Fashion Boutique", plan: "Basic", amount: 29.00, status: "active", date: "2024-01-15" },
        { id: 3, business: "Electronics Hub", plan: "Enterprise", amount: 199.00, status: "active", date: "2024-01-14" },
        { id: 4, business: "Book World", plan: "Pro", amount: 79.00, status: "trial", date: "2024-01-14" },
        { id: 5, business: "Sports Gear", plan: "Basic", amount: 29.00, status: "cancelled", date: "2024-01-13" }
      ];

  export  const quickActions = [
  {
    title: "Manage Subscriptions",
    subtitle: "View all subscribers",
    icon: UserIcon,
    color: "blue",
    link: "/admin/subscriptions",
  },
  {
    title: "Billing",
    subtitle: "Revenue reports",
    icon: CurrencyDollarIcon,
    color: "green",
    link: "/admin/billing",
  },
  {
    title: "Plan Management",
    subtitle: "Edit pricing plans",
    icon: CreditCard,
    color: "purple",
    link: "/admin/plans",
  },
  {
    title: "Customer Support",
    subtitle: "Help & support",
    icon: Building,
    color: "orange",
    link: "/admin/support",
  },
];
