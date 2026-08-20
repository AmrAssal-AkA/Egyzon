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


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sellerManagement" element={<SellerManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
