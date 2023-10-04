import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import SaleInvoicePDF from './SaleInvoicePDF';

function RequestedPropertyDetails() {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyBookings, setPropertyBookings] = useState([]);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedPropertyForInvoice, setSelectedPropertyForInvoice] = useState(null);

  useEffect(() => {
    async function fetchPropertyDetails() {
      try {
        const response = await api.get('/users/requested-details/');
        setPropertyDetails(response.data || []);
        console.log('dat',response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    }

    fetchPropertyDetails();
  }, []);

  useEffect(() => {
    async function fetchPropertyBookingDetails() {
      try {
        const response = await api.get('/users/user-sale/bookings/');
        setPropertyBookings(response.data || []);
        
        
      } catch (error) {
        console.error('Error fetching property booking details:', error);
      }
    }

    fetchPropertyBookingDetails();
  }, []);

  const openInvoiceModal = (propertyBookings) => {
    setSelectedPropertyForInvoice(propertyBookings); // Set the selected property
    setIsInvoiceModalOpen(true); // Open the invoice modal
  };

  return (
    <div className="container mx-auto p-6 "> 
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      
      
      {propertyDetails.map((booking) => (
        <div key={booking.id} className="w-full p-4">
          <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <img
              className="h-48 w-full object-cover"
              src={process.env.REACT_APP_API_BASE_URL + booking.property.image1}
              alt="Property"
            />

            <div className="px-4 py-3">
              <h5 className="text-xl font-medium text-gray-900 dark:text-dark">
                {booking.property.title}
              </h5>

              {booking.is_paid ? (
                <div className="text-green-500 mt-1">Property Booked</div>
              ) : (
                <>
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full mt-2">
                    <p>Property {booking.property.status}</p>
                  </div>
                  <Link to={`/book/property/${booking.property.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                      Book Property
                    </button>
                  </Link>
                </>
              )}

              {booking.initial_deposit !== null && (
                <p className="mt-2">Initial Deposit: ₹{booking.initial_deposit}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      

     
      {propertyBookings.map((booking) => (
        <div key={booking.userbooking.id}>
          <h5>Current Status: {booking.userbooking.status}</h5>
          
        </div>
      ))}

      {propertyBookings.some((item) => item.userbooking.status === 'approved' ) && (
        
          <p className="mt-4">
            <a
              href="#"
              onClick={() => openInvoiceModal(propertyBookings)}
              className="text-blue-500 underline text-lg"
            >
              Download Invoice (PDF)
            </a>
          </p>
        
      )}

      {isInvoiceModalOpen && (
        <Modal isOpen={isInvoiceModalOpen} onRequestClose={() => setIsInvoiceModalOpen(false)}>
          <SaleInvoicePDF propertyBookings={selectedPropertyForInvoice} />
        </Modal>
      )}
    </div>

);
}

export default RequestedPropertyDetails;





