import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './globalPages/auth/Login';
import SignUp from './globalPages/auth/SignUp';
import PublicSubscription  from './globalPages/subscription/Subscription'
import NotificationCenter from './features/notifications/NotificationCenter';

import Layout from './features/cashier/layout/CashierLayout'
import AdminLayout from './features/Admin/layout/AdminLayout'
import PaymentScreen from './globalPages/subscription/PaymentScreen';
import SubscriberLayout from './features/Subscriber/layout/SubscriberLayout'




// subscriber components 
import ProductList from './features/Subscriber/pages/items/ProductList';
import AddEditProduct from './features/Subscriber/pages/items/AddEditProduct';
import CustomerList from './features/Subscriber/pages/customers/CustomerList';
import Categories from './features/Subscriber/pages/categories/Category'
import AddEditCustomer from './features/Subscriber/pages/customers/AddEditCustomer';
import TransactionHistory from './features/Subscriber/pages/transactions/TransactionHistory';
import SalesReports from './features/Subscriber/pages/reports/SalesReports';
import ProfitLoss from './features/Subscriber/pages/dashboard/ProfitLoss';
import Subscription from './features/Subscriber/pages/settings/active-plan/Subscription';
import AddEditCashier from './features/Subscriber/pages/cashiers/AddEditCashier';
import CashierList from './features/Subscriber/pages/cashiers/CashierList';
import Product from './features/Subscriber/pages/items/Product';
import SubscriberDashboard from './features/Subscriber/pages/dashboard/SubscriberDashboard';
import AddEditVendor from './features/Subscriber/pages/vendors/AddEditVendor';
import VendorDetailsCard from './features/Subscriber/pages/vendors/VendorDetailsCard';


// admin components 
import SubscriberList from './features/Admin/pages/subscriberList';
import AdminDashboard from './features/Admin/AdminDashboard';
import SubscriptionPlans from './features/Admin/pages/SubscriptionPlans';
import Report from './features/Admin/pages/Report';

// cashier components 
import CashierProductList from './features/cashier/pages/products/ProductList'
import CashierCustomerList from './features/cashier/pages/customer/CustomerList';
import Orders from './features/cashier/pages/history/Orders'
import POS from './features/cashier/pages/pos/POS';
import Paid from './globalPages/subscription/Paid';
import VendorList from './features/Subscriber/pages/vendors/VendorsList';
import Profile from './features/Subscriber/pages/settings/profile/Profile';
import Support from './features/Subscriber/pages/settings/help/Support';
import SupportReq from './features/Admin/pages/Support';
import { CartProvider } from './features/cashier/context/CartContext';
import Cart from './features/cashier/pages/cart/cart';
import CProduct from './features/cashier/pages/products/Product';
import { FormProvider } from './features/cashier/context/FormContext';
import { ThemeProvider } from './contexts/ThemeContext';


function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, subscriptionStatus } = useAuth();
  console.log("logged user is ",user?.role);
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
       <ThemeProvider>

      <AuthProvider>
        <NotificationProvider>
          <FormProvider>
           <CartProvider>
           
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
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="/" element={<POS />} />
                <Route path="/c-transactions" element={<TransactionHistory />} />
                <Route path="/c-Products" element={<CashierProductList />} />
                <Route path="/c-cart" element={<Cart />} />
                <Route path="/c-customers" element={<CashierCustomerList />} />
                {/* <Route path="/c-customers/add" element={<CashierAddEditCustomer />} />
                <Route path="/c-customers/edit/:id" element={<CashierAddEditCustomer />} /> */}
                <Route path="/c-orders" element={<Orders />} />
                  <Route path="/c-product/:id" element={<CProduct />} />
              </Route>
            

              {/* public routes ============================================================================= routes  */}

              <Route path="/publicSubscription" element={<PublicSubscription />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
                <Route path="/success" element={<Paid />} />
            <Route path="/payment" element={<PaymentScreen />} />

            </Routes>
              </CartProvider>
                </FormProvider>
            <NotificationCenter />
        </NotificationProvider>
      </AuthProvider>
      </ThemeProvider>

     
    </Router>
  );
}

export default App;
