import React, { useEffect, useState } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';

function SaleProperty() {
  const [propertylist, setPropertylist] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [saleProperties, setSaleProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
    <div
      key={property.id}
      className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
    >
      <h3 className="mb-3 text-xl font-bold text-indigo-600">{property.title}</h3>
      <div className="relative">
        <img
          className="w-full rounded-xl"
          src={ property.image1}
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
          <span className="text-indigo-600">Location:</span> {property.location}
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

  const totalPages = Math.ceil(filteredSaleProperties.length / itemsPerPage);

  // Function to handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the start and end indices for the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentData = filteredSaleProperties.slice(startIndex, endIndex);

  return (
    <div className="flex">
      <div className="w-1/4 bg-gradient-to-tr">
        <VendorSidebar />
      </div>
      <div className="w-3/4 bg-gradient-to-tr">
        <div className="mb-4">
          <label htmlFor="searchInput" className="block font-semibold mt-5">
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
            {currentData.map((property) => renderPropertyCard(property))}
          </div>
        </div>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div className="text-center mt-4">
            <ul className="pagination flex space-x-2">
              <li
                onClick={handlePrevPage}
                className={`cursor-pointer bg-gray-200 p-2 rounded-full ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="text-gray-600">&laquo;</span>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center ${
                    i + 1 === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-blue-300'
                  }`}
                >
                  {i + 1}
                </li>
              ))}
              <li
                onClick={handleNextPage}
                className={`cursor-pointer bg-gray-200 p-2 rounded-full ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="text-gray-600">&raquo;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleProperty;
