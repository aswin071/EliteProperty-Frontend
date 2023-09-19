import React ,{ useState ,useEffect} from 'react';
import { NavbarDefault } from '../Layout/Navbar'
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';



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
        <div className="mt-8">
  <h2 className="text-2xl font-semibold text-center mb-4">OUR BEST SELLERS</h2>
  <div className="flex flex-wrap justify-center">
    {agentProfiles.map((profile) => (
      <div key={profile.id} className="w-1/4 p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <img
            src={process.env.REACT_APP_API_BASE_URL + profile.profile_photo}
            alt="Profile Photo"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold">{profile.vendor.username}</h2>
          <p className="text-lg font-semibold">{profile.year_of_experience} years of experience</p>  
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-2">
            View
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  )
}

export default Agents