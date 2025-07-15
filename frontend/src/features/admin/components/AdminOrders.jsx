
// // new
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync } from '../../order/OrderSlice'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import { useForm } from "react-hook-form"
// import { toast } from 'react-toastify';
// import {noOrdersAnimation} from '../../../assets/index'
// import Lottie from 'lottie-react'


// export const AdminOrders = () => {

//   const dispatch=useDispatch()
//   const orders=useSelector(selectOrders)
//   const [editIndex,setEditIndex]=useState(-1)
//   const orderUpdateStatus=useSelector(selectOrderUpdateStatus)
//   const theme=useTheme()
//   const is1620=useMediaQuery(theme.breakpoints.down(1620))
//   const is1200=useMediaQuery(theme.breakpoints.down(1200))
//   const is820=useMediaQuery(theme.breakpoints.down(820))
//   const is480=useMediaQuery(theme.breakpoints.down(480))

//   // State for view modal
//   const [viewModalOpen, setViewModalOpen] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState(null)

//   const {register,handleSubmit,formState: { errors },} = useForm()

//   useEffect(()=>{
//     dispatch(getAllOrdersAsync())
//   },[dispatch])


//   useEffect(()=>{
//     if(orderUpdateStatus==='fulfilled'){
//       toast.success("Status updated")
//     }
//     else if(orderUpdateStatus==='rejected'){
//       toast.error("Error updating order status")
//     }
//   },[orderUpdateStatus])

//   useEffect(()=>{
//     return ()=>{
//       dispatch(resetOrderUpdateStatus())
//     }
//   },[])


//   const handleUpdateOrder=(data)=>{
//     const update={...data,_id:orders[editIndex]._id}
//     setEditIndex(-1)
//     dispatch(updateOrderByIdAsync(update))
//   }

//   // Function to handle opening the view modal
//   const handleViewOrder = (order) => {
//     setSelectedOrder(order)
//     setViewModalOpen(true)
//   }

//   // Function to handle closing the view modal
//   const handleCloseViewModal = () => {
//     setViewModalOpen(false)
//     setSelectedOrder(null)
//   }

//   const editOptions=['Pending','Dispatched','Out for delivery','Delivered','Cancelled']

//   const getStatusColor=(status)=>{
//     if(status==='Pending'){
//       return {bgcolor:'#dfc9f7',color:'#7c59a4'}
//     }
//     else if(status==='Dispatched'){
//       return {bgcolor:'#feed80',color:'#927b1e'}
//     }
//     else if(status==='Out for delivery'){
//       return {bgcolor:'#AACCFF',color:'#4793AA'}
//     }
//     else if(status==='Delivered'){
//       return {bgcolor:"#b3f5ca",color:"#548c6a"}
//     }
//     else if(status==='Cancelled'){
//       return {bgcolor:"#fac0c0",color:'#cc6d72'}
//     }
//   }


//   return (

//     <Stack justifyContent={'center'} alignItems={'center'}>

//       <Stack mt={15} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>

//         {
//           orders.length?
//           <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
//             <Table aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Customer Details</TableCell>
//                   <TableCell align="left">Item</TableCell>
//                   <TableCell align="left">Total Amount</TableCell>
//                   <TableCell align="left">Shipping Address</TableCell>
//                   <TableCell align="left">Payment Method</TableCell>
//                   <TableCell align="left">Order Date</TableCell>
//                   <TableCell align="left">Status</TableCell>
//                   <TableCell align="left">Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>

//                 {
//                 orders.length && orders.map((order,index) => (

//                   <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

//                     <TableCell align="left">
//                       <Stack>
//                         <Typography><b>Name: </b>{order.user.name}</Typography>
//                         <Typography><b>Email: </b>{order.user.email}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="left">
//                       {
//                         order.item.map((product)=>(
//                           <Stack key={product.product._id} mt={2} flexDirection={'row'} alignItems={'center'} columnGap={1}>
//                             <Avatar src={product.product.thumbnail}></Avatar>
//                             <Typography>{product.product.title}</Typography>
//                           </Stack>
//                         ))
//                       }
//                     </TableCell>
//                     <TableCell align="left">{order.total}</TableCell>
//                     <TableCell align="left">
//                       <Stack>
//                         <Typography>{order.address[0].street}</Typography>
//                         <Typography>{order.address[0].city}</Typography>
//                         <Typography>{order.address[0].state}</Typography>
//                         <Typography>{order.address[0].postalCode}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="left">{order.paymentMode}</TableCell>
//                     <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>

//                     {/* order status */}
//                     <TableCell align="left">

//                         {
//                           editIndex===index?(

//                         <FormControl fullWidth>
//                           <InputLabel id="demo-simple-select-label">Update status</InputLabel>
//                           <Select
//                             defaultValue={order.status}
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             label="Update status"
//                             {...register('status',{required:'Status is required'})}
//                             >

//                             {
//                               editOptions.map((option)=>(
//                                 <MenuItem key={option} value={option}>{option}</MenuItem>
//                               ))
//                             }
//                           </Select>
//                         </FormControl>
//                         ):<Chip label={order.status} sx={getStatusColor(order.status)}/>
//                         }

//                     </TableCell>

//                     {/* actions */}
//                     <TableCell align="left">
//                       <Stack direction="row" spacing={1}>
//                         {
//                           editIndex===index?(
//                             <Button>
//                               <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
//                             </Button>
//                           )
//                           :
//                           <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
//                         }
//                         <IconButton onClick={() => handleViewOrder(order)}><VisibilityOutlinedIcon/></IconButton>
//                       </Stack>
//                     </TableCell>

//                   </TableRow>
//                 ))}

//               </TableBody>
//             </Table>
//           </TableContainer>
//           :
//           <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

//             <Stack rowGap={'1rem'}>
//                 <Lottie animationData={noOrdersAnimation}/>
//                 <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no orders currently</Typography>
//             </Stack>


//           </Stack>
//         }

//       </Stack>

//       {/* Order Details Modal */}
//       <Dialog
//         open={viewModalOpen}
//         onClose={handleCloseViewModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           Order Details
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseViewModal}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Customer Information</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Name:</b> {selectedOrder.user.name}</Typography>
//                   <Typography><b>Email:</b> {selectedOrder.user.email}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Order Summary</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Order ID:</b> {selectedOrder._id}</Typography>
//                   <Typography><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
//                   <Typography><b>Payment Method:</b> {selectedOrder.paymentMode}</Typography>
//                   <Typography><b>Shipping Charges:</b> Rs.{(selectedOrder.shipping).toFixed(2)}</Typography>
//                   <Typography><b>Total Amount:</b> Rs.{(selectedOrder.total).toFixed(2)}</Typography>
//                   <Typography><b>Status:</b> <Chip label={selectedOrder.status} size="small" sx={getStatusColor(selectedOrder.status)} /></Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Shipping Address</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Address:</b>{selectedOrder.address[0].street}</Typography>
//                   <Typography><b>City:</b>{selectedOrder.address[0].city}</Typography>
//                   <Typography>  <b>State:</b> {selectedOrder.address[0].state} </Typography>
//                   <Typography><b>Postal Code:</b> {selectedOrder.address[0].postalCode}</Typography>
//                   <Typography><b>Phone Number:</b>{selectedOrder.address[0].phoneNumber}</Typography>
//                   <Typography><b>Country:</b>{selectedOrder.address[0].country}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Products</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   {selectedOrder.item.map((item, index) => (
//                     <React.Fragment key={index}>
//                       <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={2} sm={1}>
//                           <Avatar src={item.product.thumbnail} sx={{ width: 50, height: 50 }}></Avatar>
//                         </Grid>
//                         <Grid item xs={10} sm={11}>
//                           <Grid container spacing={1}>
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="subtitle1">{item.product.title}</Typography>
//                               <Typography variant="body2" color="text.secondary">Brand: {item.product.brand.name}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Price:</b> Rs.
//                               {
//     item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 'N/A'
//   }
//                               {/* {item.product.price} */}
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Quantity:</b> {item.quantity}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Weight:</b> {item.weight}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Total:</b> Rs.
//                               {
//     (
//       (item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0) * item?.quantity
//     ).toFixed(2)
//   }
//                               {/* {(item.product.price * item.quantity).toFixed(2)} */}
//                               </Typography>
//                             </Grid>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       {index < selectedOrder.item.length - 1 && <Divider sx={{ my: 2 }} />}
//                     </React.Fragment>
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseViewModal}>Close</Button>
//         </DialogActions>
//       </Dialog>

