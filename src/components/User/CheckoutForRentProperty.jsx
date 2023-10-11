import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { NavbarDefault } from '../Layout/Navbar';

function CheckoutForRentProperty() {
    const user = useSelector((state) => state.user);
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState({});
    const [propertyId, setPropertyId] = useState(null);
    const [rentamount, setRentamount] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        async function fetchProperty() {
            try {
                const response = await api.get(`/users/rent/book/property/${id}/`);
                

                if (response.data.propertyData) {
                    const propertyData = response.data.propertyData[0]; 
                    

                    setPropertyData(propertyData);
                    setPropertyId(propertyData.property.id);
                    setRentamount(propertyData.property.price);
                    setCheckInDate(propertyData.check_in_date);
                    setCheckOutDate(propertyData.check_out_date);
                    setIsLoading(false); // Data is loaded
                }
            } catch (error) {
                
                setIsLoading(false); 
                setError('Error fetching property details.'); 
            }
        }

        fetchProperty();
    }, [id]);

    const initiatePayment = async () => {
        try {
            if (propertyId !== null && rentamount !== null && checkInDate !== null && checkOutDate !== null) {
                const response = await api.post('/buyproperty/initiate-rent-payment/', {
                    property_id: propertyId,
                    rent_amount: rentamount,
                    check_in_date: checkInDate,
                    check_out_date: checkOutDate,
                });

 

                if (response.status === 201) {
                    initPayment(response.data.order_response);
                }
            } else {
                setError('Error: Necessary details are missing.');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setError('Error initiating payment. Please try again.');
        }
    };

    const initPayment = (order) => {
        
        var options = {
            key: "rzp_test_mQPTW9W3qUgwIE",
            currency: "INR",
            name: "EliteProperty",
            description: "for testing",
            amount: order.amount,
            order_id: order.id,
            handler: function (response) {
                console.log(response);
                createBooking(response);
            },
            theme: {
                color: "#3399cc",
            },
        };

        var pay = new window.Razorpay(options);
        pay.open();
    };

    const createBooking = async (data) => {
        try {
            const requestData = {
                razorpay_order_id: data.razorpay_order_id,
            };

            const response = await api.post('/buyproperty/success-rent-payment/', { data });

            if (response.status === 200) {
                window.location.href = '/payment/success/';
            }
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div>
            <NavbarDefault />
            <div className="bg-gray-100 min-h-screen p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Checkout</h1>

                    {isLoading && <p>Loading...</p>}

                    {error && (
                        <div className="bg-red-500 text-white p-2 mb-4">
                            {error}
                        </div>
                    )}

                    {!isLoading && propertyData && (
                        <div className="border rounded p-4 mb-4">
                            <h2 className="text-xl font-semibold">Property Details</h2>
                            <h3 className="text-lg font-medium mb-2">{propertyData.property.title}</h3>
                            <img
                                src={process.env.REACT_APP_API_BASE_URL + propertyData.property.image1}
                                alt="Property Image"
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <div className="mt-4">
                                <p>Rent Amount: ₹{propertyData.property.price}/month</p>
                                <p>Check-in Date: {propertyData.check_in_date}</p>
                                <p>Check-out Date: {propertyData.check_out_date}</p>
                            </div>
                            <div className="mt-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={initiatePayment}>
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    )}

                    {!isLoading && propertyData && propertyData.property && (
                        <div className="border rounded p-4 mb-4">
                            <h2 className="text-xl font-semibold">Vendor Details</h2>
                            <p>Vendor Name: {propertyData.property.vendor.vendor_details.username}</p>
                            <p>Contact: {propertyData.property.vendor.vendor_details.phone_number}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckoutForRentProperty;
