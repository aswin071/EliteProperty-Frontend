import React, { useEffect, useState } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';

function SaleProperty() {
  const [propertylist, setPropertylist] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [saleProperties, setSaleProperties] = useState([]);

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const userResponse = await api.get('property/view-property/');
        setPropertylist(userResponse.data);
        console.log(userResponse.data);
      } catch (error) {
        console.error('Error fetching properties', error);
      }
    }

    fetchPropertyData();
  }, []);

  useEffect(() => {
    const saleProps = propertylist.filter((property) => property.property_type === 'Sale');
    setSaleProperties(saleProps);
  }, [propertylist]);

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      await api.put(`vendors/update-status/${propertyId}/`, { status: newStatus });

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

  const renderPropertyCard = (property) => (
        
    <div key={property.id} className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 className="mb-3 text-xl font-bold text-indigo-600">{property.title}</h3>
      <div className="relative">
        <img
          className="w-full rounded-xl"
          src={process.env.REACT_APP_API_BASE_URL + property.image1}
          alt={property.title}
          style={{ maxHeight: '200px' }}
        />
        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
          {property.status}
        </p>
      </div>
     
      <div className="my-4">
      <p className="text-gray-700 mb-2 font-semibold">
  <span>Price:</span> ₹{property.price}
</p>
<p className="text-gray-700 mb-2 font-semibold">
  <span className='ext-indigo-600'> Location:</span> {property.location}
</p>
<p className="text-gray-700 mb-2 font-semibold">
  <span>Property Size:</span> {property.property_size}BHK
</p>
<p className="text-gray-700 mb-2 font-semibold">
  <span>Number of Rooms:</span> {property.num_bedrooms}
</p>
<p className="text-gray-700 mb-2 font-semibold">
  <span>Number of Bathrooms:</span> {property.num_bathrooms}
</p>

        <div className="mb-2">
          <label htmlFor={`statusSelect_${property.id}`} className="block font-semibold mb-1">
            Status:
          </label>
          <select
            id={`statusSelect_${property.id}`}
            value={property.status}
            onChange={(e) => handleStatusChange(property.id, e.target.value)}
            className="border rounded py-2 px-3 w-full"
          >
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
      </div>
    </div>

  );

  const handleSearchInputChange = (e) => {
    setUserSearchInput(e.target.value);
  };

  // Filter the saleProperties array based on userSearchInput
  const filteredSaleProperties = saleProperties.filter((property) =>
    property.title.toLowerCase().includes(userSearchInput.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-1/4 bg-gradient-to-tr from-red-300 to-yellow-200">
        <VendorSidebar />
      </div>
      <div className="w-3/4 bg-gradient-to-tr from-red-300 to-yellow-200">
      <div className="mb-4">
              <label htmlFor="searchInput" className="block font-semibold mb-1">
                Search:
              </label>
              <input
                type="text"
                id="searchInput"
                value={userSearchInput}
                onChange={handleSearchInputChange}
                className="border rounded py-2 px-3 w-1/4"
                placeholder="Search by property title"
              />
            </div>
        <div className="min-h-screen flex flex-col justify-center items-center py-20">
          <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
            

            {filteredSaleProperties.map((property) => renderPropertyCard(property))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleProperty;
