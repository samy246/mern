
// new
import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetCurrentOrder, selectCurrentOrder } from '../features/order/OrderSlice'
import { selectUserInfo } from '../features/user/UserSlice'
import { orderSuccessAnimation } from '../assets'
import Lottie from 'lottie-react'
import { Navbar } from '../features/navigation/components/Navbar'

export const OrderSuccessPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentOrder = useSelector(selectCurrentOrder)
    const userDetails = useSelector(selectUserInfo)
    const { id } = useParams()

    const theme = useTheme()
    const is480 = useMediaQuery(theme.breakpoints.down(480))
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (!currentOrder) {
            navigate("/")
        }

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(timer);
                    dispatch(resetCurrentOrder());
                    navigate("/orders");
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentOrder, dispatch, navigate]);

    return (
        <>
        <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>

            <Stack component={Paper} boxShadow={is480 ? 'none' : ""} rowGap={3} elevation={1} p={is480 ? 1 : 4} justifyContent={'center'} alignItems={'center'}>

                <Box width={'10rem'} height={'7rem'}>
                    <Lottie animationData={orderSuccessAnimation}></Lottie>
                </Box>

                <Stack mt={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} rowGap={1}>
                    <Typography variant='h6' fontWeight={400}>Hey {userDetails?.name}</Typography>
                    <Typography variant='h5'>Your Have Place the Order #{currentOrder?._id}</Typography>
                    <Typography variant='body2' color='text.secondary'>Thank you for shopping with us ❤️</Typography>
                    <Typography variant='body2' color='text.secondary'>Please Check Your mail</Typography>
                    <Typography variant='body1' fontWeight={500}>Payment Mode: {currentOrder?.paymentMode}</Typography>
                    <Typography variant='body1' fontWeight={500}>Total Amount: ₹{currentOrder?.total}</Typography>
                </Stack>

                <Stack mt={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} rowGap={1}>

                    <Typography variant='body1' fontWeight={600} color='primary'>Parcel Status: 9944 78 9777</Typography>
                    <Typography variant='body1' fontWeight={600} color='error'>Customer Care: 8248 22 2532</Typography>
                    <Typography variant='h4'>Kindly call customer care number and confirm your order.</Typography>
                </Stack>
                <Typography variant='body1' color='text.secondary'>Redirecting in {countdown} seconds...</Typography>
                <Button component={Link} to={'/orders'} onClick={() => dispatch(resetCurrentOrder())} size={is480 ? "small" : ""} variant='contained'>Check order status in My Orders</Button>
            </Stack>
        </Stack>
        </>
    )
}

