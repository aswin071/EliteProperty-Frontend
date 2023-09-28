

import Banner1 from '../../Images/Banner1.webp';
import { useSelector } from 'react-redux';
import { Navbar, navbar } from '@material-tailwind/react';
import { NavbarDefault } from '../Layout/Navbar';
import Logout from '../Auth/Logout';
import Banner2 from '../../Images/rounded.png'
import api from '../../api/axiosConfig';
import React ,{ useState ,useEffect} from 'react';
import { Footer } from '../Layout/Footer';
import { Link } from 'react-router-dom';




function Home() {
  const user = useSelector((state) => state.user);
  const [agentProfiles, setAgentProfiles] = useState([]);

  useEffect(() => {
    async function fetchAgentProfiles() {
      try {
        const agentResponse = await api.get('/vendors/vendor-home-view/',{
          headers: {
            AuthorizationRequired: false,
          },
        });
        setAgentProfiles(agentResponse.data);
      } catch (error) {
        console.error('Error fetching agent profiles:', error);
      }
    }

    fetchAgentProfiles();
  }, []);
  
   const bannerStyle = {
    clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)',
  };
  const reducedFontSize = {
    fontSize: '15px', 
  };

  return (
    <div>
    <NavbarDefault />
  
   
<div class="w-full">
    {/* <nav class="bg-white shadow-lg">
        <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div class="flex justify-between items-center">
               <div class="text-2xl font-bold text-gray-800 md:text-3xl">
                    <a href="#">Brand</a>
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
                <a href="#" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Home</a>
                <a href="#" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">About</a>
                <a href="#" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Contact</a>
            </div>
        </div>
    </nav> */}
    <div className="flex bg-white " style={{ height: '500px' }}>
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">Search For Your <span className="text-indigo-600">Home</span></h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates. Cumque debitis dignissimos id quam vel!</p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" href="#">Get Started</a>
              <a className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">Learn More</a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2" style={bannerStyle}>
          <img src={Banner1} alt="Image" className="w-full h-[500px]" />
          <div className="h-full bg-black opacity-25"></div>
        </div>
      </div>
    </div>
      {/* <div className="w-full md:w-2/6">
        <img src={Banner1} alt="Image" className="w-full h-[500px]" />
      </div>
    </div> */}
  
    <div className="mt-2 md:h-[250px]">
      <div className="flex flex-col justify-center items-center h-full text-center text-black">
        <h1 className="text-4xl md:text-5xl font-bold mt-1">
          Over a decade we’re still existing
        </h1>
        <div className="mt-4">
          <p className="text-lg">
            You might be wondering, what’s it like inside your house. You can
            choose whether it's fully furnished or not with our services.
          </p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row justify-center space-x-0 md:space-x-8">
          <div className="bg-white p-2 md:me-5 rounded-lg shadow-lg m-2">
            <p className="text-sm font-semibold">10+ Years</p>
            <p className="text-xs">of experience</p>
          </div>
  
          <div className="bg-white p-2 md:me-5 rounded-lg shadow-lg m-2">
            <p className="text-sm font-semibold">350+ Property</p>
            <p className="text-xs">Sold</p>
          </div>
  
          <div className="bg-white p-2 md:me-5 rounded-lg shadow-lg m-2">
            <p className="text-sm font-semibold">21 Experienced</p>
            <p className="text-xs">Agents</p>
          </div>
  
          <div className="bg-white p-2 rounded-lg shadow-lg m-2">
            <p className="text-sm font-semibold">7,25k Loyal</p>
            <p className="text-xs">Customers</p>
          </div>
        </div>
      </div>
    </div>
  
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <img src={Banner2} alt="Your Image" className="w-full h-[450px]" />
      </div>
  
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Invest for the future, Why not?
        </h1>
        <p>
          We seek out properties that can produce a regular, predictable return
          on investment, as well as the potential for capital appreciation. We
          also take the time to ensure that any properties we offer are
          high-quality, safe, and secure investments.
        </p>
        <Link to="/properties">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full inline-block mt-4">
            Explore
          </button>
        </Link>
      </div>
    </div>
  
    <div className="mt-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        OUR BEST SELLERS
      </h2>
      <div className="flex flex-wrap justify-center">
        {agentProfiles.map((profile) => (
          <div key={profile.id} className="w-full md:w-1/4 p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <img
                src={process.env.REACT_APP_API_BASE_URL + profile.profile_photo}
                alt="Profile Photo"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold">{profile.vendor.first_name}</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-2">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    <Footer />
  </div>
  
  );
}

export default Home;
