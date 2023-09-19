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



function SingleProperty() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [vendorProfile, setVendorProfile] = useState({});
  const [vendorDetails, setVendorDetails] = useState({});
  const [isInterestSent, setIsInterestSent] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ fromDate: null, toDate: null });

  // const [value, onChange] = useState<Value>(new Date());

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

  return (
    <div>
      <NavbarDefault />
     
      {property && (
        <div className="container mx-auto p-6">
          <div className="flex">
            <div className="w-1/2">
              <img
                src={process.env.REACT_APP_API_BASE_URL + property.image1}
                alt={property.title}
                className="w-full h-64 object-cover rounded-l-lg"
              />
            </div>
            <div className="w-1/2">
              <img
                src={process.env.REACT_APP_API_BASE_URL + property.image2}
                alt={property.title}
                className="w-full h-64 object-cover rounded-r-lg"
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-2/3 p-6">
              <h1 className="text-3xl font-semibold text-gray-800">{property.title}</h1>
              <h1 className="text-3xl font-semibold text-gray-800">{property.property_type}</h1>
              <div className="flex justify-between mt-4">
              {property.property_type === 'Rent' && (
                <div>
                 
                  <div>
                    <label htmlFor="fromDate">From Date:</label>
                    <input type="date" id="fromDate" name="fromDate" />
                  </div>
                  <div>
                    <label htmlFor="toDate">To Date:</label>
                    <input type="date" id="toDate" name="toDate" />
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    
                    
                  >
                    Book
                  </button>
                </div>
              )}
              {property.price && (
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
  );
}

export default SingleProperty;