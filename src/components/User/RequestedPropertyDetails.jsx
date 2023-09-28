import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

function RequestedPropertyDetails() {
    const [propertyDetails, setPropertyDetails] = useState([]);

    useEffect(() => {
        async function fetchPropertyDetails() {
            try {
                const response = await api.get('/users/requested-details/');
                setPropertyDetails(response.data || []); // Extract property booking data
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        }

        fetchPropertyDetails();
    }, []);

    return (
        <div>
  <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  <p>Property {booking.property_status}</p>
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
  </div>
</div>

    );
}

export default RequestedPropertyDetails;
