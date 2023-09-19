import React, { useEffect, useState } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

function PropertyListing() {
  const [propertylist, setPropertylist] = useState([]); 
  const [userSearchInput, setUserSearchInput] = useState('');
  const [saleProperties, setSaleProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const userResponse = await api.get('property/view-property/');
        setPropertylist(userResponse.data);
        console.log(userResponse.data)
      } catch (error) {
        console.error('Error fetching properties', error);
      }
    }

    fetchPropertyData();
  }, []);

  
  useEffect(() => {
    const saleProps = propertylist.filter((property) => property.property_type === 'Sale');
    const rentProps = propertylist.filter((property) => property.property_type === 'Rent');
    setSaleProperties(saleProps);
    setRentProperties(rentProps);
    
  }, [propertylist]);

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      // Make an API request to update the property status
      await api.put(`vendors/update-status/${propertyId}/`, { status: newStatus });
      
      // Update the local state to reflect the change
      setPropertylist((prevState) => {
        const updatedProperties = prevState.map((property) => {
          if (property.id === propertyId) {
            return { ...property, status: newStatus };
          }
          return property;
        });
        return updatedProperties;
      });
      
    } catch (error) {
      console.error('Error updating property status', error);
    }
  };
  

  // Render a property card
  const renderPropertyCard = (property) => (
    <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src={process.env.REACT_APP_API_BASE_URL + property.image1}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-700 mb-2">Description: {property.description}</p>
        <p className="text-gray-700 mb-2">Price: ${property.price}</p>
        <p className="text-gray-700 mb-2">Location: {property.location}</p>
        <p className="text-gray-700 mb-2">Property For: {property.property_type}</p>
        <div className="mb-2">
      <label htmlFor={`statusSelect_${property.id}`} className="block font-semibold mb-1">Status:</label>
      <select
        id={`statusSelect_${property.id}`}
        value={property.status}
        onChange={(e) => handleStatusChange(property.id, e.target.value)}
        className="border rounded py-2 px-3 w-full"
      >
        <option value="Available">Available</option>
        <option value="Reserved">Reserved</option>
        <option value="Sold">Sold</option>
      </select>
    </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <div className="w-1/4">
        <VendorSidebar />
      </div>
      <div className="w-3/4 p-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Your Properties</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search Properties"
              value={userSearchInput}
              onChange={(e) => setUserSearchInput(e.target.value)}
              className="border rounded py-2 px-3 w-[300px]"
            />
             <Link to="/vendor/add-property">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add Property
            </button>
            </Link>
          </div>
          <div>
            <h3 className="text-2xl font-bold">For Sale</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {saleProperties
                .filter((property) =>
                  property.title.toLowerCase().includes(userSearchInput.toLowerCase())
                )
                .map((property) => renderPropertyCard(property))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mt-4">For Rent</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rentProperties
                .filter((property) =>
                  property.title.toLowerCase().includes(userSearchInput.toLowerCase())
                )
                .map((property) => renderPropertyCard(property))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyListing;
