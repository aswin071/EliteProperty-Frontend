import React, { useEffect, useState } from 'react';
import Sidebar from '../Layout/AdminSideBar';
import api from '../../api/axiosConfig';
import Loading from '../Layout/Loading';

function PropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [approveProperty, setApproveProperty] = useState([]);
  const [propertyApprovalStatus, setPropertyApprovalStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        setLoading(true);
        const userResponse = await api.get('admin/properties/');
         
        setProperties(userResponse.data);
        setLoading(false);
      } catch (error) {
        
        setLoading(false);
      }
    }

    fetchPropertyData();
  }, []);

  const handlePublishUnpublish = (propId) => {
    
    const endpoint = `admin/property/approve/${propId}/`;

    api
      .post(endpoint)
      .then((response) => {
        
        setApproveProperty([...approveProperty, propId]);
      })
      .catch((error) => {
        
      });
  };

  
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(userSearchInput.toLowerCase())
  );

  
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

 
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const currentData = filteredProperties.slice(startIndex, endIndex);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h1 className="text-2xl font-semibold mb-4">Property Management</h1>

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={
                          process.env.REACT_APP_API_BASE_URL + property.image1
                        } 
                        alt={property.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm leading-5 font-medium text-gray-900">
                        {property.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    ₹{property.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    {property.address}
                  </div>
                </td>
                <td className="px-3 py-2 md:px-6 md:py-4">
                  {property.is_published ? (
                    <p className="text-green-500">Approved</p>
                  ) : (
                    <button
                      onClick={() => {
                        handlePublishUnpublish(property.id);
                      }}
                      className={`font-medium ${
                        approveProperty.includes(property.id)
                          ? 'text-green-500'
                          : 'text-blue-600 dark:text-blue-500 hover:underline'
                      } md:ml-2`}
                      disabled={approveProperty.includes(property.id)}
                    >
                      {approveProperty.includes(property.id)
                        ? 'Approved'
                        : 'Approve'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default PropertyManagement;
