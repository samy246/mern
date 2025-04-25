import React from 'react'
import { ProductUpdate } from '../features/admin/components/ProductUpdate'
import {Navbar} from '../features/navigation/components/Navbar'
import { useMeta } from '../hooks/useMeta'
export const ProductUpdatePage = () => {
    useMeta({
              title: "Admin Product Update | Thekkady Spices",
              description: "Thekkady Spices"
            });
  return (
    <>
    <Navbar/>
    <ProductUpdate/>
    </>
  )
}
