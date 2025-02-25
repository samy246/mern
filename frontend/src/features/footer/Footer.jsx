import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { QRCodePng, appStorePng, googlePlayPng ,facebookPng,instagramPng,twitterPng,linkedinPng} from '../../assets'
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import footerbg from "../../assets/images/footer-bg.webp"
export const Footer = () => {

    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))

    const labelStyles={
        fontWeight:300,
        cursor:'pointer'
    }

  return (
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
                    <Typography sx={labelStyles}>My Account</Typography>
                    <Link to={"/login"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Login / Register</Typography>
                    </Link>
                    <Link to={"/cart"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Cart</Typography>
                    </Link>
                    <Link to={"/wishlist"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>Wishlist</Typography>
                    </Link>
                    {/* <Typography sx={labelStyles}>Shop</Typography> */}
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Quick Links</Typography>
                    <Link to={"/aboutus"} style={{textDecoration:"none",color:"#ffffff"}}>
                    <Typography sx={labelStyles}>About-Us</Typography>
                    </Link>
                    <Typography sx={labelStyles}>Contact</Typography>
                    {/* <Typography sx={labelStyles}>FAQ</Typography>
                    <Typography sx={labelStyles}>Contact</Typography> */}
                </Stack>

                {/* <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Download App</Typography>
                    <Typography sx={{...labelStyles,color:"graytext",fontWeight:500}}>Save $3 with App New User Only</Typography>
                    <Stack flexDirection={'row'} columnGap={'.5rem'}>

                        <Box width={'100px'} height={"100px"}>
                            <img src={QRCodePng} height={'100%'} width={'100%'} style={{objectFit:'contain'}} alt="QR Code"/>
                        </Box>

                        <Stack justifyContent={'space-around'}>
                            <Stack>
                                <img style={{width:"100%",height:"100%",cursor:"pointer"}} src={googlePlayPng} alt="GooglePlay" />
                            </Stack>
                            <Stack>
                                <img style={{width:"100%",height:'100%',cursor:"pointer"}} src={appStorePng} alt="AppStore" />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack mt={.6} flexDirection={'row'} columnGap={'2rem'}>
                        <MotionConfig whileHover={{scale:1.1}} whileTap={{scale:1}}>
                            <motion.img style={{cursor:"pointer"}} src={facebookPng} alt="Facebook" />
                            <motion.img style={{cursor:"pointer"}} src={twitterPng} alt="Twitter" />
                            <motion.img style={{cursor:"pointer"}} src={instagramPng} alt="Instagram" />
                            <motion.img style={{cursor:"pointer"}} src={linkedinPng} alt="Linkedin" />
                        </MotionConfig>
                    </Stack>
                </Stack> */}

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

    </Stack>
  )
}
