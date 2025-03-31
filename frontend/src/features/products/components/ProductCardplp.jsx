

// new2
import { Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice';
import { motion } from 'framer-motion';
import { Tooltip } from "@mui/material";

export const ProductCardplp = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  category,
  stockQuantity,
  handleAddRemoveFromWishlist,
  isWishlistCard,
  isAdminCard
}) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const theme = useTheme();
  const is1410 = useMediaQuery(theme.breakpoints.down(1410));
  const is932 = useMediaQuery(theme.breakpoints.down(932));
  const is752 = useMediaQuery(theme.breakpoints.down(752));
  const is608 = useMediaQuery(theme.breakpoints.down(608));
  const is488 = useMediaQuery(theme.breakpoints.down(488));
  const is408 = useMediaQuery(theme.breakpoints.down(408));

  const isProductAlreadyinWishlist = wishlistItems.some((item) => item.product._id === id);
  const isProductAlreadyInCart = cartItems.some((item) => item.product._id === id);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  // Card dimensions based on screen size
  const cardWidth = is408 ? '100%'
                  : is488 ? '180px'
                  : is608 ? '220px'
                  : is752 ? '260px'
                  : is932 ? '220px'
                  : '260px';

  // Fixed height for all cards
  const cardHeight = is408 ? '320px' : '350px';
  const imageHeight = is408 ? '160px' : '180px';

  return (
    <>

      {isProductAlreadyinWishlist !== -1 ? (
        <Paper
          component={motion.div}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          elevation={1}
          sx={{
            width: cardWidth,
            height: cardHeight,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            m: 1
          }}
          onClick={() => navigate(`/product-details/${id}`)}
        >
          {/* Curved Ribbon with Animation */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 5,
              overflow: 'hidden'
            }}
          >
            <div style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '6px 15px',
              borderRadius: '0 0 0 8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              position: 'relative',
              width: 'auto',
            //   fontSize:'15px'
            }}>
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                //   backgroundColor: ['#4caf50', '#3d8b40', '#4caf50']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Typography variant="body2" fontWeight="normal" fontSize={'14px'} sx={{ whiteSpace: 'nowrap' }}>
                  {brand}
                </Typography>
              </motion.div>
              {/* Curved edge */}
              <div style={{
                position: 'absolute',
                bottom: -8,
                right: 0,
                width: 0,
                height: 0,
                background: 'transparent',
                boxShadow: '4px -4px 0 4px #3d8b40',
                borderRadius: '0 0 0 10px'
              }} />
            </div>
          </motion.div>

          {/* Wishlist icon */}
          {/* {!isAdminCard && (
            <motion.div
              whileHover={{scale: 1.3}}
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                zIndex: 5
              }}
            >
              <Checkbox
                onClick={(e) => e.stopPropagation()}
                checked={isProductAlreadyinWishlist}
                onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
              />
            </motion.div>
          )} */}

          {/* Product Image */}
          <div
            style={{
              width: '100%',
              height: imageHeight,
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              marginBottom: '8px'
            }}
          />

          {/* Product Info */}
          <Tooltip
  title={
    <div style={{ textAlign: "left" }}>
      <strong>Title:</strong> {title} <br />
      <strong>Category:</strong> {category} <br />

    </div>
  }
  arrow
>
          <Stack
          className='productcardplp'
            sx={{
              p: 2,
              pt: 0,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <Typography
              className="typography-title"
                variant="h6"
                fontWeight={500}
                textTransform="capitalize"

              >
                {title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                Category: {category}
              </Typography>
            </div>

            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Typography variant="div" style={{color:"#2f3792!important",fontFamily:'Poppins',fontSize:'17px',fontWeight:'600'}}>From Rs: {parseFloat(price).toFixed(2)}</Typography>

              {!isWishlistCard ? (
                isProductAlreadyInCart ? (
                  <Typography color="primary" variant="body2">Added to cart</Typography>
                ) : (
                  !isAdminCard && (
                    ''
                    // <motion.button
                    //   whileHover={{ scale: 1.03 }}
                    //   whileTap={{ scale: 0.98 }}
                    //   onClick={(e) => handleAddToCart(e)}
                    //   style={{
                    //     padding: is408 ? '6px 12px' : '8px 16px',
                    //     borderRadius: '4px',
                    //     outline: 'none',
                    //     border: 'none',
                    //     cursor: 'pointer',
                    //     backgroundColor: '#1976d2',
                    //     color: 'white',
                    //     fontSize: is408 ? '.8rem' : '.9rem',
                    //     textTransform: 'uppercase',
                    //     fontWeight: 'bold'
                    //   }}
                    // >
                    //   Add to Cart
                    // </motion.button>
                  )
                )
              ) : null}
            </Stack>

            {stockQuantity <= 20 && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 1 }}
              >
                {stockQuantity === 1 ? "Only 1 left!" : "Only few left!"}
              </Typography>
            )}
          </Stack>
          </Tooltip>
        </Paper>
      ) : ''}
    </>
  );
};