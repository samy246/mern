
// new
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice'
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'

export const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const productAddStatus = useSelector(selectProductAddStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    // State for quantity options
    const [quantities, setQuantities] = useState([{ weight: '', price: '' }])

    // State for image previews
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [imagePreviews, setImagePreviews] = useState(["", "", "", ""])

    useEffect(() => {
        if (productAddStatus === 'fullfilled') {
            reset()
            toast.success("New product added")
            navigate("/admin/dashboard")
        }
        else if (productAddStatus === 'rejected') {
            toast.error("Error adding product, please try again later")
        }
    }, [productAddStatus])

    useEffect(() => {
        return () => {
            dispatch(resetProductAddStatus())
        }
    }, [])

    // Handle adding a new quantity option
    const addQuantityOption = () => {
        setQuantities([...quantities, { weight: '', price: '' }])
    }

    // Handle removing a quantity option
    const removeQuantityOption = (index) => {
        const newQuantities = quantities.filter((_, i) => i !== index)
        setQuantities(newQuantities)
    }

    // Handle changing quantity option values
    const handleQuantityChange = (index, field, value) => {
        const newQuantities = [...quantities]
        newQuantities[index][field] = value
        setQuantities(newQuantities)
    }

    // Handle thumbnail upload and preview
    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setThumbnailPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle product image uploads and previews
    const handleImageUpload = (e, index) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const newImages = [...imagePreviews]
                newImages[index] = reader.result
                setImagePreviews(newImages)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle removing a product image
    const handleRemoveImage = (index) => {
        const newImages = [...imagePreviews]
        newImages[index] = ""
        setImagePreviews(newImages)
    }

    const handleAddProduct = (data) => {
        // Create the product object with form data and state
        const newProduct = {
            ...data,
            thumbnail: thumbnailPreview,
            images: imagePreviews.filter(img => img !== ""), // Only include non-empty images
            quantity: quantities.filter(q => q.weight && q.price) // Only include complete quantity options
        }

        // Remove the unnecessary fields that were in the form but aren't needed in final object
        delete newProduct.image0
        delete newProduct.image1
        delete newProduct.image2
        delete newProduct.image3

        dispatch(addProductAsync(newProduct))
    }

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
            <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 4 : 9} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}>
                {/* Field area */}
                <Stack rowGap={3}>
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                        <TextField {...register("title", { required: 'Title is required' })} />
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <FormControl fullWidth>
                            <InputLabel id="brand-selection">Brand</InputLabel>
                            <Select {...register("brand", { required: "Brand is required" })} labelId="brand-selection" label="Brand">
                                {brands.map((brand) => (
                                    <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="category-selection">Category</InputLabel>
                            <Select {...register("category", { required: "Category is required" })} labelId="category-selection" label="Category">
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Description</Typography>
                        <TextField multiline rows={4} {...register("description", { required: "Description is required" })} />
                    </Stack>

                    <Stack flexDirection={'row'}>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400} gutterBottom>Price</Typography>
                            <TextField type='number' {...register("price", { required: "Price is required" })} />
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400} gutterBottom>Discount {is480 ? "%" : "Percentage"}</Typography>
                            <TextField type='number' {...register("discountPercentage", { required: "Discount percentage is required" })} />
                        </Stack>
                    </Stack>

                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Stock Quantity</Typography>
                        <TextField type='number' {...register("stockQuantity", { required: "Stock Quantity is required" })} />
                    </Stack>

                    {/* Quantity options section */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Quantity Options</Typography>
                        {quantities.map((quantity, index) => (
                            <Stack key={index} direction="row" spacing={2} mb={2} alignItems="center">
                                <TextField
                                    label="Weight"
                                    value={quantity.weight}
                                    onChange={(e) => handleQuantityChange(index, 'weight', e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    label="Price"
                                    type="number"
                                    value={quantity.price}
                                    onChange={(e) => handleQuantityChange(index, 'price', e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <IconButton onClick={() => removeQuantityOption(index)} color="error" disabled={quantities.length === 1}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ))}
                        <Button variant="outlined" onClick={addQuantityOption}>Add Quantity Option</Button>
                    </Stack>

                    {/* Thumbnail section */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Thumbnail</Typography>
                        {thumbnailPreview ? (
                            <Stack direction="row" alignItems="center" gap={2}>
                                <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: 100, height: 100 }} />
                                <IconButton onClick={() => setThumbnailPreview("")} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ) : (
                            <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
                        )}
                    </Stack>

                    {/* Product Images section */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Product Images</Typography>
                        <Stack rowGap={2}>
                            {imagePreviews.map((image, index) => (
                                <Stack key={index} direction="row" alignItems="center" gap={2}>
                                    {image ? (
                                        <>
                                            <img src={image} alt={`Product ${index}`} style={{ width: 100, height: 100 }} />
                                            <IconButton onClick={() => handleRemoveImage(index)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
                                    )}
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>

                {/* Action area */}
                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
                    <Button size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Add Product</Button>
                    <Button size={is480 ? 'medium' : 'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}