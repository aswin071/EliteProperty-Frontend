import React, { useState, useEffect } from 'react';
import { setUser, setEmailAddress } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import OtpVerification from './OtpVerification';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../Images/logo.png'


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const [error, setError] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpVerification, setOtpVerification] = useState(false);

  const dispatch = useDispatch();
  const emailAddress = useSelector(state => state.emailAddress);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setAllFieldsFilled(
      firstName !== '' &&
      lastName !== '' &&
      userName !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      userType !== ''
    );
  }, [firstName, lastName, userName, email, phone, password, confirmPassword, userType]);

  const handleEmailChange = (value) => {
    setEmail(value);

    if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)) {
      if (error !== 'phone' && error !== 'password' && error !== 'confirm password') {
        setError('email');
      }
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      if (error === 'email') setError('');
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);

    if (!/^\d{10}$/.test(value)) {
      if (error !== 'email' && error !== 'password' && error !== 'confirm password') {
        setError('phone');
      }
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
      if (error === 'phone') setError('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (value.length < 5) {
      if (error !== 'email' && error !== 'phone' && error !== 'confirm password') {
        setError('password');
      }
      setPasswordError('Password must be at least 5 characters');
    } else {
      setPasswordError('');
      if (error === 'password') setError('');
    }

    if (confirmPassword !== value) {
      if (error !== 'email' && error !== 'phone' && error !== 'password') {
        setError('confirm password');
      }
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      if (error === 'confirm password') setError('');
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    if (password !== value) {
      if (error !== 'email' && error !== 'phone' && error !== 'password') {
        setError('confirm password');
      }
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      if (error === 'confirm password') setError('');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await api.post('/accounts/signup/', {
        
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        phone_number: phone,
        password: password,
        user_type: userType,
      });
  
      console.log('Request Payload:', {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        phone_number: phone,
        password: password,
        user_type: userType,
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 201) {
        dispatch(setUser(response.data));
        dispatch(setEmailAddress(email));
        toast.success("Registration success. Please Enter your OTP and verify your account.");
        navigate('/otp-verification');

      } else {
        toast.error("Error occurred! Please check your inputs");
      }
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error occurred! Please check your inputs');
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex min-h-screen">
    <div className="flex items-center flex-row w-full">

      {/* Left Side (Logo and Login Button) */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 from-cyan-500 to-blue-500 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg w-1/2">
        <div className="flex items-center justify-center flex-col space-x-3">
          <lord-icon
            src="https://cdn.lordicon.com/dycatgju.json"
            trigger="loop"
            delay="2000"
            colors="primary:#121331"
            style={{ width: '50px', height: '50px' }}>
          </lord-icon>
          <div className="flex items-center justify-center flex-col text-center text-white">
            <div className="flex items-center justify-center">
              <img className="w-8 h-8 mr-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" src={logo} alt="logo" />
              <div>
                <p className="text-gray-900 text-2xl font-bold leading-tight tracking-tight dark:text-white">EliteProperty</p>
              </div>
            </div>
            <div className='space-y-5 mb-8 text-center'>
              <h1 className="text-center mt-5">Enter your account and discover new experiences.</h1>
              <p className="mt-5 text-lg text-center font-semibold mb-2">Do you already have an account?</p>
              <Link to="/login" className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-[#1d1d1d]">
                Login now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Registration Form) */}
      <div className="flex flex-1 flex-col items-center justify-center px-10 relative w-1/2">
        <div className="flex lg:hidden justify-between items-center w-full py-4">
          <div className="flex items-center justify-start space-x-3">
            <lord-icon
              src="https://cdn.lordicon.com/dycatgju.json"
              trigger="loop"
              delay="2000"
              colors="primary:#121331"
              style={{ width: '35px', height: '35px' }}>
            </lord-icon>
            <a href="/" className="font-extrabold text-2xl text-[#121331]">EliteProperty</a>
          </div>
          <div className="flex items-center space-x-2">
            <span>Have an Account? </span>
            <Link to="/login" className="underline font-bold text-[#121331] hover:text-blue-700">
              Login now
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
          <div className="flex flex-col space-y-2 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold">Register Account</h2>
            <p className="text-md md:text-xl">SignUp or Login to <span className='font-medium'>User</span> or to become <span className='font-medium'>Vendor!</span></p>
          </div>
          <div className="flex flex-col max-w-md space-y-5">

                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                     focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />

                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />

                    <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />

                    <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    {error === 'email' && <p className="text-xs text-red-500">{emailError}</p>}

                    <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => handlePhoneChange(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    {error === 'phone' && <p className="text-xs text-red-500">{phoneError}</p>}

                    <input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    {error === 'password' && <p className="text-xs text-red-500">{passwordError}</p>}
                    
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    {error === 'confirm password' && <p className="text-xs text-red-500">{confirmPasswordError}</p>}

                    <select value={userType} onChange={(e) => setUserType(e.target.value)} 
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${ userType ? 'font-semibold' : 'font-normal'} ${userType === '' ? 'text-[#9ca3af]' : 'text-black'}`} >
                        <option value="">Select User Type</option>
                        <option value="Vendor">Vendor</option>
                        <option value="User">User</option>
                    </select>

                    <button 
                        className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium ${allFieldsFilled ? 'bg-blue-700 text-white' : 'border-black bg-black text-white'}`}
                        type="submit"
                        onClick={handleSignup}
                        disabled={!allFieldsFilled}
                        >
                        Confirm this Account
                    </button>
                    <div className="mt-2 text-center">
                        {allFieldsFilled ? "" :<p className="text-s text-red-500">All fields are required</p>}
                    </div>
                    {/* <div className="flex justify-center items-center">
                        <span className="w-full border border-black"></span>
                        <span className="px-4">Or</span>
                        <span className="w-full border border-black"></span>
                    </div>  
                    <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                        <span className="absolute left-4">
                        </span>
                        <span>Sign in with Google</span>
                    </button> */}
                </div>
            </div>
        </div>
    </div>
</div>
</section>
  
  
  );
};

export default Signup;