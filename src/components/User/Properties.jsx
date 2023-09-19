import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { Footer } from '../Layout/Footer';
import { Link } from 'react-router-dom';
import property_img from '../../Images/property.png'


function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const response = await api.get('users/properties/');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    }

    fetchPropertyData();
  }, []);

  return (
    <div>
    <NavbarDefault />
  
    <div className="mt-4  text-center">
  <img src={property_img} alt="Description of the image" className="w-full" />
  <div className="absolute top-1/2 left-1/5 transform -translate-y-1/2 text-white p-4 font-bold text-lg">
    <h1 className="text-white-600 text-2xl font-semibold">
      Discover Your Dream <br /> Home in the Perfect Location.
    </h1>
  </div>
</div>
  
    <div className="text-center mt-4">
      <h2 className="text-blue-500 text-2xl font-semibold">
        Explore Home with Us...
      </h2>
    </div>
  
    <div className="max-w-screen-lg mx-auto">
      <div className="text-center mt-8 mb-4">
        <h2 className="text-2xl font-bold">For Sale</h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {properties
          .filter(property => property.property_type === 'Sale')
          .map(property => (
            <div key={property.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
             <div className="h-48 w-full relative">
              <img
                src={process.env.REACT_APP_API_BASE_URL + property.image1}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{property.title}</div>
            
                <p className="text-gray-700 text-base">Price: {property.price}</p>
                <p className="text-gray-700 text-base">Vendor: {property.vendor.username}</p>
                
                <Link to={`/singleproperty/${property.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  
    <div className="max-w-screen-lg mx-auto mt-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">For Rent</h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {properties
          .filter(property => property.property_type === 'Rent')
          .map(property => (
            <div key={property.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
              <img
                src={process.env.REACT_APP_API_BASE_URL + property.image1}
                alt="Property"
                className="w-full h-50 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{property.title}</div>
                
                <p className="text-gray-700 text-base">Price: {property.price}</p>
                <p className="text-gray-700 text-base">Vendor: {property.vendor.username}</p>
               
                <Link to={`/singleproperty/${property.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  
    <Footer />
  </div>
  

  );
}

export default Properties;
