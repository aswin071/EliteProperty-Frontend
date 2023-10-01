import React from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import VendorDashboard from '../components/Vendor/VendorDashboard'
import VendorRegistration from '../components/Vendor/VendorRegistration'
import PropertyManagement from '../components/Vendor/PropertyManagement'
import PropertyListing from '../components/Vendor/PropertyListing'
import PropertyInquiries from '../components/Vendor/PropertyInquiries'
import PropertyInquiriesDetails from '../components/Vendor/PropertyInquiryDetails'
import { useSelector } from 'react-redux';
import BookingDetails from '../components/Vendor/BookingDetails'
import UserRentBookings from '../components/Vendor/UserRentBookings'
import UserSaleBookings from '../components/Vendor/UserSaleBookings'
import SaleProperty from '../components/Vendor/SaleProperty'
import RentProperties from '../components/Vendor/RentProperties'






function VendorRouter() {
  const user = useSelector((state) => state.user);
  const isVendor = user && user.user_type === 'Vendor';
  // if (user) {
  //   return <Navigate to="/" />; // Redirect to the vendor dashboard
  // }
  return (
    <Routes>
        
          <>
        <Route path="/" element={<VendorDashboard />} />
        <Route path="/register" element={<VendorRegistration />} />
        <Route path="/add-property" element={<PropertyManagement />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/property/inquiries" element={<PropertyInquiries />} />
        <Route path="/property/inquiries/details/:propertyId" element={<PropertyInquiriesDetails />} />
        <Route path="/property/booking-details" element={<BookingDetails />} />
         <Route path="/rent/property/booking-details" element={<UserRentBookings />} />
        <Route path="/sale/property/booking-details" element={<UserSaleBookings />} /> 
        <Route path="/all-sale/properties" element={<SaleProperty />} />
        <Route path="/all-rent/properties" element={<RentProperties />} />
        </>
       
        </Routes>
  )
}

export default VendorRouter