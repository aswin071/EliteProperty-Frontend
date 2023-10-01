import React, { useEffect, useState } from 'react';
import BlockUnblockModal from '../Layout/BlockUnblockModal';
import api from '../../api/axiosConfig';

import Loading from '../Layout/Loading';
import Sidebar from '../Layout/AdminSideBar';

function AdminUserMangement() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [blockAction, setBlockAction] = useState(true);
  const [userSearchInput, setUserSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await api.get('/users/user-profiles/');
        setUserProfiles(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleBlockUnblock = (userId) => {
    const newStatus = !blockAction;
    const endpoint = `/admin/block-unblock-user/${userId}/`;

    api
      .post(endpoint, { is_active: newStatus })
      .then((response) => {
        console.log('Block/Unblock response:', response);

        setUserProfiles((prevState) =>
          prevState.map((profile) =>
            profile.user.id === userId
              ? { ...profile, user: { ...profile.user, is_active: newStatus } }
              : profile
          )
        );

        closeUserModal();

        setBlockAction(newStatus);
      })
      .catch((error) => {
        console.error('Error blocking/unblocking user:', error);
      });
  };

  const openUserModal = (userId, blockAction) => {
    setSelectedUserId(userId);
    setBlockAction(blockAction);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const filteredUserProfiles = userProfiles.filter((profile) =>
    profile.user.username.toLowerCase().includes(userSearchInput.toLowerCase()) ||
    profile.user.email.toLowerCase().includes(userSearchInput.toLowerCase())
  );

  const handleUserSearchChange = (event) => {
    setUserSearchInput(event.target.value);
  };

  return (
    <div className="flex ">
      <Sidebar />
     
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="text-2xl text-black font-medium lg:block">User Management</h5>
            <button className="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex space-x-4">
              <div className="md:block">
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="userSearchInput"
                    id="userSearchInput"
                    placeholder="Search here"
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                    value={userSearchInput}
                    onChange={handleUserSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">User</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">First Name</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Last Name</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Email Address</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Phone Number</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">is_verified</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserProfiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="bg-white border-b"
                    >
                      <td className="flex px-3 py-2 md:px-6  text-black md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {profile.user.username}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.first_name}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.last_name}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.email}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.phone_number}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.is_verified ? <p>Verified</p> : <p>Not Verified</p>}
                      </td>
                      <td>
                        <button
                          onClick={() => openUserModal(profile.user.id, profile.user.is_active)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
                        >
                          {profile.user.is_active ? <>Block</> : <>Unblock</>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
       {/* User Block/Unblock Modal */}
       <BlockUnblockModal
        isOpen={isUserModalOpen}
        onRequestClose={closeUserModal}
        onConfirm={() => handleBlockUnblock(selectedUserId, true)}
      />

    </div>
  );
}

export default AdminUserMangement;
