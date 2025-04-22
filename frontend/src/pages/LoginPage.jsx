import React from 'react'
import { Login } from '../features/auth/components/Login'
import { Navbar } from '../features/navigation/components/Navbar'
import { Stack } from '@mui/material'
import { useLocation } from 'react-router-dom'
import "./login.css"
import { useMeta } from '../hooks/useMeta'
export const LoginPage = () => {
  const location = useLocation();
  useMeta({
    title: "Login/Register | Thekkady Spices",
    description: "Thekkady Spices"
  });
  // Check if the current route is either "/login" or "/register"
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
    <Stack className="testpgeeeeeeeeeeeee">
       <Navbar  />
       </Stack>
       <Login/>
    </>

  )
}
