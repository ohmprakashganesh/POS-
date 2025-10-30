import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PublicSubscription from "./pages/subscription/Subscription";
import NotificationCenter from "./componenets/notifications/NotificationCenter";

import Layout from "./componenets/cashier/layout/CashierLayout";
import AdminLayout from "./componenets/Admin/layout/AdminLayout";
import SubscriberLayout from "./componenets/Subscriber/layout/SubscriberLayout";

// subscriber components
import ProductList from "./componenets/Subscriber/components/ProductList";
import AddEditProduct from "./componenets/Subscriber/components/AddEditProduct";
import CustomerList from "./componenets/Subscriber/components/CustomerList";
import Categories from "./componenets/Subscriber/components/Category";
import AddEditCustomer from "./componenets/Subscriber/components/AddEditCustomer";
import TransactionHistory from "./componenets/Subscriber/components/TransactionHistory";
import SalesReports from "./componenets/Subscriber/components/SalesReports";
import ProfitLoss from "./componenets/Subscriber/components/ProfitLoss";
import Subscription from "./componenets/Subscriber/components/Subscription";
import AddEditCashier from "./componenets/Subscriber/components/AddEditCashier";
import CashierList from "./componenets/Subscriber/components/CashierList";
import Product from "./componenets/Subscriber/components/Product";
import SubscriberDashboard from "./componenets/Subscriber/SubscriberDashboard";

// admin components
import SubscriberList from "./componenets/Admin/components/subscriberList";
import AdminDashboard from "./componenets/Admin/AdminDashboard";
import SubscriptionPlans from "./componenets/Admin/components/SubscriptionPlans";

// cashier components
import Dashboard from "./componenets/cashier/CashierDashboard";
import CashierProductList from "./componenets/cashier/components/ProductList";
import CashierCustomerList from "./componenets/cashier/components/CustomerList";
import CashierAddEditCustomer from "./componenets/cashier/components/AddEditCustomer";
import Orders from "./componenets/cashier/components/Orders";
import POS from "./componenets/cashier/components/POS";

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, subscriptionStatus } = useAuth();
  console.log(user?.role);
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
                <Route path="/admin" element={<AdminDashboard />}></Route>
              </Route>

              {/* subscriber ============================================================================= routes  */}

              {/* subscriber routes  */}

              <Route
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route  path="/subscriptionPlans"  element={<SubscriptionPlans />} />
                <Route  path="/subscriberList" element={<SubscriberList />}
                ></Route>
              </Route>

              {/* ===================================================================================== */}

              <Route
                element={
                  <ProtectedRoute>
                    <SubscriberLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/subscriber" element={<SubscriberDashboard />} />
                <Route path="/transactions" element={<TransactionHistory />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/add" element={<AddEditCustomer />} />
                <Route path="/customers/edit/:id" element={<AddEditCustomer />} />
                <Route path="/cashierList" element={<CashierList />} />
                <Route path="/cashier/add" element={<AddEditCashier />} />
                <Route path="/cashier/edit/:id" element={<AddEditCashier />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products/add" element={<AddEditProduct />} />
                <Route path="/products/edit/:id" element={<AddEditProduct />} />
                <Route path="/product" element={<Product />} />
                <Route path="/reports/sales" element={<SalesReports />} />
                <Route path="/reports/profit-loss" element={<ProfitLoss />} />
                <Route path="/subscription" element={<Subscription />} />
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
            </Routes>
            <NotificationCenter />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
