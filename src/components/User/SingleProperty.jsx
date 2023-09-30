import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { NavbarDefault } from '../Layout/Navbar';
import { Footer } from '../Layout/Footer';
import Login from '../Auth/Login';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { Carousel } from 'flowbite-react';


function SingleProperty() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [vendorProfile, setVendorProfile] = useState({});
  const [vendorDetails, setVendorDetails] = useState({});
  const [isInterestSent, setIsInterestSent] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ fromDate: null, toDate: null });
  const [bookButtonMessage, setBookButtonMessage] = useState('')
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [error, setError] = useState('');
  
 

  
  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await api.get(`/property/singleproperty/${id}/`);
        if (response.data.singledata) {
          const propertyData = response.data.singledata;

          setProperty(propertyData);
          setVendorProfile(propertyData.vendor.vendor_profile);
          setVendorDetails(propertyData.vendor.vendor_details);
          console.log('Property Object:', propertyData);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    }

    fetchProperty();
  }, [id]);

  

  const handleInterestClick = async () => {
    try {
      const response = await api.post('/users/book-property/', {
        property_id: property.id,
      });

      if (response.status === 200) {
        setIsInterestSent(true);
        toast.success('Request sent successfully. You can see your updates on your Profile');
      } else {
        toast.error('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleFromDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  
  const handleBookClick = async () => {
    try {
      if (!checkInDate || !checkOutDate) {
        toast.error('Please select both check-in and check-out dates.');
        return;
      }
  
      const response = await api.post('buyproperty/rent-booking/', {
        property_id: property.id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
      });
  
      if (response.status === 201) {
        setIsInterestSent(true);
        toast.success('Property Booked successfully.');
        window.location.href = `/property/rent/${property.id}`;
      } else if (response.status === 400 || response.status === 500) {
        
        const data = await response.json();
        setError(data.error_message);
      } else {
        toast.error('Dates are not avialable Please select another.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div>
      <NavbarDefault />
      
      <div className="mt-4  bg-gray-200">
      {property && (
        <div className="container mx-auto p-6 ">
          <div className="flex">
          <div className="w-1/2">
          <Carousel  className="w-full h-64 object-cover rounded-l-lg" >
      <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image1}
        className="w-full h-64 object-cover rounded-l-lg"
      />
      <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image2}
        className="w-full h-64 object-cover rounded-l-lg"
      />
      <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image3}
        className="w-full h-64 object-cover rounded-l-lg"
      />
      <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image2}
        className="w-full h-64 object-cover rounded-l-lg"
      />
      <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image1}
        className="w-full h-64 object-cover rounded-l-lg"
      />
    </Carousel>
        </div>
              
            
            <div className="w-1/2 ms-2">
             <Carousel>
             <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image2}
        className="w-full h-64 object-cover rounded-l-lg"
      />
        <img
        alt={property.title}
        src={process.env.REACT_APP_API_BASE_URL + property.image3}
        className="w-full h-64 object-cover rounded-l-lg"
      />

             </Carousel>
            </div>
          </div>

          <div className="flex">
            <div className="w-2/3 p-6">
              <h1 className="text-3xl font-semibold text-gray-800">{property.title}</h1>
              <h1 className="text-3xl font-semibold text-gray-800">{property.property_type}</h1>
              <div className="flex justify-between mt-4">
              {property.property_type === 'Rent' && (
        <div>
      <div className="flex">
  <div>
    <label htmlFor="fromDate">Check In:</label>
    <input
      type="date"
      id="fromDate"
      name="fromDate"
      value={checkInDate}
      onChange={handleFromDateChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
    />
  </div>
  <div>
    <label htmlFor="toDate">Check Out:</label>
    <input
      type="date"
      id="toDate"
      name="toDate"
      value={checkOutDate}
      onChange={handleToDateChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
    />
  </div>
</div>

          {error && <p className="error">{error}</p>}
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleBookClick}
        >
          Book
        </button>

       
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}     {property.price && (
                <h1 className="text-xl text-gray-700">
                  {property.property_type === 'Rent'
                    ? `₹${property.price} / per month`
                    : `₹${property.price}`}
                </h1>
              )}


                {property.property_type === 'Sale' && property.status === 'Available' && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleInterestClick}
                    disabled={isInterestSent}
                  >
                    {isInterestSent ? 'Request Sent' : 'Make a request'}
                  </button>
                )}
              </div>
              <hr className="my-4" />
              <p className="text-gray-700">
                <span className="font-bold">STATUS:</span>{' '}
                <span
                  className={`${
                    property.status === 'Available'
                      ? 'text-green-500'
                      : property.status === 'Reserved'
                      ? 'text-yellow-500'
                      : property.status === 'Sold'
                      ? 'text-red-500'
                      : ''
                  }`}
                >
                  {property.status}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-bold">ADDRESS:</span> {property.address}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Num_BedRooms:</span> {property.num_bedrooms}
              </p>
              <p className="text-gray-700">
                {' '}
                <span className="font-bold">Num_BathRooms:</span>
                {property.num_bathrooms}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">ABOUT:</span> {property.description}
              </p>
            </div>

            <div className="w-1/3 p-6">
              <div className="bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">Vendor Details</h2>
                  <img
                    src={process.env.REACT_APP_API_BASE_URL + vendorProfile.profile_photo}
                    alt="Vendor Profile"
                    className="w-20 h-20 rounded-full mx-auto"
                  />
                  <p className="text-gray-700"> Name: {vendorDetails.username}</p>
                  <p className="text-gray-700"> Email: {vendorDetails.email}</p>
                  <p className="text-gray-700"> Phone: {vendorDetails.phone_number}</p>
                  <p className="text-gray-700"> Year of Experience: {vendorProfile.year_of_experience}</p>

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Visit Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
    </div>
  );
}

export default SingleProperty;
