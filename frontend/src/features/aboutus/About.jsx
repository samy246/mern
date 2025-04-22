import { Box, Typography, Stack, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import own1 from "../../../src/assets/images/own1.webp";
import own2 from "../../../src/assets/images/own2.webp";
import aboutbanner from "../../assets/images/aboutbanner.jpg"
// .webp";
import abouttitlebanner from "../../assets/images/abouttitlebanner.jpg"
// webp"
import { useMeta } from "../../hooks/useMeta";
export const About = () => {
  const pageRef = useRef(null);
  useMeta({
    title: "AboutUs | Thekkady Spices",
    description: "Thekkady Spices"
  });
  useEffect(() => {
    pageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Container
      ref={pageRef}
      sx={{ bgcolor: "transparent", minHeight: "100vh", px: 2, mt: "2rem" }}
      disableGutters
    >
      <Stack alignItems="center" spacing={4} px={0} mt={'5rem'}>
        {/* Page Heading */}
         {/* About Title with Background Banner */}
         <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: { xs: "200px", md: "300px" },
            backgroundImage: `url(${abouttitlebanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            fontWeight={600}
            color="white"
            textAlign="center"
            sx={{
              fontSize: { xs: "6vw", md: "3rem" },
              textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
            }}
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </Typography>
        </Box>
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            fontWeight={600}
            color="primary"
            mt={"1rem"}
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </Typography>
        </motion.div> */}

        {/* Content Sections */}
        <Grid container spacing={4} alignItems="center" justifyContent={"center"} sx={{ p: 0 }}>
          {/* First Row: Left Image, Right Content */}
          <Grid item xs={12} md={6} sx={{ p: 0 }}>
            <motion.img
              src={own1}
              alt="Spices Collection"
              style={{
                width: "100%",
                maxHeight: "300px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
                objectFit: "cover",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "5px 5px 15px rgba(0,0,0,0.3)" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h6" textAlign="justify">
              At Thekkady spices , we are dedicated to bringing you the finest spices, dry fruits, nuts, seeds, and masalas, all grown and sourced directly from our own estate. With a commitment to quality and authenticity, we carefully cultivate, clean, and package our products to preserve their natural flavor, aroma, and freshness.
                {/* We bring you the finest selection of spices from around the world, carefully curated
                for quality and freshness. Each spice tells a story of tradition, flavor, and
                authenticity. */}
              </Typography>
            </motion.div>
          </Grid>

          {/* Second Row: Right Image, Left Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h6" textAlign="justify">
              From the fields to your kitchen, we personally oversee every stage of the process, ensuring the highest standards of purity, hygiene, and excellence. Whether it’s the rich aroma of our spices, the wholesome goodness of our dry fruits and nuts, or the perfect blend of our masalas, we guarantee premium quality in every pack.
                {/* Our sustainable sourcing and fair trade practices ensure that every spice you buy
                supports local farmers and promotes environmental responsibility. */}
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.img
              src={own2}
              alt="Spices Market"
              style={{
                width: "100%",
                maxHeight: "300px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
                objectFit: "cover",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "5px 5px 15px rgba(0,0,0,0.3)" }}
            />
          </Grid>
        </Grid>

        {/* About Banner */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.15)",
          }}
        >
          <motion.img
            src={aboutbanner}
            alt="About Us Banner"
            style={{
              width: "100%",
              maxHeight: "300px",
              height: "auto",
              objectFit: "cover",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "5px 5px 15px rgba(0,0,0,0.3)" }}
          />

          {/* Get in Touch Text */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h5"
                // #eb4a05
                sx={{ fontSize: { xs: "5vw", md: "2rem" }, color: "#FFFFFF" }}
                fontWeight={500}
              >
                Experience the true taste of nature with Thekkady spices where quality and tradition come together.
                {/* "Bringing the world's best spices to your kitchen." */}
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

