import React, { useEffect, useState } from 'react';
import Sidebar from '../Layout/AdminSideBar';
import api from '../../api/axiosConfig';

function AdminCommission() {
  const [commissionDetails, setCommissionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/admin/commission-view/');
        setCommissionDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching commission details:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.ceil(commissionDetails.length / itemsPerPage);

  // Calculate the start and end indices for the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentData = commissionDetails.slice(startIndex, endIndex);

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

  return (
    <div className="flex">
      <Sidebar />

      <div className="md:ml-64 bg-blueGray-100 w-full p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold mb-6">Commission Details</h1>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((commission) => (
                    <tr key={commission.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{commission.property.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{commission.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{commission.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{commission.property.vendor.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
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
  );
}

export default AdminCommission;
