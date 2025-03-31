import React from 'react'
import { Signup } from '../features/auth/components/Signup'
import { Navbar } from '../features/navigation/components/Navbar'
import "./login.css"
export const SignupPage = () => {
  return (
    <>
    <Navbar style={{backgroundColor:"white !important"}}/>
    <Signup/>
    </>
  )
}
