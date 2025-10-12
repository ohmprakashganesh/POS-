import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  BuildingStorefrontIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
    trialUsers: 0,
    churnRate: 0,
    newSubscribersThisMonth: 0
  });
  const [recentSubscriptions, setRecentSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for SaaS owner
      setMetrics({
        totalSubscribers: 245,
        activeSubscribers: 198,
        monthlyRevenue: 15670.00,
        totalRevenue: 187450.00,
        trialUsers: 23,
        churnRate: 2.3,
        newSubscribersThisMonth: 34
      });

      setRecentSubscriptions([
        { id: 1, business: "Tech Store Nepal", plan: "Pro", amount: 79.00, status: "active", date: "2024-01-15" },
        { id: 2, business: "Fashion Boutique", plan: "Basic", amount: 29.00, status: "active", date: "2024-01-15" },
        { id: 3, business: "Electronics Hub", plan: "Enterprise", amount: 199.00, status: "active", date: "2024-01-14" },
        { id: 4, business: "Book World", plan: "Pro", amount: 79.00, status: "trial", date: "2024-01-14" },
        { id: 5, business: "Sports Gear", plan: "Basic", amount: 29.00, status: "cancelled", date: "2024-01-13" }
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const metricCards = [
    {
      title: "Total Subscribers",
      value: metrics.totalSubscribers,
      change: 12,
      icon: UsersIcon,
      color: "blue",
      description: "All time subscribers"
    },
    {
      title: "Active Subscribers",
      value: metrics.activeSubscribers,
      change: 8,
      icon: CheckCircleIcon,
      color: "green",
      description: "Currently active"
    },
    {
      title: "Monthly Revenue",
      value: metrics.monthlyRevenue,
      change: 15,
      icon: CurrencyDollarIcon,
      color: "emerald",
      description: "This month"
    },
    {
      title: "Total Revenue",
      value: metrics.totalRevenue,
      change: 23,
      icon: ChartBarIcon,
      color: "purple",
      description: "All time"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'trial': return 'text-blue-600 bg-blue-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SaaS Analytics Dashboard</h1>
          <p className="text-gray-600">Overview of your POS platform performance</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {card.title.includes('Revenue') ? `$${card.value.toLocaleString()}` : card.value.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                <div className={`flex items-center mt-1 text-sm ${
                  card.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  {Math.abs(card.change)}% from last period
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${card.color}-100`}>
                <card.icon className={`h-6 w-6 text-${card.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trial Users</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.trialUsers}</p>
            </div>
            <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.churnRate}%</p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.newSubscribersThisMonth}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Subscriptions & Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Subscriptions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Subscriptions</h3>
            <Link to="/admin/subscriptions" className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentSubscriptions.map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCardIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{subscription.business}</p>
                      <p className="text-xs text-gray-500">{subscription.plan} Plan</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${subscription.amount}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Revenue analytics chart</p>
              <p className="text-sm text-gray-400">Monthly recurring revenue trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/admin/subscriptions"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <UsersIcon className="h-8 w-8 text-blue-600 mx-auto" />
            <p className="mt-2 font-medium text-gray-900">Manage Subscriptions</p>
            <p className="text-sm text-gray-500">View all subscribers</p>
          </Link>

          <Link
            to="/admin/billing"
            className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
          >
            <CurrencyDollarIcon className="h-8 w-8 text-green-600 mx-auto" />
            <p className="mt-2 font-medium text-gray-900">Billing</p>
            <p className="text-sm text-gray-500">Revenue reports</p>
          </Link>

          <Link
            to="/admin/plans"
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
          >
            <CreditCardIcon className="h-8 w-8 text-purple-600 mx-auto" />
            <p className="mt-2 font-medium text-gray-900">Plan Management</p>
            <p className="text-sm text-gray-500">Edit pricing plans</p>
          </Link>

          <Link
            to="/admin/support"
            className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
          >
            <BuildingStorefrontIcon className="h-8 w-8 text-orange-600 mx-auto" />
            <p className="mt-2 font-medium text-gray-900">Customer Support</p>
            <p className="text-sm text-gray-500">Help & support</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;