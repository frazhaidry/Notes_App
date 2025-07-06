import React from 'react';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className=" border-b border-gray-200 shadow-md px-6 md:px-12 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-3">
          <div onClick={() => navigate('/dashboard')} className="text-indigo-700 cursor-pointer text-3xl font-black tracking-wide hover:opacity-90 transition-all">
            📝 Notes
          </div>
          <span className="hidden md:block text-sm text-gray-500 font-medium">
            Organize. Remember. Focus.
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center">
          <ProfileCard userInfo={userInfo} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