//     </Stack>
//   )
// }

// old
// import React, { useEffect, useState, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync } from '../../order/OrderSlice'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import DownloadIcon from '@mui/icons-material/Download';
// import PrintIcon from '@mui/icons-material/Print';
// import { useForm } from "react-hook-form"
// import { toast } from 'react-toastify';
// import {noOrdersAnimation} from '../../../assets/index'
// import Lottie from 'lottie-react'
// import logo from "../../../assets/images/logo.png"
// export const AdminOrders = () => {

//   const dispatch=useDispatch()
//   const orders=useSelector(selectOrders)
//   const [editIndex,setEditIndex]=useState(-1)
//   const orderUpdateStatus=useSelector(selectOrderUpdateStatus)
//   const theme=useTheme()
//   const is1620=useMediaQuery(theme.breakpoints.down(1620))
//   const is1200=useMediaQuery(theme.breakpoints.down(1200))
//   const is820=useMediaQuery(theme.breakpoints.down(820))
//   const is480=useMediaQuery(theme.breakpoints.down(480))
//   const printFrameRef = useRef(null)

//   // State for view modal
//   const [viewModalOpen, setViewModalOpen] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState(null)
//   const [printDialogOpen, setPrintDialogOpen] = useState(false)

//     const [pageSize, setPageSize] = useState(10)
//   const {register,handleSubmit,formState: { errors },} = useForm()

//   // useEffect(()=>{
//   //   dispatch(getAllOrdersAsync())
//   // },[dispatch])
//   useEffect(() => {
//         // Load initial orders
//         dispatch(getAllOrdersAsync({
//             page: pagination.currentPage,
//             limit: pageSize
//         }))
//     }, [dispatch, pagination.currentPage, pageSize])
//   useEffect(()=>{
//     if(orderUpdateStatus==='fulfilled'){
//       toast.success("Status updated")
//       toast.success("Invoice Sent")
//       dispatch(getAllOrdersAsync())
//     }
//     else if(orderUpdateStatus==='rejected'){
//       toast.error("Error updating order status")
//     }
//   },[orderUpdateStatus])
//     const handlePageChange = (newPage) => {
//         dispatch(setPage(newPage))
//     }

//     const handlePageSizeChange = (newSize) => {
//         setPageSize(newSize)
//         dispatch(setLimit(newSize))
//         dispatch(setPage(1)) // Reset to first page when changing page size
//     }

//     const handleRefresh = () => {
//         dispatch(getAllOrdersAsync({
//             page: pagination.currentPage,
//             limit: pageSize
//         }))
//     }
//   useEffect(()=>{
//     return ()=>{
//       dispatch(resetOrderUpdateStatus())
//     }
//   },[])

//   const handleUpdateOrder=(data)=>{
//     // debugger
//     const update={...data,_id:orders[editIndex]._id}
//     setEditIndex(-1)
//     dispatch(updateOrderByIdAsync(update))
//   }

//   // Function to handle opening the view modal
//   const handleViewOrder = (order) => {
//     setSelectedOrder(order)
//     setViewModalOpen(true)
//   }

//   // Function to handle closing the view modal
//   const handleCloseViewModal = () => {
//     setViewModalOpen(false)
//     setSelectedOrder(null)
//   }

//   const editOptions=['Pending','Dispatched','Out for delivery','Delivered','Cancelled']

//   const getStatusColor=(status)=>{
//     if(status==='Pending'){
//       return {bgcolor:'#dfc9f7',color:'#7c59a4'}
//     }
//     else if(status==='Dispatched'){
//       return {bgcolor:'#feed80',color:'#927b1e'}
//     }
//     else if(status==='Out for delivery'){
//       return {bgcolor:'#AACCFF',color:'#4793AA'}
//     }
//     else if(status==='Delivered'){
//       return {bgcolor:"#b3f5ca",color:"#548c6a"}
//     }
//     else if(status==='Cancelled'){
//       return {bgcolor:"#fac0c0",color:'#cc6d72'}
//     }
//   }

//   // Function to handle print dialog
//   const handlePrintInvoice = (order) => {
//     setSelectedOrder(order)
//     setPrintDialogOpen(true)
//   }

//   // Function to close print dialog
//   const handleClosePrintDialog = () => {
//     setPrintDialogOpen(false)
//   }

//   // Function to safely print the invoice without DOM manipulation errors
//   const handlePrint = () => {
//     const printContent = printFrameRef.current
//     if (printContent) {
//       const printWindow = window.open('', '_blank');

//       if (!printWindow) {
//         toast.error("Please allow pop-ups to print invoices");
//         return;
//       }

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>ThekkdySpices - Invoice</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               .invoice-header { text-align: center; margin-bottom: 20px; }
//               .invoice-header h1 { color: #006600; margin: 0 0 5px 0; }
//               .invoice-divider { border: 1px solid #006600; margin: 10px 0; }
//               .flex-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
//               .section-box { border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
//               .section-half { width: 48%; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th { background-color: #006600; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
//               td { padding: 10px; text-align: left; border: 1px solid #ddd; }
//               tfoot td { padding: 10px; text-align: right; border: 1px solid #ddd; }
//               tr:nth-child(even) { background-color: #f9f9f9; }
//               .footer { border-top: 1px solid #006600; padding-top: 20px; text-align: center; }
//               .footer p:last-child { font-size: 12px; }
//             </style>
//           </head>
//           <body>
//             ${printContent.innerHTML}
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
//       printWindow.focus();

//       // Let browser render the content before printing
//       setTimeout(() => {
//         printWindow.print();
//         // Don't close the window automatically to allow user to complete print dialog
//       }, 250);

//       setPrintDialogOpen(false);
//       toast.success("Invoice prepared for printing");
//     }
//   };

//   // Function to download as PDF using a safer approach
//   const handleDownloadInvoice = () => {
//     const printContent = printFrameRef.current;
//     if (printContent) {
//       const printWindow = window.open('', '_blank');

