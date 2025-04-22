import React from 'react'
import { Checkout } from '../features/checkout/components/Checkout'
import {Footer} from '../features/footer/Footer'
import { Navbar } from '../features/navigation/components/Navbar'
import { useMeta } from '../hooks/useMeta'

export const CheckoutPage = () => {
    useMeta({
      title: "Pay and Order | Thekkady Spices",
      description: "Thekkady Spices"
    });
  return (
    <>
    <Navbar/>
    <Checkout/>
    <Footer/>
    </>
  )
}
