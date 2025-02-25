import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AdminDashBoard } from '../features/admin/components/AdminDashBoard'
import { Stack, Typography,Grid,Box, useMediaQuery, useTheme } from '@mui/material'
export const AdminDashboardPage = () => {
      const theme=useTheme()
      const is600=useMediaQuery(theme.breakpoints.down(600))
  return (
    <>
    <Navbar isProductList={true}/>
    {/* <Stack rowGap={5} mt={is600?2:5} mb={'3rem'} ml={3} mr={3}>
<div>
  <h1>Today Product Updation</h1>
  <Grid container spacing={3}>
        {[1, 2].map((item) => (
          <Grid item xs={12} sm={6} key={item}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                boxShadow: 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 5,
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography variant="h6">Product {item}</Typography>
              <Box
                component="img"
                src="https://media.istockphoto.com/id/518709136/photo/green-cardamom-pods-in-steel-bowl.jpg?s=612x612&w=0&k=20&c=uMfiFWLROWcsyeqG6zcUQb83nxo6VI5_o7aCQUiEmpw="
                alt="Product"
                sx={{ width: "100%", maxWidth: 200, borderRadius: 2 }}
              />
              <Typography variant="body1" fontWeight="bold">
                $19.99
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
</div>
</Stack> */}
    <AdminDashBoard/>
    </>
  )
}
