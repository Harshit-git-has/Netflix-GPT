import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
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
    }, []);

    const handleGptSearchClick = () => {
      // Toggle Gpt Search 
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
     dispatch(changeLanguage(e.target.value));
    }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black w-full flex z-20 justify-between'>
      <img className = "w-48" src={LOGO} alt="Netflix-logo"/>
      {user && (
        <div className='flex p-2'>

       { showGptSearch &&  (
        <select className='p-2 m-2 bg-purple-500 text-white rounded-lg' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option  key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
        )}

          <button className='py-2 px-4 mx-4 my-2 bg-blue-500 text-white rounded-lg'
            onClick={handleGptSearchClick}
          >
           { showGptSearch? "Homepage": "GPT Search" }
          </button>
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