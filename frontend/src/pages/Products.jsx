import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import plpbanner from "../assets/images/plpbanner.webp"
import { Stack } from '@mui/material'
import { Footer } from '../features/footer/Footer'
import { Breadcrumbs, Link,Typography } from "@mui/material";
function Products() {
  return (
    <>
      <Navbar isProductList={true}/>

      <Stack mt="5rem" sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
  {/* Text Behind Image */}
  <Typography
    variant="h2"
    sx={{
      fontFamily:"Poppins",
      position: "absolute",
      zIndex: 90,
      fontWeight:"600",
      color: "#fff", // Semi-transparent text
      fontWeight: "bold",
      fontSize: "30px", // Adjust as needed
      textTransform: "uppercase",
    }}
  >
   All Products
  </Typography>

  {/* Image */}
  <img src={plpbanner} style={{ width: "100%", position: "relative", zIndex: 2,height:"200px",objectFit:"cover" }} />
</Stack>

<ProductList/>
<Footer/>
    </>
  )
}

export default Products
