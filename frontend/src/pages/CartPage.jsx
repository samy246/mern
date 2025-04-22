import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'
import { Typography } from '@mui/material'
import { useMeta } from '../hooks/useMeta'

export const CartPage = () => {
    useMeta({
      title: "Cart | Thekkady Spices",
      description: "Thekkady Spices"
    });
  return (
    <>
    <Navbar/>

    <Cart/>
    <Footer/>
    </>
  )
}
