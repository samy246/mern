// import React,{useState,useEffect} from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { Link, useNavigate,useLocation } from 'react-router-dom';
// import { useMediaQuery, useTheme } from '@mui/material';
// import { AppBar, Toolbar, Typography, Stack, InputBase,Tooltip, IconButton, Avatar, Menu, MenuItem, Button, Badge, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
// import { Menu as MenuIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, FavoriteBorder as FavoriteBorderIcon, Tune as TuneIcon,SearchOutlined as SearchOutlinedIcon,Close as CloseIcon } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUserInfo } from '../../user/UserSlice';
// // import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import { selectCartItems } from '../../cart/CartSlice';
// import { logoutAsync, selectLoggedInUser } from '../../auth/AuthSlice';
// import { selectWishlistItems } from '../../wishlist/WishlistSlice';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import TuneIcon from '@mui/icons-material/Tune';
// import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';
// import logo from "../../../../src/assets/images/logo.png"
// import "./Nav.css"

// export const Navbar=({isProductList=false})=> {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const location = useLocation();
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const userInfo=useSelector(selectUserInfo)
//   const cartItems=useSelector(selectCartItems)
//   const loggedInUser=useSelector(selectLoggedInUser)
//   const navigate=useNavigate()
//   const dispatch=useDispatch()
//   const theme=useTheme()
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const is480=useMediaQuery(theme.breakpoints.down(480))
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const wishlistItems=useSelector(selectWishlistItems)
//   const isProductFilterOpen=useSelector(selectProductIsFilterOpen)
//   const isActive = (path) => {
//     if (path === '/' && location.pathname !== '/') return false;
//     return location.pathname.startsWith(path);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleToggleFilters=()=>{
//     dispatch(toggleFilters())
//   }
//   const toggleMobileMenu = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const handleLogout = () => {
//     console.log("logot");
//     // debugger;

//     // Clear cookies if needed
//     // document.cookie.split(";").forEach((cookie) => {
//     //   document.cookie = cookie
//     //     .split("=")[0]
//     //     .trim() + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
//     // });
//     // // debugger;
//     // // Clear localStorage/sessionStorage
//     // localStorage.removeItem("userInfo");
//     // sessionStorage.removeItem("userInfo");
// dispatch(logoutAsync())
//     // Redirect to login page
//     navigate("/");
//     window.location.reload()
//   };

//   const settings = [
//     {name:"HOME",to:"/"},
//     ...(loggedInUser ? [{ name: "PROFILE", to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile" }] : []),
//     ...(loggedInUser ? [{ name: loggedInUser?.isAdmin ? "Orders" : "My Orders", to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" }] : []),
//     ...(loggedInUser ? [{ name: "LOGOUT", to: "/logout", onClick: handleLogout }] : [{ name: "Login / Register", to: "/login" }]),
//     // {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
//     // ...(loggedInUser ? [{ name: loggedInUser?.isAdmin ? "Orders" : "My Orders", to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" }] : []),
//     // {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
//     // {name:'Logout',to:"/logout", onClick: handleLogout},
//   ];
// const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
//   return (
//     <AppBar position="absolute"  sx={{
//       backgroundColor: "transparent",
//       boxShadow: "none",
//       color: "text.primary"
//     }}>
//     <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between" }}>

//       {/* Logo */}
//       <Typography variant="div" noWrap component={Link} to="/" sx={{ display: { xs: 'none', md: 'flex' },alignItems:{xs: 'none', md: 'center'}, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
//       <img src={logo} width={'150px'}  height={'110px'}/>
//       {/*  width={'150px'}  height={'90px'} */}
//       {/* width={'100px'} height={'50px'} */}
//       {/* Thekkady Spices */}
//       </Typography>
// {loggedInUser?.isAdmin !=true &&
// <>

