import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logout from '../Auth/Logout';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector(state => state.user);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 

  return (
   
      <nav className="bg-white">
        <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800 md:text-3xl">
              <a href="/">EliteProperty</a>
            </div>
            <div className="md">
              <button
                type="button"
                className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {/* Your menu icon */}
                </svg>
              </button>
            </div>
          </div>
  
          <div className="md:flex flex-col md:flex-row  md:block -mx-2">
            <Link to="/" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
              Home
            </Link>
            <Link to="/properties" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
              Property
            </Link>
            <Link to="/agents" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
              Agents
            </Link>
            <div className="relative inline-block text-left">
              {user ? (
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    {user.username}
                    <svg
                      className={`w-2.5 h-2.5 ml-2.5 ${isDropdownVisible ? 'transform rotate-180' : ''}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
  
                  {isDropdownVisible && (
                    <div
                      id="dropdown"
                      className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Profile
                          </Link>
                        </li>
                        <li>
                         <Logout/>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
                    SignIn
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    
  );
}


