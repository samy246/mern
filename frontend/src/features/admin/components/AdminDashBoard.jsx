// new for search
import { Button, FormControl, Grid, IconButton, Box, InputLabel, MenuItem, Pagination, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import { ProductCard } from '../../products/components/ProductCard'
import { deleteProductByIdAsync, fetchProductsAsync, fetchdailyProductsAsync, selectProductIsFilterOpen, selectProductTotalResults, selectProductdailyTotalResults, selectProducts, toggleFilters, undeleteProductByIdAsync } from '../../products/ProductSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import ClearIcon from '@mui/icons-material/Clear';
import { ITEMS_PER_PAGE } from '../../../constants';

const sortOptions = [
    { name: "Price: low to high", sort: "price", order: "asc" },
    { name: "Price: high to low", sort: "price", order: "desc" },
]

export const AdminDashBoard = () => {

    const [filters, setFilters] = useState({})
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const [sort, setSort] = useState(null)
    const [page, setPage] = useState(1)
    const products = useSelector(selectProducts)
    const dailyproducts = useSelector(selectProductdailyTotalResults)
    const dispatch = useDispatch()
    const theme = useTheme()
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const isProductFilterOpen = useSelector(selectProductIsFilterOpen)
    const totalResults = useSelector(selectProductTotalResults)

    const is1200 = useMediaQuery(theme.breakpoints.down(1200))
    const is800 = useMediaQuery(theme.breakpoints.down(800))
    const is700 = useMediaQuery(theme.breakpoints.down(700))
    const is600 = useMediaQuery(theme.breakpoints.down(600))
    const is488 = useMediaQuery(theme.breakpoints.down(488))

    // Search state
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setPage(1)
    }, [totalResults])

    useEffect(() => {
        const finalFilters = { ...filters }

        finalFilters['pagination'] = { page: page, limit: ITEMS_PER_PAGE }
        finalFilters['sort'] = sort

        dispatch(fetchProductsAsync(finalFilters))
        dispatch(fetchdailyProductsAsync())

    }, [filters, sort, page])

    // Filter products based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const handleBrandFilters = (e) => {
        const filterSet = new Set(filters.brand)

        if (e.target.checked) { filterSet.add(e.target.value) }
        else { filterSet.delete(e.target.value) }

        const filterArray = Array.from(filterSet);
        setFilters({ ...filters, brand: filterArray })
    }

    const handleCategoryFilters = (e) => {
        const filterSet = new Set(filters.category)

        if (e.target.checked) { filterSet.add(e.target.value) }
        else { filterSet.delete(e.target.value) }

        const filterArray = Array.from(filterSet);
        setFilters({ ...filters, category: filterArray })
    }

    const handleProductDelete = (productId) => {
        dispatch(deleteProductByIdAsync(productId))
    }

    const handleProductUnDelete = (productId) => {
        dispatch(undeleteProductByIdAsync(productId))
    }

    const handleFilterClose = () => {
        dispatch(toggleFilters())
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // You could add additional filtering logic here if needed
    }

    return (
        <>
            <motion.div style={{ position: "fixed", backgroundColor: "rgb(255, 252, 240)", marginTop: "3rem", height: "100vh", padding: '1rem', overflowY: "scroll", width: is500 ? "100vw" : "30rem", zIndex: 500 }} variants={{ show: { left: 0 }, hide: { left: -500 } }} initial={'hide'} transition={{ ease: "easeInOut", duration: .7, type: "spring" }} animate={isProductFilterOpen === true ? "show" : "hide"}>

                {/* fitlers section */}
                <Stack mb={'5rem'} sx={{ scrollBehavior: "smooth", overflowY: "scroll" }}>
                    <Typography variant='h4'>Filters</Typography>

                    <IconButton onClick={handleFilterClose} style={{ position: "absolute", top: 15, right: 15 }}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <ClearIcon fontSize='medium' />
                        </motion.div>
                    </IconButton>
{/*
                    <Stack rowGap={2} mt={4}>
                        <Typography sx={{ cursor: "pointer" }} variant='body2'>Totes</Typography>
                        <Typography sx={{ cursor: "pointer" }} variant='body2'>Backpacks</Typography>
                        <Typography sx={{ cursor: "pointer" }} variant='body2'>Travel Bags</Typography>
                        <Typography sx={{ cursor: "pointer" }} variant='body2'>Hip Bags</Typography>
                        <Typography sx={{ cursor: "pointer" }} variant='body2'>Laptop Sleeves</Typography>
                    </Stack> */}

                    {/* brand filters */}
                    <Stack mt={2}>
                        <Accordion>
                            <AccordionSummary expandIcon={<AddIcon />} aria-controls="brand-filters" id="brand-filters" >
                                <Typography>Quality</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{ p: 0 }}>
                                <FormGroup onChange={handleBrandFilters}>
                                    {
                                        brands?.map((brand) => (
                                            <motion.div key={brand._id} style={{ width: "fit-content" }} whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                                                <FormControlLabel sx={{ ml: 1 }} control={<Checkbox whileHover={{ scale: 1.1 }} />} label={brand.name} value={brand._id} />
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
                            <AccordionSummary expandIcon={<AddIcon />} aria-controls="brand-filters" id="brand-filters" >
                                <Typography>Category</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{ p: 0 }}>
                                <FormGroup onChange={handleCategoryFilters}>
                                    {
                                        categories?.map((category) => (
                                            <motion.div key={category._id} style={{ width: "fit-content" }} whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                                                <FormControlLabel sx={{ ml: 1 }} control={<Checkbox whileHover={{ scale: 1.1 }} />} label={category.name} value={category._id} />
                                            </motion.div>
                                        ))
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Stack>
            </motion.div>

            <Stack rowGap={5} mt={is600 ? 2 : 7} mb={'3rem'} mr={'2rem'} ml={'2rem'}>

                {/* sort options */}
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} columnGap={2} mt={'2rem'}>
                    <Stack alignSelf={'flex-start'}>
                        <h1>Admin Dashboard</h1>
                    </Stack>
                    <Stack alignSelf={'flex-end'} width={'12rem'}>
                        <FormControl fullWidth>
                            <InputLabel id="sort-dropdown">Sort</InputLabel>
                            <Select
                                variant='standard'
                                labelId="sort-dropdown"
                                label="Sort"
                                onChange={(e) => setSort(e.target.value)}
                                value={sort}
                            >
                                <MenuItem bgcolor='text.secondary' value={null}>Reset</MenuItem>
                                {
                                    sortOptions.map((option) => (
                                        <MenuItem key={option.name} value={option}>{option.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>

                <Stack rowGap={5} mt={is600 ? 2 : 5} mb={'0rem'}>
                    <h1>Today Product Updation</h1>
                    <Grid container spacing={3}>
                        {dailyproducts?.length > 0 && dailyproducts?.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                                <Box
                                    sx={{
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        padding: 2,
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                        boxShadow: 1,
                                        transition: "all 0.3s ease-in-out",
                                        "&:hover": {
                                            boxShadow: 5,
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    <Typography variant="h6">{item?.title} </Typography>
                                    <Box
                                        component="img"
                                        src={item?.thumbnail}
                                        alt="Product"
                                        sx={{ width: "100%", maxWidth: 200, maxHeight: 140, borderRadius: 2, objectFit: "cover" }}
                                    />
                                    <Typography variant="body1" fontWeight="bold">
                                        Common Price- Rs:₹ {item?.price}
                                    </Typography>
                                    <Box sx={{ textAlign: "left", width: "100%" }}>
                                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                            Available Quantities:
                                        </Typography>
                                        {item?.quantity?.map((q) => (
                                            <Typography
                                                key={q._id}
                                                variant="body2"
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                <span>Weight: {q.weight}</span>
                                                <span>Price: ₹ {q.price}</span>
                                            </Typography>
                                        ))}
                                    </Box>
                                    <Button component={Link}
                                        sx={{
                                            backgroundColor: "#3fc136",
                                            "&:hover": {
                                                backgroundColor: "#2e9a2a",
                                            },
                                        }}
                                        to={`/admin/dailyproduct-update/${item._id}`}
                                        variant='contained'>Update</Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>

                <Typography variant="h3">All Products</Typography>

                {/* Enhanced Search Form */}
                <form onSubmit={handleSearchSubmit}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by product name, brand, or description..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                endAdornment: (
                                    <IconButton type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </Stack>
                </form>

                {/* Display search results or all products */}
                {searchTerm && (
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Found {filteredProducts.length} results for "{searchTerm}"
                    </Typography>
                )}
     {!searchTerm && (
                    <Stack alignSelf={is488 ? 'center' : 'flex-end'} mr={is488 ? 0 : 5} rowGap={2} p={is488 ? 1 : 0}>

                        <Pagination size={is488 ? 'medium' : 'large'} page={page} onChange={(e, page) => setPage(page)} count={Math.ceil(totalResults / ITEMS_PER_PAGE)} variant="outlined" shape="rounded" />
                        <Typography textAlign={'center'}>Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {page * ITEMS_PER_PAGE > totalResults ? totalResults : page * ITEMS_PER_PAGE} of {totalResults} results</Typography>
                    </Stack>
                )}
                <Grid container spacing={3} justifyContent={'center'}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <Stack sx={{ height: '100%', display: 'flex', flexDirection: 'column', opacity: product.isDeleted ? .7 : 1 }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <ProductCard id={product?._id} title={product?.title} thumbnail={product?.thumbnail} brand={product?.brand?.name} price={product?.price} category={product?.category?.name} isAdminCard={true} />
                                    </Box>
                                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                                        <Button component={Link} to={`/admin/product-update/${product._id}`} variant='contained' size="small">
                                            Update
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))
                    ) : (
                        searchTerm ? (
                            <Grid item xs={12}>
                                <Typography variant="h6" textAlign="center" sx={{ my: 5 }}>
                                    No products found matching "{searchTerm}"
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="h6" textAlign="center" sx={{ my: 5 }}>
                                    No products available
                                </Typography>
                            </Grid>
                        )
                    )}
                </Grid>

                {/* {!searchTerm && (
                    <Stack alignSelf={is488 ? 'center' : 'flex-end'} mr={is488 ? 0 : 5} rowGap={2} p={is488 ? 1 : 0}>
                        <Pagination size={is488 ? 'medium' : 'large'} page={page} onChange={(e, page) => setPage(page)} count={Math.ceil(totalResults / ITEMS_PER_PAGE)} variant="outlined" shape="rounded" />
                        <Typography textAlign={'center'}>Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {page * ITEMS_PER_PAGE > totalResults ? totalResults : page * ITEMS_PER_PAGE} of {totalResults} results</Typography>
                    </Stack>
                )} */}
            </Stack>
        </>
    )
}