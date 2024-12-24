import React, { useState } from 'react';
import Header from './Header';


const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);

const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
}
  return (
    <div >
      <Header />
        <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/IN-en-20241216-TRIFECTA-perspective_915a9055-68ad-4e81-b19a-442f1cd134dc_large.jpg'
        alt='BG-logo' />
      </div>
      <form className=' w-3/12 absolute p-12 bg-black opacity-75  my-32 mx-auto right-0 left-0 text-white rounded-lg'>
        <h1 className='text-3xl  py-2 font-bold text-white'>
          { isSignInForm? 'Sign In' : 'Sign Up' }
        </h1>
      { !isSignInForm && <input
          type='text' 
          placeholder=' Full Name' 
          className='p-2 my-4 w-full bg-gray-700' 
        />}
            <input
          type='text' 
          placeholder='E-mail' 
          className='p-2 my-4 w-full bg-gray-700' 
        />
        <input
          type='Password' 
          placeholder='password'  
          className='p-2 my-4 w-full bg-gray-700'
        />
        <button className='p-2 my-6 font-bold bg-red-700 w-full'>
          { isSignInForm? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm? "New To Netflix? Sign Up Now" : "Already Registered. Sign In Now"}</p>
      </form>
    </div>
  );
};

export default Login;