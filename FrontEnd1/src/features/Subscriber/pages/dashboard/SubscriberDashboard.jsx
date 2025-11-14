
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   ShoppingCartIcon, 
//   CurrencyDollarIcon, 
//   ChartBarIcon, 
//   ArrowUpIcon,
//   ArrowDownIcon,
//   CubeIcon,
//   UsersIcon,
//   ExclamationTriangleIcon,
//   PlusIcon
// } from '@heroicons/react/24/outline';
// import { useNotifications } from '../../contexts/NotificationContext';
// import { useTranslation } from 'react-i18next';
// const Dashboard = () => {
//   const {t} = useTranslation();
//   const [metrics, setMetrics] = useState({
//     todaySales: 0,
//     totalSales: 0,
//     monthlySales: 0,
//     profit: 0,
//     expenses: 0,
//     totalProducts: 0,
//     totalCustomers: 0,
//     lowStockItems: 0
//   });
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [lowStockProducts, setLowStockProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addNotification } = useNotifications();

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock data for subscriber's business
//       setMetrics({
//         todaySales: 2540.00,
//         totalSales: 45678.00,
//         monthlySales: 18450.00,
//         profit: 8234.00,
//         expenses: 2340.00,
//         totalProducts: 45,
//         totalCustomers: 128,
//         lowStockItems: 3
//       });
      
//       setRecentTransactions([
//         { id: 1, customer: 'John Doe', amount: 120.00, items: 2, time: '2 hours ago' },
//         { id: 2, customer: 'Jane Smith', amount: 85.50, items: 3, time: '4 hours ago' },
//         { id: 3, customer: 'Raj Kumar', amount: 210.00, items: 1, time: '5 hours ago' },
//         { id: 4, customer: 'Mike Johnson', amount: 45.99, items: 2, time: '6 hours ago' },
//         { id: 5, customer: 'Sarah Wilson', amount: 299.99, items: 1, time: '1 day ago' }
//       ]);

//       setLowStockProducts([
//         { id: 1, name: 'Wireless Mouse', stock: 3, minStock: 10 },
//         { id: 2, name: 'Headphones', stock: 7, minStock: 15 },
//         { id: 3, name: 'Keyboard', stock: 0, minStock: 5 }
//       ]);

//       setLoading(false);
//     };

//     loadData();
//   }, [addNotification]);

//   const metricCards = [
//     {
//       title: "Today's Sales",
//       value: metrics.todaySales,
//       change: 12,
//       icon: ShoppingCartIcon,
//       color: "blue",
//       description: "Sales today"
//     },
//     {
//       title: "Monthly Revenue",
//       value: metrics.monthlySales,
//       change: 8,
//       icon: CurrencyDollarIcon,
//       color: "green",
//       description: "This month"
//     },
//     {
//       title: "Net Profit",
//       value: metrics.profit,
//       change: 15,
//       icon: ChartBarIcon,
//       color: "emerald",
//       description: "After expenses"
//     },
//     {
//       title: "Total Customers",
//       value: metrics.totalCustomers,
//       change: 5,
//       icon: UsersIcon,
//       color: "purple",
//       description: "Registered customers"
//     }
//   ];