//       if (!printWindow) {
//         toast.error("Please allow pop-ups to download invoices");
//         return;
//       }

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>ThekkdySpices - Invoice</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               .invoice-header { text-align: center; margin-bottom: 20px; }
//               .invoice-header h1 { color: #006600; margin: 0 0 5px 0; }
//               .invoice-divider { border: 1px solid #006600; margin: 10px 0; }
//               .flex-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
//               .section-box { border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
//               .section-half { width: 48%; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th { background-color: #006600; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
//               td { padding: 10px; text-align: left; border: 1px solid #ddd; }
//               tfoot td { padding: 10px; text-align: right; border: 1px solid #ddd; }
//               tr:nth-child(even) { background-color: #f9f9f9; }
//               .footer { border-top: 1px solid #006600; padding-top: 20px; text-align: center; }
//               .footer p:last-child { font-size: 12px; }
//               @media print {
//                 body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//               }
//             </style>
//           </head>
//           <body>
//             ${printContent.innerHTML}
//             <script>
//               window.onload = function() {
//                 setTimeout(function() {
//                   window.print();
//                   // Keep window open so user can use browser's "Save as PDF" option
//                 }, 500);
//               };
//             </script>
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
//       printWindow.focus();

//       setPrintDialogOpen(false);
//       toast.success("Invoice prepared for download");
//     }
//   };

//   return (

//     <Stack justifyContent={'center'} alignItems={'center'}>

//       <Stack mt={15} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>

//         {
//           orders.length?
//           <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
//             <Table aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Customer Details</TableCell>
//                   <TableCell align="left">Item</TableCell>
//                   <TableCell align="left">Total Amount</TableCell>
//                   <TableCell align="left">Shipping Address</TableCell>
//                   <TableCell align="left">Payment Method</TableCell>
//                   <TableCell align="left">Order Date</TableCell>
//                   <TableCell align="left">Status</TableCell>
//                   <TableCell align="left">Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>

//                 {
//                 orders.length && orders.map((order,index) => (

//                   <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

//                     <TableCell align="left">
//                       <Stack>
//                         <Typography><b>Name: </b>{order.user?.name}</Typography>
//                         <Typography><b>Email: </b>{order.user?.email}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="left">
//                       {
//                         order.item.map((product)=>(
//                           <Stack key={product.product?._id} mt={2} flexDirection={'row'} alignItems={'center'} columnGap={1}>
//                             <Avatar src={product.product?.thumbnail}></Avatar>
//                             <Typography>{product.product?.title}</Typography>
//                           </Stack>
//                         ))
//                       }
//                     </TableCell>
//                     <TableCell align="left">{order.total}</TableCell>
//                     <TableCell align="left">
//                       <Stack>
//                         <Typography>{order.address[0]?.street}</Typography>
//                         <Typography>{order.address[0]?.city}</Typography>
//                         <Typography>{order.address[0].state}</Typography>
//                         <Typography>{order.address[0]?.postalCode}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="left">{order?.paymentMode}</TableCell>
//                     <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>

//                     {/* order status */}
//                     <TableCell align="left">

//                         {
//                           editIndex===index?(

//                         <FormControl fullWidth>
//                           <InputLabel id="demo-simple-select-label">Update status</InputLabel>
//                           <Select
//                             defaultValue={order.status}
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             label="Update status"
//                             {...register('status',{required:'Status is required'})}
//                             >

//                             {
//                               editOptions.map((option)=>(
//                                 <MenuItem key={option} value={option}>{option}</MenuItem>
//                               ))
//                             }
//                           </Select>
//                         </FormControl>
//                         ):<Chip label={order.status} sx={getStatusColor(order.status)}/>
//                         }

//                     </TableCell>

//                     {/* actions */}
//                     <TableCell align="left">
//                       <Stack direction="row" spacing={1}>
//                         {
//                           editIndex===index?(
//                             <Button>
//                               <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
//                             </Button>
//                           )
//                           :
//                           <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
//                         }
//                         <IconButton onClick={() => handleViewOrder(order)}><VisibilityOutlinedIcon/></IconButton>
//                       </Stack>
//                     </TableCell>

//                   </TableRow>
//                 ))}

//               </TableBody>
//             </Table>
//           </TableContainer>
//           :
//           <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

//             <Stack rowGap={'1rem'}>
//                 <Lottie animationData={noOrdersAnimation}/>
//                 <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no orders currently</Typography>
//             </Stack>


//           </Stack>
//         }

//       </Stack>

