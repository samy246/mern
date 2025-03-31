import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync, selectLoggedInUser } from '../AuthSlice'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
  // debugger;
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(logoutAsync())
    },[dispatch])

    useEffect(()=>{
      console.log("loggedInUser",loggedInUser);

        // if(!loggedInUser){
            navigate("/login")
        // }
    },[loggedInUser])

  return (
    <></>
  )
}
