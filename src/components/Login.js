import React, {useRef, useState } from 'react';
import {checkValidData} from '../utils/checkValidData';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"
import { BG_URL, USER_AVATAR } from '../utils/constants';
import Header from './Header';


const Login = () => {
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
          displayName: name.current.value,
          photoURL:  USER_AVATAR ,
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

    signInWithEmailAndPassword(
      auth, 
      email.current.value, 
      password.current.value
    )
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user; 
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
      <Header/>
        <div className='absolute'>
        <img
          src={BG_URL}
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