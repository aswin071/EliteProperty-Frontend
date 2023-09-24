import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from '../../api/axiosConfig';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    maxWidth: '50%',
    width: 'auto',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

function VendorModal({ isOpen, onRequestClose, vendorId }) {
  const [vendorDetails, setVendorDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    api.get('/users/user-properties/')
      .then((response) => {
        
        const vendorData = response.data.property.vendor;
        console.log(vendorData)
        setVendorDetails(vendorData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vendor details:', error);
        setIsLoading(false);
      });
  }, [vendorId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Vendor Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
      className="fixed inset-0 flex items-center justify-center z-50"
      style={customStyles}
    >
      <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-medium text-gray-800">Vendor Details</h1>
          <button
            onClick={onRequestClose}
            className="text-gray-600 focus:outline-none hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-5">
            {/* <p className="text-lg font-semibold">Vendor Name: {vendorDetails.vendor_profile.}</p> */}
            <p className="mt-2">Email: {vendorDetails.vendor_profile.email}</p>
            <p>Phone Number: {vendorDetails.vendor_profile.phone_number}</p>
            {/* Add other vendor information as needed */}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default VendorModal;
