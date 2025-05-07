
// new
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync } from '../../order/OrderSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import {noOrdersAnimation} from '../../../assets/index'
import Lottie from 'lottie-react'


export const AdminOrders = () => {

  const dispatch=useDispatch()
  const orders=useSelector(selectOrders)
  const [editIndex,setEditIndex]=useState(-1)
  const orderUpdateStatus=useSelector(selectOrderUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))

  // State for view modal
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllOrdersAsync())
  },[dispatch])


  useEffect(()=>{
    if(orderUpdateStatus==='fulfilled'){
      toast.success("Status updated")
    }
    else if(orderUpdateStatus==='rejected'){
      toast.error("Error updating order status")
    }
  },[orderUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetOrderUpdateStatus())
    }
  },[])


  const handleUpdateOrder=(data)=>{
    const update={...data,_id:orders[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateOrderByIdAsync(update))
  }

  // Function to handle opening the view modal
  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setViewModalOpen(true)
  }

  // Function to handle closing the view modal
  const handleCloseViewModal = () => {
    setViewModalOpen(false)
    setSelectedOrder(null)
  }

  const editOptions=['Pending','Dispatched','Out for delivery','Delivered','Cancelled']

  const getStatusColor=(status)=>{
    if(status==='Pending'){
      return {bgcolor:'#dfc9f7',color:'#7c59a4'}
    }
    else if(status==='Dispatched'){
      return {bgcolor:'#feed80',color:'#927b1e'}
    }
    else if(status==='Out for delivery'){
      return {bgcolor:'#AACCFF',color:'#4793AA'}
    }
    else if(status==='Delivered'){
      return {bgcolor:"#b3f5ca",color:"#548c6a"}
    }
    else if(status==='Cancelled'){
      return {bgcolor:"#fac0c0",color:'#cc6d72'}
    }
  }


  return (

    <Stack justifyContent={'center'} alignItems={'center'}>

      <Stack mt={15} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>

        {
          orders.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Customer Details</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="left">Total Amount</TableCell>
                  <TableCell align="left">Shipping Address</TableCell>
                  <TableCell align="left">Payment Method</TableCell>
                  <TableCell align="left">Order Date</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                orders.length && orders.map((order,index) => (

                  <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell align="left">
                      <Stack>
                        <Typography><b>Name: </b>{order.user.name}</Typography>
                        <Typography><b>Email: </b>{order.user.email}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {
                        order.item.map((product)=>(
                          <Stack key={product.product._id} mt={2} flexDirection={'row'} alignItems={'center'} columnGap={1}>
                            <Avatar src={product.product.thumbnail}></Avatar>
                            <Typography>{product.product.title}</Typography>
                          </Stack>
                        ))
                      }
                    </TableCell>
                    <TableCell align="left">{order.total}</TableCell>
                    <TableCell align="left">
                      <Stack>
                        <Typography>{order.address[0].street}</Typography>
                        <Typography>{order.address[0].city}</Typography>
                        <Typography>{order.address[0].state}</Typography>
                        <Typography>{order.address[0].postalCode}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{order.paymentMode}</TableCell>
                    <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>

                    {/* order status */}
                    <TableCell align="left">

                        {
                          editIndex===index?(

                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Update status</InputLabel>
                          <Select
                            defaultValue={order.status}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Update status"
                            {...register('status',{required:'Status is required'})}
                            >

                            {
                              editOptions.map((option)=>(
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                        ):<Chip label={order.status} sx={getStatusColor(order.status)}/>
                        }

                    </TableCell>

                    {/* actions */}
                    <TableCell align="left">
                      <Stack direction="row" spacing={1}>
                        {
                          editIndex===index?(
                            <Button>
                              <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
                            </Button>
                          )
                          :
                          <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
                        }
                        <IconButton onClick={() => handleViewOrder(order)}><VisibilityOutlinedIcon/></IconButton>
                      </Stack>
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          :
          <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

            <Stack rowGap={'1rem'}>
                <Lottie animationData={noOrdersAnimation}/>
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no orders currently</Typography>
            </Stack>


          </Stack>
        }

      </Stack>

      {/* Order Details Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details
          <IconButton
            aria-label="close"
            onClick={handleCloseViewModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Customer Information</Typography>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography><b>Name:</b> {selectedOrder.user.name}</Typography>
                  <Typography><b>Email:</b> {selectedOrder.user.email}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography><b>Order ID:</b> {selectedOrder._id}</Typography>
                  <Typography><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
                  <Typography><b>Payment Method:</b> {selectedOrder.paymentMode}</Typography>
                  <Typography><b>Shipping Charges:</b> Rs.{(selectedOrder.shipping).toFixed(2)}</Typography>
                  <Typography><b>Total Amount:</b> Rs.{(selectedOrder.total).toFixed(2)}</Typography>
                  <Typography><b>Status:</b> <Chip label={selectedOrder.status} size="small" sx={getStatusColor(selectedOrder.status)} /></Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography><b>Address:</b>{selectedOrder.address[0].street}</Typography>
                  <Typography><b>City:</b>{selectedOrder.address[0].city}</Typography>
                  <Typography>  <b>State:</b> {selectedOrder.address[0].state} </Typography>
                  <Typography><b>Postal Code:</b> {selectedOrder.address[0].postalCode}</Typography>
                  <Typography><b>Phone Number:</b>{selectedOrder.address[0].phoneNumber}</Typography>
                  <Typography><b>Country:</b>{selectedOrder.address[0].country}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Products</Typography>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  {selectedOrder.item.map((item, index) => (
                    <React.Fragment key={index}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2} sm={1}>
                          <Avatar src={item.product.thumbnail} sx={{ width: 50, height: 50 }}></Avatar>
                        </Grid>
                        <Grid item xs={10} sm={11}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle1">{item.product.title}</Typography>
                              <Typography variant="body2" color="text.secondary">Brand: {item.product.brand.name}</Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Price:</b> Rs.
                              {
    item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 'N/A'
  }
                              {/* {item.product.price} */}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Quantity:</b> {item.quantity}</Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Weight:</b> {item.weight}</Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Total:</b> Rs.
                              {
    (
      (item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0) * item?.quantity
    ).toFixed(2)
  }
                              {/* {(item.product.price * item.quantity).toFixed(2)} */}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {index < selectedOrder.item.length - 1 && <Divider sx={{ my: 2 }} />}
                    </React.Fragment>
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewModal}>Close</Button>
        </DialogActions>
      </Dialog>

    </Stack>
  )
}