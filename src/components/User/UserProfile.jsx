import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig'
import UserEditProfileModal from './UserEditProfileModal';
import { NavbarDefault } from '../Layout/Navbar';
import RequestedPropertyDetails from './RequestedPropertyDetails';
import { Footer } from '../Layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';



function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authToken = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    
    api
      .get('/users/user/profile/')
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const updateProfileDataInParent = (newProfileData) => {
      setProfileData(newProfileData);
    };

    
  return (
    <div>
      <NavbarDefault/>
      <div className="h-full  bg-gray-200">
      {profileData && (
       <>
      <div className="flex items-center justify-center">
      
       <h1>Welcome!..</h1>
       </div>
  <div className="flex flex-col items-center mt-20">
  <div className="w-full lg:w-2/3">
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <div className="flex items-center justify-center">
        <img
          src={process.env.REACT_APP_API_BASE_URL + profileData.profile_photo}
          className="w-40 h-40 border-4 border-white rounded-full object-cover"
          alt="User Profile"
        />
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-2xl">{user.username}</p>
        <div className="flex items-center space-x-2 mt-2">
          <span className="bg-blue-500 rounded-full p-1" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="4"d="M5 13l4 4L19 7"></path>  
            </svg>
          </span>
        </div>
        <p className="text-gray-700">
          {user.email} | {user.phone_number}
        </p>
        <div className="flex items-center space-x-4 mt-2" onClick={openModal}>
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
              ></path>
            </svg>
            <span>Edit Profile</span>
            
          </button>
          <Link to='/my-bookings'>
          <Button
        color="dark"
        pill
      >
        <p>My Properties
          
        </p>
      </Button>
          
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

        
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">{user.first_name} {user.last_name}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Birthday:</span>
                  <span className="text-gray-700">{profileData.date_of_birth}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Mobile:</span>
                  <span className="text-gray-700">{user.phone_number}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{user.email}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">State:</span>
                  <span className="text-gray-700">{profileData.state}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Country:</span>
                  <span className="text-gray-700">{profileData.country}</span>
                </li>
              </ul>
            </div>
            
          

          </div>
        </div>
        

       
        </>
        )}
      </div>
      <UserEditProfileModal isOpen={isModalOpen} closeModal={closeModal} updateProfileData={updateProfileDataInParent}/>

      <Footer/>
    </div>
    
  )
}

export default UserProfile