//       {/* Navigation Links */}
//       <Typography
//         variant="h6"
//         noWrap
//         component={Link}
//         to="/"
//         sx={{
//           display: { xs: 'none', md: 'flex' },
//           fontWeight: 500,
//           letterSpacing: '.0rem',
//           backgroundColor: isActive('/') ? '#0aad0a' :'inherit',
//           padding:"7px",
//           borderRadius:"10px",
//           color: isActive('/') ? '#ffffff' : 'inherit', // Using Material UI's green color
//           textDecoration: 'none',
//           position: 'relative',
//           '&:hover': {
//             color: '#000000'
//           },
//           '&::after': isActive('/') ? {
//             content: '""',
//             position: 'absolute',
//             bottom: -8,
//             left: 0,
//             width: '100%',
//             height: '3px',
//             backgroundColor: '#2e7d32',
//             borderRadius: '2px'
//           } : {}
//         }}
//             >
//     Home
//       </Typography>
//         <Typography variant="h6" noWrap component={Link} to="/products"    sx={{
//           display: { xs: 'none', md: 'flex' },
//           fontWeight: 500,
//           letterSpacing: '.0rem',
//           backgroundColor: isActive('/products') ? '#0aad0a' : 'inherit',
//           padding:"7px",
//           borderRadius:"10px",
//           color: isActive('/products') ? '#ffffff' : 'inherit', // Using Material UI's green color
//           textDecoration: 'none',
//           position: 'relative',
//           '&:hover': {
//             color: '#000000'
//           },
//           '&::after': isActive('/') ? {
//             content: '""',
//             position: 'absolute',
//             bottom: -8,
//             left: 0,
//             width: '100%',
//             height: '3px',
//             backgroundColor: '#2e7d32',
//             borderRadius: '2px'
//           } : {}
//         }}>
//       PRODUCTS
//       </Typography>
//       <Typography variant="h6" noWrap component={Link} to="/aboutus"   sx={{
//           display: { xs: 'none', md: 'flex' },
//           fontWeight: 500,
//           letterSpacing: '.0rem',
//           backgroundColor: isActive('/aboutus') ? '#0aad0a':'inherit',
//           padding:"7px",
//           borderRadius:"10px",
//           color: isActive('/aboutus') ? '#ffffff' : 'inherit', // Using Material UI's green color
//           textDecoration: 'none',
//           position: 'relative',
//           '&:hover': {
//             color: '#000000'
//           },
//           '&::after': isActive('/') ? {
//             content: '""',
//             position: 'absolute',
//             bottom: -8,
//             left: 0,
//             width: '100%',
//             height: '3px',
//             backgroundColor: '#2e7d32',
//             borderRadius: '2px'
//           } : {}
//         }}>
//       ABOUT US
//       </Typography>
//       <Typography variant="h6" noWrap component={Link} to="/contactus"   sx={{
//           display: { xs: 'none', md: 'flex' },
//           fontWeight: 500,
//           letterSpacing: '.0rem',
//           backgroundColor: isActive('/contact') ? '#0aad0a':'inherit',
//           padding:"7px",
//           borderRadius:"10px",
//           color: isActive('/contact') ? '#ffffff' : 'inherit', // Using Material UI's green color
//           textDecoration: 'none',
//           position: 'relative',
//           '&:hover': {
//             color: '#000000'
//           },
//           '&::after': isActive('/') ? {
//             content: '""',
//             position: 'absolute',
//             bottom: -8,
//             left: 0,
//             width: '100%',
//             height: '3px',
//             backgroundColor: '#2e7d32',
//             borderRadius: '2px'
//           } : {}
//         }}>
//       CONTACT
//       </Typography>
//       </>
//       }
//       {/* Mobile Menu Button */}
//       <div className="mobile-menu">
//         {/* sx={{ display: { xs: 'flex', md: 'none' },gap:"30px" }} */}
//       <IconButton  onClick={toggleMobileMenu}>
//         {/*onClick={toggleMobileMenu}  */}
//         <MenuIcon />

//         {/* <Typography variant="h6" noWrap component={Link} to="/" sx={{ display: 'flex' , fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}> */}

//       {/* Thekkady Spices */}
//       {/* </Typography> */}
//       </IconButton>
//       <Link to={'/'}>
//       <img src={logo} width={'150px'}  height={'110px'} />
//       </Link>