//       {/* Order Details Modal */}
//       <Dialog
//         open={viewModalOpen}
//         onClose={handleCloseViewModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           Order Details
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseViewModal}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Customer Information</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Name:</b> {selectedOrder.user.name}</Typography>
//                   <Typography><b>Email:</b> {selectedOrder.user.email}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Order Summary</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Order ID:</b> {selectedOrder._id}</Typography>
//                   <Typography><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
//                   <Typography><b>Payment Method:</b> {selectedOrder.paymentMode}</Typography>
//                   <Typography><b>Shipping Charges:</b> Rs.{(selectedOrder.shipping).toFixed(2)}</Typography>
//                   <Typography><b>Total Amount:</b> Rs.{(selectedOrder.total).toFixed(2)}</Typography>
//                   <Typography><b>Status:</b> <Chip label={selectedOrder.status} size="small" sx={getStatusColor(selectedOrder.status)} /></Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Shipping Address</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Address:</b>{selectedOrder.address[0].street}</Typography>
//                   <Typography><b>City:</b>{selectedOrder.address[0].city}</Typography>
//                   <Typography>  <b>State:</b> {selectedOrder.address[0].state} </Typography>
//                   <Typography><b>Postal Code:</b> {selectedOrder.address[0].postalCode}</Typography>
//                   <Typography><b>Phone Number:</b>{selectedOrder.address[0].phoneNumber}</Typography>
//                   <Typography><b>Country:</b>{selectedOrder.address[0].country}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Products</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   {selectedOrder.item.map((item, index) => (
//                     <React.Fragment key={index}>
//                       <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={2} sm={1}>
//                           <Avatar src={item.product.thumbnail} sx={{ width: 50, height: 50 }}></Avatar>
//                         </Grid>
//                         <Grid item xs={10} sm={11}>
//                           <Grid container spacing={1}>
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="subtitle1">{item.product.title}</Typography>
//                               <Typography variant="body2" color="text.secondary">Brand: {item.product.brand.name}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Price:</b> Rs.
//                               {
//     item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 'N/A'
//   }
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Quantity:</b> {item.quantity}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Weight:</b> {item.weight}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Total:</b> Rs.
//                               {
//     (
//       (item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0) * item?.quantity
//     ).toFixed(2)
//   }
//                               </Typography>
//                             </Grid>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       {index < selectedOrder.item.length - 1 && <Divider sx={{ my: 2 }} />}
//                     </React.Fragment>
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           {selectedOrder && (
//             <Button
//               startIcon={<DownloadIcon />}
//               variant="contained"
//               color="primary"
//               onClick={() => handlePrintInvoice(selectedOrder)}
//             >
//               Download Invoice
//             </Button>
//           )}
//           <Button onClick={handleCloseViewModal}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Print/Download Invoice Dialog */}
//       <Dialog
//         open={printDialogOpen}
//         onClose={handleClosePrintDialog}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           style: {
//             height: '90vh'
//           }
//         }}
//       >
//         <DialogTitle>
//           Invoice Preview
//           <IconButton
//             aria-label="close"
//             onClick={handleClosePrintDialog}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <div ref={printFrameRef} style={{ padding: '20px' }}>
//               <div className="invoice-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
// <img src={logo} width={"150px"} height={"110px"}/>
//                 <h1 style={{ color: '#006600', margin: '0 0 5px 0' }}>Thekkady Spices</h1>
//                 <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>GSTIN: 33AFRPR5719M1ZP</p>
//                 <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Contact Number: +91 9080 53 5414</p>
//                 <h2 style={{ margin: '10px 0' }}>Tax Invoice</h2>
//                 <div style={{ border: '1px solid #006600', margin: '10px 0' }}></div>
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <div>
//                   <p><strong>Order ID:</strong> {selectedOrder._id}</p>
//                   <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
//                   <p><strong>Status:</strong> {selectedOrder.status}</p>
//                 </div>
//                 <div>
//                   <p style={{ textAlign: 'right' }}><strong>Payment Method:</strong> {selectedOrder.paymentMode}</p>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <div style={{ width: '48%' }}>
//                   <h3>Customer Details</h3>
//                   <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '5px' }}>
//                     <p><strong>Name:</strong> {selectedOrder.user.name}</p>
//                     <p><strong>Email:</strong> {selectedOrder.user.email}</p>
//                   </div>
//                 </div>
//                 <div style={{ width: '48%' }}>
//                   <h3>Shipping Address</h3>
//                   <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '5px' }}>
//                     <p>{selectedOrder.address[0].street}</p>
//                     <p>{selectedOrder.address[0].city}, {selectedOrder.address[0].state}</p>
//                     <p>{selectedOrder.address[0].postalCode}, {selectedOrder.address[0].country}</p>
//                     <p><strong>Phone:</strong> {selectedOrder.address[0].phoneNumber}</p>
//                   </div>
//                 </div>
//               </div>

//               <h3>Order Items</h3>
//               <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                 <thead>
//                   <tr style={{ backgroundColor: '#006600', color: 'white' }}>
//                     <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Item</th>
//                     <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Brand</th>
//                     <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Weight</th>
//                     <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Price</th>
//                     <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Qty</th>
//                     <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedOrder.item.map((item, index) => {
//                     const price = item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0;
//                     const itemTotal = (price * item.quantity).toFixed(2);

//                     return (
//                       <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
//                         <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item.product.title}</td>
//                         <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item.product.brand.name}</td>
//                         <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item.weight}</td>
//                         <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{price}</td>
//                         <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{item.quantity}</td>
//                         <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{itemTotal}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4" style={{ border: '1px solid #ddd' }}></td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>Shipping:</td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{selectedOrder.shipping.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="4" style={{ border: '1px solid #ddd' }}></td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>Total:</td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>₹{selectedOrder.total.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>

//               <div className="footer" style={{ borderTop: '1px solid #006600', paddingTop: '20px', textAlign: 'center' }}>
//                 <p>Thank you for shopping with Thekkady Spices!</p>
//                 <p style={{ fontSize: '12px' }}>For any queries, please contact us at thekkadyspices01@gmail.com</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button startIcon={<PrintIcon />} variant="outlined" onClick={handlePrint}>
//             Print
//           </Button>
//           <Button startIcon={<DownloadIcon />} variant="contained" color="primary" onClick={handleDownloadInvoice}>
//             Download as PDF
//           </Button>
//           <Button onClick={handleClosePrintDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//     </Stack>
//   )
// }

// new
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync,selectPagination,setLimit,setPage, selectOrderFetchStatus } from '../../order/OrderSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography, useMediaQuery, useTheme,Pagination,CircularProgress } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh'
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import {noOrdersAnimation} from '../../../assets/index'
import Lottie from 'lottie-react'
import logo from "../../../assets/images/logo.png"
// m23-workng ggodeloader not there
// export const AdminOrders = () => {
//   const dispatch = useDispatch()
//   const orders = useSelector(selectOrders)
//   const pagination = useSelector(selectPagination) // Add this selector
//   const [editIndex, setEditIndex] = useState(-1)
//   const orderUpdateStatus = useSelector(selectOrderUpdateStatus)
//   const theme = useTheme()
//   const is1620 = useMediaQuery(theme.breakpoints.down(1620))
//   const is1200 = useMediaQuery(theme.breakpoints.down(1200))
//   const is820 = useMediaQuery(theme.breakpoints.down(820))
//   const is480 = useMediaQuery(theme.breakpoints.down(480))
//   const printFrameRef = useRef(null)

//   // State for view modal
//   const [viewModalOpen, setViewModalOpen] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState(null)
//   const [printDialogOpen, setPrintDialogOpen] = useState(false)

//   const [pageSize, setPageSize] = useState(5)
//   const { register, handleSubmit, formState: { errors } } = useForm()

//   // Load orders with pagination
//   useEffect(() => {
//     dispatch(getAllOrdersAsync({
//       page: pagination.currentPage,
//       limit: pageSize
//     }))
//   }, [dispatch, pagination.currentPage, pageSize])

//   useEffect(() => {
//     if (orderUpdateStatus === 'fulfilled') {
//       toast.success("Status updated")
//       toast.success("Invoice Sent")
//       dispatch(getAllOrdersAsync({
//         page: pagination.currentPage,
//         limit: pageSize
//       }))
//     }
//     else if (orderUpdateStatus === 'rejected') {
//       toast.error("Error updating order status")
//     }
//   }, [orderUpdateStatus, dispatch, pagination.currentPage, pageSize])

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     dispatch(setPage(newPage))
//   }

//   // Handle page size change
//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize)
//     dispatch(setLimit(newSize))
//     dispatch(setPage(1)) // Reset to first page when changing page size
//   }

//   // Handle refresh
//   const handleRefresh = () => {
//     dispatch(getAllOrdersAsync({
//       page: pagination.currentPage,
//       limit: pageSize
//     }))
//   }

//   useEffect(() => {
//     return () => {
//       dispatch(resetOrderUpdateStatus())
//     }
//   }, [])

//   const handleUpdateOrder = (data) => {
//     const update = { ...data, _id: orders[editIndex]._id }
//     setEditIndex(-1)
//     dispatch(updateOrderByIdAsync(update))
//   }

//   // Function to handle opening the view modal
//   const handleViewOrder = (order) => {
//     setSelectedOrder(order)
//     setViewModalOpen(true)
//   }

//   // Function to handle closing the view modal
//   const handleCloseViewModal = () => {
//     setViewModalOpen(false)
//     setSelectedOrder(null)
//   }

//   const editOptions = ['Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled']

//   const getStatusColor = (status) => {
//     if (status === 'Pending') {
//       return { bgcolor: '#dfc9f7', color: '#7c59a4' }
//     }
//     else if (status === 'Dispatched') {
//       return { bgcolor: '#feed80', color: '#927b1e' }
//     }
//     else if (status === 'Out for delivery') {
//       return { bgcolor: '#AACCFF', color: '#4793AA' }
//     }
//     else if (status === 'Delivered') {
//       return { bgcolor: "#b3f5ca", color: "#548c6a" }
//     }
//     else if (status === 'Cancelled') {
//       return { bgcolor: "#fac0c0", color: '#cc6d72' }
//     }
//   }

//   // Function to handle print dialog
//   const handlePrintInvoice = (order) => {
//     setSelectedOrder(order)
//     setPrintDialogOpen(true)
//   }

//   // Function to close print dialog
//   const handleClosePrintDialog = () => {
//     setPrintDialogOpen(false)
//   }

//   // Function to safely print the invoice without DOM manipulation errors
//   const handlePrint = () => {
//     const printContent = printFrameRef.current
//     if (printContent) {
//       const printWindow = window.open('', '_blank');

//       if (!printWindow) {
//         toast.error("Please allow pop-ups to print invoices");
//         return;
//       }

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>ThekkdySpices - Invoice</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               .invoice-header { text-align: center; margin-bottom: 20px; }
//               .invoice-header h1 { color: #006600; margin: 0 0 5px 0; }
//               .invoice-divider { border: 1px solid #006600; margin: 10px 0; }
//               .flex-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
//               .section-box { border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
//               .section-half { width: 48%; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th { background-color: #006600; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
//               td { padding: 10px; text-align: left; border: 1px solid #ddd; }
//               tfoot td { padding: 10px; text-align: right; border: 1px solid #ddd; }
//               tr:nth-child(even) { background-color: #f9f9f9; }
//               .footer { border-top: 1px solid #006600; padding-top: 20px; text-align: center; }
//               .footer p:last-child { font-size: 12px; }
//             </style>
//           </head>
//           <body>
//             ${printContent.innerHTML}
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
//       printWindow.focus();

//       // Let browser render the content before printing
//       setTimeout(() => {
//         printWindow.print();
//         // Don't close the window automatically to allow user to complete print dialog
//       }, 250);

//       setPrintDialogOpen(false);
//       toast.success("Invoice prepared for printing");
//     }
//   };

//   // Function to download as PDF using a safer approach
//   const handleDownloadInvoice = () => {
//     const printContent = printFrameRef.current;
//     if (printContent) {
//       const printWindow = window.open('', '_blank');

//       if (!printWindow) {
//         toast.error("Please allow pop-ups to download invoices");
//         return;
//       }

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>ThekkdySpices - Invoice</title>
//             <style>
//               body { font-family: Arial, sans-serif; margin: 20px; }
//               .invoice-header { text-align: center; margin-bottom: 20px; }
//               .invoice-header h1 { color: #006600; margin: 0 0 5px 0; }
//               .invoice-divider { border: 1px solid #006600; margin: 10px 0; }
//               .flex-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
//               .section-box { border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
//               .section-half { width: 48%; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th { background-color: #006600; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
//               td { padding: 10px; text-align: left; border: 1px solid #ddd; }
//               tfoot td { padding: 10px; text-align: right; border: 1px solid #ddd; }
//               tr:nth-child(even) { background-color: #f9f9f9; }
//               .footer { border-top: 1px solid #006600; padding-top: 20px; text-align: center; }
//               .footer p:last-child { font-size: 12px; }
//               @media print {
//                 body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//               }
//             </style>
//           </head>
//           <body>
//             ${printContent.innerHTML}
//             <script>
//               window.onload = function() {
//                 setTimeout(function() {
//                   window.print();
//                   // Keep window open so user can use browser's "Save as PDF" option
//                 }, 500);
//               };
//             </script>
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
//       printWindow.focus();

//       setPrintDialogOpen(false);
//       toast.success("Invoice prepared for download");
//     }
//   };
//   console.log("page",  pagination.currentPage , pageSize, pagination.totalCount);
// console.log("page",  Math.min(pagination.currentPage * pageSize, pagination.totalCount));

//   return (
//     <Stack justifyContent={'center'} alignItems={'center'}>
//       <Stack mt={15} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>
//         {orders.length ? (
//           <>
//             {/* Pagination Controls at Top */}
//             <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} sx={{ width: '100%' }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Typography variant="body2">
//                   Showing {((pagination.currentPage - 1) * pageSize) + 1} to {Math.min(pagination.currentPage * pageSize, pagination.totalCount)} of {pagination.totalCount} orders
//                 </Typography>
//                 <FormControl size="small" sx={{ minWidth: 120 }}>
//                   <InputLabel>Rows per page</InputLabel>
//                   <Select
//                     value={pageSize}
//                     label="Rows per page"
//                     onChange={(e) => handlePageSizeChange(e.target.value)}
//                   >
//                     <MenuItem value={5}>5</MenuItem>
//                     <MenuItem value={10}>10</MenuItem>
//                     <MenuItem value={25}>25</MenuItem>
//                     <MenuItem value={50}>50</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Stack>

//               <Stack direction="row" spacing={1}>
//                 <IconButton onClick={handleRefresh} title="Refresh orders">
//                   <RefreshIcon />
//                 </IconButton>
//               </Stack>
//             </Stack>

//             <TableContainer sx={{ width: is1620 ? "95vw" : "auto", overflowX: 'auto' }} component={Paper} elevation={2}>
//               <Table aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Customer Details</TableCell>
//                     <TableCell align="left">Item</TableCell>
//                     <TableCell align="left">Total Amount</TableCell>
//                     <TableCell align="left">Shipping Address</TableCell>
//                     <TableCell align="left">Payment Method</TableCell>
//                     <TableCell align="left">Order Date</TableCell>
//                     <TableCell align="left">Status</TableCell>
//                     <TableCell align="left">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {orders.length && orders.map((order, index) => (
//                     <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell align="left">
//                         <Stack>
//                           <Typography><b>Name: </b>{order.user?.name}</Typography>
//                           <Typography><b>Email: </b>{order.user?.email}</Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell align="left">
//                         {order.item.map((product) => (
//                           <Stack key={product.product?._id} mt={2} flexDirection={'row'} alignItems={'center'} columnGap={1}>
//                             <Avatar src={product.product?.thumbnail}></Avatar>
//                             <Typography>{product.product?.title}</Typography>
//                           </Stack>
//                         ))}
//                       </TableCell>
//                       <TableCell align="left">{order.total}</TableCell>
//                       <TableCell align="left">
//                         <Stack>
//                           <Typography>{order.address[0]?.street}</Typography>
//                           <Typography>{order.address[0]?.city}</Typography>
//                           <Typography>{order.address[0].state}</Typography>
//                           <Typography>{order.address[0]?.postalCode}</Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell align="left">{order?.paymentMode}</TableCell>
//                       <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>

//                       {/* order status */}
//                       <TableCell align="left">
//                         {editIndex === index ? (
//                           <FormControl fullWidth>
//                             <InputLabel id="demo-simple-select-label">Update status</InputLabel>
//                             <Select
//                               defaultValue={order.status}
//                               labelId="demo-simple-select-label"
//                               id="demo-simple-select"
//                               label="Update status"
//                               {...register('status', { required: 'Status is required' })}
//                             >
//                               {editOptions.map((option) => (
//                                 <MenuItem key={option} value={option}>{option}</MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         ) : <Chip label={order.status} sx={getStatusColor(order.status)} />}
//                       </TableCell>

//                       {/* actions */}
//                       <TableCell align="left">
//                         <Stack direction="row" spacing={1}>
//                           {editIndex === index ? (
//                             <Button>
//                               <IconButton type='submit'><CheckCircleOutlinedIcon /></IconButton>
//                             </Button>
//                           ) : (
//                             <IconButton onClick={() => setEditIndex(index)}><EditOutlinedIcon /></IconButton>
//                           )}
//                           <IconButton onClick={() => handleViewOrder(order)}><VisibilityOutlinedIcon /></IconButton>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Pagination Controls at Bottom */}
//             <Stack direction="row" justifyContent="center" alignItems="center" mt={3} spacing={2}>
//               <Pagination
//                 count={pagination.totalPages}
//                 page={pagination.currentPage}
//                 onChange={(event, page) => handlePageChange(page)}
//                 color="primary"
//                 size={is480 ? "small" : "medium"}
//                 showFirstButton
//                 showLastButton
//               />
//             </Stack>

//             {/* Optional: Detailed pagination info */}
//             <Typography variant="caption" color="text.secondary" mt={1}>
//               Page {pagination.currentPage} of {pagination.totalPages}
//             </Typography>
//           </>
//         ) : (
//           <Stack width={is480 ? "auto" : '30rem'} justifyContent={'center'}>
//             <Stack rowGap={'1rem'}>
//               <Lottie animationData={noOrdersAnimation} />
//               <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>
//                 There are no orders currently
//               </Typography>
//             </Stack>
//           </Stack>
//         )}
//       </Stack>

//       {/* Order Details Modal */}
//       <Dialog
//         open={viewModalOpen}
//         onClose={handleCloseViewModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           Order Details
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseViewModal}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Customer Information</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Name:</b> {selectedOrder.user.name}</Typography>
//                   <Typography><b>Email:</b> {selectedOrder.user.email}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Order Summary</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Order ID:</b> {selectedOrder._id}</Typography>
//                   <Typography><b>Order Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
//                   <Typography><b>Payment Method:</b> {selectedOrder.paymentMode}</Typography>
//                   <Typography><b>Shipping Charges:</b> Rs.{(selectedOrder.shipping).toFixed(2)}</Typography>
//                   <Typography><b>Total Amount:</b> Rs.{(selectedOrder.total).toFixed(2)}</Typography>
//                   <Typography><b>Status:</b> <Chip label={selectedOrder.status} size="small" sx={getStatusColor(selectedOrder.status)} /></Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Shipping Address</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   <Typography><b>Address:</b>{selectedOrder.address[0].street}</Typography>
//                   <Typography><b>City:</b>{selectedOrder.address[0].city}</Typography>
//                   <Typography>  <b>State:</b> {selectedOrder.address[0].state} </Typography>
//                   <Typography><b>Postal Code:</b> {selectedOrder.address[0].postalCode}</Typography>
//                   <Typography><b>Phone Number:</b>{selectedOrder.address[0].phoneNumber}</Typography>
//                   <Typography><b>Country:</b>{selectedOrder.address[0].country}</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Products</Typography>
//                 <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//                   {selectedOrder.item.map((item, index) => (
//                     <React.Fragment key={index}>
//                       <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={2} sm={1}>
//                           <Avatar src={item.product.thumbnail} sx={{ width: 50, height: 50 }}></Avatar>
//                         </Grid>
//                         <Grid item xs={10} sm={11}>
//                           <Grid container spacing={1}>
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="subtitle1">{item.product.title}</Typography>
//                               <Typography variant="body2" color="text.secondary">Brand: {item.product.brand.name}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Price:</b> Rs.
//                                 {item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 'N/A'}
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Quantity:</b> {item.quantity}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Weight:</b> {item.weight}</Typography>
//                             </Grid>
//                             <Grid item xs={4} sm={2}>
//                               <Typography variant="body2"><b>Total:</b> Rs.
//                                 {((item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0) * item?.quantity).toFixed(2)}
//                               </Typography>
//                             </Grid>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       {index < selectedOrder.item.length - 1 && <Divider sx={{ my: 2 }} />}
//                     </React.Fragment>
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           {selectedOrder && (
//             <Button
//               startIcon={<DownloadIcon />}
//               variant="contained"
//               color="primary"
//               onClick={() => handlePrintInvoice(selectedOrder)}
//             >
//               Download Invoice
//             </Button>
//           )}
//           <Button onClick={handleCloseViewModal}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Print/Download Invoice Dialog */}
//       <Dialog
//         open={printDialogOpen}
//         onClose={handleClosePrintDialog}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           style: {
//             height: '90vh'
//           }
//         }}
//       >
//         <DialogTitle>
//           Invoice Preview
//           <IconButton
//             aria-label="close"
//             onClick={handleClosePrintDialog}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <div ref={printFrameRef} style={{ padding: '20px' }}>
//               <div className="invoice-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <img src={logo} width={"150px"} height={"110px"} />
//                 <h1 style={{ color: '#006600', margin: '0 0 5px 0' }}>Thekkady Spices</h1>
//                 <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>GSTIN: 33AFRPR5719M1ZP</p>
//                 <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Contact Number: +91 9080 53 5414</p>
//                 <h2 style={{ margin: '10px 0' }}>Tax Invoice</h2>
//                 <div style={{ border: '1px solid #006600', margin: '10px 0' }}></div>
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <div>
//                   <p><strong>Order ID:</strong> {selectedOrder._id}</p>
//                   <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
//                   <p><strong>Status:</strong> {selectedOrder.status}</p>
//                 </div>
//                 <div>
//                   <p style={{ textAlign: 'right' }}><strong>Payment Method:</strong> {selectedOrder.paymentMode}</p>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <div style={{ width: '48%' }}>
//                   <h3>Customer Details</h3>
//                   <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '5px' }}>
//                     <p><strong>Name:</strong> {selectedOrder.user.name}</p>
//                     <p><strong>Email:</strong> {selectedOrder.user.email}</p>
//                   </div>
//                 </div>
//                 <div style={{ width: '48%' }}>
//                   <h3>Shipping Address</h3>
//                   <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '5px' }}>
//                     <p>{selectedOrder.address[0].street}</p>
//                     <p>{selectedOrder.address[0].city}, {selectedOrder.address[0].state}</p>
//                     <p>{selectedOrder.address[0].postalCode}, {selectedOrder.address[0].country}</p>
//                     <p><strong>Phone:</strong> {selectedOrder.address[0].phoneNumber}</p>
//                   </div>
//                 </div>
//               </div>

//               <h3>Order Items</h3>
//               <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                 <thead>
//                   <tr style={{ backgroundColor: '#006600', color: 'white' }}>
//                     <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Item</th>
//                     <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Brand</th>
//                     <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Weight</th>
//                     <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Price</th>
//                     <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Qty</th>
//                     <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedOrder.item.map((item, index) => {
//                     const price = item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0;
//                     const itemTotal = (price * item.quantity).toFixed(2);

//                     return (
//                       <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
//                         <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item.product.title}</td>
//                         <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item.product.brand.name}</td>
//                         <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item.weight}</td>
//                         <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{price}</td>
//                         <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{item.quantity}</td>
//                         <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{itemTotal}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4" style={{ border: '1px solid #ddd' }}></td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>Shipping:</td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{selectedOrder.shipping.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="4" style={{ border: '1px solid #ddd' }}></td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>Total:</td>
//                     <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>₹{selectedOrder.total.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>

//               <div className="footer" style={{ borderTop: '1px solid #006600', paddingTop: '20px', textAlign: 'center' }}>
//                 <p>Thank you for shopping with Thekkady Spices!</p>
//                 <p style={{ fontSize: '12px' }}>For any queries, please contact us at thekkadyspices01@gmail.com</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button startIcon={<PrintIcon />} variant="outlined" onClick={handlePrint}>
//             Print
//           </Button>
//           <Button startIcon={<DownloadIcon />} variant="contained" color="primary" onClick={handleDownloadInvoice}>
//             Download as PDF
//           </Button>
//           <Button onClick={handleClosePrintDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Stack>
//   )
// }
// m-23 with loader
export const AdminOrders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const pagination = useSelector(selectPagination)
  const orderFetchStatus = useSelector(selectOrderFetchStatus) // Add this selector
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const orderUpdateStatus = useSelector(selectOrderUpdateStatus)
  const theme = useTheme()
  const is1620 = useMediaQuery(theme.breakpoints.down(1620))
  const is1200 = useMediaQuery(theme.breakpoints.down(1200))
  const is820 = useMediaQuery(theme.breakpoints.down(820))
  const is480 = useMediaQuery(theme.breakpoints.down(480))
  const printFrameRef = useRef(null)

  // State for view modal
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [printDialogOpen, setPrintDialogOpen] = useState(false)

  const [pageSize, setPageSize] = useState(5)
  const [isPageChanging, setIsPageChanging] = useState(false) // Add loading state for page changes
  const { register, handleSubmit, formState: { errors } } = useForm()

  // Load orders with pagination
  useEffect(() => {
    dispatch(getAllOrdersAsync({
      page: pagination.currentPage,
      limit: pageSize
    }))
  }, [dispatch, pagination.currentPage, pageSize])

  useEffect(() => {
    if (orderUpdateStatus === 'fulfilled') {
      toast.success("Status updated")
      toast.success("Invoice Sent")
      dispatch(getAllOrdersAsync({
        page: pagination.currentPage,
        limit: pageSize
      }))
    }
    else if (orderUpdateStatus === 'rejected') {
      toast.error("Error updating order status")
    }
  }, [orderUpdateStatus, dispatch, pagination.currentPage, pageSize])

  // Handle page change with loading state
  const handlePageChange = (newPage) => {
    setIsPageChanging(true)
    dispatch(setPage(newPage))

    // Reset loading state when data is fetched
    setTimeout(() => {
      setIsPageChanging(false)
    }, 500) // Adjust timeout as needed
  }

  // Handle page size change with loading state
  const handlePageSizeChange = (newSize) => {
    setIsPageChanging(true)
    setPageSize(newSize)
    dispatch(setLimit(newSize))
    dispatch(setPage(1)) // Reset to first page when changing page size

    // Reset loading state when data is fetched
    setTimeout(() => {
      setIsPageChanging(false)
    }, 500)
  }

  // Handle refresh
  const handleRefresh = () => {
    dispatch(getAllOrdersAsync({
      page: pagination.currentPage,
      limit: pageSize
    }))
  }

  useEffect(() => {
    return () => {
      dispatch(resetOrderUpdateStatus())
    }
  }, [])

  const handleUpdateOrder = (data) => {
    const update = { ...data, _id: orders[editIndex]._id }
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

  const editOptions = ['Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled']
  const isLoading = orderFetchStatus === 'pending'
  const isUpdating = orderUpdateStatus === 'pending'
  const showLoading = isLoading || isRefreshing
  const getStatusColor = (status) => {
    if (status === 'Pending') {
      return { bgcolor: '#dfc9f7', color: '#7c59a4' }
    }
    else if (status === 'Dispatched') {
      return { bgcolor: '#feed80', color: '#927b1e' }
    }
    else if (status === 'Out for delivery') {
      return { bgcolor: '#AACCFF', color: '#4793AA' }
    }
    else if (status === 'Delivered') {
      return { bgcolor: "#b3f5ca", color: "#548c6a" }
    }
    else if (status === 'Cancelled') {
      return { bgcolor: "#fac0c0", color: '#cc6d72' }
    }
  }

  // Function to handle print dialog
  const handlePrintInvoice = (order) => {
    setSelectedOrder(order)
    setPrintDialogOpen(true)
  }

  // Function to close print dialog
  const handleClosePrintDialog = () => {
    setPrintDialogOpen(false)
  }

  // Function to safely print the invoice without DOM manipulation errors
  const handlePrint = () => {
    const printContent = printFrameRef.current
    if (printContent) {
      const printWindow = window.open('', '_blank');

      if (!printWindow) {
        toast.error("Please allow pop-ups to print invoices");
        return;
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>ThekkdySpices - Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .invoice-header { text-align: center; margin-bottom: 20px; }
              .invoice-header h1 { color: #006600; margin: 0 0 5px 0; }
              .invoice-divider { border: 1px solid #006600; margin: 10px 0; }
              .flex-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .section-box { border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
              .section-half { width: 48%; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th { background-color: #006600; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
              td { padding: 10px; text-align: left; border: 1px solid #ddd; }
              tfoot td { padding: 10px; text-align: right; border: 1px solid #ddd; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .footer { border-top: 1px solid #006600; padding-top: 20px; text-align: center; }
              .footer p:last-child { font-size: 12px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      // Let browser render the content before printing
      setTimeout(() => {
        printWindow.print();
        // Don't close the window automatically to allow user to complete print dialog
      }, 250);

      setPrintDialogOpen(false);
      toast.success("Invoice prepared for printing");
    }
  };

  // Function to download as PDF using a safer approach
  const handleDownloadInvoice = () => {
    const printContent = printFrameRef.current;
    if (printContent) {
      const printWindow = window.open('', '_blank');

      if (!printWindow) {
        toast.error("Please allow pop-ups to download invoices");
        return;
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>ThekkdySpices - Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .invoice-header { text-align: center; margin-bottom: 20px; }
              .invoice-header h1 { color: #006600; margin: 0 0 5px 0; }
              .invoice-divider { border: 1px solid #006600; margin: 10px 0; }
              .flex-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .section-box { border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
              .section-half { width: 48%; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th { background-color: #006600; color: white; padding: 10px; text-align: left; border: 1px solid #ddd; }
              td { padding: 10px; text-align: left; border: 1px solid #ddd; }
              tfoot td { padding: 10px; text-align: right; border: 1px solid #ddd; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .footer { border-top: 1px solid #006600; padding-top: 20px; text-align: center; }
              .footer p:last-child { font-size: 12px; }
              @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                  // Keep window open so user can use browser's "Save as PDF" option
                }, 500);
              };
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setPrintDialogOpen(false);
      toast.success("Invoice prepared for download");
    }
  };

  console.log("page", pagination.currentPage, pageSize, pagination.totalCount);
  console.log("page", Math.min(pagination.currentPage * pageSize, pagination.totalCount));

  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Stack mt={15} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>
        {orders.length || orderFetchStatus === 'pending' ? (
          <>
            {/* Pagination Controls at Top */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2">
                  Showing {((pagination.currentPage - 1) * pageSize) + 1} to {Math.min(pagination.currentPage * pageSize, pagination.totalCount)} of {pagination.totalCount} orders
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Rows per page</InputLabel>
                  <Select
                    value={pageSize}
                    label="Rows per page"
                    onChange={(e) => handlePageSizeChange(e.target.value)}
                    disabled={isPageChanging || orderFetchStatus === 'pending'}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={1}>
                <IconButton
                  onClick={handleRefresh}
                  title="Refresh orders"
                  disabled={isPageChanging || orderFetchStatus === 'pending'}
                >
                  <RefreshIcon />
                </IconButton>
              </Stack>
            </Stack>

            {/* Loading overlay for table */}
            <Box sx={{ position: 'relative' }}>
              {(isPageChanging || orderFetchStatus === 'pending') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 1000,
                    borderRadius: 1
                  }}
                >
                  <Stack alignItems="center" spacing={2}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" color="text.secondary">
                      {isPageChanging ? 'Loading page...' : 'Loading orders...'}
                    </Typography>
                  </Stack>
                </Box>
              )}

              <TableContainer sx={{ width: is1620 ? "95vw" : "auto", overflowX: 'auto' }} component={Paper} elevation={2}>
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
                    {orders.length && orders.map((order, index) => (
                      <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="left">
                          <Stack>
                            <Typography><b>Name: </b>{order.user?.name}</Typography>
                            <Typography><b>Email: </b>{order.user?.email}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {order.item.map((product) => (
                            <Stack key={product.product?._id} mt={2} flexDirection={'row'} alignItems={'center'} columnGap={1}>
                              <Avatar src={product.product?.thumbnail}></Avatar>
                              <Typography>{product.product?.title}</Typography>
                            </Stack>
                          ))}
                        </TableCell>
                        <TableCell align="left">{order.total}</TableCell>
                        <TableCell align="left">
                          <Stack>
                            <Typography>{order.address[0]?.street}</Typography>
                            <Typography>{order.address[0]?.city}</Typography>
                            <Typography>{order.address[0].state}</Typography>
                            <Typography>{order.address[0]?.postalCode}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{order?.paymentMode}</TableCell>
                        <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>

                        {/* order status */}
                        <TableCell align="left">
                          {editIndex === index ? (
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Update status</InputLabel>
                              <Select
                                defaultValue={order.status}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Update status"
                                {...register('status', { required: 'Status is required' })}
                              >
                                {editOptions.map((option) => (
                                  <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : <Chip label={order.status} sx={getStatusColor(order.status)} />}
                        </TableCell>

                        {/* actions */}
                        <TableCell align="left">
                          <Stack direction="row" spacing={1}>
                            {editIndex === index ? (
                              <Button>
                                <IconButton type='submit'><CheckCircleOutlinedIcon /></IconButton>
                              </Button>
                            ) : (
                              <IconButton onClick={() => setEditIndex(index)}><EditOutlinedIcon /></IconButton>
                            )}
                            <IconButton onClick={() => handleViewOrder(order)}><VisibilityOutlinedIcon /></IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Pagination Controls at Bottom */}
            <Stack direction="row" justifyContent="center" alignItems="center" mt={3} spacing={2}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage}
                onChange={(event, page) => handlePageChange(page)}
                color="primary"
                size={is480 ? "small" : "medium"}
                showFirstButton
                showLastButton
                disabled={isPageChanging || orderFetchStatus === 'pending'}
              />
            </Stack>

            {/* Optional: Detailed pagination info */}
            <Typography variant="caption" color="text.secondary" mt={1}>
              Page {pagination.currentPage} of {pagination.totalPages}
            </Typography>
          </>
        ) : (
          <Stack width={is480 ? "auto" : '30rem'} justifyContent={'center'}>
            <Stack rowGap={'1rem'}>
              <Lottie animationData={noOrdersAnimation} />
              <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>
                There are no orders currently
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>

      {/* Rest of your modals remain the same... */}
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
                              <Typography variant="body2" color="text.secondary">Brand: {item?.product?.brand?.name}</Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Price:</b> Rs.
                                {item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Quantity:</b> {item?.quantity}</Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Weight:</b> {item.weight}</Typography>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <Typography variant="body2"><b>Total:</b> Rs.
                                {((item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0) * item?.quantity).toFixed(2)}
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
          {selectedOrder && (
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              color="primary"
              onClick={() => handlePrintInvoice(selectedOrder)}
            >
              Download Invoice
            </Button>
          )}
          <Button onClick={handleCloseViewModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Print/Download Invoice Dialog */}
      <Dialog
        open={printDialogOpen}
        onClose={handleClosePrintDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            height: '90vh'
          }
        }}
      >
           <DialogTitle>
          Invoice Preview
          <IconButton
            aria-label="close"
            onClick={handleClosePrintDialog}
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
            <div ref={printFrameRef} style={{ padding: '20px' }}>
              <div className="invoice-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={logo} width={"150px"} height={"110px"} />
                <h1 style={{ color: '#006600', margin: '0 0 5px 0' }}>Thekkady Spices</h1>
                <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>GSTIN: 33AFRPR5719M1ZP</p>
                <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Contact Number: +91 9080 53 5414</p>
                <h2 style={{ margin: '10px 0' }}>Tax Invoice</h2>
                <div style={{ border: '1px solid #006600', margin: '10px 0' }}></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                </div>
                <div>
                  <p style={{ textAlign: 'right' }}><strong>Payment Method:</strong> {selectedOrder.paymentMode}</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '48%' }}>
                  <h3>Customer Details</h3>
                  <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '5px' }}>
                    <p><strong>Name:</strong> {selectedOrder.user.name}</p>
                    <p><strong>Email:</strong> {selectedOrder.user.email}</p>
                  </div>
                </div>
                <div style={{ width: '48%' }}>
                  <h3>Shipping Address</h3>
                  <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '5px' }}>
                    <p>{selectedOrder.address[0].street}</p>
                    <p>{selectedOrder.address[0].city}, {selectedOrder.address[0].state}</p>
                    <p>{selectedOrder.address[0].postalCode}, {selectedOrder.address[0].country}</p>
                    <p><strong>Phone:</strong> {selectedOrder.address[0].phoneNumber}</p>
                  </div>
                </div>
              </div>

              <h3>Order Items</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#006600', color: 'white' }}>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Item</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Brand</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Weight</th>
                    <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Price</th>
                    <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Qty</th>
                    <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.item.map((item, index) => {
                    const price = item?.product?.quantity?.find(q => q?.weight == item?.weight)?.price ?? 0;
                    const itemTotal = (price * item.quantity).toFixed(2);

                    return (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                        <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item?.product?.title}</td>
                        <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item?.product?.brand?.name}</td>
                        <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{item?.weight}</td>
                        <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{price}</td>
                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{item?.quantity}</td>
                        <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{itemTotal}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" style={{ border: '1px solid #ddd' }}></td>
                    <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>Shipping:</td>
                    <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{selectedOrder.shipping.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{ border: '1px solid #ddd' }}></td>
                    <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>Total:</td>
                    <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', fontWeight: 'bold' }}>₹{selectedOrder.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="footer" style={{ borderTop: '1px solid #006600', paddingTop: '20px', textAlign: 'center' }}>
                <p>Thank you for shopping with Thekkady Spices!</p>
                <p style={{ fontSize: '12px' }}>For any queries, please contact us at thekkadyspices01@gmail.com</p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button startIcon={<PrintIcon />} variant="outlined" onClick={handlePrint}>
            Print
          </Button>
          <Button startIcon={<DownloadIcon />} variant="contained" color="primary" onClick={handleDownloadInvoice}>
            Download as PDF
          </Button>
          <Button onClick={handleClosePrintDialog}>Close</Button>
        </DialogActions>

      </Dialog>
    </Stack>
  )
}