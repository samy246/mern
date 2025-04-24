
// mar30
import React, { useEffect, useState,useImperativeHandle, forwardRef  } from 'react'
import { CartItem } from './CartItem'
import { Button, Chip, Paper, Stack, Typography, useMediaQuery, useTheme, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Divider, Alert } from '@mui/material'
import { resetCartItemRemoveStatus, selectCartItemRemoveStatus, selectCartItems } from '../CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SHIPPING, TAXES } from '../../../constants'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

// Parcel service options
const PARCEL_SERVICES = [
    { name: "Rathimeena parcel service", baseCharge: 70.00 },
    { name: "MSS parcel service", baseCharge: 70.00 },
    { name: "A1 parcel service", baseCharge: 70.00 }
];

// Courier service options
const COURIER_SERVICES = [
    { name: "Professional courier Door delivery", rates: { base: 30.00, additional: 25.00 } }
];

export const Cart = forwardRef(({ checkout, onShippingValidated, onShippingDataChange }, ref) => {
    const items = useSelector(selectCartItems)
    const [shippingMethod, setShippingMethod] = useState('');
    const [selectedParcelService, setSelectedParcelService] = useState('');
    const [selectedCourierService, setSelectedCourierService] = useState('');

    // Add validation state
    const [showValidationError, setShowValidationError] = useState(false);
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

    // Calculate total weight of items for courier pricing
    // const totalWeight = items.reduce((acc, item) => {
    //     // Extract weight in kg from the weight string (e.g., "100g" -> 0.1)
    //     const weightValue = parseFloat(item.weight) || 0;
    //     const weightUnit = item.weight.replace(/[0-9.]/g, '').toLowerCase();

    //     let weightInKg = weightValue;
    //     if (weightUnit.includes('g')) {
    //         weightInKg = weightValue / 1000;
    //     }

    //     return acc + (weightInKg * item.quantity);
    // }, 0);
// In your total weight calculation
const totalWeight = items.reduce((acc, item) => {
    console.log("Item:", item.product.title);
    console.log("Raw weight string:", item.weight);
    console.log("Quantity:", item.quantity);

    const weightValue = parseFloat(item.weight) || 0;
    console.log("Parsed weight value:", weightValue);

    const weightUnit = item.weight.replace(/[0-9.]/g, '').toLowerCase();
    console.log("Weight unit:", weightUnit);

    let weightInKg = weightValue;
    if (weightUnit.includes('g') && !weightUnit.includes('kg')) {
        weightInKg = weightValue / 1000;
    }
    console.log("Weight in kg:", weightInKg);
    console.log("Weight × quantity:", weightInKg * item.quantity);

    return acc + (weightInKg * item.quantity);
}, 0);

console.log("FINAL TOTAL WEIGHT:", totalWeight);
    // Calculate shipping cost based on selection
    // const calculateShippingCost = () => {
    //     if (shippingMethod === 'parcel' && selectedParcelService) {
    //         // All parcel services have fixed 70 Rs charge
    //         return 70;
    //     } else if (shippingMethod === 'courier' && selectedCourierService) {
    //         // Courier pricing: 30 Rs for first kg, 25 Rs for each additional kg
    //         const courier = COURIER_SERVICES[0];

    //         if (totalWeight <= 1) {
    //             return courier.rates.base;
    //         } else {
    //             console.log("Using courier service:", courier.name);
    //             console.log("Base rate:", courier.rates.base, "Rs");
    //             console.log("Additional rate per kg:", courier.rates.additional, "Rs");

    //             if (totalWeight <= 1) {
    //                 console.log("Weight <= 1kg, charging only base rate");
    //                 return courier.rates.base;
    //             } else {
    //                 const additionalWeight = Math.ceil(totalWeight - 1);
    //                 console.log("Weight > 1kg, calculating additional charges");
    //                 console.log("Additional weight (rounded up):", additionalWeight, "kg");

    //                 const totalCost = courier.rates.base + (additionalWeight * courier.rates.additional);
    //                 console.log("Total cost:", totalCost, "Rs");
    //                 return totalCost;
    //             }
    //             // return courier.rates.base + Math.ceil(totalWeight - 1) * courier.rates.additional;
    //         }
    //     }
    //     return 0;
    // };
    const calculateShippingCost = () => {
        if (shippingMethod === 'parcel' && selectedParcelService) {
            // All parcel services have fixed 70 Rs charge
            return 70;
        } else if (shippingMethod === 'courier' && selectedCourierService) {
            // Courier pricing: 30 Rs for first kg, 25 Rs for each additional kg
            const courier = COURIER_SERVICES[0];

            console.log("Using courier service:", courier.name);
            console.log("Base rate:", courier.rates.base, "Rs");
            console.log("Additional rate per kg:", courier.rates.additional, "Rs");
            console.log("Total weight:", totalWeight, "kg");

            if (totalWeight <= 1) {
                console.log("Weight <= 1kg, charging only base rate");
                return courier.rates.base;
            } else {
                const additionalWeight = Math.ceil(totalWeight - 1);
                console.log("Weight > 1kg, calculating additional charges");
                console.log("Additional weight (rounded up):", additionalWeight, "kg");
                // totalWeight
                const totalCost = ( courier.rates.additional  +courier.rates.additional);
                console.log("Total cost:", totalCost, "Rs");
                return totalCost;
            }
        }
        return 0;
    };
    const shippingCost = calculateShippingCost();

    // Check if shipping selection is valid
    const isShippingValid = () => {
        if (shippingMethod == 'parcel') {
            return !!selectedParcelService;
        } else if (shippingMethod == 'courier') {
            return !!selectedCourierService;
        }
        return false;
    };
    useEffect(() => {
        if (checkout) {
            // Validate shipping selection and update parent component
            const isValid = isShippingValid();

            if (onShippingValidated) {
                onShippingValidated(isValid);
            }

            // Pass shipping data to parent component
            if (onShippingDataChange) {
                onShippingDataChange({
                    method: shippingMethod,
                    service: shippingMethod === 'parcel' ? selectedParcelService : selectedCourierService,
                    cost: shippingCost
                });
            }

            // Only show validation error if user has attempted to submit
            if (hasAttemptedSubmit) {
                setShowValidationError(!isValid);
            }
        }
    }, [shippingMethod, selectedParcelService, selectedCourierService, hasAttemptedSubmit, checkout]);

    // Precise subtotal calculation matching weight in quantity
    const subtotal = items.reduce((acc, item) => {
        // Find the specific weight option in the product's quantity array
        const weightOption = item?.product?.quantity.find(q => q.weight == item?.weight)

        // If weight option found, use its price and multiply by cart item quantity
        if (weightOption) {
            return parseFloat(weightOption.price) * item.quantity + acc
        }

        // Fallback to default price if no weight match
        return item.product.price * item.quantity + acc
    }, 0)

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const navigate = useNavigate()
    const theme = useTheme()
    const is900 = useMediaQuery(theme.breakpoints.down(900))

    const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    useEffect(() => {
        if (items.length === 0) {
            navigate("/")
        }
    }, [items])

    useEffect(() => {
        if (cartItemRemoveStatus === 'fulfilled') {
            toast.success("Product removed from cart")
        }
        else if (cartItemRemoveStatus === 'rejected') {
            toast.error("Error removing product from cart, please try again later")
        }
    }, [cartItemRemoveStatus])

    useEffect(() => {
        return () => {
            dispatch(resetCartItemRemoveStatus())
        }
    }, [])

    // Pass shipping info to parent component when it changes
    // useEffect(() => {
    //     if (checkout && onShippingMethodChange) {
    //         const shippingInfo = {
    //             method: shippingMethod,
    //             service: shippingMethod === 'parcel' ? selectedParcelService : selectedCourierService,
    //             cost: shippingCost,
    //             isValid: isShippingValid()
    //         };
    //         onShippingMethodChange(shippingInfo);
    //     }
    // }, [shippingMethod, selectedParcelService, selectedCourierService, shippingCost, checkout]);

    // Helper function to get price for a specific weight
    const getPriceForWeight = (product, selectedWeight) => {
        const weightOption = product.quantity.find(q => q.weight === selectedWeight)
        return weightOption ? parseFloat(weightOption.price) : product.price
    }

    // Handle shipping method change
    const handleShippingMethodChange = (event) => {
        setShippingMethod(event.target.value);
console.log("method value",event.target.value);
// debugger;
        // Reset service selection when changing shipping method
        if (event.target.value === 'parcel') {
            setSelectedParcelService(PARCEL_SERVICES[0].name);
            setSelectedCourierService('');
        } else if (event.target.value === 'courier') {
            setSelectedCourierService(COURIER_SERVICES[0].name);
            setSelectedParcelService('');
            // calculateShippingCost()
        }

        // Hide validation error when user starts making selections
        if (hasAttemptedSubmit) {
            setShowValidationError(!isShippingValid());
        }
    };

    // Handle parcel service change
    const handleParcelServiceChange = (event) => {
        setSelectedParcelService(event.target.value);
        // Hide validation error when user selects a service
        setShowValidationError(false);
    };

    // Handle courier service change
    const handleCourierServiceChange = (event) => {
        setSelectedCourierService(event.target.value);
        // Hide validation error when user selects a service
        setShowValidationError(false);
        // calculateShippingCost()
    };

    // Method to validate shipping before checkout
    const validateShipping = () => {
        setHasAttemptedSubmit(true);
        const valid = isShippingValid();
        setShowValidationError(!valid);
        return valid;
    };
    useImperativeHandle(ref, () => ({
        validateShipping
    }));
    return (
        <>
        <Stack justifyContent={'flex-start'} alignItems={'center'} mb={'5rem'} mt={!checkout ? '6rem':'0rem'}>
            <Stack width={is900 ? 'auto' : '50rem'} mt={'3rem'} paddingLeft={checkout ? 0 : 2} paddingRight={checkout ? 0 : 2} rowGap={4}>
                {/* cart items */}
                {!checkout && <Typography variant='h4'>Cart</Typography>}
                <Stack rowGap={2}>
                {
                    items && items.map((item) => (
                        <CartItem
                            key={item?._id}
                            id={item?._id}
                            title={item?.product?.title}
                            brand={item?.product?.brand?.name}
                            category={item?.product?.category?.name}
                            price={getPriceForWeight(item?.product, item?.weight)}
                            quantity={item?.quantity}
                            thumbnail={item?.product?.thumbnail}
                            stockQuantity={item?.product?.stockQuantity}
                            productId={item?.product?._id}
                            selectedWeight={item?.weight}
                            weightOptions={item?.product?.quantity}
                        />
                    ))
                }
                </Stack>

                {/* Shipping options */}
                {checkout && (
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            mt: 2,
                            border: showValidationError ? '1px solid red' : 'none',
                            position: 'relative'
                        }}
                        id="shipping-section"
                    >
                        <Typography variant="h6" gutterBottom>Select Shipping Method <span style={{ color: "red" }}>*</span></Typography>

                        {showValidationError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                Please select a shipping method to continue
                            </Alert>
                        )}

                        <FormControl component="fieldset" error={showValidationError} required>
                            <RadioGroup
                                name="shipping-method"
                                value={shippingMethod}
                                onChange={handleShippingMethodChange}
                            >
                                <FormControlLabel value="parcel" control={<Radio />} label="Parcel Service" />
                                <FormControlLabel value="courier" control={<Radio />} label="Courier" />
                            </RadioGroup>
                        </FormControl>

                        <Divider sx={{ my: 2 }} />

                        {/* Parcel service options */}
                        {shippingMethod === 'parcel' && (
                            <FormControl
                                component="fieldset"
                                sx={{ ml: 4 }}
                                error={showValidationError && !selectedParcelService}
                                required
                            >
                                <FormLabel component="legend">Select a Parcel Service</FormLabel>
                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                    Loading Charges & Packing charges: 70 Rupees (mandatory)
                                </Typography>
                                <RadioGroup
                                    name="parcel-service"
                                    value={selectedParcelService}
                                    onChange={handleParcelServiceChange}
                                >
                                    {PARCEL_SERVICES.map(service => (
                                        <FormControlLabel
                                            key={service.name}
                                            value={service.name}
                                            control={<Radio />}
                                            label={service.name}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}

                        {/* Courier service options */}
                        {shippingMethod === 'courier' && (
                            <FormControl
                                component="fieldset"
                                sx={{ ml: 4 }}
                                error={showValidationError && !selectedCourierService}
                                required
                            >
                                <FormLabel component="legend">Select a Courier Service</FormLabel>
                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                    0-1 kg: 30 Rs, More than 1 kg: 25 Rs per additional kg
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Total weight of items: {totalWeight.toFixed(2)} kg
                                </Typography>
                                <RadioGroup
                                    name="courier-service"
                                    value={selectedCourierService}
                                    onChange={handleCourierServiceChange}
                                >
                                    {COURIER_SERVICES.map(service => (
                                        <FormControlLabel
                                            key={service.name}
                                            value={service.name}
                                            control={<Radio />}
                                            label={service.name}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    </Paper>
                )}
                {/* subtotal */}
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    {
                        checkout ? (
                            <Stack rowGap={2} width={'100%'}>
                                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                    <Typography>Subtotal(Inclu.of All Taxes)</Typography>
                                    <Typography>Rs.{subtotal.toFixed(2)}</Typography>
                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                    <Typography>Shipping</Typography>
                                    <Typography>Rs.{(shippingCost || SHIPPING).toFixed(2)}</Typography>
                                </Stack>

                                <hr/>

                                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                    <Typography>Total</Typography>
                                    <Typography>Rs.{(subtotal + (shippingCost || SHIPPING) + TAXES).toFixed(2)}</Typography>
                                </Stack>
                            </Stack>
                        ) : (
                            <>
                                <Stack>
                                    <Typography variant='h6' fontWeight={500}>Subtotal(Inclu.of All Taxes)</Typography>
                                    <Typography>Total items in cart {totalItems}</Typography>
                                    <Typography variant='body1' color={'text.secondary'}>Shipping and Packaging Charge will be calculated at checkout.</Typography>
                                </Stack>

                                <Stack>
                                    <Typography variant='h6' fontWeight={500}>Rs.{subtotal.toFixed(2)}</Typography>
                                </Stack>
                            </>
                        )
                    }
                </Stack>

                {/* checkout or continue shopping */}
                {
                !checkout &&
                <Stack rowGap={'1rem'}>
                    <Button variant='contained' component={Link} to='/checkout'>Checkout</Button>
                    <motion.div style={{alignSelf:'center'}} whileHover={{y:2}}><Chip sx={{cursor:"pointer",borderRadius:"8px"}} component={Link} to={'/products'} label="or continue shopping" variant='outlined'/></motion.div>
                </Stack>
                }
            </Stack>
        </Stack>
        </>
    )
});
// Export validation method
// Cart.validateShipping = (cartRef) => {
//     if (cartRef && cartRef.current) {
//         return cartRef.current.validateShipping();
//     }
//     return false;
// };