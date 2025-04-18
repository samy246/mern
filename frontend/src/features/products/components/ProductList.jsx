
// new
import {FormControl, Grid, IconButton,Button, InputLabel,TextField,InputAdornment, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme,Chip } from '@mui/material'
import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync, fetchdailyProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters } from '../ProductSlice'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { fetchAllBrandsAsync, selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import Pagination from '@mui/material/Pagination';
import { ITEMS_PER_PAGE } from '../../../constants'
import {createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems} from '../../wishlist/WishlistSlice'
import {selectLoggedInUser} from '../../auth/AuthSlice'
import {toast} from 'react-toastify'
import {banner1, banner2, banner3, banner4} from '../../../assets'
import { resetCartItemAddStatus, selectCartItemAddStatus } from '../../cart/CartSlice'
import { motion } from 'framer-motion'
import { ProductBanner } from './ProductBanner'
import ClearIcon from '@mui/icons-material/Clear';
import "./ProductList.css";
import "./Testimonial.css";
import SearchIcon from '@mui/icons-material/Search';
import { ProductCardplp } from './ProductCardplp'
import { Breadcrumbs, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CloseIcon from '@mui/icons-material/Close';

const sortOptions=[
    {name:"Price: low to high",sort:"price",order:"asc"},
    {name:"Price: high to low",sort:"price",order:"desc"},
]


export const ProductList = () => {
    const [filters,setFilters]=useState({})
    const [page,setPage]=useState(1)
    const [sort,setSort]=useState(null)

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredq, setIsHoveredq] = useState(false);
    const theme=useTheme()
    const navigate = useNavigate();
    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is800=useMediaQuery(theme.breakpoints.down(800))
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    const brands=useSelector(selectBrands)

    // console.log("374brands",brands);

    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const totalResults=useSelector(selectProductTotalResults)
    const loggedInUser=useSelector(selectLoggedInUser)

    const productFetchStatus=useSelector(selectProductFetchStatus)

    const wishlistItems=useSelector(selectWishlistItems)
    const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)

    const cartItemAddStatus=useSelector(selectCartItemAddStatus)

    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch=useDispatch()
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [brandCheckboxState, setBrandCheckboxState] = useState({})
    const [categoryCheckboxState, setCategoryCheckboxState] = useState({})
    const [searchQuery, setSearchQuery] = useState('')
    const handleBrandFilters=(e)=>{
        // const filterSet=new Set(filters.brand)

        // if(e.target.checked){filterSet.add(e.target.value)}
        // else{filterSet.delete(e.target.value)}

        // const filterArray = Array.from(filterSet);
        // setFilters({...filters,brand:filterArray})
        const brandId = e.target.value
        const isChecked = e.target.checked

        // Update selected brands
        const updatedSelectedBrands = isChecked
            ? [...selectedBrands, brandId]
            : selectedBrands.filter(id => id !== brandId)

        setSelectedBrands(updatedSelectedBrands)

        // Update filters
        const filterSet = new Set(updatedSelectedBrands)
        const filterArray = Array.from(filterSet)
        setFilters(prev => ({...prev, brand: filterArray}))
    }

    const handleCategoryFilters=(e)=>{
        const categoryId = e.target.value
        const isChecked = e.target.checked

        // Update selected categories
        const updatedSelectedCategories = isChecked
            ? [...selectedCategories, categoryId]
            : selectedCategories.filter(id => id !== categoryId)

        setSelectedCategories(updatedSelectedCategories)

        // Update category checkbox state
        setCategoryCheckboxState(prev => ({
            ...prev,
            [categoryId]: isChecked
        }))

        // Update filters
        const filterSet = new Set(updatedSelectedCategories)
        const filterArray = Array.from(filterSet)
        setFilters(prev => ({...prev, category: filterArray}))
        // const filterSet=new Set(filters.category)

        // if(e.target.checked){filterSet.add(e.target.value)}
        // else{filterSet.delete(e.target.value)}

        // const filterArray = Array.from(filterSet);
        // setFilters({...filters,category:filterArray})
    }

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(()=>{
        setPage(1)
    },[totalResults])


    useEffect(()=>{
        const finalFilters={...filters}

        finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
        finalFilters['sort']=sort

        if(!loggedInUser?.isAdmin){
            finalFilters['user']=true
        }

        dispatch(fetchProductsAsync(finalFilters))
        dispatch(fetchdailyProductsAsync())
    },[filters,page,sort])

   // Remove a specific brand filter
   const removeBrandFilter = (brandId) => {
    // Uncheck the corresponding checkbox
    setBrandCheckboxState(prev => ({
        ...prev,
        [brandId]: false
    }))

    // Remove from selected brands
    const updatedSelectedBrands = selectedBrands.filter(id => id !== brandId)
    setSelectedBrands(updatedSelectedBrands)

    // Update filters
    const filterSet = new Set(updatedSelectedBrands)
    const filterArray = Array.from(filterSet)
    setFilters(prev => ({...prev, brand: filterArray}))
}
//    const removeBrandFilter = (brandId) => {
//     const updatedSelectedBrands = selectedBrands.filter(id => id !== brandId)
//     setSelectedBrands(updatedSelectedBrands)

//     const filterSet = new Set(updatedSelectedBrands)
//     const filterArray = Array.from(filterSet)
//     setFilters(prev => ({...prev, brand: filterArray}))
// }
 // Remove a specific category filter
//  const removeCategoryFilter = (categoryId) => {
//     const updatedSelectedCategories = selectedCategories.filter(id => id !== categoryId)
//     setSelectedCategories(updatedSelectedCategories)

//     const filterSet = new Set(updatedSelectedCategories)
//     const filterArray = Array.from(filterSet)
//     setFilters(prev => ({...prev, category: filterArray}))
// }
    // Remove a specific category filter
    const removeCategoryFilter = (categoryId) => {
         // Uncheck the corresponding checkbox
    setCategoryCheckboxState(prev => ({
        ...prev,
        [categoryId]: false
    }))

    const updatedSelectedCategories = selectedCategories.filter(id => id !== categoryId)
    setSelectedCategories(updatedSelectedCategories)

    const filterSet = new Set(updatedSelectedCategories)
    const filterArray = Array.from(filterSet)
    setFilters(prev => ({...prev, category: filterArray || undefined}))
        // Uncheck the corresponding checkbox
        // setCategoryCheckboxState(prev => ({
        //     ...prev,
        //     [categoryId]: false
        // }))

        // const updatedSelectedCategories = selectedCategories.filter(id => id !== categoryId)
        // setSelectedCategories(updatedSelectedCategories)

        // const filterSet = new Set(updatedSelectedCategories)
        // const filterArray = Array.from(filterSet)
        // setFilters(prev => ({...prev, category: filterArray || undefined}))
    }
const clearBrandFilters = () => {
    // Reset brand-related states
    setSelectedBrands([])
    setBrandCheckboxState({})

    // Remove brand filters from main filters
    setFilters(prev => {
        const newFilters = {...prev}
        delete newFilters.brand
        return newFilters
    })
}
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setFilters({})
    setSort(null)
          // Reset checkbox states
          setBrandCheckboxState({})
          setCategoryCheckboxState({})
}
    const handleAddRemoveFromWishlist=(e,productId)=>{
        if(e.target.checked){
            const data={user:loggedInUser?._id,product:productId}
            dispatch(createWishlistItemAsync(data))
        }

        else if(!e.target.checked){
            const index=wishlistItems.findIndex((item)=>item.product._id===productId)
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
        }
    }

    useEffect(()=>{
        if(wishlistItemAddStatus==='fulfilled'){
            toast.success("Product added to wishlist")
        }
        else if(wishlistItemAddStatus==='rejected'){
            toast.error("Error adding product to wishlist, please try again later")
        }

    },[wishlistItemAddStatus])

    useEffect(()=>{
        if(wishlistItemDeleteStatus==='fulfilled'){
            toast.success("Product removed from wishlist")
        }
        else if(wishlistItemDeleteStatus==='rejected'){
            toast.error("Error removing product from wishlist, please try again later")
        }
    },[wishlistItemDeleteStatus])

    useEffect(()=>{
        if(cartItemAddStatus==='fulfilled'){
            toast.success("Product added to cart")
        }
        else if(cartItemAddStatus==='rejected'){
            toast.error("Error adding product to cart, please try again later")
        }

    },[cartItemAddStatus])

    useEffect(()=>{
        if(productFetchStatus==='rejected'){
            toast.error("Error fetching products, please try again later")
        }
    },[productFetchStatus])
    useEffect(() => {
        dispatch(fetchAllBrandsAsync())
    }, [dispatch])
    useEffect(()=>{
        return ()=>{
            dispatch(resetProductFetchStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetCartItemAddStatus())

        }
    },[])


    const handleFilterClose=()=>{
        dispatch(toggleFilters())
    }

    // Helper function to render skeleton loaders
    const renderSkeletons = () => {
        const skeletonCount = ITEMS_PER_PAGE;
        return Array(skeletonCount).fill(0).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
        ));
    };
