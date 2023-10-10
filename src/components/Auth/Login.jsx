import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { setUser, setEmailAddress, setRefreshToken, setTokenExpiry, setAccessToken } from '../../redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../Images/logo.png'
import jwt_decode from "jwt-decode";

function Login() {
   

  //  var decoded = jwt_decode(token);  
  //  console.log(`decoded`,decoded);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailAddress = useSelector(state => state.emailAddress);
    const user = useSelector(state => state.user);
    const tokenExpiry = useSelector(state => state.tokenExpiry);
    const refreshToken = useSelector(state => state.refreshToken);
    const accessToken = useSelector(state => state.accessToken);

    console.log('Stored Email in Redux:', emailAddress);
    console.log('User Details in Reduxxxxxxxxxxxxxxxxxxxxxxxxxxx:', user);
    console.log('User Details token in Reduxttttttttttttttttttttt:', refreshToken);

  // if(user){
  //   try {
  //   var decoded = jwt_decode(refreshToken);  
  //   console.log(`decoded; --------------`,decoded);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
   
  //   useEffect(()=>{
  //     const token= localStorage.getItem('user')
  //     console.log(`token:` ,token)
  //     try {
  //     if(user && refreshToken ){
  //       console.log('user:',user)
  //     if(user.user_type="User"){
  //        navigate('/')
  //     }else if(user.user_type="Admin"){
  //       navigate('/admin');  
  //     }else if(user.user_type="Vender"){
  //       navigate('/vendor');
  //     }

  //   }else{
  //     navigate('/login')
  //   }} catch (error) {
  //       console.log(error);
  //     }
  //  })
      


    const handleLogin = async () => {
        try {
            const response = await api.post('/accounts/signin/', {
                email: email,
                password: password,
            });
            console.log('API Response Data:', response.data);
    
            if (response.status === 200) {
                const { user, access_token, refresh_token, token_expiry } = response.data;
                dispatch(setUser(user));
                dispatch(setEmailAddress(email));
                dispatch(setAccessToken(access_token));
                dispatch(setRefreshToken(refresh_token));
                dispatch(setTokenExpiry(token_expiry));
                toast.success('Logged in successfully.');
                if (user.user_type === "Admin") {
                    // let type= user.user_type
                    // localStorage.setItem('user',{refresh_token})
                     navigate('/admin');      
                } else if (user.user_type === "User") {
                    // let type= user.user_type
                    // console.log(`type:`,type);
                    // localStorage.setItem('user',(type))
                    navigate('/');
                } else if (user.user_type === "Vendor") {
                    if (user.is_profile) {
                        navigate('/vendor');
                        // let type= user.user_type
                        // localStorage.setItem('Vender',access_token,type)
                      } else {
                        navigate('/vendor/register');
                      }
                }
                
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('An error occurred during login.');
        }
    };

     // Check if the user is already authenticated, and if so, redirect
  // if (user) {
  //   if (user.user_type === "Admin") {
  //     navigate('/admin');
  //   } else if (user.user_type === "User") {
  //     navigate('/');
  //   } else if (user.user_type === "Vendor") {
  //     if (user.is_profile) {
  //       navigate('/vendor');
  //     } else {
  //       navigate('/vendor/register');
  //     }
  //   }

  //   // Return null to prevent rendering the login form
  //   return null;
  // }
  // if (user) {
  //   navigate('/');
  //   return null; // Return null to prevent rendering the login form
  // }
    
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col md:flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex-1 md:w-1/2 flex items-center">
          <div className="w-full max-w-md mx-auto p-6 space-y-4 md:space-y-6 flex flex-col items-center">
            <div className="flex items-center">
                <img className="w-8 h-8 mr-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" src={logo} alt="logo" />
                <div>
                <p className="text-gray-900 text-2xl font-bold leading-tight tracking-tight dark:text-white">EliteProperty</p>
                </div>
            </div>
            <div>
                <p className="text-gray-600 dark:text-gray-300">Your Journey to Exceptional Real Estate Begins Here.</p>
            </div>
            </div>
            </div>

          <div className="flex-1 md:w-1/2">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                 
                </a>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                            />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                            />
                            </div>
                            <button
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            type="button"
                            onClick={handleLogin}
                            >
                            Signin
                            </button>
                           
                            
                           
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
  Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
</p>

                            
                        </form>
                    </div>
                </div>
            </div>
            </div>
          
            
        </section>
    );
}

export default Login;