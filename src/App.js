
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminRouter from './Router/AdminRouter'; 
import UserRouter from './Router/UserRouter'; 
import VendorRouter from './Router/VendorRouter';
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector(state => state.user);
  console.log('userrrrrrr:',user)

  const isAdmin = user && user.user_type === 'Admin';
  const isUser = user && user.user_type === 'User';
  const isVendor = user && user.user_type === 'Vendor';
  return (
    <>
    <BrowserRouter>
      <Routes>


        {/* USER */}
        <Route path="/*" element={<UserRouter />} />


        {/* VENDOR */}
        {isVendor || isAdmin ? (
          <Route path="/vendor/*" element={<VendorRouter />} />
        ) : (
          <Route path="/vendor/*" element={<Navigate to="/login" />} />
        )}


        {/* ADMIN */}
        {isAdmin ? (
          <Route path="/admin/*" element={<AdminRouter />} />
        ) : (
          <Route path="/admin/*" element={<Navigate to="/login" />} />
        )}


      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;

