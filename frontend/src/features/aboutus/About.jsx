// import { Box, Typography, Stack, Container, Grid } from '@mui/material';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useEffect, useRef } from 'react';
// import own1  from "../../../src/assets/images/own1.webp"
// import own2  from "../../../src/assets/images/own2.webp"
// import aboutbanner from "../../assets/images/aboutbanner.webp"
// export const About = () => {
//   const pageRef = useRef(null);

//   useEffect(() => {
//     pageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }, []);

//   return (
//     <Container ref={pageRef} sx={{ bgcolor: 'tranparent', minHeight: '100vh',px:2,mt:'2rem' }} disableGutters>
//       <Stack alignItems="center" spacing={4} px={0}>
//         {/* Back Button */}


//         {/* Page Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <Typography variant="h3" fontWeight={600} color="primary" mt={'1rem'}>
//             About Us
//           </Typography>
//         </motion.div>

//         {/* Content Sections */}
//         {/* spacing={4} */}
//         <Grid container spacing={4} alignItems="center" justifyContent={"center"} sx={{ p: 0 }}>
//           {/* First Row: Left Image, Right Content */}
//           <Grid item xs={12} md={6} sx={{ p: 0 }}>
//             <motion.img
//               src={own1}
//               alt="Spices Collection"
//               style={{

//                 width: '100%',
//                 maxHeight: '300px', // Limits height
//                 height: 'auto',
//                 borderRadius: '10px',
//                 boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
//                 objectFit: 'cover',
//               }}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" textAlign="justify">
//               We bring you the finest selection of spices from around the world, carefully curated for quality and freshness. Each spice tells a story of tradition, flavor, and authenticity.
//             </Typography>
//           </Grid>

//           {/* Second Row: Right Image, Left Content */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" textAlign="justify">
//               Our sustainable sourcing and fair trade practices ensure that every spice you buy supports local farmers and promotes environmental responsibility.
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <motion.img
//               src={own2}
//               alt="Spices Market"
//               style={{
//                 width: '100%',
//                 maxHeight: '300px', // Limits height
//                 height: 'auto',
//                 borderRadius: '10px',
//                 boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
//                 objectFit: 'cover',
//               }}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1 }}
//             />
//           </Grid>
//         </Grid>

//         {/* Mission Statement */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <Typography variant="h5" fontWeight={500} color="secondary" textAlign="center">
//             "Bringing the world's best spices to your kitchen."
//           </Typography>
//         </motion.div> */}

//            {/* About Banner */}
//            <Box
//           sx={{
//             position: 'relative',
//             width: '100%',
//             maxWidth: '1200px',
//             borderRadius: '10px',
//             overflow: 'hidden',
//             boxShadow: '5px 5px 15px rgba(0,0,0,0.15)',
//           }}
//         >
//           <motion.img
//             src={aboutbanner}
//             alt="About Us Banner"
//             style={{
//               width: '100%',
//               maxHeight: '300px',
//               height: 'auto',
//               objectFit: 'cover',
//             }}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//           />

//           {/* Get in Touch Text */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               // bgcolor: 'rgba(0, 0, 0, 0.5)',
//               color: '#fff',
//               px: 3,
//               py: 2,
//               borderRadius: '8px',
//               textAlign: 'center',
//             }}
//           >
//             <Typography variant="h5" sx={{ fontSize: { xs: '5vw', md: '2rem' },color:"#eb4a05" }} fontWeight={500}>
//             "Bringing the world's best spices to your kitchen."</Typography>
//           </Box>
//         </Box>
//       </Stack>
//     </Container>
//   );
// };

import { Box, Typography, Stack, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import own1 from "../../../src/assets/images/own1.webp";
import own2 from "../../../src/assets/images/own2.webp";
import aboutbanner from "../../assets/images/aboutbanner.webp";
import abouttitlebanner from "../../assets/images/abouttitlebanner.webp"

export const About = () => {
  const pageRef = useRef(null);

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
                We bring you the finest selection of spices from around the world, carefully curated
                for quality and freshness. Each spice tells a story of tradition, flavor, and
                authenticity.
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
                Our sustainable sourcing and fair trade practices ensure that every spice you buy
                supports local farmers and promotes environmental responsibility.
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
                sx={{ fontSize: { xs: "5vw", md: "2rem" }, color: "#eb4a05" }}
                fontWeight={500}
              >
                "Bringing the world's best spices to your kitchen."
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

