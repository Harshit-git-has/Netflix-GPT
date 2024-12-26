import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const handleSignOut= () => {
    signOut(auth).then(() => {
    })
    .catch((error) => {
      navigate("/error");
    });
  };

  useEffect(() => {
   const unSubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(
          addUser({
            uid: uid, 
            email: email,
            displayName: displayName, 
            photoURL: photoURL 
          })
        );
        navigate("/browse");
      } else {
       dispatch(removeUser());
       navigate("/");
      }
    });
    
    // Unsubscribe when component unmounts
    return () => unSubscribe();
    }, [])

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black w-full flex z-20 justify-between'>
      <img className = "w-48" src={LOGO} alt="Netflix-logo"/>
      {user && (
        <div className='flex p-2'>
          <img className='w-12 h-12'src={user?.photoURL} alt='usericon'/>
          <button onClick={handleSignOut} className='p-2 font-bold text-white '>
          Sign Out
        </button>
      </div>
      )}
   </div>
  )
}
export default Header;