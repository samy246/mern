import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AddProduct } from '../features/admin/components/AddProduct'
import { useMeta } from '../hooks/useMeta'
export const AddProductPage = () => {
    useMeta({
              title: "Admin -Add Product Page | Thekkady Spices",
              description: "Thekkady Spices"
            });
  return (
    <>
    <Navbar/>
    <AddProduct/>
    </>
  )
}
