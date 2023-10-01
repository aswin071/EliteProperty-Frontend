import React, { useEffect, useState } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

function PropertyListing() {

  return (
    
    <div className="flex">
      <div className="w-1/4">
        <VendorSidebar />
      </div>
      <div className="w-3/4 p-4">
      <div className="container w-full mt-5" style={{ maxWidth: '800px' }}>
        <div class="container w-full">
<div class="flex flex-col md:flex-row  justify-between items-center p-10 bg-slate-700 text-white rounded-lg">
    <div class="m-auto">
      <div class="text-center">
        <p></p>
        <h2 class="font-bold text-2xl border border-black p-2 mb-4">Property For Sale</h2>


      </div>
      <div class="pt-2 flex justify-center gap-x-3">
      
      </div>
    </div>

    <div class="w-full md:w-6/12 mt-5">
      <form class="w-full" noValidate>
        <div class="flex flex-col items-center">
          <div class=" w-full flex flex-col items-center space-y-2">
          <Link to="/vendor/all-sale/properties">
          <button
                data-variant="flat"
                class="w-48 bg-black rounded-lg transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-800 mt-2 flex-shrink-0"
            >
                <h2 class="lg:py-0.5 text-dark">View Properties</h2>
            </button>
            </Link>

            <Link to="/vendor/add-property">
            <button
                data-variant="flat"
                class="w-48 mt-5 bg-black rounded-lg transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-800 mt-2 flex-shrink-0"
            >
                <span class="lg:py-0.5">Add Property</span>
            </button>
            </Link>


        </div>
        </div>
      </form>
    </div>
  </div>
</div>
<div className="container w-full mt-5" style={{ maxWidth: '800px' }}>
<div class="flex flex-col md:flex-row justify-between items-center p-10 bg-slate-700 text-white rounded-lg">
    <div class="m-auto">
      <div class="text-center">
        <p></p>
        <h2 class="font-bold text-2xl border border-black p-2 mb-4">Property For Rent</h2>

      </div>
      <div class="pt-2 flex justify-center gap-x-3">
       
      </div>
    </div>

    <div class="w-full md:w-6/12">
      <form class="w-full" noValidate>
        <div class="flex flex-col items-center">
          <div class=" w-full flex flex-col items-center space-y-2">
            <Link to='/vendor/all-rent/properties'>
          <button
                data-variant="flat"
                class="w-48 bg-black rounded-lg transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-800 mt-2 flex-shrink-0"
            >
                <h2 class="lg:py-0.5 text-dark">View Properties</h2>
            </button>
            </Link>
            <Link to="/vendor/add-property">
            <button
                data-variant="flat"
                class="w-48 mt-5 bg-black rounded-lg transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-800 mt-2 flex-shrink-0"
            >
                <span class="lg:py-0.5">Add Property</span>
            </button>
            </Link>


        </div>
        </div>
      </form>
    </div>
  </div>
</div>
        
        
      </div>
    </div>
    </div>
  );
}

export default PropertyListing;
