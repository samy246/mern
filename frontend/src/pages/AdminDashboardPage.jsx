import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AdminDashBoard } from '../features/admin/components/AdminDashBoard'
import { Stack, Typography,Grid,Box, useMediaQuery, useTheme } from '@mui/material'
import { useMeta } from '../hooks/useMeta'
export const AdminDashboardPage = () => {
      const theme=useTheme()
      const is600=useMediaQuery(theme.breakpoints.down(600))
        useMeta({
            title: "Admin DashBoard | Thekkady Spices",
            description: "Thekkady Spices"
          });
  return (
    <>
    <Navbar isProductList={true}/>

    <AdminDashBoard/>
    </>
  )
}