//       </div>

//       {/* Desktop Menu */}
//       <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2} sx={{ display: { xs: 'none', md: 'flex' } }}>




//         {/* User Greeting */}
//         <Typography variant='h6' fontWeight={300}>
//         {userInfo?.name ? (is480 ? `${userInfo.name.split(" ")[0]}` : `Hey👋, ${userInfo.name}`) : ""}

//           {/* {is480 ? `${userInfo?.name.split(" ")[0]}` : `Hey👋,  ${userInfo?.name}`} */}
//         </Typography>

//         {/* Admin Button */}
//         {loggedInUser?.isAdmin && <Button variant='contained'>Admin</Button>}

//         {/* Cart & Wishlist */}
//         <Stack flexDirection="row" columnGap="1rem" alignItems="center">
//          {/* Search Bar */}
//          {/* <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1, justifyContent: "center" }}>
//           {searchOpen ? (
//             <Stack direction="row" alignItems="center" sx={{ backgroundColor: "#fff", borderRadius: "4px", padding: "4px", width: isMobile ? "100%" : "300px" }}>
//               <InputBase
//                 autoFocus
//                 fullWidth
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{ ml: 1, flex: 1 }}
//               />
//               <IconButton onClick={() => setSearchOpen(false)}>
//                 <CloseIcon />
//               </IconButton>
//             </Stack>
//           ) : (
//             <IconButton onClick={() => setSearchOpen(true)}>
//               <SearchOutlinedIcon />
//             </IconButton>
//           )}
//         </Stack> */}
//        { !loggedInUser?.isAdmin && (
//           <>
//           {cartItems?.length > 0 && (
//             <Badge badgeContent={cartItems.length} color='error'>
//               <IconButton onClick={() => navigate("/cart")}>
//                 <ShoppingCartOutlinedIcon />
//               </IconButton>
//             </Badge>
//          )}
//          </>
//          )
//        }

//           {/* {!loggedInUser?.isAdmin && (
//             <Badge badgeContent={wishlistItems?.length} color='error'>
//               <IconButton component={Link} to="/wishlist">
//                 <FavoriteBorderIcon />
//               </IconButton>
//             </Badge>
//           )} */}

//           {isProductList && (
//             <IconButton onClick={handleToggleFilters}>
//               <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
//             </IconButton>
//           )}
//         </Stack>
//             {/* User Menu */}
//             <Tooltip title="Open settings">
//               {/* onClick={handleOpenUserMenu} */}
//           <IconButton  onClick={handleOpenUserMenu}   sx={{ p: 0 }}>
//             <Avatar alt={userInfo?.name} src="null" />
//           </IconButton>
//         </Tooltip>
//         <Menu sx={{ mt: '5px' }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} keepMounted>
//           {loggedInUser?.isAdmin && (
//             <MenuItem onClick={handleCloseUserMenu}>
//               <Typography component={Link} color={'text.primary'} sx={{ textDecoration: "none" }} to="/admin/add-product" textAlign="center">
//                 Add new Product
//               </Typography>
//             </MenuItem>
//           )}
//           {settings
//            .filter((setting) => !(isDesktop && setting.name === "Home"))
//           .map((setting) => (
//   <MenuItem
//     key={setting.name}
//     onClick={() => {
//       if (setting.onClick) {
//         setting.onClick(); // Call handleLogout if it exists
//       } else {
//         navigate(setting.to);
//       }
//       handleCloseUserMenu(); // Close the menu after clicking
//     }}
//   >
//     <Typography textAlign="center">{setting.name}</Typography>
//   </MenuItem>
// ))}
//           {/* {settings.map((setting) => (
//             <MenuItem key={setting}
//             // onClick={handleCloseUserMenu}
//              onClick={() => {
//               if (setting.name == "Logout") {
//                 console.log("304");

