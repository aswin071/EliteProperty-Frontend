import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { Footer } from '../Layout/Footer';
import { Link } from 'react-router-dom';
import property_img from '../../Images/property.png';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [searchproperty, setSearchProperty] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
 
  const propertiesPerPage = 6;
  const [searchLocation, setSearchLocation] = useState('');

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

  // Calculate the total number of pages based on the properties and propertiesPerPage
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

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

  return (
    <div>
      <NavbarDefault />
      

      <div className="mt-4 text-center">
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
      <div className="text-center mt-4">
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border border-gray-400 rounded px-2 py-1"
        />
      </div>

      <div className="text-center mt-2">
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border border-gray-400 rounded px-2 py-1"
        >
          <option value="All">All Properties</option>
          <option value="Sale">Property for Sale</option>
          <option value="Rent">Property for Rent</option>
        </select>
      </div>

      {/* property card */}
      <div className="mt-4 flex justify-center items-center">
<div className="mt-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {properties
    .filter((property) =>
      property.title.toLowerCase().includes(searchproperty.toLowerCase())
    )
    .filter((property) =>
      filterOption === 'All'
        ? true // Show all properties
        : property.property_type === filterOption
    )
    .filter((property) =>
      searchLocation.trim() === ''
        ? true
        : property.location.toLowerCase().includes(searchLocation.toLowerCase())
    )
    .slice((currentPage - 1) * propertiesPerPage, currentPage * propertiesPerPage)
    .map((property) => (
      <Link to={`/singleproperty/${property.id}`}
 key={property.id} className="max-w-xs relative rounded overflow-hidden shadow-lg hover:shadow-xl">
        <img
          className="w-full h-40 transition-transform duration-300 transform hover:scale-105"
          src={process.env.REACT_APP_API_BASE_URL + property.image1}
          alt={`Property Image - ${property.title}`}
        />
        <div className="absolute top-2 left-2 rounded-full bg-blue-600 py-1 px-2 text-xs font-medium text-white">
          {property.property_type}
        </div>
        <div className="px-6 py-4">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-gray-900">{property.title}</h2>
            <p>Location: {property.location}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src="https://img.icons8.com/windows/24/null/bedroom.png" alt="Bedrooms" />
              <p className="ml-2 text-sm font-medium text-gray-700">{property.num_bedrooms} Bedrooms</p>
            </div>
            <div className="flex items-center">
              <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" alt="Bathrooms" />
              <p className="ml-2 text-sm font-medium text-gray-700">{property.num_bathrooms} Bathrooms</p>
            </div>
            <div className="flex items-center">
              <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" alt="Area" />
              <p className="ml-2 text-sm font-medium text-gray-700">{property.property_size} sqm</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-blue-800">₹{property.price}</p>
          </div>
        </div>
      </Link>
    ))}
</div>
</div>

      <div className="text-center mt-4">
  <ul className="pagination">
    <li onClick={handlePrevPage} className="cursor-pointer">
      <span>&laquo;</span> Previous
    </li>
    {Array.from({ length: totalPages }, (_, i) => (
      <li
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`cursor-pointer ${i + 1 === currentPage ? 'active' : ''}`}
      >
        {i + 1}
      </li>
    ))}
    <li onClick={handleNextPage} className="cursor-pointer">
      Next <span>&raquo;</span>
    </li>
  </ul>
</div>


      <Footer />
    </div>
  );
}

export default Properties;
