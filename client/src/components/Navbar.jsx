import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser(); // Destructure 'user' from useUser
  const { credit, loadCreditData } = useContext(AppContext); // Ensure credit and loadCreditData are available from AppContext

  useEffect(() => {
    if (isSignedIn) {
      loadCreditData(); // Call loadCreditData when signed in
    }
  }, [isSignedIn, loadCreditData]);

  return (
    <div className='flex items-center justify-between mx-4 py-3 lg:mx-44'>
      <Link to='/'>
        <img className='w-30 lg:w-35' src={assets.logo} alt='Logo' />
      </Link>
      {isSignedIn ? (
        <div className='flex items-center gap-2 sm:gap-3'>
          <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700'>
            <img className='w-5' src={assets.credit_icon} alt='Credit Icon' />
            <p className='text-xs sm:text-sm font-medium text-gray-600'>
              Credits: {credit}
            </p>
          </button>
          <p className='text-gray-600 max-sm:hidden'>
            Hi, {user?.fullName || 'User'}
          </p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'
        >
          Get Started
          <img className='w-3 sm:w-4' src={assets.arrow_icon} alt='Arrow Icon' />
        </button>
      )}
    </div>
  );
};

export default Navbar;
