import React,{useState,useEffect} from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { AppBar, Toolbar, Typography, Stack, InputBase,Tooltip, IconButton, Avatar, Menu, MenuItem, Button, Badge, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, FavoriteBorder as FavoriteBorderIcon, Tune as TuneIcon,SearchOutlined as SearchOutlinedIcon,Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';
import logo from "../../../../src/assets/images/logo.webp"


export const Navbar=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const is480=useMediaQuery(theme.breakpoints.down(480))
  const [mobileOpen, setMobileOpen] = useState(false);
  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const settings = [
    {name:"Home",to:"/"},
    {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Logout',to:"/logout"},
  ];

  return (
    <AppBar position="absolute"  sx={{
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "text.primary"
    }}>
    <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between" }}>

      {/* Logo */}
      <Typography variant="h6" noWrap component={Link} to="/" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
      {/* <img src={logo}  width={'100px'} height={'50px'} /> */}
      Thekkady Spices
      </Typography>


      {/* Navigation Links */}
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/"
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 500,
          letterSpacing: '.0rem',
          backgroundColor: isActive('/') ? '#0aad0a' :'inherit',
          padding:"7px",
          borderRadius:"10px",
          color: isActive('/') ? '#ffffff' : 'inherit', // Using Material UI's green color
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            color: '#000000'
          },
          '&::after': isActive('/') ? {
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
    Home
      </Typography>
        <Typography variant="h6" noWrap component={Link} to="/"    sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 500,
          letterSpacing: '.0rem',
          backgroundColor: isActive('/products') ? '#0aad0a' : 'inherit',
          padding:"7px",
          borderRadius:"10px",
          color: isActive('/products') ? '#ffffff' : 'inherit', // Using Material UI's green color
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            color: '#000000'
          },
          '&::after': isActive('/') ? {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '100%',
            height: '3px',
            backgroundColor: '#2e7d32',
            borderRadius: '2px'
          } : {}
        }}>
      Products
      </Typography>
      <Typography variant="h6" noWrap component={Link} to="/aboutus"   sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 500,
          letterSpacing: '.0rem',
          backgroundColor: isActive('/aboutus') ? '#0aad0a':'inherit',
          padding:"7px",
          borderRadius:"10px",
          color: isActive('/aboutus') ? '#ffffff' : 'inherit', // Using Material UI's green color
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            color: '#000000'
          },
          '&::after': isActive('/') ? {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '100%',
            height: '3px',
            backgroundColor: '#2e7d32',
            borderRadius: '2px'
          } : {}
        }}>
      About-Us
      </Typography>
      <Typography variant="h6" noWrap component={Link} to="/aboutus"   sx={{
          display: { xs: 'none', md: 'flex' },
          fontWeight: 500,
          letterSpacing: '.0rem',
          backgroundColor: isActive('/contact') ? '#0aad0a':'inherit',
          padding:"7px",
          borderRadius:"10px",
          color: isActive('/contact') ? '#ffffff' : 'inherit', // Using Material UI's green color
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            color: '#000000'
          },
          '&::after': isActive('/') ? {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '100%',
            height: '3px',
            backgroundColor: '#2e7d32',
            borderRadius: '2px'
          } : {}
        }}>
      Contact
      </Typography>
      {/* Mobile Menu Button */}
      <IconButton sx={{ display: { xs: 'block', md: 'none' } }} onClick={toggleMobileMenu}>
        <MenuIcon />
      </IconButton>

      {/* Desktop Menu */}
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2} sx={{ display: { xs: 'none', md: 'flex' } }}>




        {/* User Greeting */}
        <Typography variant='h6' fontWeight={300}>
        {userInfo?.name ? (is480 ? `${userInfo.name.split(" ")[0]}` : `Hey👋, ${userInfo.name}`) : ""}

          {/* {is480 ? `${userInfo?.name.split(" ")[0]}` : `Hey👋,  ${userInfo?.name}`} */}
        </Typography>

        {/* Admin Button */}
        {loggedInUser?.isAdmin && <Button variant='contained'>Admin</Button>}

        {/* Cart & Wishlist */}
        <Stack flexDirection="row" columnGap="1rem" alignItems="center">
         {/* Search Bar */}
         <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1, justifyContent: "center" }}>
          {searchOpen ? (
            <Stack direction="row" alignItems="center" sx={{ backgroundColor: "#fff", borderRadius: "4px", padding: "4px", width: isMobile ? "100%" : "300px" }}>
              <InputBase
                autoFocus
                fullWidth
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
              />
              <IconButton onClick={() => setSearchOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          ) : (
            <IconButton onClick={() => setSearchOpen(true)}>
              <SearchOutlinedIcon />
            </IconButton>
          )}
        </Stack>
          {/* {cartItems?.length > 0 && ( */}
            <Badge badgeContent={cartItems.length} color='error'>
              <IconButton onClick={() => navigate("/cart")}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
          {/* // )} */}

          {!loggedInUser?.isAdmin && (
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
        <Menu sx={{ mt: '5px' }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} keepMounted>
          {loggedInUser?.isAdmin && (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography component={Link} color={'text.primary'} sx={{ textDecoration: "none" }} to="/admin/add-product" textAlign="center">
                Add new Product
              </Typography>
            </MenuItem>
          )}
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography component={Link} color={'text.primary'} sx={{ textDecoration: "none" }} to={setting.to} textAlign="center">
                {setting.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Toolbar>

    {/* Mobile Drawer */}
    <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
      <List sx={{ width: 250 }}>
        <ListItem button component={Link} to="/" onClick={toggleMobileMenu}>
          <ListItemText primary="Menu" />
        </ListItem>
        <Divider />
        {settings?.map((setting) => (
          <ListItem key={setting} button component={Link} to={setting.to} onClick={toggleMobileMenu}>
            <ListItemText primary={setting.name} />
          </ListItem>
        ))}
        {loggedInUser?.isAdmin && (
          <ListItem button component={Link} to="/admin/add-product" onClick={toggleMobileMenu}>
            <ListItemText primary="Add new Product" />
          </ListItem>
        )}
        <Divider />
        {
!loggedInUser?.isAdmin && (
  <>
  {cartItems?.length >  0 &&  (
    <ListItem button onClick={() => { navigate("/cart"); toggleMobileMenu(); }}>
      <Badge badgeContent={cartItems.length} color='error'>
        <ListItemText primary="Cart" />
      </Badge>
    </ListItem>
  )}
  </>
)
        }

        {!loggedInUser?.isAdmin && (
          <ListItem button component={Link} to="/wishlist" onClick={toggleMobileMenu}>
            <Badge badgeContent={wishlistItems?.length} color='error'>
              <ListItemText primary="Wishlist" />
            </Badge>
          </ListItem>
        )}
        {isProductList && (
          <ListItem button onClick={() => { handleToggleFilters(); toggleMobileMenu(); }}>
            <ListItemText primary="Filters" />
          </ListItem>
        )}
      </List>
    </Drawer>
  </AppBar>
    // <AppBar position="sticky" sx={{backgroundColor:"white",boxShadow:"none",color:"text.primary"}}>
    //     <Toolbar sx={{p:1,height:"4rem",display:"flex",justifyContent:"space-around"}}>

    //       <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' },fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
    //         MERN SHOP
    //       </Typography>



    //       <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2}>
    //         <Tooltip title="Open settings">
    //           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //             <Avatar alt={userInfo?.name} src="null" />
    //           </IconButton>
    //         </Tooltip>
    //         <Menu
    //           sx={{ mt: '45px' }}
    //           id="menu-appbar"
    //           anchorEl={anchorElUser}
    //           anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //           }}
    //           open={Boolean(anchorElUser)}
    //           onClose={handleCloseUserMenu}
    //         >

    //           {
    //             loggedInUser?.isAdmin &&

    //             <MenuItem  onClick={handleCloseUserMenu}>
    //               <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to="/admin/add-product" textAlign="center">Add new Product</Typography>
    //             </MenuItem>

    //           }
    //           {settings.map((setting) => (
    //             <MenuItem key={setting} onClick={handleCloseUserMenu}>
    //               <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to={setting.to} textAlign="center">{setting.name}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //         <Typography variant='h6' fontWeight={300}>{is480?`${userInfo?.name.toString().split(" ")[0]}`:`Hey👋, ${userInfo?.name}`}</Typography>
    //         {loggedInUser.isAdmin && <Button variant='contained'>Admin</Button>}
    //         <Stack sx={{flexDirection:"row",columnGap:"1rem",alignItems:"center",justifyContent:"center"}}>


    //         {
    //         cartItems?.length>0 &&
    //         <Badge  badgeContent={cartItems.length} color='error'>
    //           <IconButton onClick={()=>navigate("/cart")}>
    //             <ShoppingCartOutlinedIcon />
    //             </IconButton>
    //         </Badge>
    //         }

    //         {
    //           !loggedInUser?.isAdmin &&
    //               <Stack>
    //                   <Badge badgeContent={wishlistItems?.length} color='error'>
    //                       <IconButton component={Link} to={"/wishlist"}><FavoriteBorderIcon /></IconButton>
    //                   </Badge>
    //               </Stack>
    //         }
    //         {
    //           isProductList && <IconButton onClick={handleToggleFilters}><TuneIcon sx={{color:isProductFilterOpen?"black":""}}/></IconButton>
    //         }

    //         </Stack>
    //       </Stack>
    //     </Toolbar>
    // </AppBar>
  );
}