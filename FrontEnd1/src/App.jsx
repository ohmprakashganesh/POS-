import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './pages/auth/Login';
import Layout from './componenets/cashier/layout/CashierLayout'
import AdminLayout from './componenets/admin/layout/AdminLayout'
import SubscriberLayout from './componenets/Subscriber/layout/SubscriberLayout'

import SignUp from './pages/auth/SignUp';
import Orders from './componenets/cashier/components/Orders'
import AddEditCashier from './componenets/Subscriber/components/AddEditCashier';
import CashierList from './componenets/Subscriber/components/CashierList';
import SubscriberDashboard from './componenets/Subscriber/SubscriberDashboard';
import SubscriberList from './componenets/Admin/components/subscriberList';
import Dashboard from './componenets/cashier/CashierDashboard'; // Subscriber dashboard
import AdminDashboard from './componenets/Admin/AdminDashboard'; // SaaS owner dashboard
import ProductList from './componenets/Subscriber/components/ProductList';
import AddEditProduct from './componenets/Subscriber/components/AddEditProduct';
import CustomerList from './componenets/Subscriber/components/CustomerList';
import Categories from './componenets/Subscriber/components/Category'
import AddEditCustomer from './componenets/Subscriber/components/AddEditCustomer';
import POS from './componenets/cashier/components/POS';
import TransactionHistory from './componenets/Subscriber/components/TransactionHistory';
import SalesReports from './componenets/Subscriber/components/SalesReports';
import ProfitLoss from './componenets/Subscriber/components/ProfitLoss';
import Subscription from './componenets/Subscriber/components/Subscription';
import PublicSubscription  from './pages/subscription/Subscription'
import NotificationCenter from './componenets/notifications/NotificationCenter';
import SubscriptionPlans from './componenets/Admin/components/SubscriptionPlans';
import CashierProductList from './componenets/cashier/components/ProductList'
import CashierCustomerList from './componenets/cashier/components/CustomerList';
import CashierAddEditCustomer from './componenets/cashier/components/AddEditCustomer'

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
          <div className="App">
            <Routes>
             
               <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } />

              


 {/* subscriber ============================================================================= routes  */}


              {/* subscriber routes  */}
               <Route path="/subscriptionPlans" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout>
                    <SubscriptionPlans />
                  </AdminLayout>
                </ProtectedRoute>
              } />

              <Route path='/subscriberList' element={
                <ProtectedRoute>
                  <AdminLayout>
                   <SubscriberList />
                  </AdminLayout>
                </ProtectedRoute>
              }/>


              <Route path="/subscriber" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <SubscriberDashboard />
                   </SubscriberLayout>
                </ProtectedRoute>
              } />
             <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                   </Layout>
                </ProtectedRoute>
              } />

            <Route path="/customers" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <CustomerList />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
              <Route path="/customers/add" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <AddEditCustomer />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
                <Route path="/customers/edit/:id" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <AddEditCustomer />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />

               <Route path="/cashierList" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <CashierList />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
               <Route path="/cashier/add" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <AddEditCashier />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
              <Route path="/cashier/edit/:id" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <AddEditCashier />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />

              <Route path="/products" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <ProductList />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
               <Route path="/categories" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <Categories />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/products/add" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <AddEditProduct />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />

              <Route path="/products/edit/:id" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <AddEditProduct />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />

                <Route path="/reports/sales" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <SalesReports /> 
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
              <Route path="/reports/profit-loss" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                    <ProfitLoss />
                  </SubscriberLayout>
                </ProtectedRoute>
              } />

          <Route path="/subscription" element={
                <ProtectedRoute>
                  <SubscriberLayout>
                   <Subscription/>
                  </SubscriberLayout>
                </ProtectedRoute>
              } />
            
             
 {/* cashier============================================================================= routes  */}


              <Route path="/pos" element={
                <ProtectedRoute>
                  <Layout>
                    <POS />
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/c-transactions" element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionHistory />
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/c-Products" element={
                <ProtectedRoute>
                  <Layout>
                    <CashierProductList />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/c-customers" element={
                <ProtectedRoute>
                  <Layout>
                    <CashierCustomerList />
                  </Layout>
                </ProtectedRoute>
              } />

             <Route path="/c-customers/add" element={
                <ProtectedRoute>
                  <Layout>
                    <CashierAddEditCustomer />
                  </Layout>
                </ProtectedRoute>
              } />

                <Route path="/c-customers/edit/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <CashierAddEditCustomer />
                  </Layout>
                </ProtectedRoute>
              } />

               <Route path="/c-orders" element={
                <ProtectedRoute>
                  <Layout>
                    <Orders />
                  </Layout>
                </ProtectedRoute>
              } />

 {/* public routes ============================================================================= routes  */}


            <Route path="/publicSubscription" element={ <PublicSubscription/> } />
             <Route path="/login" element={<Login />} />         
              <Route path="/signup" element={<SignUp />} />



            </Routes>
            <NotificationCenter />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;