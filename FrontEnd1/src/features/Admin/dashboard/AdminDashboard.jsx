import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { metricCards ,recentSubscriptions,quickActions} from '../mockdata/mockAdminData';
import { 
  UsersIcon, 
  ChartBarIcon, 
  BuildingStorefrontIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [cardMetrics, setCardMetrics]=useState([]);
    const [newSubscriptions, setNewSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(()=>{
    try{
       if(metricCards){
       setCardMetrics(metricCards);
   }}catch(error){
   console.log(error,"unable to get metrics cards data")
   }
   },[])
  
  const [metrics, setMetrics] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    monthlyRevenue: 0,
    subMetrics:[],
    
    totalRevenue: 0,
    trialUsers: 0,
    churnRate: 0,
    newSubscribersThisMonth: 0
  });



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
         subMetrics:[
      {
       title:"trail Users",
       value:"23",
       icon:BuildingStorefrontIcon
    },
    {
       title:"Churn rate",
       value:"10",
       icon:XCircleIcon
    },
    {
       title:"New Users ",
       value:"33",
       icon:UsersIcon

    },
    ],
        trialUsers: 23,
        churnRate: 2.3,
        newSubscribersThisMonth: 34
      });
      setNewSubscriptions(newSubscriptions?newSubscriptions:null);
      setLoading(false);
    };
    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 dark:bg-primary-foreground';
      case 'trial': return 'text-primary bg-blue-50 dark:bg-primary-foreground';
      case 'cancelled': return 'text-destructive bg-red-50 dark:bg-primary-foreground';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"> </div>
      </div>
    );
  }
  return(
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-muted-hover">SaaS Analytics Dashboard</h1>
          <p className="text-muted">Overview of your POS platform performance</p>
        </div>
        <div className="text-sm text-gray-500">
          {/* //get the latest update from  the  backend  */}
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2 lg:gap-6">
        {cardMetrics.map((card) => (
          <div key={card.title} className="bg-primary-foreground rounded-lg shrink shadow-sm border border-muted/40 p-6">
            <div className="flex items-center shrink justify-between">
              <div className=' shrink'>
                <p className="text-sm font-medium text-muted-hover">{card.title}</p>
                <p className="text-2xl font-bold text-muted-hover mt-2">
                  {card.title ?card.title : "not set"}
                </p>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                <div className={`flex items-center mt-1 text-sm ${
                  card.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  {Math.abs(card.change)}% from last period
                </div>
              </div>
              <div className={`p-2  rounded-full bg-${card.color}-100`}>
                <card.icon className={`h-6 w-6 text-${card.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {metrics.subMetrics.map((obj, ind) => {
  const Icon = obj.icon;
  return (
    <div key={ind} className="bg-primary-foreground rounded-lg shadow-sm border border-muted/40 p-6">
      <div className="flex items-center justify-between">
        <div className='text-muted-hover'>
          <p className="text-sm font-medium "> {obj.title}</p>
          <p className="text-2xl font-bold ">{obj.value}</p>
        </div>

        {/* Render the icon */}
        <Icon className="h-8 w-8 text-primary" />
      </div>
    </div>
  )
})}
 </div>



      {/* Recent Subscriptions & Revenue Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Recent Subscriptions */}
        <div className="bg-primary-foreground rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-muted-hover">Recent Subscriptions</h3>
            <Link to="/admin/subscriptions" className="text-sm dark:text-muted-hover text-primary hover:text-primary-hover">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentSubscriptions.map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-3 bg-primary-foreground rounded-lg border border-muted/40">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                      <CreditCardIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-hover text-sm">{subscription.business}</p>
                      <p className="text-xs text-muted">{subscription.plan} Plan</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-muted-hover">${subscription.amount}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium dark:bg-primary-foreground ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Revenue Chart */}
        <div className="bg-primary-foreground rounded-lg shadow-sm border border-muted/40 p-6">
          <h3 className="text-lg font-semibold text-muted-hover mb-4">Revenue Overview</h3>
          <div className="h-64 bg-primary-foreground rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-muted-hover" />
              <p className="mt-2 text-muted">Revenue analytics chart</p>
              <p className="text-sm text-gray-400">Monthly recurring revenue trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-primary-foreground rounded-lg shadow-sm border border-muted/40 p-6">
        <h3 className="text-lg font-semibold text-muted-hover mb-4">Quick Actions</h3>
        <div className="grid text-muted grid-cols-1  sm:grid-cols-3 md:grid-cols-4 gap-4">
          {quickActions.map((item,ind)=>{
            const Icon = item.icon;
          return (

          
             <Link
             key={ind}
          to={item.link}
            className="p-4 border border-muted/40 rounded-lg hover:bg-primary/20  transition-colors text-center"
          >
            <div className="h-8 w-8 text-primary mx-auto" >
              <Icon/>
              </div>
            <p className="mt-2 font-medium text-muted-hover">{item.title}</p>
            <p className="text-sm text-muted">{item.subtitle}</p>
          </Link>
         )
        })
      };
        </div>
      </div>
    </div>




  )


};

export default AdminDashboard;



 