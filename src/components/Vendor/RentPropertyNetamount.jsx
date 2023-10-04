import React, { useState, useEffect } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';
import ReactPaginate from 'react-js-pagination';

function SalePropertyNetamount() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [saleNetAmount, setSaleNetAmount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/vendors/rent/netamount/');
        setData(response.data);
        console.log('transaction', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const totalItemsCount = data.deposit_details?.length || 0;
  const pageCount = Math.ceil(totalItemsCount / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the current page of data
  const offset = (currentPage - 1) * itemsPerPage;
  const currentData = data.deposit_details?.slice(offset, offset + itemsPerPage);


  return (
    <div className="flex">
      
    <div class="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
    <VendorSidebar />
    <div class="relative  md:ml-64 bg-blueGray-100 w-full">
  
    <div className="flex-1 bg-gray-300 ">
      <main className="container mx-auto mt-16  ">
        <div className="grid grid-cols-1   gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 rounded-lg bg-gray-600 mt-5 shadow">
            <h2 className="text-2xl font-semibold text-gray-800">
              Net Amount
            </h2>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{data.net_amount}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg bg-gray-600 mt-5 shadow">
            <h2 className="text-2xl font-semibold text-gray-800">
              Commission Expenses(15%)
            </h2>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{data.commission_total}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg bg-gray-600 mt-5 shadow">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total Profit
            </h2>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-green-700">
                ₹{data.rent_total}
              </span>
            </div>
          </div>
        </div>
      </main>
      <div className="col-span-3 mt-5 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-sm text-gray-600 font-bold tracking-wide">
      Transactions
    </h2>
  </div>
  <div className="overflow-x-auto">
    <div className="inline-block w-full shadow rounded-lg overflow-hidden">
      <table className="w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Property
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rent Amount
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Admin Payment
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Transaction Type
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((deposit, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {deposit.property_details.property_title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {deposit.rent_amount}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {data.commission_details[index].amount}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">Online</span>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
        <span className="text-xs xs:text-sm text-gray-900">
          Showing 1 to 4 of 50 Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
            Prev
          </button>
          <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
            Next
          </button>
        </div>
      </div>
    </div>
</div>
</div>
</div>
</div>
</div>
</div>




  );
}

export default SalePropertyNetamount;
