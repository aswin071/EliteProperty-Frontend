import React, { useState, useEffect } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';

function BookingDetails() {
  const [propertyBookings, setPropertyBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/vendors/property-bookings/');
        setPropertyBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching property bookings:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="w-1/4">
        <VendorSidebar />
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Vendor Property Bookings</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                
                <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Deposit Amount
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                {/* Add other headers as needed */}
              </tr>
            </thead>
            <tbody>
              {propertyBookings.map((booking) => (
                <tr key={booking.id}>
                 
                  <td className="px-6 py-4 whitespace-no-wrap">{booking.user_details.username}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{booking.deposit_amount}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{booking.property_details.property_title}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{booking.booking_date}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
