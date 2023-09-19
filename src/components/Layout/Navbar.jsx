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

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to='/'>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Home
        </Typography>
      </Link>
      <Link to='/rent/property'>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Rent
        </Typography>
      </Link>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        Buy
      </Typography>
      <Link to='/properties'>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Properties
        </Typography>
      </Link>
      <Link to='/agents'>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Agents
        </Typography>
      </Link>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 bg-blue-500 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          EliteProperty
        </Typography>
        <div className="lg:hidden">
          <IconButton
            variant="text"
            className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <div className="hidden lg:block">{navList}</div>
        {user ? (
          <div className="relative inline-block text-left">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={toggleDropdown}
            >
              {user.username}
            </Button>
            {isDropdownVisible && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link to="/profile">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                  </Link>
                  <button
                    // onClick={handleLogout} // Implement the logout function
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Logout />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button variant="gradient" size="sm" className="hidden lg:inline-block">
              <span>Signin</span>
            </Button>
          </Link>
        )}
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {user ? (
            <Link to="/profile">
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Profile</span>
              </Button>
            </Link>
          ) : (
            <>
              {navList}
              <Link to="/login">
                <Button variant="gradient" size="sm" fullWidth className="mb-2">
                  <span>Signin</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}
