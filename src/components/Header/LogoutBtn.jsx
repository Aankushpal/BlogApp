import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='cursor-pointer inline-bock px-6 py-2 font-bold duration-200 text-red-700 hover:bg-black rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;