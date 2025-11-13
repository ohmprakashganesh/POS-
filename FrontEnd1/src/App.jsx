import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './globalPages/auth/Login';
import SignUp from './globalPages/auth/SignUp';
import PublicSubscription  from './globalPages/subscription/Subscription'
import NotificationCenter from './componenets/notifications/NotificationCenter';

import Layout from './componenets/cashier/layout/CashierLayout'
import AdminLayout from './componenets/Admin/layout/AdminLayout'
import PaymentScreen from './globalPages/subscription/PaymentScreen';
import SubscriberLayout from './componenets/Subscriber/layout/SubscriberLayout'




// subscriber components 
import ProductList from './componenets/Subscriber/pages/items/ProductList';
import AddEditProduct from './componenets/Subscriber/pages/items/AddEditProduct';
import CustomerList from './componenets/Subscriber/pages/customers/CustomerList';
import Categories from './componenets/Subscriber/pages/categories/Category'
import AddEditCustomer from './componenets/Subscriber/pages/customers/AddEditCustomer';
import TransactionHistory from './componenets/Subscriber/pages/transactions/TransactionHistory';
import SalesReports from './componenets/Subscriber/pages/reports/SalesReports';
import ProfitLoss from './componenets/Subscriber/pages/dashboard/ProfitLoss';
import Subscription from './componenets/Subscriber/pages/settings/active-plan/Subscription';
import AddEditCashier from './componenets/Subscriber/pages/cashiers/AddEditCashier';
import CashierList from './componenets/Subscriber/pages/cashiers/CashierList';
import Product from './componenets/Subscriber/pages/items/Product';
import SubscriberDashboard from './componenets/Subscriber/pages/dashboard/SubscriberDashboard';
import AddEditVendor from './componenets/Subscriber/pages/vendors/AddEditVendor';
import VendorDetailsCard from './componenets/Subscriber/pages/vendors/VendorDetailsCard';


// admin components 
import SubscriberList from './componenets/Admin/pages/subscriberList';
import AdminDashboard from './componenets/Admin/AdminDashboard';
import SubscriptionPlans from './componenets/Admin/pages/SubscriptionPlans';
import Report from './componenets/Admin/pages/Report';

// cashier components 
import Dashboard from './componenets/cashier/CashierDashboard'; 
import CashierProductList from './componenets/cashier/components/ProductList'
import CashierCustomerList from './componenets/cashier/components/CustomerList';
import CashierAddEditCustomer from './componenets/cashier/components/AddEditCustomer'
import Orders from './componenets/cashier/components/Orders'
import POS from './componenets/cashier/components/POS';
import Paid from './globalPages/subscription/Paid';
import VendorList from './componenets/Subscriber/pages/vendors/VendorsList';
import Profile from './componenets/Subscriber/pages/settings/profile/Profile';
import Support from './componenets/Subscriber/pages/settings/help/Support';
import SupportReq from './componenets/Admin/pages/Support';


function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, subscriptionStatus } = useAuth(); 
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (subscriptionStatus !== "active" && user.role !== "admin") {
    return <Navigate to="/publicSubscription" replace />;
  }

  // Check admin access
  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Redirect to appropriate dashboard if accessing root
  if (location.pathname === "/") {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "subscriber") {
      return <Navigate to="/subscriber" replace />;
    }
    // cashier stays on "/"
  }
  return children;
}


function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
            <Routes>
              <Route
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/admin" element={<AdminDashboard />} />
                 <Route  path="/subscriptionPlans"  element={<SubscriptionPlans />} />
                <Route  path="/subscriberList" element={<SubscriberList />} />
                 <Route path='/support' element={ <SupportReq />}/>
                 <Route path='/report' element={ <Report />}/>
              </Route>

              {/* subscriber ============================================================================= routes  */}

              <Route
                element={
                  <ProtectedRoute>
                    <SubscriberLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/subscriber" element={<SubscriberDashboard />} />
                  <Route path="/profile" element={  <Profile />}/>
                  <Route  path="/profile/edit/:id" element={<Profile />}/>    
                <Route path="/transactions" element={<TransactionHistory />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/add" element={<AddEditCustomer />} />
                <Route path="/customers/edit/:id" element={<AddEditCustomer />} />
                <Route path="/cashierList" element={<CashierList />} />
                <Route path="/cashier/add" element={<AddEditCashier />} />
                <Route path="/cashier/edit/:id" element={<AddEditCashier />} />
                <Route path="/Vendors" element={ <VendorList />}/>
                 <Route path="/vendor/add" element={ <AddEditVendor />}/>
                  <Route path="/vendor/edit/:id" element={<AddEditVendor />}/>
                   <Route  path="/vendor/detail/:id" element={<VendorDetailsCard />}/>
                <Route path="/products" element={<ProductList />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products/add" element={<AddEditProduct />} />
                <Route path="/products/edit/:id" element={<AddEditProduct />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/reports/sales" element={<SalesReports />} />
                <Route path="/reports/profit-loss" element={<ProfitLoss />} />
                <Route path="/subscription" element={<Subscription />} />
                 <Route path="/help" element={ <Support/>}/>
              </Route>

              {/* cashier============================================================================= routes  */}

              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/pos" element={<POS />} />
                <Route path="/c-transactions" element={<TransactionHistory />} />
                <Route path="/c-Products" element={<CashierProductList />} />
                <Route path="/c-customers" element={<CashierCustomerList />} />
                <Route path="/c-customers/add" element={<CashierAddEditCustomer />} />
                <Route path="/c-customers/edit/:id" element={<CashierAddEditCustomer />} />
                <Route path="/c-orders" element={<Orders />} />
              </Route>

              {/* public routes ============================================================================= routes  */}

              <Route path="/publicSubscription" element={<PublicSubscription />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
                <Route path="/success" element={<Paid />} />
            <Route path="/payment" element={<PaymentScreen />} />

            </Routes>
            <NotificationCenter />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
