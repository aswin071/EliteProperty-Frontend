import React, { useState, useEffect } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PropertyInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const authToken = useSelector(state => state.accessToken);
  const [propertylist, setPropertylist] = useState([]);

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const userResponse = await api.get('property/view-property/');
        setPropertylist(userResponse.data);
      } catch (error) {
        console.error('Error fetching properties', error);
      }
    }

    fetchPropertyData();
  }, []);



  return (
    <div className="flex">
      <div className="w-1/4">
        <VendorSidebar />
      </div>
      <div className="w-3/4 p-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4"></h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Properties for Sale and Rent</h3>
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table header */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Type
                  </th>
                </tr>
              </thead>
          
              <tbody className="bg-white divide-y divide-gray-200">
                {propertylist.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={process.env.REACT_APP_API_BASE_URL + property.image1}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.property_type}
                    </td>
                    <td>
                    <Link to={`/vendor/property/inquiries/details/${property.id}`}>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => console.log('Id:', property.id)}
                  >
                    Check Enquiries
                  </button>
                  </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyInquiries;
