import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from '../features/navigation/components/Navbar'
import { ProductDetails } from '../features/products/components/ProductDetails'
import { Footer } from '../features/footer/Footer'
import { selectLoggedInUser } from '../features/auth/AuthSlice'
export const ProductDetailsPage = () => {
  const loggedInUser=useSelector(selectLoggedInUser)

  return (
    <>
    <Navbar/>
    <ProductDetails/>
{loggedInUser?.isAdmin !=true && <>
  <Footer/>
</>}

    </>
  )
}
