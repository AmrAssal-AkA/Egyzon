import React from 'react';
// @ts-ignore
import './App.css';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';
import DashboardLayout from './pages/(dashboard)/layout';
import DashBoardPage from './pages/(dashboard)/dashboard';
import Users from './pages/(dashboard)/users';
import SellerManagement from './pages/(dashboard)/sellerManagement';
import StoreSetting from './pages/(dashboard)/Setting';
import { SocketProvider } from './context/socketContext';
import OrdersPage from './pages/(dashboard)/orders';

function App() {
  return (
    <>
    <title>egyzon - admin Panal</title>
    <meta name="description" content="Admin dashboard for managing sellers and users on the Egyzon platform." />
    <SocketProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sellerManagement" element={<SellerManagement />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/storeSetting" element={<StoreSetting />} />
        </Route>
      </Route>
    </Routes>
    </SocketProvider>
    </>
  );
}

export default App;
