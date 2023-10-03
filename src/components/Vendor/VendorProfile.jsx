import React, { useState, useEffect } from 'react';
import VendorSidebar from '../Layout/VendorSidebar';
import api from '../../api/axiosConfig';

function VendorProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);


  useEffect(() => {
    // Fetch profile data
    api
      .get('/vendors/vendor-profile/')
      .then((response) => {
        setProfileData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  // Function to close the modal
  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <div>
      <VendorSidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="bg-white">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow-xl rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={process.env.REACT_APP_API_BASE_URL + profileData?.profile_photo}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="Profile Photo"
                    />
                    <h1 className="text-xl font-bold">
                      {profileData?.vendor.first_name}
                    </h1>
                    <p className="text-gray-600">{profileData?.specialization}</p>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-800 uppercase font-bold tracking-wider mb-2">
                      Personal Details
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-gray-700">
                        <p className="mb-2">Status:</p>
                        <p className="mb-2">Year of Experience:</p>
                        <p className="mb-2">Date of Birth:</p>
                        <p className="mb-2">Age:</p>
                        <p className="mb-2">City:</p>
                        <p className="mb-2">State:</p>
                        <p className="mb-2">Country:</p>
                      </div>
                      <div className=' font-semibold'>
                        <p className="mb-2">
                          {profileData?.is_registered ? 'Registered' : 'Not Registered'}
                        </p>
                        <p className="mb-2">{profileData?.year_of_experience}</p>
                        <p className="mb-2">{profileData?.date_of_birth}</p>
                        <p className="mb-2">{profileData?.age}</p>
                        <p className="mb-2">{profileData?.city}</p>
                        <p className="mb-2">{profileData?.state}</p>
                        <p className="mb-2">{profileData?.country}</p>
                      </div>
                    </div>
                            <div className="col-span-4 sm:col-span-3 text-center">
                                {/* <button onClick={openEditProfileModal}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-3"
                                    >
                                    
                                </button> */}
                            </div>
                            
                            </div>
                            </div>
                            </div>
                                

                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white shadow-xl rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">About Me</h2>
                                <p className="text-gray-700">"Lorem ipsum" is a placeholder text commonly used in the printing and typesetting industry. It's used when the actual content is not available or when the focus is on the design and layout rather than the text itself.
                                    
                                </p>
                                </div>
                            <div className="bg-white shadow-xl rounded-lg p-6 mt-5">
                                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                                <>
                                   
                                    <div className="mb-6" >
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-bold"></span>
                                            <p>
                                            "Lorem ipsum" is a placeholder text commonly used in the printing and typesetting industry. It's used when the actual content is not available or when the focus is on the design and layout rather than the text itself.
                                            </p>
                                        </div>
                                        <p className="mt-2"></p>
                                    </div>
                                
                                </>
                            </div>
                            <div className="bg-white shadow-xl rounded-lg p-6 mt-5">
                                <h2 className="text-xl font-bold mt-6 mb-4"></h2>
                                
                                    
                                    <div className="mb-6" >
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-bold"></span>
                                            <p>
                                            "Lorem ipsum" is a placeholder text commonly used in the printing and typesetting industry. It's used when the actual content is not available or when the focus is on the design and layout rather than the text itself.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
   
    
)
}

export default VendorProfile