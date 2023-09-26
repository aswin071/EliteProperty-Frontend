import React from 'react';
import { Link } from 'react-router-dom'; 
import { Footer } from '../Layout/Footer';
import { NavbarDefault } from '../Layout/Navbar';

const PaymentSuccessPage = () => {
  return (
    <div>
    <NavbarDefault/>
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" 
        alt="Payment Success GIF"
        className="w-64 h-60 mb-8"
      />
      <h2 className="text-2xl font-semibold text-green-500">Payment Successfully Completed</h2>
      <Link to="/my-bookings" className="mt-4 bg-blue-300 text-white px-4 py-2 rounded-lg">
       My Bookings
      </Link>
      
    </div>
    </div>
  );
};

export default PaymentSuccessPage;