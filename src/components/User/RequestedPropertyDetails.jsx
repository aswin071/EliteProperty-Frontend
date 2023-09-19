import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

function RequestedPropertyDetails() {
    const [propertyDetails, setPropertyDetails] = useState([]);

    useEffect(() => {
        async function fetchPropertyDetails() {
            try {
                const response = await api.get('/users/requested-details/');
                setPropertyDetails(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        }

        fetchPropertyDetails();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Requested Property Details</h1>
            <div className="flex flex-wrap">
                {propertyDetails.map((property) => (
                    <div key={property.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                            <div className="flex mt-3 flex-col items-center pb-10">
                                <img
                                    className="h-32"
                                    src={process.env.REACT_APP_API_BASE_URL + property.property.image1}
                                    alt="Property"
                                />

                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">
                                    {property.property.title}
                                </h5>
                                <p>Price: ${property.property.price}</p>
                                <p>Location: {property.property.location}</p>

                                {property.property_status === 'available' && (
                                    <>
                                        <p>Deposit: {property.initial_deposit}</p>
                                        {property.is_paid ? (
                                            <div className="text-green-500 mb-2">Property Booked</div>
                                        ) : (
                                            <>
                                                <div className="bg-green-500 text-white px-2 py-1 rounded-full mb-2">
                                                    Property {property.property_status}
                                                </div>
                                                <Link to={`/book/property/${property.id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                                                        Book Property
                                                    </button>
                                                </Link>
                                            </>
                                        )}
                                    </>
                                )}
                                {property.property_status === 'sold' && (
                                    <div className="bg-red-500 text-white px-2 py-1 rounded-full mb-2">
                                        Property {property.property_status}
                                    </div>
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
