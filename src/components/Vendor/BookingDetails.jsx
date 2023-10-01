import React from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import { Link } from 'react-router-dom';

function BookingDetails() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <VendorSidebar />
      </div>
      <div className="w-3/4 p-4">
        <div className="text-center">
          <h2 className="font-bold text-2xl">Booking History</h2>
        </div>
        <div className="container w-full mt-5" style={{ maxWidth: '800px' }}>
          <div className="container w-full">
            {/* Sale Bookings Section */}
            <div className="flex flex-col md:flex-row justify-between items-center p-10 bg-cyan-600 text-white rounded-lg">
              <div className="m-auto">
                <div className="text-center">
                  <h2 className="font-bold text-2xl  p-2 mb-4">All Sale Bookings</h2>
                </div>
                <div className="pt-2 flex justify-center gap-x-3">
                  <Link to="/vendor/sale/property/booking-details">
                    <button
                      data-variant="flat"
                      className="w-48 bg-teal-800 rounded-full transition ease-in-out duration-300 font-semibold text-white hover:bg-gray-800 py-3 lg:py-4 hover:text-white mt-2 flex-shrink-0"
                    >
                      View Sale Bookings
                    </button>
                  </Link>
                  <Link to="/vendor/">
                    <button
                      data-variant="flat"
                      className="w-48  bg-teal-800 rounded-full transition ease-in-out duration-300 font-semibold text-white hover:bg-gray-800 py-3 lg:py-4 hover:text-white mt-2 flex-shrink-0"
                    >
                      Total Sale Amount
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Rent Bookings Section */}
            <div className="flex flex-col md:flex-row justify-between items-center p-10 bg-cyan-600 text-white rounded-lg mt-5">
              <div className="m-auto">
                <div className="text-center">
                  <h2 className="font-bold text-2xl  p-2 mb-4">All Rent Bookings</h2>
                </div>
                <div className="pt-2 flex justify-center gap-x-3">
                  <Link to="/vendor/rent/property/booking-details">
                    <button
                      data-variant="flat"
                      className="w-48 bg-teal-800 rounded-full transition ease-in-out duration-300 font-semibold text-white hover:bg-gray-800 py-3 lg:py-4 hover:text-white mt-2 flex-shrink-0"
                    >
                      View Rent Bookings
                    </button>
                  </Link>
                  <Link to="/vendor/add-property">
                    <button
                      data-variant="flat"
                      className="w-48  bg-teal-800 rounded-full transition ease-in-out duration-300 font-semibold text-white hover:bg-gray-800 py-3 lg:py-4 hover:text-white mt-2 flex-shrink-0"
                    >
                      Total Rent Amount
                    </button>
                  </Link>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