//                 handleLogout(); // Call the logout function
//               }
//               handleCloseUserMenu(); // Close the menu
//             }}>
//               <Typography component={setting.name === "Logout" ? Link : ""}  color={'text.primary'} sx={{ textDecoration: "none" }} to={setting.name !== "Logout" ? setting.to : undefined}  textAlign="center">
//                 {setting.name}
//               </Typography>
//             </MenuItem>
//           ))} */}
//         </Menu>
//       </Stack>
//     </Toolbar>

//     {/* Mobile Drawer */}
//     <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
//       <List sx={{ width: 250 }}>
//         <ListItem button component={Link} to="/" onClick={toggleMobileMenu}>
//           <ListItemText primary="Menu" />
//         </ListItem>
//         <Divider />
//         {settings?.map((setting) => (
//           <ListItem key={setting} button component={Link} to={setting.to} onClick={toggleMobileMenu}>
//             <ListItemText primary={setting.name} />
//           </ListItem>
//         ))}
//         {loggedInUser?.isAdmin && (
//           <ListItem button component={Link} to="/admin/add-product" onClick={toggleMobileMenu}>
//             <ListItemText primary="Add new Product" />
//           </ListItem>
//         )}
//         <Divider />
//         {
// !loggedInUser?.isAdmin && (
//   <>
//   {cartItems?.length >  0 &&  (
//     <ListItem button onClick={() => { navigate("/cart"); toggleMobileMenu(); }}>
//       <Badge badgeContent={cartItems.length} color='error'>
//         <ListItemText primary="Cart" />
//       </Badge>
//     </ListItem>
//   )}
//   </>
// )
//         }

//         {!loggedInUser?.isAdmin && (
//           <ListItem button component={Link} to="/wishlist" onClick={toggleMobileMenu}>
//             <Badge badgeContent={wishlistItems?.length} color='error'>
//               <ListItemText primary="Wishlist" />
//             </Badge>
//           </ListItem>
//         )}
//         {isProductList && (
//           <ListItem button onClick={() => { handleToggleFilters(); toggleMobileMenu(); }}>
//             <ListItemText primary="Filters" />
//           </ListItem>
//         )}
//       </List>
//     </Drawer>
//   </AppBar>

//   );
// }

// mar30
// import React, { useState } from 'react'; // Added useState import
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useMediaQuery, useTheme } from '@mui/material';
// import {
//   AppBar, Toolbar, Typography, Stack, InputBase, Tooltip,
//   IconButton, Avatar, Menu, MenuItem, Button, Badge,
//   Drawer, List, ListItem, ListItemText, Divider
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   ShoppingCartOutlined as ShoppingCartOutlinedIcon,
//   FavoriteBorder as FavoriteBorderIcon,
//   Tune as TuneIcon,
//   SearchOutlined as SearchOutlinedIcon,
//   Close as CloseIcon
// } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUserInfo } from '../../user/UserSlice';
// import { selectCartItems } from '../../cart/CartSlice';
// import { logoutAsync, selectLoggedInUser } from '../../auth/AuthSlice';
// import { selectWishlistItems } from '../../wishlist/WishlistSlice';
// import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';
// import logo from "../../../../src/assets/images/logo.png";
// import "./Nav.css";

// export const Navbar = ({ isProductList = false }) => {
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const location = useLocation();
//   const userInfo = useSelector(selectUserInfo);
//   const cartItems = useSelector(selectCartItems);
//   const loggedInUser = useSelector(selectLoggedInUser);
//   const wishlistItems = useSelector(selectWishlistItems);
//   const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const is480 = useMediaQuery(theme.breakpoints.down(480));
//   const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

//   // Check if current path is active
//   const isActive = (path) => {
//     if (path === '/' && location.pathname !== '/') return false;
//     return location.pathname.startsWith(path);
//   };

//   // User menu handlers
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   // Toggle product filters
//   const handleToggleFilters = () => {
//     dispatch(toggleFilters());
//   };

//   // Toggle mobile menu
//   const toggleMobileMenu = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logoutAsync());
//     navigate("/");
//     window.location.reload();
//   };