//   const quickActions = [
//     {
//       title: "Cashiers",
//       description: "view Cashiers",
//       icon: ShoppingCartIcon,
//       link: "/cashierList",
//       color: "blue"
//     },
//     {
//       title: "Add Product",
//       description: "Add new product to inventory",
//       icon: PlusIcon,
//       link: "/products/add",
//       color: "green"
//     },
//     {
//       title: "Add Customer",
//       description: "Register new customer",
//       icon: UsersIcon,
//       link: "/customers/add",
//       color: "purple"
//     },
//     {
//       title: "View Reports",
//       description: "Sales and analytics",
//       icon: ChartBarIcon,
//       link: "/reports/sales",
//       color: "orange"
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Subscriber Dashboard</h1>
//           <p className="text-gray-600">Overview of your store performance</p>
//         </div>
//         <div className="text-sm text-gray-500">
//           Last updated: {new Date().toLocaleDateString()}
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {metricCards.map((card) => (
//           <div key={card.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{card.title}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">
//                   {card.title.includes('Revenue') || card.title.includes('Sales') || card.title.includes('Profit') 
//                     ? `$${card.value.toLocaleString()}` 
//                     : card.value.toLocaleString()}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">{card.description}</p>
//                 <div className={`flex items-center mt-1 text-sm ${
//                   card.change >= 0 ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {card.change >= 0 ? (
//                     <ArrowUpIcon className="h-4 w-4 mr-1" />
//                   ) : (
//                     <ArrowDownIcon className="h-4 w-4 mr-1" />
//                   )}
//                   {Math.abs(card.change)}% from yesterday
//                 </div>
//               </div>
//               <div className={`p-3 rounded-full bg-${card.color}-100`}>
//                 <card.icon className={`h-6 w-6 text-${card.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Additional Business Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Products</p>
//               <p className="text-2xl font-bold text-gray-900">{metrics.totalProducts}</p>
//               <p className="text-sm text-gray-500">In inventory</p>
//             </div>
//             <CubeIcon className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
//               <p className="text-2xl font-bold text-gray-900">${metrics.expenses.toLocaleString()}</p>
//               <p className="text-sm text-gray-500">Operating costs</p>
//             </div>
//             <CurrencyDollarIcon className="h-8 w-8 text-red-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
//               <p className="text-2xl font-bold text-gray-900">{metrics.lowStockItems}</p>
//               <p className="text-sm text-gray-500">Need restocking</p>
//             </div>
//             <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {quickActions.map((action) => (
//             <Link
//               key={action.title}
//               to={action.link}
//               className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center group"
//             >
//               <action.icon className={`h-8 w-8 text-${action.color}-600 mx-auto group-hover:scale-110 transition-transform`} />
//               <p className="mt-2 font-medium text-gray-900">{action.title}</p>
//               <p className="text-sm text-gray-500">{action.description}</p>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activity & Low Stock Alerts */}
//       <div className="grid grid-cols-1 shadow-md lg:grid-cols-2 gap-4">
//         {/* Recent Transactions */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
//             <Link to="/transactions" className="text-sm text-blue-600 hover:text-blue-800">
//               View all
//             </Link>
//           </div>
//           <div className="space-y-2">
//             {recentTransactions.map((transaction) => (
//               <div key={transaction.id} className="flex outline-green-500 outline-1 items-center justify-between px-2  py-1 bg-gray-50 ">
//                 <div className="flex  items-center space-x-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <ShoppingCartIcon className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div className=' flex-col space-y-0 '>
//                     <p className="font-medium text-gray-900">{transaction.customer}</p>
//                     <p className="text-sm text-gray-500">{transaction.items} items • {transaction.time}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-gray-900">${transaction.amount}</p>
//                   <p className="text-sm text-green-600">Completed</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Low Stock Alerts */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
//             <Link to="/products" className="text-sm text-blue-600 hover:text-blue-800">
//               Manage Inventory
//             </Link>
//           </div>
//           <div className="space-y-3">
//             {lowStockProducts.map((product) => (
//               <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
//                   <div>
//                     <p className="font-medium text-gray-900">{product.name}</p>
//                     <p className="text-sm text-gray-600">
//                       {product.stock === 0 ? 'Out of stock' : `${product.stock} units left`}
//                     </p>
//                   </div>
//                 </div>
//                 <Link
//                   to={`/products/edit/${product.id}`}
//                   className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
//                 >
//                   Restock
//                 </Link>
//               </div>
//             ))}
//             {lowStockProducts.length === 0 && (
//               <div className="text-center py-4 text-gray-500">
//                 <CheckIcon className="h-8 w-8 text-green-400 mx-auto" />
//                 <p className="mt-2">All products are well stocked</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Sales Chart */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
//         <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
//           <div className="text-center">
//             <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
//             <p className="mt-2 text-gray-500">Daily sales performance chart</p>
//             <p className="text-sm text-gray-400">Visualization of your business growth</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ArrowUpIcon,
  ArrowDownIcon,
  CubeIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useNotifications } from '../../../../contexts/NotificationContext';
import { useTranslation } from 'react-i18next';
import { getMetricCards } from './SubDatas';


const Dashboard = () => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState({
    todaySales: 0,
    totalSales: 0,
    monthlySales: 0,
    profit: 0,
    expenses: 0,
    totalProducts: 0,
    totalCustomers: 0,
    lowStockItems: 0
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setMetrics({
        todaySales: 2540.00,
        totalSales: 45678.00,
        monthlySales: 18450.00,
        profit: 8234.00,
        expenses: 2340.00,
        totalProducts: 45,
        totalCustomers: 128,
        lowStockItems: 3
      });
      
      setRecentTransactions([
        { id: 1, customer: 'John Doe', amount: 120.00, items: 2, time: '2 hours ago' },
        { id: 2, customer: 'Jane Smith', amount: 85.50, items: 3, time: '4 hours ago' },
        { id: 3, customer: 'Raj Kumar', amount: 210.00, items: 1, time: '5 hours ago' },
        { id: 4, customer: 'Mike Johnson', amount: 45.99, items: 2, time: '6 hours ago' },
        { id: 5, customer: 'Sarah Wilson', amount: 299.99, items: 1, time: '1 day ago' }
      ]);

      setLowStockProducts([
        { id: 1, name: 'Wireless Mouse', stock: 3, minStock: 10 },
        { id: 2, name: 'Headphones', stock: 7, minStock: 15 },
        { id: 3, name: 'Keyboard', stock: 0, minStock: 5 }
      ]);

      setLoading(false);
    };

    loadData();
  }, [addNotification]);

  const metricCards=getMetricCards(t,metrics);

  // const metricCards = [
  //   {
  //     title: t('dashboard.metrics.todaysSales'),
  //     value: metrics.todaySales,
  //     change: 12,
  //     icon: ShoppingCartIcon,
  //     color: "blue",
  //     description: t('dashboard.metrics.salesToday')
  //   },
  //   {
  //     title: t('dashboard.metrics.monthlyRevenue'),
  //     value: metrics.monthlySales,
  //     change: 8,
  //     icon: CurrencyDollarIcon,
  //     color: "green",
  //     description: t('dashboard.metrics.thisMonth')
  //   },
  //   {
  //     title: t('dashboard.metrics.netProfit'),
  //     value: metrics.profit,
  //     change: 15,
  //     icon: ChartBarIcon,
  //     color: "emerald",
  //     description: t('dashboard.metrics.afterExpenses')
  //   },
  //   {
  //     title: t('dashboard.metrics.totalCustomers'),
  //     value: metrics.totalCustomers,
  //     change: 5,
  //     icon: UsersIcon,
  //     color: "purple",
  //     description: t('dashboard.metrics.registeredCustomers')
  //   }
  // ];
  const quickActions = [
    {
      title: t('dashboard.quickActions.cashiers'),
      description: t('dashboard.quickActions.viewCashiers'),
      icon: ShoppingCartIcon,
      link: "/cashierList",
      color: "blue"
    },
    {
      title: t('dashboard.quickActions.addProduct'),
      description: t('dashboard.quickActions.addNewProduct'),
      icon: PlusIcon,
      link: "/products/add",
      color: "green"
    },
    {
      title: t('dashboard.quickActions.addCustomer'),
      description: t('dashboard.quickActions.registerCustomer'),
      icon: UsersIcon,
      link: "/customers/add",
      color: "purple"
    },
    {
      title: t('dashboard.quickActions.viewReports'),
      description: t('dashboard.quickActions.salesAndAnalytics'),
      icon: ChartBarIcon,
      link: "/reports/sales",
      color: "orange"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
        </div>
        <div className="text-sm text-gray-500">
          {t('dashboard.lastUpdated')}: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {metricCards.map((card) => (
          <div key={card.title} className="bg-linear-to-r from-white/50  to-secondary/10   rounded-md shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold ">{card.title}</p>
                <p className="text-2xl font-bold mt-2">
                  {(card.title.includes(t('dashboard.metrics.monthlyRevenue')) || 
                    card.title.includes(t('dashboard.metrics.todaysSales')) || 
                    card.title.includes(t('dashboard.metrics.netProfit')))
                    ? `$${card.value.toLocaleString()}`
                    : card.value.toLocaleString()
                  }
                </p>
                <p className="text-sm text-muted mt-1">{card.description}</p>
                <div className={`flex items-center mt-1 text-sm ${card.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                  {t('dashboard.metrics.percentChange', { value: Math.abs(card.change) })}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-lg shadow-sm  p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold">{t('dashboard.metrics.totalProducts')}</p>
              <p className="text-2xl font-bold ">{metrics.totalProducts}</p>
              <p className="text-sm text-muted">{t('dashboard.metrics.inInventory')}</p>
            </div>
            <CubeIcon className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className=" text-xl font-semibold  ">{t('dashboard.metrics.monthlyExpenses')}</p>
              <p className="text-2xl font-bold ">${metrics.expenses.toLocaleString()}</p>
              <p className="text-sm text-muted">{t('dashboard.metrics.operatingCosts')}</p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-secondary" />
          </div>
        </div>

        <div className="bg-white rounded-md  shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className=" text-xl font-semibold ">{t('dashboard.metrics.lowStockItems')}</p>
              <p className="text-2xl font-bold ">{metrics.lowStockItems}</p>
              <p className="text-sm text-muted">{t('dashboard.metrics.needRestocking')}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-tertiary" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="text- font-semibold text-gray-900 mb-4">{t('dashboard.quickActions.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="p-4 bg-white shadow-sm rounded-md  hover:bg-gradient-to-r hover:from-transparent  hover:via-primary/10  text-center group"
            >
              <action.icon className={`h-8 w-8 text-${action.color}-600 mx-auto group-hover:scale-110 transition-transform`} />
              <p className="mt-2 font-medium text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Transactions & Low Stock Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-md shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('dashboard.sections.recentTransactions')}</h3>
            <Link to="/transactions" className="text-sm text-primary hover:text-primary-hover">{t('dashboard.sections.viewAll')}</Link>
          </div>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-2 bg-background rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <ShoppingCartIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-col">
                    <p className="font-medium ">{transaction.customer}</p>
                    <p className="text-sm text-muted">{transaction.items} items • {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount}</p>
                  <p className="text-sm text-green-500">{t('dashboard.metrics.completed')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white h-fit rounded-md shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold ">{t('dashboard.sections.lowStockAlerts')}</h3>
            <Link to="/products" className="text-sm text-primary hover:text-primary-hover">{t('dashboard.sections.manageInventory')}</Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className={`h-5 w-5 ${product.stock===0? "text-destructive" :"text-tertiary"}`} />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted">
                      {product.stock === 0 
                        ? t('dashboard.metrics.outOfStock') 
                        : t('dashboard.metrics.unitsLeft', { count: product.stock })}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/products/edit/${product.id}`}
                  className={`px-3 py-1 text-sm  rounded ${product.stock===0 ? "bg-destructive text-destructive-foreground":"bg-tertiary text-tertiary-foreground"}`}
                >
                  {t('dashboard.sections.restock')}
                </Link>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <div className="text-center py-4 text-muted">
                <CheckIcon className="h-8 w-8 text-green-500 mx-auto" />
                <p className="mt-2">{t('dashboard.metrics.allProductsWellStocked')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="p-5 bg-white rounded-md shadow-sm min-h-100 -fit flex flex-col">
        <h3 className="text-lg font-semibold mb-4">{t('dashboard.sections.salesOverview')}</h3>
        <div className="grow bg-background rounded-md flex items-center justify-center">
          <div className="text-center text-muted">
            <ChartBarIcon className="mx-auto size-12" />
            <p className="mt-2 ">{t('dashboard.sections.dailySalesChart')}</p>
            <p className="text-sm">{t('dashboard.sections.visualization')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
