import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';
import logo from '../../Images/logo.png'


const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
  
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const emailAddress = useSelector(state => state.emailAddress);
  
    const handleOtpChange = (index, value) => {
      const newOtp = otp.split('');
      newOtp[index] = value;
      setOtp(newOtp.join(''));
    };

    useEffect(() => {
        if (!emailAddress) {
          navigate('/signup');
        }
    }, [user, navigate]);

    const handleVerifyOtp = async () => {
        try {
          const response = await api.post('https://eliteproperty.onrender.com/accounts/verify-otp/', {
            otp: otp,
            email: emailAddress,
          });
    
          if (response.status === 200) {
            setVerificationStatus('User is verified');
            toast.success('Account verified. You can now log in.');
            navigate('/login');
          } else {
            setVerificationStatus('OTP verification failed');
          }
        } catch (error) {
          
          toast.error('An error occurred during OTP verification');
        }
      };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex min-h-screen">
      <div className="flex items-center flex-row w-full">
      <div className='hidden lg:flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 from-cyan-500 to-blue-500 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
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
          
          <p className=" mt-5 text-lg text-center font-semibold">Do you already have an account?</p>
          <Link to="/login" className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-[#1d1d1d]">
            Login now
          </Link>
        </div>
      </div>
    </div>
  </div>

            <div className="  flex flex-1 flex-col items-center justify-center px-10 relative">

                    <div className=" relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="  mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="  flex flex-col items-center justify-center text-center space-y-2">
                                <div className=" font-bold text-3xl">
                                    <p>Email Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    {emailAddress && <p>We have sent a code to your email {emailAddress}</p>}
                                </div>
                            </div>

                            <div>
                                <form action="" method="post">
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">

                                            {Array.from({ length: 4 }).map((_, index) => (
                                            <div key={index} className="w-16 h-16">
                                                <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                                maxLength="1"
                                                value={otp[index] || ''}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                />
                                            </div>
                                            ))}

                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button
                                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-m shadow-sm font-bold"
                                                    type="button"
                                                    onClick={handleVerifyOtp}
                                                >
                                                    Verify Account
                                                </button>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn't receive the code?</p>{' '}
                                                <a
                                                    className="flex flex-row items-center text-blue-600"
                                                    href="http://"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Resend
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    </section>
  );
};

export default OtpVerification;