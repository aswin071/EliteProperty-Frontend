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
    <>
      {/* Add your navigation links here */}
      <Link to="/">Home</Link>
      <Link to="/properties">Property</Link>
      <Link to="/agents">Agents</Link>
    </>
  );



  return (

    <nav class="bg-white">
        <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div class="flex justify-between items-center">
               <div class="text-2xl font-bold text-gray-800 md:text-3xl">
                    <a href="#">EliteProperty</a>
               </div>
                <div class="md:hidden">
                    <button type="button" class="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path class="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
                            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-col md:flex-row hidden md:block -mx-2">
            <Link to="/" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Home</Link>
            <Link to="/properties" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Property</Link>
            <Link to="/agents" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Agents</Link>    
            <Link to="/login" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">SignIn</Link>            
            {user ? (
            <div className="relative inline-block text-left">
              <Button
                variant="gradient"
                size="sm"
                className="lg:inline-block"
              >
                {user.username}
              </Button>
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  // onClick={handleLogout} // Implement the logout function
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <Logout />
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="gradient" size="sm" className="lg:inline-block">
                <span>SignIn</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>

      //       {/* {user ? (
      //        <div className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
      //        <Button
      //          variant="gradient"
      //          size="sm"
      //          className="hidden lg:inline-block"
      //          onClick={toggleDropdown}
      //        >
      //          {user.username}
      //        </Button>
      //        {isDropdownVisible && (
      //          <div className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
      //            <div
      //              className="py-1"
      //              role="menu"
      //              aria-orientation="vertical"
      //              aria-labelledby="options-menu"
      //            >
      //              <Link to="/profile">
      //                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      //                  Profile
      //                </button>
      //              </Link>
      //              <button
                     
      //                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      //              >
      //                <Logout />
      //              </button>
      //            </div>
      //          </div>
      //        )}
      //      </div>
      //    ) : (
      //      <Link to="/login">
      //        <Button variant="gradient" size="sm" className="hidden lg:inline-block">
      //          <span>Signin</span>
      //        </Button>
      //      </Link>
      //    )}
      //  </div>
      //  <MobileNav open={openNav}>
      //    <div className="container mx-auto">
      //      {user ? (
      //        <Link to="/profile">
      //          <Button variant="gradient" size="sm" fullWidth className="mb-2">
      //            <span>Profile</span>
      //          </Button>
      //        </Link>
      //      ) : (
      //        <>
               
      //          <Link to="/login">
      //            <Button variant="gradient" size="sm" fullWidth className="mb-2">
      //              <span>Signin</span>
      //            </Button>
      //          </Link>
      //        </>
      //      )} */}
         
      //  {/* </MobileNav> */}
      //       {/* {user ? (
      //       <div className="relative">
      //         <button
      //           onClick={toggleDropdown}
      //           className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
      //         >
      //           {user.username}
      //         </button>
      //         {isDropdownVisible && (
      //           <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-lg">
      //             <Link
      //               to="/profile"
      //               className="block px-4 py-2 text-gray-800 hover:bg-gray-900 hover:text-gray-100"
      //             >
      //               Profile
      //             </Link>
      //             <Logout />
      //           </div>
      //         )}
      //       </div>
      //     ) : (
      //       <Link
      //         to="/login"
      //         className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
      //       >
      //         SignIn
      //       </Link>
      //     )} */}
           
           
      

    //  <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8  lg:py-4">
    //   <div className="container mx-auto flex items-center justify-between">
    //     <Typography
    //       as="a"
    //       href="#"
    //       className="mr-4 cursor-pointer py-1.5 font-medium"
    //     >
    //       EliteProperty
    //     </Typography>
    //     <div className="lg:hidden">
    //       <IconButton
    //         variant="text"
    //         className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
    //         ripple={false}
    //         onClick={() => setOpenNav(!openNav)}
    //       >
    //         {openNav ? (
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             className="h-6 w-6"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             strokeWidth={2}
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M6 18L18 6M6 6l12 12"
    //             />
    //           </svg>
    //         ) : (
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-6 w-6"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth={2}
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M4 6h16M4 12h16M4 18h16"
    //             />
    //           </svg>
    //         )}
    //       </IconButton>
    //     </div>
    //     <div className="hidden lg:block">{navList}</div>
        // {user ? (
      //     <div className="relative inline-block text-left">
      //       <Button
      //         variant="gradient"
      //         size="sm"
      //         className="hidden lg:inline-block"
      //         onClick={toggleDropdown}
      //       >
      //         {user.username}
      //       </Button>
      //       {isDropdownVisible && (
      //         <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark ring-1 ring-black ring-opacity-5">
      //           <div
      //             className="py-1"
      //             role="menu"
      //             aria-orientation="vertical"
      //             aria-labelledby="options-menu"
      //           >
      //             <Link to="/profile">
      //               <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      //                 Profile
      //               </button>
      //             </Link>
      //             <button
      //               // onClick={handleLogout} // Implement the logout function
      //               className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      //             >
      //               <Logout />
      //             </button>
      //           </div>
      //         </div>
      //       )}
      //     </div>
      //   ) : (
      //     <Link to="/login">
      //       <Button variant="gradient" size="sm" className="hidden lg:inline-block">
      //         <span>Signin</span>
      //       </Button>
      //     </Link>
      //   )}
      // </div>
      // <MobileNav open={openNav}>
      //   <div className="container mx-auto">
      //     {user ? (
      //       <Link to="/profile">
      //         <Button variant="gradient" size="sm" fullWidth className="mb-2">
      //           <span>Profile</span>
      //         </Button>
      //       </Link>
      //     ) : (
      //       <>
      //         {navList}
      //         <Link to="/login">
      //           <Button variant="gradient" size="sm" fullWidth className="mb-2">
      //             <span>Signin</span>
      //           </Button>
      //         </Link>
      //       </>
      //     )}
      //   </div>
      // </MobileNav>
    // </Navbar>
  );
}
