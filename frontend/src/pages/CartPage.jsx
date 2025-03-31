import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'
import { Typography } from '@mui/material'

export const CartPage = () => {
  return (
    <>
    <Navbar/>

    <Cart/>
    <Footer/>
    </>
  )
}
