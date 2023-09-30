import React, { useState } from 'react';
import RequestedPropertyDetails from './RequestedPropertyDetails'; // Import your components
import UserProperties from './UserProperties'; // Import your components
import { NavbarDefault } from '../Layout/Navbar';

function UserBookings() {
    const [activeTab, setActiveTab] = useState('RENT'); // Default to 'RENT'

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <NavbarDefault/>
            <div className="  bg-gray-200">
        <div className="flex flex-wrap">
            <div className="w-full">
                <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                    <li className={`-mb-px mr-2 last:mr-0 flex-auto text-center ${activeTab === 'RENT' ? 'border-b-2 border-primary-600' : ''}`}>
                        <a
                            className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-dark bg-primary-600"
                            onClick={() => handleTabClick('RENT')}
                            role="tab"
                        >
                            RENT
                        </a>
                    </li>
                    <li className={`-mb-px mr-2 last:mr-0 flex-auto text-center ${activeTab === 'SALE' ? 'border-b-2 border-primary-600' : ''}`}>
                        <a
                            className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-dark bg-primary-600"
                            onClick={() => handleTabClick('SALE')}
                            role="tab"
                        >
                            SALE
                        </a>
                    </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                    <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                            {activeTab === 'RENT' && (
                                <div id="rent" role="tabpanel">
                                    <UserProperties /> 
                                </div>
                            )}
                            {activeTab === 'SALE' && (
                                <div id="sale" role="tabpanel">
                                    <RequestedPropertyDetails /> 
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default UserBookings;
