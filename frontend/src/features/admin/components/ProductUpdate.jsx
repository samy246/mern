

//image upload
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct, fetchProductByIdAsync, resetProductUpdateStatus, selectProductUpdateStatus, selectSelectedProduct, updateProductByIdAsync } from '../../products/ProductSlice'
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ProductUpdate = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { id } = useParams()
    const dispatch = useDispatch()
    const selectedProduct = useSelector(selectSelectedProduct)
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const productUpdateStatus = useSelector(selectProductUpdateStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))
    const is480 = useMediaQuery(theme.breakpoints.down(480))
   const [selectedQuantity, setSelectedQuantity] = useState(""); // To track selected quantity
    const [quantityPrice, setQuantityPrice] = useState("");
    // State for image previews
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [imagePreviews, setImagePreviews] = useState([])

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id))
        }
    }, [id])

    useEffect(() => {
        if (selectedProduct?.quantity?.length > 0) {
            const defaultQuantity = selectedProduct.quantity[0]; // First quantity option
            setSelectedQuantity(defaultQuantity.weight); // Set default weight
            setQuantityPrice(defaultQuantity.price); // Set default price
        }
    }, [selectedProduct]);
    useEffect(() => {
        if (selectedProduct) {
            setThumbnailPreview(selectedProduct.thumbnail || "")
            setImagePreviews(selectedProduct.images || [])
        }
    }, [selectedProduct])

    useEffect(() => {
        if (productUpdateStatus === 'fullfilled') {
            toast.success("Product Updated")
            navigate("/admin/dashboard")
        } else if (productUpdateStatus === 'rejected') {
            toast.error("Error updating product, please try again later")
        }
    }, [productUpdateStatus])

    useEffect(() => {
        return () => {
            dispatch(clearSelectedProduct())
            dispatch(resetProductUpdateStatus())
        }
    }, [])

    const handleProductUpdate = (data) => {
        console.log("update product",data);
        const updatedQuantity = selectedProduct.quantity.map(item => {
            if (item.weight === selectedQuantity) {
                // Update the price for the selected weight
                return { ...item, price: quantityPrice };
            }
            return item;
        });
        const productUpdate = {
            ...data,
            _id: selectedProduct._id,
            thumbnail: thumbnailPreview,
            images: imagePreviews,
            quantity: updatedQuantity
        }

        dispatch(updateProductByIdAsync(productUpdate))
    }

    // Handle image uploads and previews
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

    const handleRemoveImage = (index) => {
        const newImages = imagePreviews.filter((_, i) => i !== index)
        setImagePreviews(newImages)
    }
    // const handleThumbnailUpload = (e) => {
    //     const file = e.target.files[0]
    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onloadend = () => {
    //             setThumbnailPreview(reader.result)
    //         }
    //         reader.readAsDataURL(file)
    //     }
    // }
    const handleQuantityChange = (event) => {
        const selectedWeight = event.target.value;
        setSelectedQuantity(selectedWeight);

        // Find the price corresponding to the selected weight
        const selectedOption = selectedProduct?.quantity?.find(
          (option) => option.weight == selectedWeight
        );
        setQuantityPrice(selectedOption ? selectedOption.price : "");
      };
    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
            {
                selectedProduct &&
                <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 14 : 16} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleProductUpdate)}>
<Button  startIcon={<ArrowBackIcon/>}  sx={{ maxWidth: '50%' }} size={is480 ? 'medium' : 'medium'} variant='contained'  component={Link} to={'/admin/dashboard'}>Back</Button>
                    {/* Field area */}

                    <Typography variant='h6' fontWeight={700} color={'green'} gutterBottom>Edit Product:{selectedProduct.title} - {selectedProduct.brand.name}</Typography>
                    <Stack rowGap={3}>
                        <Stack>
                            <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                            <TextField {...register("title", { required: 'Title is required' })} defaultValue={selectedProduct.title} />
                        </Stack>
                        <Stack>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                        <TextField multiline rows={4} {...register("description",{required:"Description is required",value:selectedProduct.description})}/>
                        </Stack>
                        <Stack flexDirection={'row'}>
                     <Stack flex={1}>
                         <Typography variant='h6' fontWeight={400}  gutterBottom>Price</Typography>
                         <TextField type='number' {...register("price",{required:"Price is required",value:selectedProduct.price})}/>
                     </Stack>
                     {/* <Stack flex={1}>
                         <Typography variant='h6' fontWeight={400}  gutterBottom>Discount {is480?"%":"Percentage"}</Typography>
                         <TextField type='number' {...register("discountPercentage",{required:"discount percentage is required",value:selectedProduct.discountPercentage})}/>
                     </Stack> */}
                 </Stack>

                        <Stack flexDirection={'row'} gap={2}>
                            <FormControl fullWidth>
                                <InputLabel id="brand-selection">Brand</InputLabel>
                                <Select defaultValue={selectedProduct.brand._id} {...register("brand", { required: "Brand is required" })} labelId="brand-selection" label="Brand">
                                    {brands.map((brand) => (
                                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="category-selection">Category</InputLabel>
                                <Select defaultValue={selectedProduct.category._id} {...register("category", { required: "Category is required" })} labelId="category-selection" label="Category">
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack>

<Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>

<TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required",value:selectedProduct.stockQuantity})}/>

</Stack>
         <Stack>
        <Typography variant="h6" fontWeight={400} gutterBottom>
          Select Quantity
        </Typography>
        <TextField
          select
          label="Quantity"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          fullWidth
        >
          { selectedProduct?.quantity?.map((option) => (
            <MenuItem key={option.weight} value={option.weight}>
              {option.weight}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack>
        <Typography variant="h6" fontWeight={400} gutterBottom>
          Quantity Price
        </Typography>
        <TextField
          type="text"
          value={quantityPrice}
          onChange={(e) => setQuantityPrice(e.target.value)}
        //   InputProps={{
        //     readOnly: false, // Make the field read-only
        //   }}
          fullWidth
        />
      </Stack>
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

                        <Stack>
    <Typography variant='h6' fontWeight={400} gutterBottom>Product Images</Typography>
    <Stack rowGap={2}>
        {imagePreviews.map((image, index) => (
            <Stack key={index} direction="row" alignItems="center" gap={2}>
                {image ? (
                    <TextField
                        value={image}
                        disabled
                        onChange={(e) => {
                            const newImages = [...imagePreviews]
                            newImages[index] = e.target.value
                            setImagePreviews(newImages)
                        }}
                        fullWidth
                    />
                ) : (
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
                )}
                {image && <img src={image} alt={`Product ${index}`} style={{ width: 100, height: 100 }} />}
                <IconButton onClick={() => handleRemoveImage(index)} color="error">
                    <DeleteIcon />
                </IconButton>
            </Stack>
        ))}
        <Button variant="outlined" onClick={() => setImagePreviews([...imagePreviews, ""])}>Add Image</Button>
    </Stack>
    </Stack>

                    </Stack>

                    {/* Action area */}
                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
                        <Button size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Update</Button>
                        <Button size={is480 ? 'medium' : 'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                    </Stack>
                </Stack>
            }
        </Stack>
    )
}
