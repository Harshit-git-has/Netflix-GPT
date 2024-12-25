import React, {useRef, useState } from 'react';
import Header from './Header';
import {checkValidData} from '../utils/checkValidData';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrormessage]  = useState(null)

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value) ;
    setErrormessage(message);
    if(message) return;

    if(!isSignInForm){
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          
          updateProfile(user, {
          displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/132843327?s=16&v=4",
        })
        .then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(
              addUser({
              uid: uid, 
              email: email, 
              displayName: displayName, 
              photoURL: photoURL,
            })
         );
          navigate("/browse");
        })
        .catch((error) => {
          setErrormessage(error.message);
        });

      })
      .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErrormessage( errorCode + "-" + errorMessage);
    });

    }
    else{
    // Sign In Logic

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
       console.log(user);
       navigate('/browse'); 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrormessage( errorCode + "-" + errorMessage);
    });

  }
      
};

const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
}
  return (
    <div >
      <Header />
        <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/IN-en-20241216-TRIFECTA-perspective_915a9055-68ad-4e81-b19a-442f1cd134dc_large.jpg'
          alt='BG-logo' 
        />
      </div>
      <form
          onSubmit={(e) =>e.preventDefault() }
          className=' w-3/12 absolute p-8 bg-black opacity-90  my-32 mx-auto right-0 left-0 text-white rounded-lg'>
          <h1 className='text-3xl  py-r font-bold'>
          { isSignInForm? 'Sign In' : 'Sign Up' }
        </h1>
      { !isSignInForm && <input
          ref={name}
          type='text' 
          placeholder=' Full Name' 
          className='p-2 my-4 w-full bg-gray-900' 
        />}
          <input
          ref={email}
          type='text' 
          placeholder='E-mail' 
          className='p-2 my-4 w-full bg-gray-900' 
        />
        <input
          ref={password}
          type='Password' 
          placeholder='password'  
          className='p-2 my-4 w-full bg-gray-900'
        /> 
        <p className='text-red-500 font-bold text-lg  py-2'>{errorMessage} </p>
        <button className='p-2 my-2 font-bold bg-red-700 w-full' onClick={handleButtonClick}>
          { isSignInForm? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm
          ? "New To Netflix? Sign Up Now" 
          : "Already Registered. Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;