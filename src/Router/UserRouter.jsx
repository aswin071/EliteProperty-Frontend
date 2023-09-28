import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/User/Home';
import Signup from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import OtpVerification from '../components/Auth/OtpVerification';
import Logout from '../components/Auth/Logout';
import Properties from '../components/User/Properties';
import SingleProperty from '../components/User/SingleProperty';
import UserProfile from '../components/User/UserProfile';


import PropertyPayment from '../components/User/PropertyPayment';
import PaymentSuccessPage from '../components/User/PaymentSuccess';
import Agents from '../components/User/Agents';
import { useSelector } from 'react-redux';
import CheckoutForRentProperty from '../components/User/CheckoutForRentProperty';
import UserProperties from '../components/User/UserProperties';
import UserBookings from '../components/User/UserBookings';
import ProtectedRoute from '../ProtectedRoute';

function UserRouter() {
  const user = useSelector((state) => state.user);
  console.log('userrrrrrrrrr:',user)
  // if (user) {
  //   return <Navigate to="/" />; 
  //  }

  return (  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route  path="/login"element={ <Login />
      }/>
      <Route path="/signup"  element={<Signup />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/properties" element={<Properties />} />
      
      <Route path="/singleproperty/:id" element={  <SingleProperty />} />

      <Route path="/profile" element={ <ProtectedRoute><UserProfile /></ProtectedRoute>} />
      
      <Route path="/book/property/:id" element={<PropertyPayment />} />
      <Route path="/payment/success/" element={<PaymentSuccessPage />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/property/rent/:id" element={<CheckoutForRentProperty />} />
      <Route path="" element={<UserProperties />} />
      <Route path="/my-bookings" element={<UserBookings />} />
    </Routes>
  );
}

export default UserRouter;
