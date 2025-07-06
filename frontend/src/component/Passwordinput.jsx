import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Passwordinput = ({ value, onChange, placeholder = 'Password', id = 'password', name = 'password' }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <div className="relative mb-4">
      <input
        type={isShowPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
        aria-label="Password"
      />
      <div
        className="absolute right-3 top-3.5 cursor-pointer text-gray-400 hover:text-indigo-500 transition"
        onClick={toggleShowPassword}
      >
        {isShowPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
      </div>
    </div>
  );
};

export default Passwordinput;
