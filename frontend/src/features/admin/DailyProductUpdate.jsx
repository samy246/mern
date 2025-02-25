import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct,cleardailySelectedProduct, fetchdailyProductByIdAsync, fetchProductByIdAsync,resetdailyProductUpdateStatus,resetProductUpdateStatus, selectdailyProductdailyTotalResults, selectProductdailyTotalResults, selectProductdailyUpdateStatus, selectProductUpdateStatus, selectSelectedProduct, updatedailyProductByIdAsync, updateProductByIdAsync } from '../products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
// import { selectBrands } from '../../brands/BrandSlice'
// import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import { Navbar } from '../navigation/components/Navbar'
import { updatedailyProductById } from '../products/ProductApi'

export const DailyProductUpdate = () => {

    const {register,handleSubmit,watch,formState: { errors }} = useForm()
    const [selectedQuantity, setSelectedQuantity] = useState(""); // To track selected quantity
    const [quantityPrice, setQuantityPrice] = useState("");
    const {id}=useParams()
    const dispatch=useDispatch()
    // const selectedProduct=useSelector(selectSelectedProduct)
    const selecteddailyProduct=useSelector(selectdailyProductdailyTotalResults)

    // const brands=useSelector(selectBrands)
    // const categories=useSelector(selectCategories)
    const productdailyUpdateStatus=useSelector(selectProductdailyUpdateStatus)
    console.log("productdailyUpdateStatus",productdailyUpdateStatus);
// debugger;
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

console.log("selecteddailyProduct",selecteddailyProduct);

    useEffect(()=>{
        if(id){
            dispatch(fetchdailyProductByIdAsync(id))
        }
    },[id])

    useEffect(()=>{
        if(productdailyUpdateStatus==='fullfilled'){
            toast.success("Daily Product Updated")
            navigate("/admin/dashboard")
            // window.location.reload();
        }
        else if(productdailyUpdateStatus==='rejected'){
            toast.error("Error updating product, please try again later")
        }
    },[productdailyUpdateStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(cleardailySelectedProduct())
            dispatch(resetdailyProductUpdateStatus())
        }
    },[])

    useEffect(() => {
        if (selecteddailyProduct?.quantity?.length > 0) {
            const defaultQuantity = selecteddailyProduct.quantity[0]; // First quantity option
            setSelectedQuantity(defaultQuantity.weight); // Set default weight
            setQuantityPrice(defaultQuantity.price); // Set default price
        }
    }, [selecteddailyProduct]);
    const handleQuantityChange = (event) => {
        const selectedWeight = event.target.value;
        setSelectedQuantity(selectedWeight);

        // Find the price corresponding to the selected weight
        const selectedOption = selecteddailyProduct?.quantity?.find(
          (option) => option.weight == selectedWeight
        );
        setQuantityPrice(selectedOption ? selectedOption.price : "");
      };
    // const handledailyProductUpdate=(data)=>{
    //     const updatedQuantities = selecteddailyProduct?.quantity?.map((option) => {
    //         // If the weight matches the selected quantity, update its price
    //         if (option.weight == selectedQuantity) {
    //             console.log("7999");

    //             return {
    //                 ...option, // Keep other properties intact
    //                 price: quantityPrice, // Update the price
    //             };
    //         }
    //         return option; // Keep the original entry if no match
    //     });
    //     const dailyproductUpdate={...data,_id:selecteddailyProduct._id,  quantity: updatedQuantities}
    //     console.log("Payload to dispatch:", dailyproductUpdate);

    //     dispatch(updatedailyProductById(dailyproductUpdate))
    // }

    const handledailyProductUpdate = async (data) => {
        try {
          // Simulate async processing for quantities
          const updatedQuantities = selecteddailyProduct?.quantity?.map((option) => {
            if (option.weight == selectedQuantity) {
              return { ...option, price: quantityPrice };
            }
            return option;
          });
        //   const updatedQuantities = await new Promise((resolve) => {
        //     const processedQuantities = selecteddailyProduct?.quantity?.map((option) => {
        //       if (option.weight == selectedQuantity) {
        //         return { ...option, price: quantityPrice }; // Update price
        //       }
        //       return option;
        //     });
        //     resolve(processedQuantities);
        //   });

          const dailyproductUpdate = {
            ...data,
            _id: selecteddailyProduct._id,
            quantity: updatedQuantities,
          };

          console.log("Payload to dispatch:", dailyproductUpdate);

          // Await the dispatch action
          dispatch(updatedailyProductByIdAsync(dailyproductUpdate)).then((result) => {
            console.log("Dispatch result using .then:", result);
          });

          // Check the result for success or error
        //   if (result.meta.requestStatus === "fulfilled") {
        //     toast.success("Daily Product Updated Successfully");
        //     navigate("/admin/dashboard");
        //   } else {
        //     throw new Error("Failed to update the product");
        //   }
        } catch (error) {
          console.error("Error:", error.message);
          toast.error("An error occurred. Please try again.");
        }
      };


  return (
    <>
    <Navbar/>

    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >

        {
            selecteddailyProduct &&
        <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handledailyProductUpdate)}>
 <Button size={is480?'medium':'medium'} variant='outlined' component={Link} to={'/admin/dashboard'} style={{width:"100px"}}>Back</Button>
            {/* feild area */}
            <h1>{selecteddailyProduct?.title}-Updation</h1>
            <Stack rowGap={3}>
                <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                    <TextField {...register("title",{required:'Title is required',value:selecteddailyProduct?.title})}/>
                </Stack>

                {/* <Stack flexDirection={'row'} >

                    <FormControl fullWidth>
                        <InputLabel id="brand-selection">Brand</InputLabel>
                        <Select defaultValue={selectedProduct.brand._id} {...register("brand",{required:"Brand is required"})} labelId="brand-selection" label="Brand">

                            {
                                brands.map((brand)=>(
                                    <MenuItem value={brand._id}>{brand.name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel id="category-selection">Category</InputLabel>
                        <Select defaultValue={selectedProduct.category._id} {...register("category",{required:"category is required"})} labelId="category-selection" label="Category">

                            {
                                categories.map((category)=>(
                                    <MenuItem value={category._id}>{category.name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>

                </Stack> */}


                <Stack>
                    <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                    <TextField multiline rows={4} {...register("description",{required:"Description is required",value:selecteddailyProduct.description})}/>
                </Stack>

                <Stack flexDirection={'row'}>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Price</Typography>
                        <TextField type='number' {...register("price",{required:"Price is required",value:selecteddailyProduct.price})}/>
                    </Stack>

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
          { selecteddailyProduct?.quantity?.map((option) => (
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
                {/* <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>
                    <TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required",value:selecteddailyProduct?.stockQuantity})}/>
                </Stack> */}
                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Thumbnail</Typography>
                    {/* <TextField {...register("thumbnail",{required:"Thumbnail is required",value:selecteddailyProduct?.thumbnail})}/> */}
                    {selecteddailyProduct?.thumbnail && (
    <img
      src={selecteddailyProduct.thumbnail}
      alt="Thumbnail"
      style={{
        // width: "150px", // Set the width of the thumbnail
        height: "500px", // Set the height of the thumbnail
        objectFit: "cover", // Ensure the image fits well
        borderRadius: "8px", // Optional: Add rounded corners
        marginTop: "10px", // Add spacing
      }}
    />
  )}
                </Stack>

                <Stack>
                    {/* <Typography variant='h6'  fontWeight={400} gutterBottom>Product Images</Typography> */}

                    <Stack rowGap={2}>
                        {
                            selecteddailyProduct?.images?.map((image,index)=>(
                                <TextField {...register(`image${index}`,{required:"Image is required",value:image})}/>
                            ))
                        }
                    </Stack>

                </Stack>

            </Stack>


            {/* action area */}
            <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                <Button size={is480?'medium':'large'} variant='contained' type='submit'>Update</Button>
                <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
            </Stack>


        </Stack>
        }

    </Stack>
    </>
  )
}
