import React from 'react'
import ProfileCard from './ProfileCard'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userInfo}) => {
  const navigate = useNavigate();

  const onlogout = () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

        <ProfileCard userInfo={userInfo} onLogout={onlogout}/>
    </div>
  )
}

export default Navbar