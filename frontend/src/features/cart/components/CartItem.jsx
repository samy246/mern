import { Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from '../CartSlice';
import { Link } from 'react-router-dom';

export const CartItem = ({id,thumbnail,title,category,brand,price,quantity,stockQuantity,productId,selectedWeight}) => {


    const dispatch=useDispatch()
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))
    const is552=useMediaQuery(theme.breakpoints.down(552))

    const handleAddQty=()=>{
        const update={_id:id,quantity:quantity+1}
        dispatch(updateCartItemByIdAsync(update))
    }
    const handleRemoveQty=()=>{
        if(quantity===1){
            dispatch(deleteCartItemByIdAsync(id))
        }
        else{
            const update={_id:id,quantity:quantity-1}
            dispatch(updateCartItemByIdAsync(update))
        }
    }

    const handleProductRemove=()=>{
        dispatch(deleteCartItemByIdAsync(id))
    }


  return (

    <Stack
  bgcolor={'white'}
  component={is900 ? '' : Paper}
  p={is900 ? 0 : 2}
  elevation={1}
  flexDirection={is552 ? 'column' : 'row'} // Column on mobile
  justifyContent={is552 ? 'center' : 'space-between'}
  alignItems={is552 ? 'center' : 'center'} // Align center on mobile
  textAlign={is552 ? 'center' : 'left'} // Center text on mobile
  gap={is552 ? 2 : 0} // Add spacing in column layout
>
  {/* Image and details */}
  <Stack
    flexDirection={is552 ? 'column' : 'row'} // Column on mobile
    rowGap={'1rem'}
    alignItems={'center'}
    columnGap={2}
    flexWrap={'wrap'}
    width={'100%'}
  >
    <Stack
      width={is552 ? '100%' : '200px'}
      height={is552 ? 'auto' : '200px'}
      component={Link}
      to={`/product-details/${productId}`}
    >
      <img
        style={{
          width: '100%',
          height: is552 ? 'auto' : '100%',
          aspectRatio: is552 ? '1/1' : '',
          objectFit: 'contain'
        }}
        src={thumbnail}
        alt={`${title} image unavailable`}
      />
    </Stack>

    <Stack alignItems={is552 ? 'center' : 'flex-start'} width={is552 ? '100%' : 'auto'}>
      <Typography
        component={Link}
        to={`/product-details/${productId}`}
        sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
        variant="h6"
        fontWeight={500}
      >
        {title}
      </Typography>
      <Typography variant="body2" color={'text.secondary'}>
       Weight(Sizes):{selectedWeight}
      </Typography>
      <Typography variant="body2" color={'text.secondary'}>
        {brand}
      </Typography>
      <Typography mt={1}>Quantity</Typography>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
        <IconButton onClick={handleRemoveQty}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography>{quantity}</Typography>
        <IconButton onClick={handleAddQty}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  </Stack>

  {/* Price and remove button */}
  <Stack
    justifyContent={is552 ? 'center' : 'space-evenly'}
    alignSelf={is552 ? 'center' : ''}
    height={is552 ? 'auto' : '100%'}
    rowGap={'1rem'}
    alignItems={is552 ? 'center' : 'flex-end'}
    width={is552 ? '100%' : 'auto'}
  >
    <Typography variant="body2">Rs.{price?.toFixed(2)}</Typography>
    <Button size={is480 ? 'small' : ''} onClick={handleProductRemove} variant="contained">
      Remove
    </Button>
  </Stack>
</Stack>

  )
}
