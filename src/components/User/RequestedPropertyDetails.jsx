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
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
            <div className="flex flex-wrap">
                {propertyDetails.map((booking) => (
                    <div key={booking.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                            <div className="flex mt-3 flex-col items-center pb-10">
                                <img
                                    className="h-32"
                                    src={process.env.REACT_APP_API_BASE_URL + booking.property.image1}
                                    alt="Property"
                                />

                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">
                                    {booking.property.title}
                                </h5>
                                
                                <p>Status: {booking.status}</p>

                                {booking.is_paid ? (
                                    <div className="text-green-500 mb-2">Property Booked</div>
                                ) : (
                                    <>
                                        <div className="bg-green-500 text-white px-2 py-1 rounded-full mb-2">
                                        <p>Property {booking.property_status}</p>
                                        <p>Property ID:{booking.property.id}</p>
                                        </div>
                                        <Link to={`/book/property/${booking.property.id}`}>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                                                Book Property
                                            </button>
                                        </Link>
                                    </>
                                )}

                                {/* Display initial_deposit if available */}
                                {booking.initial_deposit !== null && (
                                    <p>Initial Deposit: ₹{booking.initial_deposit}</p>
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
