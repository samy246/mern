
// mar31--11;2am
import React, { useEffect, useState, useRef } from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import { resetAddressStatus, selectAddressStatus } from '../features/address/AddressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Footer } from '../features/footer/Footer'
import { banner1, banner2, banner3, banner4, loadingAnimation } from '../assets'
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme, Button, Box, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { ProductBanner } from '../features/products/components/ProductBanner'
import { selectProducts, selectProductFetchStatus } from '../features/products/ProductSlice'
import { fetchAllBrandsAsync, selectBrands } from '../features/brands/BrandSlice'
import { fetchAllCategoriesAsync, selectCategories } from '../features/categories/CategoriesSlice'
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import cin from "../assets/images/cin.webp"
import whole from "../assets/images/whole.webp"
import cardomon from "../assets/images/cardomon.webp"
import turmeric from "../assets/images/turmeric.webp"
import saffron from "../assets/images/saffron.webp"
import homerightside from "../assets/images/homerightside.webp"
export const HomePage = () => {
  const theme = useTheme()
  const sliderRef = useRef(null);

  const is1200 = useMediaQuery(theme.breakpoints.down(1200))
  const is800 = useMediaQuery(theme.breakpoints.down(800))
  const is600 = useMediaQuery(theme.breakpoints.down(600))
  const is488 = useMediaQuery(theme.breakpoints.down(488))

  const [spices, setSpices] = useState([
    {
      id: 1,
      name: 'Cinnamon Sticks("இலவங்கப்பட்டை குச்சிகள்")',
      image: cin,
      description: 'Premium Ceylon cinnamon sticks',
    },
    {
      id: 2,
      name: 'Whole Cloves("முழு கிராம்பு")',
      image: whole,
      description: 'Aromatic whole cloves',
    },
    {
      id: 3,
      name: 'Cardamom Pods("ஏலக்காய் காய்கள்")',
      image: cardomon,
      description: 'Green cardamom pods',
    },
    {
      id: 4,
      name: 'Turmeric Powder("மஞ்சள் தூள்")',
      image: turmeric,
      description: 'Organic turmeric powder',
    },

    {
      id: 5,
      name: 'Saffron Threads("குங்குமப்பூ நூல்கள்")',
      image: saffron,
      description: 'Premium quality saffron',
    }
  ])

  const banners = [
    {
      image: banner1,
      text: '',
      buttonText: 'Shop Now',
      link: 'products'
    },
    {
      image: banner2,
      text: '',
      buttonText: 'Shop Now',
      link: 'products'
    },
    {
      image: banner3,
      text: '',
      buttonText: 'Shop Now',
      link: 'products'
    },
    {
      image: banner4,
      text: '',
      buttonText: 'Shop Now',
      link: 'products'
    }
  ];

  const dispatch = useDispatch()
  const addressStatus = useSelector(selectAddressStatus)

  useEffect(() => {
    if (addressStatus === 'fulfilled') {
      dispatch(resetAddressStatus())
    }
  }, [addressStatus])

  const products = useSelector(selectProducts)
  const productFetchStatus = useSelector(selectProductFetchStatus)

  // Calculate items per view based on screen width
  const getItemsPerView = () => {
    if (is488) return 1;
    if (is600) return 2;
    return 3;
  }

  const itemsPerView = getItemsPerView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = spices.length - itemsPerView;

  // Handle sliding
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Reset index when screen size changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Navbar />
      <Stack mb={'3rem'} mt={'5rem'}>
        <Stack sx={{width:"100%", height: is600 ? "auto" : is800 ? "300px" : is1200 ? "400px" : "500px"}}>
          <ProductBanner banners={banners}/>
        </Stack>
      </Stack>
      <Stack
      sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "relative",
        backgroundColor: "#ffeb3b", // Highlight background
        padding: "10px",
      }}
    >
      <Typography
        sx={{
          display: "inline-block",
          fontSize: screenWidth < 600 ? "14px" : screenWidth < 800 ? "18px" : "22px",
          fontWeight: "bold",
          color: "#333",
          animation: "marquee 10s linear infinite, highlight 4s ease-in-out",
        }}
      >
        All the Product including tax other than Pepper and Cardamom
      </Typography>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }

          @keyframes highlight {
            0% { background-color: yellow; }
            100% { background-color: transparent; }
          }
        `}
      </style>
    </Stack>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          margin: is600 ? '2rem 1rem' : '2rem 3rem',
          position: 'relative'
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: '1rem' }}
        >
          <Typography
            variant={is600 ? "h5" : "h5"}
            component="h4"
            sx={{
              fontWeight: '600',
              color:"#0aad0a",
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: 0,
                width: '60px',
                height: '3px',
                color:"#0aad0a",
                backgroundColor: "#0aad0a"
              }
            }}
          >
All Spices
  </Typography>

          <Button
            component={Link}
            to="/products"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontWeight: 'bold',
              color:"#0aad0a",
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'translateX(5px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            View All
          </Button>
        </Stack>

        {/* Simple CSS-based responsive slider */}
        <Box
          ref={sliderRef}
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.4s ease',
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {spices.map((spice) => (
              <Box
                key={spice.id}
                sx={{
                  flex: `0 0 ${100 / itemsPerView}%`,
                  maxWidth: `${100 / itemsPerView}%`,
                  padding: '0 8px',
                  boxSizing: 'border-box',
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={spice.image}
                    alt={spice.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {spice.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {spice.description}
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: '8px', fontWeight: 'bold' }}>
                      {spice.price}
                    </Typography>
                  </CardContent>

                </Card>
              </Box>
            ))}
          </Box>

          {/* Navigation buttons - visible only when needed */}
          {currentIndex > 0 && (
            <IconButton
              onClick={handlePrev}
              aria-label="Previous"
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                zIndex: 2,
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          )}

          {currentIndex < maxIndex && (
            <IconButton
              onClick={handleNext}
              aria-label="Next"
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                zIndex: 2,
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          )}
        </Box>
      </Stack>

      <Stack className="homeNutDate">
        <Stack className="row" style={{flexDirection:"row"}}>
          <Stack className="content marginLeft" style={{marginLeft:"50px"}}>
            <h2 className="titleH2">Storing Your Favourite Dates, Dry Fruits and Nuts!</h2>
            <Stack className="lineBelowTitle"></Stack>
            <p>For immediate usage, store these products in airtight containers at cool, dark spot reducing the exposure of light, oxygen and moisture.</p>
            <p>Do not expose to heat as it may go rancid or create grounds for soft bodied animals.</p>
            <p>For longer user, keep it refrigerated giving it the right taste and more flavourful vibrant to these tasteful Products.</p>
          </Stack>
          <Stack className="image">
            <img alt="Storing Your Favourite Dates, Dry Fruits and Nuts!" title="Storing Your Favourite Dates, Dry Fruits and Nuts!"
            // src="//ajfan.store/cdn/shop/files/top-view-autumnal-bowl-with-pine-cones-copy-space_4_O1.jpg?v=1701162668"
            src={homerightside}
            loading="lazy"/>
          </Stack>
        </Stack>
      </Stack>

      <Footer/>
    </>
  )
}
{/* <ProductList/>All Products */}