//   // Navigation links - same for desktop and mobile
//   const navLinks = loggedInUser?.isAdmin !== true ? [
//     { name: "HOME", to: "/" },
//     { name: "PRODUCTS", to: "/products" },
//     { name: "ABOUT US", to: "/aboutus" },
//     { name: "CONTACT", to: "/contactus" }
//   ] : [];

//   // User settings menu items
//   const settings = [
//     ...(!isDesktop ? [{ name: "HOME", to: "/" }] : []),
//     ...(loggedInUser ? [{ name: "PROFILE", to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile" }] : []),
//     ...(loggedInUser ? [{ name: loggedInUser?.isAdmin ? "Orders" : "My Orders", to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" }] : []),
//     ...(loggedInUser ? [{ name: "LOGOUT", to: "/logout", onClick: handleLogout }] : [{ name: "Login / Register", to: "/login" }]),
//   ];

//   // Admin-specific menu items
//   const adminItems = loggedInUser?.isAdmin ? [
//     { name: "Add new Product", to: "/admin/add-product" }
//   ] : [];

//   return (
//     <AppBar position="absolute" sx={{
//       backgroundColor: "transparent",
//       boxShadow: "none",
//       color: "text.primary"
//     }}>
//       <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between" }}>
//         {/* Desktop Logo */}
//         <Typography
//           variant="div"
//           noWrap
//           component={Link}
//           to="/"
//           sx={{
//             display: { xs: 'none', md: 'flex' },
//             alignItems: { xs: 'none', md: 'center' },
//             fontWeight: 700,
//             letterSpacing: '.3rem',
//             color: 'inherit',
//             textDecoration: 'none'
//           }}
//         >
//           <img src={logo} width={'150px'} height={'110px'} alt="Logo" />
//         </Typography>

//         {/* Desktop Navigation Links */}
//         {navLinks.map((link) => (
//           <Typography
//             key={link.name}
//             variant="h6"
//             noWrap
//             component={Link}
//             to={link.to}
//             sx={{
//               display: { xs: 'none', md: 'flex' },
//               fontWeight: 500,
//               letterSpacing: '.0rem',
//               backgroundColor: isActive(link.to) ? '#0aad0a' : 'inherit',
//               padding: "7px",
//               borderRadius: "10px",
//               color: isActive(link.to) ? '#ffffff' : 'inherit',
//               textDecoration: 'none',
//               position: 'relative',
//               '&:hover': {
//                 color: '#000000'
//               },
//               '&::after': isActive(link.to) ? {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: -8,
//                 left: 0,
//                 width: '100%',
//                 height: '3px',
//                 backgroundColor: '#2e7d32',
//                 borderRadius: '2px'
//               } : {}
//             }}
//           >
//             {link.name}
//           </Typography>
//         ))}

//         {/* Mobile Menu Button and Logo */}
//         <div className="mobile-menu">
//           <IconButton onClick={toggleMobileMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//           <Link to={'/'} style={{ display: { xs: 'flex', md: 'none' } }}>
//             <img src={logo} width={'150px'} height={'110px'} alt="Logo" />
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <Stack
//           flexDirection={'row'}
//           alignItems={'center'}
//           justifyContent={'center'}
//           columnGap={2}
//           sx={{ display: { xs: 'none', md: 'flex' } }}
//         >
//           {/* User Greeting */}
//           <Typography variant='h6' fontWeight={300}>
//             {userInfo?.name ? (is480 ? `${userInfo.name.split(" ")[0]}` : `Hey👋, ${userInfo.name}`) : ""}
//           </Typography>

//           {/* Admin Button */}
//           {loggedInUser?.isAdmin && <Button variant='contained'>Admin</Button>}

//           {/* Cart & Wishlist */}
//           <Stack flexDirection="row" columnGap="1rem" alignItems="center">
//             {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
//               <Badge badgeContent={cartItems.length} color='error'>
//                 <IconButton onClick={() => navigate("/cart")}>
//                   <ShoppingCartOutlinedIcon />
//                 </IconButton>
//               </Badge>
//             )}

