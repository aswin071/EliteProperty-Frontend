import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import VendorSidebar from '../Layout/VendorSidebar';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function PropertyInquiriesDetails() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(''); // Define selectedStatus state
  const { propertyId } = useParams();

  // Create a state to manage deposit amounts for each inquiry
  const [depositAmounts, setDepositAmounts] = useState({});

  const sendStatusChangeRequest = async (inquiryId) => {
    try {
      // Get the deposit amount for the specific inquiry
      const depositAmount = depositAmounts[inquiryId];

      const response = await api.post(`/vendors/manage-property-status/${propertyId}/`, {
        property_status: selectedStatus,
        deposit_amount: depositAmount,
      });

      if (response.status === 200) {
        toast.success('Response sent to User');
      } else {
        toast.error('An error occurred');
      }
      console.log('Property Status:', selectedStatus);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during login.');
    }
  };

  useEffect(() => {
    async function fetchPropertyInquiries() {
      try {
        const response = await api.get(`vendors/property-inquiries/${propertyId}/`);
        setInquiries(response.data.inquiries);

        // Initialize deposit amounts for each inquiry with an empty string
        const initialDepositAmounts = {};
        response.data.inquiries.forEach((inquiry) => {
          initialDepositAmounts[inquiry.id] = '';
        });
        setDepositAmounts(initialDepositAmounts);

        console.log(setInquiries);
      } catch (error) {
        console.error('Error fetching property inquiries:', error);
      }
    }

    fetchPropertyInquiries();
  }, [propertyId]);

  return (
    <div className="flex">
    <div className="w-1/4">
      <VendorSidebar />
    </div>
    <div className="w-3/4 p-4">
      <h1 className="text-2xl font-bold mb-4">Inquiry Details</h1>
      {inquiries.length === 0 ? (
        <p>No inquiries</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Of the Property
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enter Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Send Response
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">{inquiry.user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inquiry.user.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                <select
                        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="">Property Status</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {selectedStatus === 'sold' ? (
                        'N/A'
                      ) : (
                        <div className="my-2">
                          <input
                            type="number"
                            className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter amount"
                            value={depositAmounts[inquiry.id]} // Use depositAmounts for the specific inquiry
                            onChange={(e) => {
                              // Update the deposit amount for the specific inquiry
                              setDepositAmounts((prevDepositAmounts) => ({
                                ...prevDepositAmounts,
                                [inquiry.id]: e.target.value,
                              }));
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => sendStatusChangeRequest(inquiry.id)} // Pass inquiryId as an argument
                      >
                        Send Response
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyInquiriesDetails;
