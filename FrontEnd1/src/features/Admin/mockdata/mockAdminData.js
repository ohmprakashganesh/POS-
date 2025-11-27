import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Building, ChartBarIcon, CheckCircleIcon, CreditCard, UserIcon, UsersIcon } from "lucide-react";
import statement from "@/assets/statement.png"
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
  { id: '2', userId: 'user_B045_prod', category: 'Inventory', status: 'Progress', requestDate: new Date(Date.now() - 1000 * 60 * 60 * 5),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '3', userId: 'user_C102_test', category: 'Balances & Ledgers', status: 'Resolved', requestDate: new Date(Date.now() - 1000 * 60 * 15), servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24)},
  { id: '4', userId: 'user_A001_dev', category: 'Profile Update', status: 'New', requestDate: new Date(Date.now() - 1000 * 60 * 3),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24)},
  { id: '5', userId: 'user_F990_stg', category: 'Customers/Suppliers', status: 'New', requestDate: new Date(Date.now() - 1000 * 60 * 55),servedDate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];

  // 👥 Existing Subscribers Data
export const existingUsers=[
    { id: 1, name: "John Doe", email: "john@example.com", active: true, plan: 'pro', start: "2022.12.5", expiry: '2026.04.22' },
    { id: 2, name: "Alice Smith", email: "alice@example.com", active: false, plan: 'basic', start: "2022.12.5", expiry: '2026.04.22' },
    { id: 3, name: "Robert Lee", email: "robert@example.com", active: true, plan: 'enterprise', start: "2022.12.5", expiry: '2026.04.22' },
  ];

    export const newUsers = [
  {
    "id": 1,
    "name": "James Carter",
    "email": "james.carter@example.com",
    "plan": "Premium",
    "bill": statement,
    "dateCreated": "2025-01-12"
  },
  {
    "id": 2,
    "name": "Sophia Martinez",
    "email": "sophia.martinez@example.com",
    "plan": "Basic",
    "bill": statement,
    "dateCreated": "2025-02-01"
  },
  {
    "id": 3,
    "name": "Daniel Kim",
    "email": "daniel.kim@example.com",
    "plan": "Standard",
    "bill":statement,
    "dateCreated": "2025-01-28"
  },
  {
    "id": 4,
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "plan": "Premium",
    "bill":statement,
    "dateCreated": "2025-02-10"
  },
  {
    "id": 5,
    "name": "Emma Wilson",
    "email": "emma.wilson@example.com",
    "plan": "Free",
    "bill":statement,
    "dateCreated": "2025-02-15"
  }
]