//             {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
//               <Badge badgeContent={wishlistItems?.length} color='error'>
//                 <IconButton component={Link} to="/wishlist">
//                   <FavoriteBorderIcon />
//                 </IconButton>
//               </Badge>
//             )}

//             {isProductList && (
//               <IconButton onClick={handleToggleFilters}>
//                 <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
//               </IconButton>
//             )}
//           </Stack>

//           {/* User Menu */}
//           <Tooltip title="Open settings">
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Avatar alt={userInfo?.name} src="null" />
//             </IconButton>
//           </Tooltip>
//           <Menu
//             sx={{ mt: '5px' }}
//             anchorEl={anchorElUser}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//             keepMounted
//           >
//             {adminItems.map((item) => (
//               <MenuItem key={item.name} onClick={handleCloseUserMenu}>
//                 <Typography
//                   component={Link}
//                   color={'text.primary'}
//                   sx={{ textDecoration: "none" }}
//                   to={item.to}
//                   textAlign="center"
//                 >
//                   {item.name}
//                 </Typography>
//               </MenuItem>
//             ))}

//             {settings.map((setting) => (
//               <MenuItem
//                 key={setting.name}
//                 onClick={() => {
//                   if (setting.onClick) {
//                     setting.onClick();
//                   } else {
//                     navigate(setting.to);
//                   }
//                   handleCloseUserMenu();
//                 }}
//               >
//                 <Typography textAlign="center">{setting.name}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//         </Stack>
//       </Toolbar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={mobileOpen}
//         onClose={toggleMobileMenu}
//       >
//         <List sx={{ width: 250 }}>
//           <ListItem>
//             <ListItemText primary="Menu" />
//           </ListItem>
//           <Divider />

//           {/* Navigation Links */}
//           {navLinks.map((link) => (
//             <ListItem
//               key={link.name}
//               button
//               component={Link}
//               to={link.to}
//               onClick={toggleMobileMenu}
//               sx={{
//                 backgroundColor: isActive(link.to) ? '#f0f0f0' : 'inherit',
//               }}
//             >
//               <ListItemText primary={link.name} />
//             </ListItem>
//           ))}

//           {/* Admin Items */}
//           {adminItems.map((item) => (
//             <ListItem
//               key={item.name}
//               button
//               component={Link}
//               to={item.to}
//               onClick={toggleMobileMenu}
//             >
//               <ListItemText primary={item.name} />
//             </ListItem>
//           ))}

//           {/* User Settings */}
//           {settings
//             .filter(setting => setting.name !== "HOME")
//             .map((setting) => (
//               <ListItem
//                 key={setting.name}
//                 button
//                 onClick={() => {
//                   if (setting.onClick) {
//                     setting.onClick();
//                   } else {
//                     navigate(setting.to);
//                   }
//                   toggleMobileMenu();
//                 }}
//               >
//                 <ListItemText primary={setting.name} />
//               </ListItem>
//           ))}

//           <Divider />

//           {/* Cart */}
//           {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
//             <ListItem
//               button
//               onClick={() => {
//                 navigate("/cart");
//                 toggleMobileMenu();
//               }}
//             >
//               <Badge badgeContent={cartItems.length} color='error'>
//                 <ListItemText primary="Cart" />
//               </Badge>
//             </ListItem>
//           )}

//           {/* Wishlist */}
//           {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
//             <ListItem
//               button
//               component={Link}
//               to="/wishlist"
//               onClick={toggleMobileMenu}
//             >
//               <Badge badgeContent={wishlistItems?.length} color='error'>
//                 <ListItemText primary="Wishlist" />
//               </Badge>
//             </ListItem>
//           )}

//           {/* Filters */}
//           {isProductList && (
//             <ListItem
//               button
//               onClick={() => {
//                 handleToggleFilters();
//                 toggleMobileMenu();
//               }}
//             >
//               <ListItemText primary="Filters" />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>
//     </AppBar>
//   );
// };

