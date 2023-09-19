import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { NavbarDefault } from '../Layout/Navbar';



function PropertyPayment() {
    const user = useSelector((state) => state.user);
    const { id } = useParams(); 
    const [propertyData, setPropertyData] = useState({});
    const [propertyId, setPropertyId] = useState(null);
    const [depositAmount, setDepositAmount] = useState(null);

    useEffect(() => {
        async function fetchProperty() {
            try {
                const response = await api.get(`/users/book/property/${id}/`);
                
                if (response.data.propertyData) {
                    const propertyData = response.data.propertyData;
                    setPropertyData(propertyData);
                    setPropertyId(propertyData.property.id); // Store the property ID
                    setDepositAmount(propertyData.initial_deposit); // Store the deposit amount
                }
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        }

        fetchProperty();
    }, [id]);

    const initiatePayment = async () => {
        try {
           
            const response = await api.post('/buyproperty/initiate-payment/', {
                property_id: propertyId,
                deposit_amount: depositAmount,
            });

            console.log("gg:",response.data.order_response)
            console.log('Payment:', response.data.order_response.id);
            console.log('p:',response.status)
            if(response.status==200){
                initPayment(response.data.order_response)
            }

           
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };
    const initPayment =(order)=>{

        console.log(order)
        var options={
            key:"rzp_test_mQPTW9W3qUgwIE",
            currency:"INR",
            name:"EliteProperty",
            description:"for testing",
            amount:order.amount,
            order_id:order.id,
            handler:function(response){
                createBooking(response)
            },
            theme:{
                color:"#3399cc"
            },
        }
        var pay= new window.Razorpay(options)
        pay.open()
    }
    const createBooking=async(data)=>{
        try{
        const requestData = {
            razorpay_order_id: data.razorpay_order_id,
         
        };
        const response = await api.post('/buyproperty/success-payment/',{data

        })
        console.log("Response from backend:", response.data);
        console.log("pa:",data)
        if (response.status === 200) {
            window.location.href = '/payment/success/';
        }
        }catch (error) {
            console.error('Error creating booking:', error);
        }  
    }

    return (
        <div>
            <NavbarDefault/>
            <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                
                {Object.keys(propertyData).length > 0 && (
                    <div className="border rounded p-4 mb-4">
                        <h2 className="text-xl font-semibold">Property Details</h2>
                        {/* Property title */}
                        <h3 className="text-lg font-medium mb-2">{propertyData.property.title}</h3>
                        
                        {/* Property image */}
                        <img
                            src={process.env.REACT_APP_API_BASE_URL + propertyData.property.image1}
                            alt="Property Image"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        
                        {/* Other property details */}
                        {/* ... */}
                        
                        {/* Deposit amount */}
                        <div className="mt-4">
                            <p>Deposit Amount: ${propertyData.initial_deposit}</p>
                        </div>

                        {/* Payment button */}
                        <div className="mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={initiatePayment}>
                                Pay Now
                            </button>
                        </div>
                    </div>
                )}

                {Object.keys(propertyData).length > 0 && (
                    <div className="border rounded p-4 mb-4">
                        <h2 className="text-xl font-semibold">Vendor Details</h2>
                        {/* Vendor details */}
                        <p>Vendor Name: {propertyData.property.vendor.vendor_details.username}</p>
                        <p>Contact: {propertyData.property.vendor.vendor_details.phone_number}</p>
                       
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

export default PropertyPayment;