// console.log("products",products);
  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }
  const handleSearchSubmit = () => {
    // Only update search query when search button is clicked
    setSearchQuery(searchTerm)

    // Update filters with search term
    if (searchTerm) {
        setFilters(prev => ({
            ...prev,
            search: searchTerm
        }))
    } else {
        // Remove search filter if term is empty
        const { search, ...restFilters } = filters
        setFilters(restFilters)
    }
}

    // Optional: Allow search on Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit()
        }
    }
    const filterPanelRef = useRef(null);

    // Add this useEffect to handle clicks outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target) && isProductFilterOpen) {
          handleFilterClose();
        }
      };

      // Add event listener when filter is open
      if (isProductFilterOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      // Cleanup function to remove event listener
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isProductFilterOpen]);
  return (
    <>
    {/* filters side bar */}

    <motion.div
    ref={filterPanelRef}
    style={{position:"fixed",backgroundColor:"rgb(255, 252, 240)",top:"5rem",height:"100vh",padding:'1rem',overflowY:"scroll",width:is500?"100vw":"30rem",zIndex:500}}
    variants={{show:{left:0},hide:{left:-500}}}
    initial={'hide'}
    transition={{ease:"easeInOut",duration:.7,type:"spring"}}
    animate={isProductFilterOpen===true?"show":"hide"}>

        {/* fitlers section */}
        <Stack mb={'5rem'}  sx={{scrollBehavior:"smooth",overflowY:"scroll"}}>


                    <Typography variant='h4'>Filters</Typography>


                        <IconButton onClick={handleFilterClose} style={{position:"absolute",top:15,right:15}}>
                            <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                                <ClearIcon fontSize='medium'/>
                            </motion.div>
                        </IconButton>

{/*
                <Stack rowGap={2} mt={4} >
                    <Typography sx={{cursor:"pointer"}} variant='body2'>Totes</Typography>
                    <Typography sx={{cursor:"pointer"}} variant='body2'>Backpacks</Typography>
                    <Typography sx={{cursor:"pointer"}} variant='body2'>Travel Bags</Typography>
                    <Typography sx={{cursor:"pointer"}} variant='body2'>Hip Bags</Typography>
                    <Typography sx={{cursor:"pointer"}} variant='body2'>Laptop Sleeves</Typography>
                </Stack> */}

                {/* brand filters */}
                <Stack mt={2}>
                    <Accordion>
                        <AccordionSummary expandIcon={<AddIcon />}  aria-controls="brand-filters" id="brand-filters" >
                                <Typography>Quality</Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{p:0}}>
                            <FormGroup onChange={handleBrandFilters}>
                                {
                                    brands?.map((brand)=>(
                                        <motion.div key={brand._id} style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                            <FormControlLabel sx={{ml:1}} control={<Checkbox whileHover={{scale:1.1}} />} label={brand.name}  checked={!!brandCheckboxState[brand._id]}     onChange={(e) => {
                                            // Ensure the checkbox state is updated
                                            setBrandCheckboxState(prev => ({
                                                ...prev,
                                                [brand._id]: e.target.checked
                                            }));
                                        }} value={brand._id} />
                                        </motion.div>
                                    ))
                                }
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Stack>

                {/* category filters */}
                <Stack mt={2}>
                    <Accordion>
                        <AccordionSummary expandIcon={<AddIcon />}  aria-controls="brand-filters" id="brand-filters" >
                                <Typography>Category</Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{p:0}}>
                            <FormGroup onChange={handleCategoryFilters}>
                                {
                                    categories?.map((category)=>(
                                        <motion.div key={category._id} style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                            <FormControlLabel sx={{ml:1}} control={<Checkbox whileHover={{scale:1.1}} />} label={category.name}   checked={!!categoryCheckboxState[category._id]}
                                             onChange={(e) => {
                                            setCategoryCheckboxState(prev => ({
                                                ...prev,
                                                [category._id]: e.target.checked
                                            }));
                                            handleFilterClose()
                                        }} value={category._id} />
                                        </motion.div>
                                    ))
                                }
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
        </Stack>

    </motion.div>

    <Stack mb={'3rem'} mt={'0rem'}>
        {/* products */}
        <TextField

                                placeholder="Search products..."
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: 'rgba(0,0,0,0.04)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.08)'
                                        }
                                    },
                                    width: { xs: '100%', sm: '60%', md: '40%', lg: '30%' },
                                    margin:"0 auto",
                                    marginTop:"10px"
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <br/>
                            <Button
                                variant="contained"
                                onClick={handleSearchSubmit}
                                sx={{
                                    height: '56px', // Match TextField height
                                    // minWidth: '80px',
                                    maxWidth:"30%",
                                     marginTop:"10px",
                                    margin:"0 auto",
                                    backgroundColor: '#0aad0a',
                                    '&:hover': {
                                        backgroundColor: '#088508'
                                    }
                                }}
                            >
                                Search
                            </Button>
        <Stack rowGap={5} mt={is600?2:0}>

            {/* sort options */}
            {/* mr={'2rem'} */}
            <Stack flexDirection={'row'} mt={'2rem'} justifyContent={'space-around'} alignContent={"center"} flexWrap={'wrap'} alignItems={'center'} columnGap={5}>

 {/* Breadcrumbs Navigation */}
 <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0 }}>
      <Link
        underline="hover"
        color="text.primary"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer", "&:hover": { color: "#0aad0a" } }}
      >
        Home
      </Link>
      <Typography color="#0aad0a">Products</Typography>
    </Breadcrumbs>
    <Stack spacing={2} >
    <Stack
    className='categoryfilter'
        direction="row"
        alignItems="center"
        spacing={1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
            cursor: 'pointer',
            '& svg': {
              transition: 'transform 1s ease', // Increased duration to 1s for a slower effect
              transform: isHovered
                ? 'rotateX(-15deg) rotateY(180deg)'
                : 'scale(1) translateX(0px)'
            }
          }}
        onClick={handleToggleFilters}
      >
        <FilterAltOutlinedIcon  sx={{
            color: isHovered ? '#0aad0a' : '#0aad0a'
          }}/>
          {/* style={{color:"#687177"}} */}
        <Typography >Category</Typography>

    </Stack>
    </Stack>
    <Stack spacing={2} >
    <Stack
    className='categoryfilter'
        direction="row"
        alignItems="center"
        spacing={1}
        onMouseEnter={() => setIsHoveredq(true)}
        onMouseLeave={() => setIsHoveredq(false)}
        sx={{
            cursor: 'pointer',
            '& svg': {
              transition: 'transform 1s ease', // Increased duration to 1s for a slower effect
              transform: isHoveredq
                ? 'rotateX(-15deg) rotateY(180deg)'
                : 'scale(1) translateX(0px)'
            }
          }}
        onClick={handleToggleFilters}
      >
        <FilterListRoundedIcon  sx={{
            color: isHoveredq ? '#0aad0a' : '#0aad0a'
          }}/>
          {/* style={{color:"#687177"}} */}
        <Typography >Quality</Typography>

    </Stack>
    </Stack>
                <Stack alignSelf={'flex-end'} width={'12rem'}>

                    <FormControl fullWidth>
                            <InputLabel id="sort-dropdown">Price Filter</InputLabel>
                            <Select
                                variant='standard'
                                labelId="sort-dropdown"
                                label="Price"
                                onChange={(e)=>setSort(e.target.value)}
                                value={sort}
                            >
                                <MenuItem bgcolor='text.secondary' value={null}>Reset</MenuItem>
                                {
                                    sortOptions.map((option)=>(
                                        <MenuItem key={option.name} value={option}>{option.name}</MenuItem>
                                    ))
                                }
                            </Select>
                    </FormControl>
                </Stack>

            </Stack>
{/* filters */}
{(selectedBrands.length > 0 || selectedCategories.length > 0 || sort) && (
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            rowGap={'0.7rem'}
                            sx={{
                                p: 2,
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                borderRadius: 2
                            }}
                        >
                            {/* Brand Filters */}
                            {selectedBrands.map(brandId => {
                                const brand = brands.find(b => b._id === brandId)
                                return brand ? (
                                    <Chip
                                        key={brandId}
                                        label={`Brand: ${brand.name}`}
                                        onDelete={() => removeBrandFilter(brandId)}
                                        deleteIcon={<CloseIcon />}
                                        variant="outlined"
                                        color="primary"
                                    />
                                ) : null
                            })}

                            {/* Category Filters */}
                            {selectedCategories.map(categoryId => {
                                const category = categories.find(c => c._id === categoryId)
                                return category ? (
                                    <Chip
                                        key={categoryId}
                                        label={`Category: ${category.name}`}
                                        onDelete={() => removeCategoryFilter(categoryId)}
                                        deleteIcon={<CloseIcon />}
                                        variant="outlined"
                                        color="secondary"
                                    />
                                ) : null
                            })}

                            {/* Sort Filter */}
                            {sort && (
                                <Chip
                                    label={`Sort: ${sort.name}`}
                                    onDelete={() => setSort(null)}
                                    deleteIcon={<CloseIcon />}
                                    variant="outlined"
                                    color="success"
                                />
                            )}

                            {/* Clear All Filters */}
                            {(selectedBrands.length > 0 || selectedCategories.length > 0 || sort) && (
                                <Chip
                                    label="Clear All"
                                    onDelete={clearAllFilters}
                                    deleteIcon={<CloseIcon />}
                                    color="error"
                                    variant="outlined"
                                />
                            )}
                        </Stack>
                    )}
            {/* product grid */}
            <Grid gap={is700?1:2} container justifyContent={'center'} alignContent={'center'}>
                {
                    productFetchStatus === 'pending'
                    ? renderSkeletons()
                    :
                    products?.map((product) => {
                        const minPrice =
                          product?.quantity && product?.quantity?.length > 0
                            ? Math.min(...product.quantity.map((q) => q.price))
                            : product.price; // Use default price if no quantity price exists

                        return (
                          <ProductCardplp
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            thumbnail={product.thumbnail}
                            brand={product?.brand?.name}
                            price={minPrice} // Pass the lowest price
                            category={product?.category?.name}
                            handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                          />
                        );
                      })
                    // products.map((product)=>(
                    //     // <ProductCard
                    //     <ProductCardplp
                    //         key={product._id}
                    //         id={product._id}
                    //         title={product.title}
                    //         thumbnail={product.thumbnail}
                    //         brand={product.brand.name}
                    //         price={product.price}
                    //         category={product?.category?.name}
                    //         handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                    //     />
                    // ))
                }
            </Grid>

            {/* pagination - only show when not loading */}
            {/* {productFetchStatus !== 'pending' && (
                <Stack alignSelf={is488?'center':'center'} mr={is488?0:5} rowGap={2} p={is488?1:0}>
                    <Pagination
                        size={is488?'medium':'large'}
                        page={page}
                        onChange={(e,page)=>setPage(page)}
                        count={Math.ceil(totalResults/ITEMS_PER_PAGE)}
                        variant="outlined"
                        shape="rounded"
                    />
                    <Typography textAlign={'center'}>
                        Showing {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} of {totalResults} results
                    </Typography>
                </Stack>
            )} */}
            {/* new */}
            {/* pagination - only show when not loading */}
{productFetchStatus !== 'pending' && (
  <Stack
    alignSelf={'center'}
    mr={is488 ? 0 : 5}
    rowGap={2}
    p={is488 ? 1 : 0}
    sx={{
    //   mt: 4,
      mb: 2,
      width: 'fit-content',
      backgroundColor: 'rgba(245, 245, 245, 0.7)',
      borderRadius: 2,
      py: 2,
      px: 3,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
    }}
  >
    <Pagination
      size={is488 ? 'medium' : 'large'}
      page={page}
      onChange={(e, newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
      }}
    //   onChange={(e, page) => setPage(page)}
      count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
      variant="outlined"
      shape="rounded"
      showFirstButton
      showLastButton
      sx={{
        '& .MuiPaginationItem-root': {
          color: '#555',
          borderColor: 'rgba(0, 0, 0, 0.15)',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            borderColor: 'rgba(25, 118, 210, 0.5)',
            transform: 'translateY(-2px)',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)'
          }
        },
        '& .Mui-selected': {
          backgroundColor: '#1976d2 !important',
          color: 'white !important',
          borderColor: '#1976d2 !important',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#1565c0 !important',
            transform: 'translateY(-2px)',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)'
          }
        },
        '& .MuiPaginationItem-ellipsis': {
          color: '#555'
        }
      }}
    />
    <Typography
      textAlign={'center'}
      sx={{
        fontSize: is488 ? '0.85rem' : '0.95rem',
        color: '#666',
        fontWeight: 500
      }}
    >
      Showing <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{page * ITEMS_PER_PAGE > totalResults ? totalResults : page * ITEMS_PER_PAGE}</span> of <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{totalResults}</span> results
    </Typography>
  </Stack>
)}
        </Stack>
    </Stack>
    </>
  )
}