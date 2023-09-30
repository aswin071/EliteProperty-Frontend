import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarDefault } from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import VendorModal from './VendorModal';
import RequestedPropertyDetails from './RequestedPropertyDetails';

function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    api.get('/users/user-properties/')
      .then((response) => {
        console.log('API Response:', response.data);
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user properties:', error);
      });
  }, []);

  const openVendorModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsVendorModalOpen(true);
  };

  const closeVendorModal = () => {
    setIsVendorModalOpen(false);
  };

  return (
    
    <div className="container mx-auto p-6 "> 
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      {properties.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">No properties found.</p>
          <p className="mt-4">
            <Link to="/properties" className="text-blue-500 underline text-lg">Search for properties</Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((propertyData) => (
            <div key={propertyData.booking.id} className="border p-4 rounded-lg shadow-lg relative">
              <img
                src={process.env.REACT_APP_API_BASE_URL + propertyData.property.image1}
                alt={propertyData.property.title}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{propertyData.property.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{propertyData.property.address}</p>
              <h2 className="text-lg font-semibold">Amount Paid: ₹{propertyData.property.price}</h2>
              <p className="mt-2">
                Check-in Date: {propertyData.booking.check_in_date}<br />
                Check-out Date: {propertyData.booking.check_out_date}<br />
                Current Status: {propertyData.booking.status}
              </p>
              
            </div>
          ))}
        </div>
      )}

      {selectedVendor && (
        <VendorModal
          isOpen={isVendorModalOpen}
          onRequestClose={closeVendorModal}
          vendor={selectedVendor}
        />
      )}
    </div>
    
    
   
  );
}

export default UserProperties;
