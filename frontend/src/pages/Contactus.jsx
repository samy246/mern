import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'
import { Contact } from '../features/contactus/Contact.jsx'
export default function Contactus() {
  return (
<>
    <Navbar/>

<Contact/>
    <Footer/>
    </>
  )
}
