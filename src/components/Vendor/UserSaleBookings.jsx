import React, { useState, useEffect } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';

function UserSaleBookings() {
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

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // Send a request to update the status to the server
      const response = await api.patch(`/vendors/property-bookings/${bookingId}/`, {
        status: newStatus,
      });

      if (response.status === 200) {
        // Update the status locally in the propertyBookings state
        setPropertyBookings((bookings) =>
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
        console.log(`Status updated for booking ${bookingId} to ${newStatus}`);
      } else {
        console.error(`Failed to update status for booking ${bookingId}`);
      }
    } catch (error) {
      console.error(`Error updating status for booking ${bookingId}:`, error);
    }
  };

  return (
    <div className="flex">
    <div className="w-1/4">
      
    </div>
    <div className="w-3/4 p-4">
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">User Sale Bookings</h1>
        <table className="shared-table min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Deposit Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Change Status
              </th>
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
                <td className="px-6 py-4 whitespace-no-wrap">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="complete">Complete</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  );
}

export default UserSaleBookings;
