import {Box, FormHelperText, Stack, TextField, Typography, useMediaQuery,IconButton,
  InputAdornment,
   useTheme } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectLoggedInUser,loginAsync,selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus} from '../AuthSlice'
import { toast } from 'react-toastify'
import {MotionConfig, motion} from 'framer-motion'
import bgimage from "../../../assets/images/loginbg.webp"
import logo from "../../../assets/images/logo.webp"
export const Login = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectLoginStatus)
  const error=useSelector(selectLoginError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down(900))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  const [showPassword, setShowPassword] = useState(false);
  // handles user redirection
  useEffect(()=>{
    if(loggedInUser && loggedInUser?.isVerified){
      navigate("/")
    }
    else if(loggedInUser && !loggedInUser?.isVerified){
      navigate("/verify-otp")
    }
  },[loggedInUser])

  // handles login error and toast them
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
  },[error])

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(()=>{
    if(status==='fullfilled' && loggedInUser?.isVerified===true){
      toast.success(`Login successful`)
      reset()
    }
    return ()=>{
      dispatch(clearLoginError())
      dispatch(resetLoginStatus())
    }
  },[status])

  const handleLogin=(data)=>{
    const cred={...data}
    delete cred.confirmPassword
    dispatch(loginAsync(cred))
  }

  return (
    <Stack
    width="100vw"
    height="100vh"
    flexDirection="row"
    sx={{
      overflowY: "hidden",
      backgroundImage: `url(${bgimage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    // width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}} style={{ backgroundImage: `url(${bgimage})`,}}
    >
{/*
        {
          !is900 &&

        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack>
        } */}

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
  {/* Logo Image */}
  <img
          src={logo}
          alt="Thekkady Spices Logo"

        />
              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

                <Stack rowGap={'.4rem'}>
                  <Typography variant='h4' sx={{ color: "white", wordBreak: "break-word",textAlign:"center" }} fontWeight={500}>Thekkady Spices</Typography>
                  <Typography alignSelf={'center'} color="white" variant='body2'>Please login</Typography>
                </Stack>

              </Stack>

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>

                    <motion.div whileHover={{y:-5}}>
                      <TextField fullWidth {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'
               sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white", // Set input background color to white
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                input: {
                  color: "black", // Change text color for contrast
                  "&::placeholder": { color: "rgba(0, 0, 0, 0.6)" } // Adjust placeholder color for visibility
                },
              }}
          />
                      {errors.email && <FormHelperText sx={{mt:1}} error>{errors.email.message}</FormHelperText>}
                    </motion.div>


                    <motion.div whileHover={{y:-5}}>
                      <TextField  type={showPassword ? "text" : "password"} fullWidth {...register("password",{required:"Password is required"})} placeholder='Password'
                     sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white", // Set input background color to white
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                      input: {
                        color: "black", // Change text color for contrast
                        "&::placeholder": { color: "rgba(0, 0, 0, 0.6)" } // Adjust placeholder color for visibility
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff sx={{ color: "black" }} /> : <Visibility sx={{ color: "black" }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}


                    />
                      {errors.password && <FormHelperText sx={{mt:1}} error>{errors.password.message}</FormHelperText>}
                    </motion.div>

                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton fullWidth
                       sx={{
            height: "2.5rem",
            backgroundColor: "#0aad0a",
            "&:hover": { backgroundColor: "#089b08" },
          }} loading={status==='pending'} type='submit' variant='contained'
           >Login</LoadingButton>
                    </motion.div>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} >

                      <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
                          <motion.div>
                              <Typography mr={'1.5rem'} sx={{textDecoration:"none",color:"white"}} to={'/forgot-password'} component={Link}>Forgot password</Typography>
                          </motion.div>

                          <motion.div>
                            <Typography sx={{textDecoration:"none",color:"white"}} to={'/signup'} component={Link}>Don't have an account? <span style={{color:"#089b08",fontWeight:"500"}}>Register</span></Typography>
                          </motion.div>
                      </MotionConfig>

                    </Stack>

                </Stack>
        </Stack>
    </Stack>
  )
}
