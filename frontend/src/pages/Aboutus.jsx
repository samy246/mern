import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'
import { Wishlist } from '../features/wishlist/components/Wishlist'
import { About } from '../features/aboutus/About.jsx'
export default function Aboutus() {
  return (
<>
    <Navbar/>

<About/>
    <Footer/>
    </>
  )
}
