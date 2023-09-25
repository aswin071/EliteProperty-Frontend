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
 
  const propertiesPerPage = 4;
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

      <div className="max-w-screen-lg mx-auto">
        <div className="text-center mt-8 mb-4"></div>
        <div className="flex flex-wrap justify-center">
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
            .slice(
              (currentPage - 1) * propertiesPerPage,
              currentPage * propertiesPerPage
            )
            .map((property) => (
              <div
                key={property.id}
                className="max-w-sm rounded overflow-hidden shadow-lg m-4"
              >
                <div className="h-48 w-full relative">
                  <img
                    src={process.env.REACT_APP_API_BASE_URL + property.image1}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{property.title}</div>

                  <p className="text-gray-700 text-base">
                    Price: {property.price}
                  </p>
                  <p className="text-gray-700 text-base">
                    Location: {property.location}
                  </p>
                  <p className="text-gray-700 text-base">
                    Vendor: {property.vendor.username}
                  </p>

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
