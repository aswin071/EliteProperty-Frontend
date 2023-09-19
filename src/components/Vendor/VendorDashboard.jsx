import React from 'react';
import Logout from '../Auth/Logout';
import { useSelector } from 'react-redux';
import VendorProfile from './VendorProfile';
import PropertyManagement from './PropertyManagement';
import FreelancerSidebar from '../Layout/VendorSidebar';


function VendorDashboard() {
  const user = useSelector((state) => state.user);
  //const isRegistered = user.is_registered;
  const vendorId = user.vendorId; // Assuming the vendor ID is stored in user.vendorId

  // Log the vendor ID
  console.log('Vendor ID:', vendorId);

  // Add a console.log statement to check the value of isRegistered
  //console.log('isRegistered:', isRegistered);

  return (
    <div>
      <FreelancerSidebar/>
      
    </div>
  );
}

export default VendorDashboard;
