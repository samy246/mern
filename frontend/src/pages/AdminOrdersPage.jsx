import React from 'react'
import { AdminOrders } from '../features/admin/components/AdminOrders'
import {Navbar} from '../features/navigation/components/Navbar'
import { useMeta } from '../hooks/useMeta'
export const AdminOrdersPage = () => {
    useMeta({
              title: "Admin -Orders Page | Thekkady Spices",
              description: "Thekkady Spices"
            });
  return (
    <>
    <Navbar/>
    <AdminOrders/>
    </>
  )
}
