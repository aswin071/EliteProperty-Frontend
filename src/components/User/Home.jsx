

import Banner1 from '../../Images/Banner1.png';
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
  
  const reducedFontSize = {
    fontSize: '15px', 
  };

  return (
    <div>
    <NavbarDefault />
  
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 p-4 bg-gray-500 flex flex-col justify-center items-center text-center">
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" >
            "We help people find their dream house"
          </h1>
          <p className="text-black" style={reducedFontSize}>
            "Having trouble finding a place to stay? You came to the right place!
            By saving your money, you can find a house or apartment that's right
            for you."
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4 bg-gray-500">
          <div className="flex items-center mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <button className="px-4 text-white bg-purple-600 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div className="w-full md:w-2/6">
        <img src={Banner1} alt="Image" className="w-full h-[500px]" />
      </div>
    </div>
  
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
