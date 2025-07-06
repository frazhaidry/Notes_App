import React, { useState, useRef, useEffect } from 'react';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

const ProfileCard = ({ userInfo, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fallback for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition duration-150"
      >
        {/* Avatar */}
        {userInfo?.avatar ? (
          <img
            src={userInfo.avatar}
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold border border-gray-300">
            {getInitials(userInfo?.name)}
          </div>
        )}
        {/* Name */}
        <span className="hidden sm:block font-medium text-gray-800">{userInfo?.name}</span>

        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in"
        >
          <div className="py-2 text-sm text-gray-700">
            <div className="px-4 py-2 font-semibold border-b">{userInfo?.email || 'No email'}</div>
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-gray-800">
              <FiUser className="text-lg" />
              Profile
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-gray-800">
              <FiSettings className="text-lg" />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
