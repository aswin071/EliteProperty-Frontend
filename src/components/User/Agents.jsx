import React ,{ useState ,useEffect} from 'react';
import { NavbarDefault } from '../Layout/Navbar'
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { Footer } from '../Layout/Footer';



function Agents() {
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
  return (
    <div>

        <NavbarDefault/>
        <div className="mt-8 bg-gray-200">
  <h2 className="mb-4 mt-5 text-4xl font-extrabold text-gray-900 dark:text-dark text-center">
    Our Team
  </h2>
  <p className="mb-4 mt-3 text-center text-base  text-gray-600 dark:text-dark text-center">
  Discover our talented and experienced property agents.<br></br>
  Learn more about their expertise, years of experience, and specialization.
  Find the perfect agent to help you with your real estate needs.
  </p>
  

  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-wrap justify-center">
      {agentProfiles.map((profile) => (
        <div key={profile.id} className="w-80 py-6 px-6 bg-white shadow-lg rounded-lg m-4">
          <div className="flex justify-center md:justify-end -mt-16">
            <img
              className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
              src={process.env.REACT_APP_API_BASE_URL + profile.profile_photo}
              alt={profile.name}
            />
          </div>
          <div>
            <h2 className="text-gray-800 text-3xl font-semibold">{profile.vendor.username}</h2>
            <p className="mt-2 text-gray-600">Years of Experience: {profile.year_of_experience}</p>
            <p className="text-gray-600">Specialization: {profile.specialization}</p>
            <p className="text-gray-600">Description: {profile.description}</p>
            {/* Add more vendor details here */}
          </div>
          <div className="flex justify-end mt-4">
            <a href={profile.contactLink} className="text-xl font-medium text-indigo-500">
              Contact {profile.name}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
<Footer/>
</div>






  )
}

export default Agents