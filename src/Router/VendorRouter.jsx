import React from 'react'
import { Routes, Route } from 'react-router-dom'
import VendorDashboard from '../components/Vendor/VendorDashboard'
import VendorRegistration from '../components/Vendor/VendorRegistration'
import PropertyManagement from '../components/Vendor/PropertyManagement'
import PropertyListing from '../components/Vendor/PropertyListing'
import PropertyInquiries from '../components/Vendor/PropertyInquiries'
import PropertyInquiriesDetails from '../components/Vendor/PropertyInquiryDetails'
import { useSelector } from 'react-redux';
import BookingDetails from '../components/Vendor/BookingDetails'






function VendorRouter() {
  const user = useSelector((state) => state.user);
  const isVendor = user && user.user_type === 'Vendor';
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
        </>
       
        </Routes>
  )
}

export default VendorRouter