// new
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  AppBar, Toolbar, Typography, Stack, InputBase, Tooltip,
  IconButton, Avatar, Menu, MenuItem, Button, Badge,
  Drawer, List, ListItem, ListItemText, Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Tune as TuneIcon,
  SearchOutlined as SearchOutlinedIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import { selectCartItems } from '../../cart/CartSlice';
import { logoutAsync, selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';
import logo from "../../../../src/assets/images/logo.png";
// png";
import "./Nav.css";

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  // Custom breakpoint to catch the 768-899px range
  const isMidBreakpoint = useMediaQuery('(min-width: 768px) and (max-width: 899px)');
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Check if current path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // User menu handlers
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Toggle product filters
  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate("/");
    window.location.reload();
  };

  // Navigation links - same for desktop and mobile
  const navLinks = loggedInUser?.isAdmin !== true ? [
    { name: "HOME", to: "/" },
    { name: "PRODUCTS", to: "/products" },
    { name: "ABOUT US", to: "/aboutus" },
    { name: "CONTACT", to: "/contactus" }
  ] : [];

  // User settings menu items
  const settings = [
    ...(!isDesktop ? [{ name: "HOME", to: "/" }] : []),
    ...(loggedInUser && !loggedInUser?.isAdmin ? [{ name: "PROFILE", to: "/profile" }] : []),
    ...(loggedInUser ? [{ name: loggedInUser?.isAdmin ? "Orders" : "My Orders", to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" }] : []),
    ...(loggedInUser ? [{ name: "LOGOUT", to: "/logout", onClick: handleLogout }] : [{ name: "Login / Register", to: "/login" }]),
  ];

  // Admin-specific menu items
  const adminItems = loggedInUser?.isAdmin ? [
    { name: "Add new Product", to: "/admin/add-product" }
  ] : [];

  // Helper function to determine mobile display
  const getMobileDisplay = () => {
    return isMidBreakpoint ? { display: 'flex' } : { display: { xs: 'flex', md: 'none' } };
  };

  // Helper function to determine desktop display
  const getDesktopDisplay = () => {
    return isMidBreakpoint ? { display: 'none' } : { display: { xs: 'none', md: 'flex' } };
  };

  return (
    <AppBar className='testnav' position="absolute" sx={{
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "text.primary"
    }}>
      <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between" }}>
        {/* Desktop Logo */}
        <Typography
          variant="div"
          noWrap
          component={Link}
          to="/"
          sx={getDesktopDisplay()}
        >
          <img src={logo} width={'150px'} height={'110px'} alt="Logo" />
        </Typography>

        {/* Desktop Navigation Links */}
        {navLinks.map((link) => (
          <Typography
            key={link.name}
            variant="h6"
            noWrap
            component={Link}
            to={link.to}
            sx={{
              ...getDesktopDisplay(),
              fontWeight: 500,
              letterSpacing: '.0rem',
              backgroundColor: isActive(link.to) ? '#0aad0a' : 'inherit',
              padding: "7px",
              borderRadius: "10px",
              color: isActive(link.to) ? '#ffffff' : 'inherit',
              textDecoration: 'none',
              position: 'relative',
              '&:hover': {
                color: '#000000'
              },
              '&::after': isActive(link.to) ? {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#2e7d32',
                borderRadius: '2px'
              } : {}
            }}
          >
            {link.name}
          </Typography>
        ))}

        {/* Mobile Menu Button and Logo */}
        <div className="mobile-menu" style={{
          ...(isMidBreakpoint || !isDesktop ? { display: 'flex' } : { display: 'none' }),
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center'
        }}>
          <IconButton
            onClick={toggleMobileMenu}
            sx={getMobileDisplay()}
          >
            <MenuIcon />
          </IconButton>

          <Link
            to={'/'}
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src={logo}
              width={'150px'}
              height={'110px'}
              alt="Logo"
              style={isMidBreakpoint || !isDesktop ? { display: 'block' } : { display: 'none' }}
            />
          </Link>

          {/* Mobile cart and wishlist icons */}
          <Stack
            direction="row"
            spacing={1}
            sx={getMobileDisplay()}
          >
            {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color='error'>
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
              <Badge badgeContent={wishlistItems?.length} color='error'>
                <IconButton component={Link} to="/wishlist">
                  <FavoriteBorderIcon />
                </IconButton>
              </Badge>
            )}
          </Stack>
        </div>

        {/* Desktop Menu */}
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          columnGap={2}
          sx={getDesktopDisplay()}
        >
          {/* User Greeting */}
          <Typography variant='h6' fontWeight={300}>
            {userInfo?.name ? (is480 ? `${userInfo.name.split(" ")[0]}` : `Welcome ${userInfo.name}`) : ""}
          </Typography>

          {/* Admin Button */}
          {loggedInUser?.isAdmin && <Button variant='contained'>Admin</Button>}

          {/* Cart & Wishlist */}
          <Stack flexDirection="row" columnGap="1rem" alignItems="center">
            {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color='error'>
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
              <Badge badgeContent={wishlistItems?.length} color='error'>
                <IconButton component={Link} to="/wishlist">
                  <FavoriteBorderIcon />
                </IconButton>
              </Badge>
            )}

            {isProductList && (
              <IconButton onClick={handleToggleFilters}>
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )}
          </Stack>

          {/* User Menu */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userInfo?.name} src="null" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '5px' }}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            keepMounted
          >
            {adminItems.map((item) => (
              <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={'text.primary'}
                  sx={{ textDecoration: "none" }}
                  to={item.to}
                  textAlign="center"
                >
                  {item.name}
                </Typography>
              </MenuItem>
            ))}

            {settings.map((setting) => (
              <MenuItem
                key={setting.name}
                onClick={() => {
                  if (setting.onClick) {
                    setting.onClick();
                  } else {
                    navigate(setting.to);
                  }
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileMenu}
      >
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemText primary="Menu" />
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          <Divider />
          {userInfo?.name && (
            <>
              <ListItem>
                <ListItemText
                  primary={`Welcome ${userInfo.name}`}
                  primaryTypographyProps={{
                    variant: 'h6',
                    fontWeight: 500,
                    color: 'primary.main'
                  }}
                />
              </ListItem>
              <Divider />
            </>
          )}
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <ListItem
              key={link.name}
              button
              component={Link}
              to={link.to}
              onClick={toggleMobileMenu}
              sx={{
                backgroundColor: isActive(link.to) ? '#f0f0f0' : 'inherit',
              }}
            >
              <ListItemText primary={link.name} />
            </ListItem>
          ))}

          {/* Admin Items */}
          {adminItems.map((item) => (
            <ListItem
              key={item.name}
              button
              component={Link}
              to={item.to}
              onClick={toggleMobileMenu}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}

          {/* User Settings */}
          {settings
            .filter(setting => setting.name !== "HOME")
            .map((setting) => (
              <ListItem
                key={setting.name}
                button
                onClick={() => {
                  if (setting.onClick) {
                    setting.onClick();
                  } else {
                    navigate(setting.to);
                  }
                  toggleMobileMenu();
                }}
              >
                <ListItemText primary={setting.name} />
              </ListItem>
          ))}

          <Divider />

          {/* Cart */}
          {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
            <ListItem
              button
              onClick={() => {
                navigate("/cart");
                toggleMobileMenu();
              }}
            >
              <Badge badgeContent={cartItems.length} color='error'>
                <ListItemText primary="Cart" />
              </Badge>
            </ListItem>
          )}

          {/* Wishlist */}
          {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
            <ListItem
              button
              component={Link}
              to="/wishlist"
              onClick={toggleMobileMenu}
            >
              <Badge badgeContent={wishlistItems?.length} color='error'>
                <ListItemText primary="Wishlist" />
              </Badge>
            </ListItem>
          )}

          {/* Filters */}
          {isProductList && (
            <ListItem
              button
              onClick={() => {
                handleToggleFilters();
                toggleMobileMenu();
              }}
            >
              <ListItemText primary="Filters" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};