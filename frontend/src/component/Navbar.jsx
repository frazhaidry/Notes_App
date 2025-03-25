import React from 'react'
import ProfileCard from './ProfileCard'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const onlogout = () => {
    navigate("/login");
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

        <ProfileCard onLogout={onlogout}/>
    </div>
  )
}

export default Navbar