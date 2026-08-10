import React from 'react';
// @ts-ignore
import './App.css';
import {  Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import DashboardLayout from './pages/(dashboard)/layout';
import DashBoardPage from './pages/(dashboard)/dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
