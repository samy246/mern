import { Box, IconButton, TextField, Typography,Dialog,
    DialogTitle,
    DialogContent , useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React,{useState} from 'react'
import { QRCodePng, appStorePng, googlePlayPng ,facebookPng,instagramPng,twitterPng,linkedinPng} from '../../assets'
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import footerbg from "../../assets/images/footer-bg.webp";
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CloseIcon from '@mui/icons-material/Close'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/AuthSlice';
export const Footer = () => {

    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const [isParcelModalOpen, setIsParcelModalOpen] = useState(false)
    const labelStyles={
        fontWeight:300,
        cursor:'pointer'
    }
const loggedInUser=useSelector(selectLoggedInUser)
    const handleParcelServicesClick = () => {
        setIsParcelModalOpen(true)
    }

    const handleCloseParcelModal = () => {
        setIsParcelModalOpen(false)
    }
     // Parcel Service Item Component with Animation
     const ParcelServiceItem = ({ name }) => (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                margin: '8px 0'
            }}
        >
            <LocalShippingIcon sx={{ color: theme.palette.primary.main, fontSize: 40 }} />
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
                {name}
            </Typography>
        </motion.div>
    )

      // Pricing Information Component
      const PricingInfo = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
            <Stack
                spacing={2}
                sx={{
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginTop: '16px'
                }}
            >
                <Typography
                    variant="h6"
                    align="center"
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold'
                    }}
                >
                    Professional Courier Door Delivery
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: '8px',
                        padding: '12px'
                    }}
                >
                    <Typography>0-1 kg per</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {/* <MonetizationOnIcon sx={{ color: 'green', fontSize: 20 }} /> */}
                        <Typography sx={{ fontWeight: 'bold', color: 'green' }}>Rs.30.00</Typography>
                    </Box>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: '8px',
                        padding: '12px'
                    }}
                >
                    <Typography>More than 1 kg per</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {/* <MonetizationOnIcon sx={{ color: 'green', fontSize: 20 }} /> */}
                        <Typography sx={{ fontWeight: 'bold', color: 'green' }}>Rs.25.00</Typography>
                    </Box>
                </Stack>
            </Stack>
        </motion.div>
    )
  return (
    <>
    <Stack sx={{backgroundImage: `url(${footerbg})`,backgroundColor:theme.palette.primary.main,paddingTop:"3rem",paddingLeft:is700?"1rem":"3rem",paddingRight:is700?"1rem":"3rem",paddingBottom:"1.5rem",rowGap:"5rem",color:theme.palette.primary.light,justifyContent:"space-around"}}>

            {/* upper */}
            <Stack flexDirection={'row'} rowGap={'1rem'} justifyContent={is700?"":'space-around'} flexWrap={'wrap'}>

                {/* <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' fontSize={'1.5rem'}>Exclusive</Typography>
                    <Typography variant='h6'>Subscribe</Typography>
                    <Typography sx={labelStyles}>Get 10% off your first order</Typography>
                    <TextField placeholder='Enter your email' sx={{border:'1px solid white',borderRadius:"6px"}} InputProps={{endAdornment:<IconButton><SendIcon sx={{color:theme.palette.primary.light}}/></IconButton>,style:{color:"whitesmoke"}}}/>
                </Stack> */}

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Location</Typography>
                    <Link to={"https://g.page/r/CWsgTiddMyfYEBE/review"} target="_blank"
  rel="noopener noreferrer" style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Ramaya Gowder Street, Gandhi Nagar, Manthaiyamman Kovil, Cumbum, Tamil Nadu 625516.</Typography>
                    {/* <Typography sx={labelStyles}>exclusive@gmail.com</Typography> */}
                    <Typography sx={labelStyles}>+91-9944789777</Typography>
                    </Link>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Account</Typography>
                    {loggedInUser?.email ? (
  <>
    <Link to={"/profile"} style={{ textDecoration: "none", color: "#ffffff" }}>
      <Typography sx={labelStyles}>My Account</Typography>
    </Link>
    <Link to={"/cart"} style={{ textDecoration: "none", color: "#ffffff" }}>
      <Typography sx={labelStyles}>Cart</Typography>
    </Link>
  </>
) : (
  <Link to={"/login"} style={{ textDecoration: "none", color: "#ffffff" }}>
    <Typography sx={labelStyles}>Login / Register</Typography>
  </Link>
)}

                    {/* {
                        loggedInUser
                    }
                    <Link to={"/login"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>My Account</Typography>
                    </Link>
                    <Link to={"/login"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Login / Register</Typography>
                    </Link>
                    <Link to={"/cart"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Cart</Typography>
                    </Link> */}
                    {/* <Link to={"/wishlist"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Wishlist</Typography>
                    </Link> */}
                    {/* <Typography sx={labelStyles}>Shop</Typography> */}
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Quick Links</Typography>
                    <Link to={"/aboutus"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>About-Us</Typography>
                    </Link>
                    <Link to={"/contactus"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Contact</Typography>
                    </Link>
                    <Typography sx={labelStyles}
                            onClick={handleParcelServicesClick}>Parcel Services</Typography>
                    {/* <Typography sx={labelStyles}>Contact</Typography> */}
                </Stack>


            </Stack>

            {/* lower */}
            <Stack alignSelf={"center"} alignItems={"center"} rowGap={"1rem"} flexDirection={'row'} columnGap={'1rem'}>
                <Typography color={'GrayText'}>&copy; Thekkady Spices {new Date().getFullYear()}. All rights reserved</Typography>
                <Stack flexDirection={'row'} columnGap={'1rem'}>
                <Link to={'https://www.facebook.com/profile.php?id=100008621850081&mibextid=ZbWKwL'} target="_blank"
  rel="noopener noreferrer">
                <Box
        sx={{
            background: '#1877F2', // Facebook Blue
            borderRadius: '50%',
            padding: '5px',
            display: 'flex',
        }}
    >
        <FacebookIcon sx={{ color: 'white' }} />
    </Box>
    </Link>
                    {/* <FacebookIcon sx={{ color: '#1877F2' }} /> */}
                    {/* <InstagramIcon sx={{ color: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}/> */}
                     <Link to={'https://www.instagram.com/thekkady__spices?igsh=MWl0bGU4OGprNWUwZA'} target="_blank"
  rel="noopener noreferrer">
                    <Box
    sx={{
        background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        borderRadius: '50%',
        padding: '5px',
        display: 'flex',
    }}
>

    <InstagramIcon sx={{ color: 'white' }} />

</Box>
   </Link>
                </Stack>
            </Stack>
           {/* compny  */}
            <Stack alignSelf={"center"} alignItems={"center"} rowGap={"1rem"} flexDirection={'row'} columnGap={'1rem'}>
    <Typography color="GrayText">
    @Developed by{' '}
    <Link
      href="https://letsgametech.com/"
       component="a"
      target="_blank"

      rel="noopener noreferrer"
      underline="hover"

      sx={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
    >
      LetsGameTech
    </Link>
  </Typography>
    </Stack>
    </Stack>

        {/* Parcel Services Modal */}
        <Dialog
                open={isParcelModalOpen}
                onClose={handleCloseParcelModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '20px',
                        background: 'linear-gradient(145deg, #f0f0f0, #e6e6e6)',
                        overflow: 'hidden',
                        position: 'relative'
                    }
                }}
            >
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Close Button with Animated Hover Effect */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 10
                            }}
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IconButton onClick={handleCloseParcelModal}>
                                <CloseIcon sx={{ color: theme.palette.primary.main }} />
                            </IconButton>
                        </motion.div>

                        <DialogContent>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 'bold',
                                        color: theme.palette.primary.main,
                                        marginBottom: '24px'
                                    }}
                                >
                                    Parcel Services
                                </Typography>

                                <Stack spacing={2}>
                                    <ParcelServiceItem
                                        name="Rathimeena Parcel Service"
                                    />
                                    <ParcelServiceItem
                                        name="MSS Parcel Service"
                                    />
                                    <ParcelServiceItem
                                        name="A1 Parcel Service"
                                    />
                                </Stack>



                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                            marginTop: '24px',
                                            padding: '12px',
                                            background: 'rgba(255,0,0,0.1)',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        Important: Loading & Packing Charges Mandatory – Rs.70.00
                                    </Typography>
                                </motion.div>
                                   {/* Pricing Information */}
                                   <PricingInfo />
                            </motion.div>
                        </DialogContent>
                    </motion.div>
                </AnimatePresence>
            </Dialog>

    </>
  )
}
