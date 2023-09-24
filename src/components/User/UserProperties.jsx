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
    <div>
      <NavbarDefault />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Your Properties</h1>
        {properties.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">No properties found.</p>
            <p className="mt-4">
              <Link to="/properties" className="text-blue-500 underline text-lg">Search for properties</Link>
            </p>
          </div>
        ) : (
          <div>
            {properties.map((property) => (
              <div key={property.id} className="mb-8 border p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{property.property.title}</h2>
                <h2 className="text-lg font-semibold">Amount Paid: {property.property.price}</h2>
                <p className="mt-2">
                  Check-in Date: {property.check_in_date}<br />
                  Check-out Date: {property.check_out_date}
                </p>
                <button
                  onClick={() => openVendorModal(property.property.vendor)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  View Vendor
                </button>
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
      <RequestedPropertyDetails />
    </div>
  );
}

export default UserProperties;
