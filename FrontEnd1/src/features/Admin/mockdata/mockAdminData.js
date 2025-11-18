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
    link: "/subscriberList",
  },
  {
    title: "Report",
    subtitle: "Revenue reports",
    icon: CurrencyDollarIcon,
    color: "green",
    link: "/report",
  },
  {
    title: "Plan Management",
    subtitle: "Edit pricing plans",
    icon: CreditCard,
    color: "purple",
    link: "/subscriptionPlans",
  },
  {
    title: "Customer Support",
    subtitle: "Help & support",
    icon: Building,
    color: "orange",
    link: "/support",
  },
];

 export const supportRequests = [
  { id: '1', userId: 'user_A001_dev', category: 'Staff Management', status: 'New', requestDate: new Date(Date.now() - 1000 * 60 * 60 * 24),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '2', userId: 'user_B045_prod', category: 'Inventory', status: 'In Progress', requestDate: new Date(Date.now() - 1000 * 60 * 60 * 5),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '3', userId: 'user_C102_test', category: 'Balances & Ledgers', status: 'Resolved', requestDate: new Date(Date.now() - 1000 * 60 * 15), servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24)},
  { id: '4', userId: 'user_A001_dev', category: 'Profile Update', status: 'New', requestDate: new Date(Date.now() - 1000 * 60 * 3),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24)},
  { id: '5', userId: 'user_F990_stg', category: 'Customers/Suppliers', status: 'New', requestDate: new Date(Date.now() - 1000 * 60 * 55),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];