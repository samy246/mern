
// nw
import { Stack, TextField, Typography, Button, Menu, MenuItem, Select, Grid, FormControl, Radio, Paper, IconButton, Box, useTheme, useMediaQuery, Modal, Snackbar, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState,useRef } from 'react'
import { Cart } from '../../cart/components/Cart'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addAddressAsync, selectAddressStatus, selectAddresses } from '../../address/AddressSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { createOrderAsync, selectCurrentOrder, selectOrderStatus } from '../../order/OrderSlice'
import { resetCartByUserIdAsync, selectCartItems } from '../../cart/CartSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CloseIcon from '@mui/icons-material/Close'
import { SHIPPING, TAXES } from '../../../constants'
import { motion } from 'framer-motion'
import banktransfer from "../../../assets/images/banktransfer.webp"
import qrcode from "../../../assets/images/qrcodepayment.webp"
import gapy from "../../../assets/images/gpay.webp"
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify'
// Mock images for payment methods
// In a real app, you would import actual images
const BANK_TRANSFER_IMAGE = banktransfer
const QR_CODE_IMAGE = qrcode
const GPAY_IMAGE = gapy

export const Checkout = () => {
    const status = ''
    const addresses = useSelector(selectAddresses)
    const [selectedAddress, setSelectedAddress] = useState(addresses[0])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
     // Add state for shipping information
     const [shippingInfo, setShippingInfo] = useState({
        method: '',
        service: '',
        cost: 0,
        isValid: false
    });

    // Create ref for Cart component to access validation method
    const cartRef = useRef(null);
    const [isShippingValid, setIsShippingValid] = useState(false);
    const [shippingData, setShippingData] = useState({
        method: '',
        service: '',
        cost: 0
    });

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            country: "India", // Set default country to India
        },
    })
    const dispatch = useDispatch()
    const loggedInUser = useSelector(selectLoggedInUser)
    const addressStatus = useSelector(selectAddressStatus)
    const navigate = useNavigate()
    const cartItems = useSelector(selectCartItems)
    const orderStatus = useSelector(selectOrderStatus)
    const currentOrder = useSelector(selectCurrentOrder)

    // Payment Modal states
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')


  // Handle shipping validation from cart component
  const handleShippingValidated = (isValid) => {
      setIsShippingValid(isValid);
  };

  // Handle shipping data changes from cart component
  const handleShippingDataChange = (data) => {
      setShippingData(data);
  };

    // const orderTotal = cartItems.reduce((acc, item) => {
    //     const weightOption = item?.product?.quantity.find(q => q.weight == item?.weight)

    //     if (weightOption) {
    //         return parseFloat(weightOption.price) * item.quantity + acc
    //     }

    //     return item.product.price * item.quantity + acc
    // }, 0)
        // Calculate order total with shipping cost from the selected shipping method
        const orderTotal = cartItems.reduce((acc, item) => {
            const weightOption = item?.product?.quantity.find(q => q.weight == item?.weight);

            if (weightOption) {
                return parseFloat(weightOption.price) * item.quantity + acc;
            }

            return item.product.price * item.quantity + acc;
        }, 0);
        const formattedOrderTotal = Number(orderTotal.toFixed(2));
        // Handler for shipping method changes from Cart component
        const handleShippingMethodChange = (info) => {
            setShippingInfo(info);
        };


    const theme = useTheme()
    const is900 = useMediaQuery(theme.breakpoints.down(900))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    // Bank account details
    const bankDetails = {
        name: "THEKKADY SPICES",
        accountNumber: "155150050800603",
        bankName: "Tamilnadu Mercantile Bank",
        ifscCode: "TMBL0000155",
        branch: "CUMBUM"
    }

    // UPI details
    const upiDetails = {
        name: "THEKKADY SPICES",
        upiId: "thekkadyspicesonline@tmb"
    }

    // GPay details
    const gpayDetails = {
        name: "THEKKADY SPICES",
        number: "8248 222 532" // Replace with actual number
    }

    useEffect(() => {
        if (addressStatus === 'fulfilled') {
            reset()
        } else if (addressStatus === 'rejected') {
            alert('Error adding your address')
        }
    }, [addressStatus])

    useEffect(() => {
        if (currentOrder && currentOrder?._id) {
            dispatch(resetCartByUserIdAsync(loggedInUser?._id))
            navigate(`/order-success/${currentOrder?._id}`)
        }
    }, [currentOrder])

    const handleAddAddress = (data) => {
        const address = { ...data, user: loggedInUser._id }
        dispatch(addAddressAsync(address))
        reset()
    }

    const handleCreateOrder = () => {
        if (!selectedAddress) {
            toast.warning("Please Enter an Address Above Form  and Select Address Before Proceeding.")

            return;
        }

        if (!selectedPaymentMethod) {
            toast.warning("Please select a payment method.")

            return;
        }
        if (!isShippingValid) {
            toast.warning("Please select a shipping method.");
            // Scroll to shipping section
            const shippingSection = document.getElementById("shipping-section");
            if (shippingSection) {
              shippingSection.scrollIntoView({ behavior: 'smooth' });
            }
            return;
          }
        // let shippingIsValid = false;
        // if (cartRef.current && cartRef.current.validateShipping) {
        //     shippingIsValid = cartRef.current.validateShipping();
        // } else {
        //     shippingIsValid = isShippingValid;
        // }

        // if (!isShippingValid) {
        //     toast.warning("Please select a shipping method.");
        //     // Scroll to shipping section
        //     const shippingSection = document.getElementById("shipping-section");
        //     if (shippingSection) {
        //         shippingSection.scrollIntoView({ behavior: 'smooth' });
        //     }
        //     return;
        // }
// console.log("orderTotal + SHIPPING + TAXES",orderTotal + SHIPPING + TAXES);
// console.log("orderTotal + SHIPPING + TAXES",orderTotal , SHIPPING , TAXES);
// console.log("orderTotal",formattedOrderTotal,formattedShippingCost);
const formattedOrderTotal = Number(orderTotal.toFixed(2));
const formattedShippingCost = Number((shippingData.cost || SHIPPING).toFixed(2));

const total = Number((formattedOrderTotal + formattedShippingCost).toFixed(2));

console.log("Total:", total);
        const order = {
            user: loggedInUser._id,
            item: cartItems,
            address: selectedAddress,
            shipping:formattedShippingCost,
            paymentMode: selectedPaymentMethod,
            total: total.toFixed(2)
        }
        dispatch(createOrderAsync(order))
    }

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method)
        if(method !==''){
            setPaymentModalOpen(true)
        }

    }

    const handleCloseModal = () => {
        setPaymentModalOpen(false)
    }
    const downloadPaymentDetails = () => {
        // Get reference to the modal content
        const modalContent = document.getElementById('payment-modal-content');

        if (!modalContent) {
            console.error('Modal content element not found');
            setToastMessage('Error: Could not capture payment details');
            setToastOpen(true);
            return;
        }

        // Use html2canvas to capture the modal content as an image
        html2canvas(modalContent).then(canvas => {
            // Convert canvas to image data URL
            const imageData = canvas.toDataURL('image/png');

            // Create download link
            const a = document.createElement('a');
            a.href = imageData;

            // Set file name based on payment method
            let filename = 'payment-details.png';
            if (selectedPaymentMethod === 'BANKACCOUNT') {
                filename = 'bank-details.png';
            } else if (selectedPaymentMethod === 'QRCODE') {
                filename = 'qr-code-details.png';
            } else if (selectedPaymentMethod === 'GPAYANDPHONEPAY') {
                filename = 'gpay-details.png';
            }

            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setToastMessage('Payment details image downloaded!');
            setToastOpen(true);
        }).catch(error => {
            console.error('Error capturing modal content:', error);
            setToastMessage('Error capturing payment details');
            setToastOpen(true);
        });
    }

    // Modal content based on payment method
    const renderModalContent = () => {
        if (selectedPaymentMethod === 'BANKACCOUNT') {
            return (
                <Stack id="payment-modal-content" spacing={2} alignItems="center">
                    <img
                        src={BANK_TRANSFER_IMAGE}
                        alt="Bank Transfer"
                        style={{ width: '200px', height: 'auto', marginBottom: '1rem' }}
                    />
                    <Typography variant="h6">Bank Account Details</Typography>
                    <Typography><b>NAME:</b> {bankDetails.name}</Typography>
                    <Typography><b>A/C:</b> {bankDetails.accountNumber}</Typography>
                    <Typography><b>Bank:</b> {bankDetails.bankName}</Typography>
                    <Typography><b>IFSC Code:</b> {bankDetails.ifscCode}</Typography>
                    <Typography><b>BRANCH:</b> {bankDetails.branch}</Typography>
                    <Button
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                        onClick={downloadPaymentDetails}
                    >
                        Download Details
                    </Button>
                </Stack>
            )
        } else if (selectedPaymentMethod === 'QRCODE') {
            return (
                <Stack id="payment-modal-content" spacing={2} alignItems="center">
                    <img
                        src={QR_CODE_IMAGE}
                        alt="QR Code"
                        style={{ width: '200px', height: 'auto', marginBottom: '1rem' }}
                    />
                    <Typography variant="h6">UPI Payment</Typography>
                    <Typography><b>NAME:</b> {upiDetails.name}</Typography>
                    <Typography><b>UPI ID:</b> {upiDetails.upiId}</Typography>
                    <Button
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                        onClick={downloadPaymentDetails}
                    >
                        Download Details
                    </Button>
                </Stack>
            )
        } else if (selectedPaymentMethod === 'GPAYANDPHONEPAY') {
            return (
                <Stack id="payment-modal-content" spacing={2} alignItems="center">
                    <img
                        src={GPAY_IMAGE}
                        alt="GPay"
                        style={{ width: '200px', height: 'auto', marginBottom: '1rem' }}
                    />
                    <Typography variant="h6">Google Pay / Phone Pay</Typography>
                    <Typography><b>NAME:</b> {gpayDetails.name}</Typography>
                    <Typography><b>Number:</b> {gpayDetails.number}</Typography>
                    <Button
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                        onClick={downloadPaymentDetails}
                    >
                        Download Details
                    </Button>
                </Stack>
            )
        }
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: is480 ? '90%' : 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    }

    return (
        <Stack flexDirection={'row'} p={2} rowGap={10} justifyContent={'center'} flexWrap={'wrap'} mb={'5rem'} mt={'7rem'} columnGap={4} alignItems={'flex-start'}>
            {/* left box */}
            <Stack rowGap={4}>
                {/* heading */}
                <Stack flexDirection={'row'} columnGap={is480 ? 0.3 : 1} alignItems={'center'}>
                    <motion.div whileHover={{ x: -5 }}>
                        <IconButton component={Link} to={"/cart"}><ArrowBackIcon fontSize={is480 ? "medium" : 'large'} /></IconButton>
                    </motion.div>
                    <Typography variant='h4'>Shipping Information</Typography>
                </Stack>

                {/* address form */}
                {/* new */}
                <Stack component={'form'} noValidate rowGap={2} onSubmit={handleSubmit(handleAddAddress)}>

    {/* Address Type */}
    <Stack>
        <Typography gutterBottom>Enter Type</Typography>
        <TextField
            placeholder='Eg. Home, Business'
            {...register("type", { required: "Type is required" })}
            error={!!errors.type}
            helperText={errors.type?.message}
        />
    </Stack>

    {/* Street */}
    <Stack>
        <Typography gutterBottom>Enter Street(Full Address)</Typography>
        <TextField
            {...register("street", { required: "Street is required" })}
            error={!!errors.street}
            helperText={errors.street?.message}
        />
    </Stack>

    {/* Country */}
    <Stack>
        <Typography gutterBottom>Country</Typography>
        <TextField
            {...register("country", { required: "Country is required" })}


            defaultValue="India" // This ensures the UI shows India initially
            InputProps={{
                readOnly: true, // If you want the country to be non-editable
            }}
            error={!!errors.country}
            helperText={errors.country?.message}
        />
    </Stack>

    {/* Phone Number Validation */}
    <Stack>
        <Typography gutterBottom>Phone Number</Typography>
        <TextField
            type='number'
            {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                    value: /^[6-9]\d{9}$/, // Ensures 10-digit number starting with 6-9
                    message: "Enter a valid 10-digit phone number",
                },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
        />
    </Stack>

    {/* City, State, Postal Code */}
    <Stack flexDirection={'row'} columnGap={2}>

        {/* City */}
        <Stack width={'100%'}>
            <Typography gutterBottom>City</Typography>
            <TextField
                {...register("city", { required: "City is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
            />
        </Stack>

        {/* State */}
        <Stack width={'100%'}>
            <Typography gutterBottom>State</Typography>
            <TextField
                {...register("state", { required: "State is required" })}
                error={!!errors.state}
                helperText={errors.state?.message}
            />
        </Stack>

        {/* Postal Code */}
        <Stack width={'100%'}>
            <Typography gutterBottom>Postal Code</Typography>
            <TextField
                type='number'
                {...register("postalCode", {
                    required: "Postal Code is required",
                    pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Enter a valid 6-digit postal code"
                    }
                })}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
            />
        </Stack>
    </Stack>

    {/* Buttons */}
    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
        <LoadingButton loading={status === 'pending'} type='submit' variant='contained'>
            Add
        </LoadingButton>
        <Button color='error' variant='outlined' onClick={() => reset()}>Reset</Button>
    </Stack>

</Stack>

                {/* <Stack component={'form'} noValidate rowGap={2} onSubmit={handleSubmit(handleAddAddress)}>
                    <Stack>
                        <Typography gutterBottom>Type</Typography>
                        <TextField placeholder='Eg. Home, Business' {...register("type", { required: true })} />
                    </Stack>

                    <Stack>
                        <Typography gutterBottom>Street</Typography>
                        <TextField {...register("street", { required: true })} />
                    </Stack>

                    <Stack>
                        <Typography gutterBottom>Country</Typography>
                        <TextField {...register("country", { required: true })} />
                    </Stack>

                    <Stack>
                        <Typography gutterBottom>Phone Number</Typography>
                        <TextField type='number' {...register("phoneNumber", { required: true })} />
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <Stack width={'100%'}>
                            <Typography gutterBottom>City</Typography>
                            <TextField {...register("city", { required: true })} />
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography gutterBottom>State</Typography>
                            <TextField {...register("state", { required: true })} />
                        </Stack>
                        <Stack width={'100%'}>
                            <Typography gutterBottom>Postal Code</Typography>
                            <TextField type='number' {...register("postalCode", { required: true })} />
                        </Stack>
                    </Stack>

                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                        <LoadingButton loading={status === 'pending'} type='submit' variant='contained'>add</LoadingButton>
                        <Button color='error' variant='outlined' onClick={() => reset()}>Reset</Button>
                    </Stack>
                </Stack> */}

                {/* existing address */}
                <Stack rowGap={3}>
                {addresses.length > 0 ? (
        <>
            <Stack>
                <Typography variant='h6'>Address<span style={{ color: "red" }}>*</span></Typography>
                <Typography variant='body2' color={'text.secondary'}>Choose from existing Addresses</Typography>
            </Stack>

            <Grid container gap={2} width={is900 ? "auto" : '50rem'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                {addresses.map((address, index) => (
                    <FormControl item key={address._id || index}>
                        <Stack p={is480 ? 2 : 2} width={is480 ? '100%' : '20rem'} height={is480 ? 'auto' : '15rem'} rowGap={2} component={Paper} elevation={1}>
                            <Stack flexDirection={'row'} alignItems={'center'}>
                                <Radio checked={selectedAddress === address} name='addressRadioGroup' value={selectedAddress} onChange={() => setSelectedAddress(addresses[index])} />
                                <Typography>{address.type}</Typography>
                            </Stack>

                            {/* details */}
                            <Stack>
                                <Typography>{address.street}</Typography>
                                <Typography>{address.state}, {address.city}, {address.country}, {address.postalCode}</Typography>
                                <Typography>{address.phoneNumber}</Typography>
                            </Stack>
                        </Stack>
                    </FormControl>
                ))}
            </Grid>
        </>
    ) : (
        <Typography variant='h6' color='error' fontWeight="bold" textAlign="center">
            Please add an address before proceeding.
        </Typography>
    )}
                </Stack>

                {/* payment methods */}
                <Stack rowGap={3}>
                    <Stack>
                        <Typography variant='h6'>Payment Methods <span style={{ color: "red" }}>*</span></Typography>
                        <Typography variant='body2' color={'text.secondary'}>Please select a payment method</Typography>
                    </Stack>

                    <Stack rowGap={2}>
                    <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio
                                value=''
                                name='paymentMethod'
                                checked={selectedPaymentMethod === ''}
                                onChange={() => handlePaymentMethodChange('')}
                            />
                            <Typography>Select Payment Method</Typography>
                        </Stack>
                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio
                                value='BANKACCOUNT'
                                name='paymentMethod'
                                checked={selectedPaymentMethod === 'BANKACCOUNT'}
                                onChange={() => handlePaymentMethodChange('BANKACCOUNT')}
                            />
                            <Typography>Bank Account</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio
                                value='QRCODE'
                                name='paymentMethod'
                                checked={selectedPaymentMethod === 'QRCODE'}
                                onChange={() => handlePaymentMethodChange('QRCODE')}
                            />
                            <Typography>QR Code</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Radio
                                value='GPAYANDPHONEPAY'
                                name='paymentMethod'
                                checked={selectedPaymentMethod === 'GPAYANDPHONEPAY'}
                                onChange={() => handlePaymentMethodChange('GPAYANDPHONEPAY')}
                            />
                            <Typography>Google & Phone pay </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/* right box */}
            <Stack width={is900 ? '100%' : 'auto'} alignItems={is900 ? 'flex-start' : ''}>
                <Typography variant='h4'>Order summary</Typography>
                <Cart checkout={true}  ref={cartRef}
  onShippingValidated={handleShippingValidated}
  onShippingDataChange={handleShippingDataChange}/>
                <LoadingButton fullWidth loading={orderStatus === 'pending'} variant='contained' onClick={handleCreateOrder} size='large'>Pay and order</LoadingButton>
            </Stack>

            {/* Payment Details Modal */}
            <Modal
       onBackdropClick={(event) => event.stopPropagation()}
                open={paymentModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="payment-details-modal"
                aria-describedby="payment-details-description"
            >
                <Box sx={modalStyle}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography id="payment-details-modal" variant="h6" component="h2">
                            Payment Details
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    {renderModalContent()}
                </Box>
            </Modal>

            {/* Toast notification */}
            <Snackbar
                open={toastOpen}
                autoHideDuration={4000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Stack>
    )
}