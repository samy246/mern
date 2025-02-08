import React,{useState,useEffect} from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { AppBar, Toolbar, Typography, Stack, Tooltip, IconButton, Avatar, Menu, MenuItem, Button, Badge, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, FavoriteBorder as FavoriteBorderIcon, Tune as TuneIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';



export const Navbar=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const is480=useMediaQuery(theme.breakpoints.down(480))
  const [mobileOpen, setMobileOpen] = useState(false);
  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

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
    <AppBar position="sticky"  sx={{
      backgroundColor: "white",
      boxShadow: "1px 3px 4px 0 #adadad33",
      color: "text.primary"
    }}>
    <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between" }}>

      {/* Logo */}
      <Typography variant="h6" noWrap component={Link} to="/" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
      Thekkady Spices
      </Typography>

      {/* Mobile Menu Button */}
      <IconButton sx={{ display: { xs: 'block', md: 'none' } }} onClick={toggleMobileMenu}>
        <MenuIcon />
      </IconButton>

      {/* Desktop Menu */}
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2} sx={{ display: { xs: 'none', md: 'flex' } }}>

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

        {/* User Greeting */}
        <Typography variant='h6' fontWeight={300}>
          {is480 ? `${userInfo?.name.split(" ")[0]}` : `Hey👋, ${userInfo?.name}`}
        </Typography>

        {/* Admin Button */}
        {loggedInUser?.isAdmin && <Button variant='contained'>Admin</Button>}

        {/* Cart & Wishlist */}
        <Stack flexDirection="row" columnGap="1rem" alignItems="center">
          {cartItems?.length > 0 && (
            <Badge badgeContent={cartItems.length} color='error'>
              <IconButton onClick={() => navigate("/cart")}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
          )}

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
      </Stack>
    </Toolbar>

    {/* Mobile Drawer */}
    <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
      <List sx={{ width: 250 }}>
        <ListItem button component={Link} to="/" onClick={toggleMobileMenu}>
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        {settings.map((setting) => (
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