import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './componenets/layout/Layout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/SubscriberDashboard'; // Subscriber dashboard
import AdminDashboard from './pages/AdminDashboard'; // SaaS owner dashboard
import ProductList from './pages/products/ProductList';
import AddEditProduct from './pages/products/AddEditProduct';
import CustomerList from './pages/customers/CustomerList';
import AddEditCustomer from './pages/customers/AddEditCustomer';
import POS from './pages/pos/POS';
import TransactionHistory from './pages/transactions/TransactionHistory';
import SalesReports from './pages/reports/SalesReports';
import ProfitLoss from './pages/reports/ProfitLoss';
import Subscription from './pages/subscription/Subscription';
import NotificationCenter from './componenets/notifications/NotificationCenter';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, subscriptionStatus } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  if (subscriptionStatus !== 'active' && user.role !== 'admin') {
    return <Navigate to="/subscription" />;
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Subscriber Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Common Routes */}
              <Route path="/products" element={
                <ProtectedRoute>
                  <Layout>
                    <ProductList />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/products/add" element={
                <ProtectedRoute>
                  <Layout>
                    <AddEditProduct />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/products/edit/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <AddEditProduct />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute>
                  <Layout>
                    <CustomerList />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/customers/add" element={
                <ProtectedRoute>
                  <Layout>
                    <AddEditCustomer />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/pos" element={
                <ProtectedRoute>
                  <Layout>
                    <POS />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionHistory />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/sales" element={
                <ProtectedRoute>
                  <Layout>
                    <SalesReports />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/profit-loss" element={
                <ProtectedRoute>
                  <Layout>
                    <ProfitLoss />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/subscription" element={<Subscription />} />
            </Routes>
            <NotificationCenter />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;