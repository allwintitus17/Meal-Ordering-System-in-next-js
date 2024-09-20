import React from 'react';
import Link from 'next/link';  // Import Next.js Link component
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { GiMeal } from "react-icons/gi";
import { useRouter } from 'next/router';  // Use useRouter for navigation
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '@/features/auth/authSlice';  // Adjust the import path as needed

const Header = () => {
  const router = useRouter();  // Use useRouter from Next.js
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.push('/');  // Use router.push for navigation
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link href='/'>
          SPAN MEALS ADMIN 
        </Link>
      </div>
      <ul>
        {user ? (
          <>
          <li>
            <Link href='/mealsorder'>
            <GiMeal />Add meals
            </Link>
          </li>
            <li>
              <Link href='/dashboard'>
              <RxDashboard />DashBoard
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/Login'>
               <FaSignInAlt />Login 
              </Link>
            </li>
            <li>
              <Link href='/Register'>
               <FaUser />Register 
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
