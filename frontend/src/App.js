// import { useSelector } from 'react-redux';
// import {
//   Navigate,
//   Route, RouterProvider, createBrowserRouter, createRoutesFromElements
// } from "react-router-dom";
// import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
// import { Logout } from './features/auth/components/Logout';
// import { Protected } from './features/auth/components/Protected';
// import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
// import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
// import { AddProductPage, AdminOrdersPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage } from './pages';
// import { AdminDashboardPage } from './pages/AdminDashboardPage';
// import { NotFoundPage } from './pages/NotFoundPage';
// import { AddCategoryPage } from './pages/AddCategoryPage';
// import { DailyProductUpdate } from './features/admin/DailyProductUpdate';
// import Aboutus from './pages/Aboutus';
// import ScrollToTop from './pages/ScrollToTop';
// import WhatsAppChat from './pages/WhatsAppChat';
// import Products from './pages/Products';
// import Contactus from './pages/Contactus';
// import { useEffect } from 'react';


// function App() {

//   const isAuthChecked=useSelector(selectIsAuthChecked)
//   const loggedInUser=useSelector(selectLoggedInUser)
//   useEffect(() => {
//     const observerErr = (e) => {
//       if (e.message.includes("ResizeObserver")) {
//         e.stopImmediatePropagation();
//       }
//     };
//     window.addEventListener("error", observerErr);
//     return () => window.removeEventListener("error", observerErr);
//   }, []);

//   useAuthCheck();
//   useFetchLoggedInUserDetails(loggedInUser);
// console.log("loggedInUser",loggedInUser);


//   const routes = createBrowserRouter(
//     createRoutesFromElements(
//       <>


//         {
//           loggedInUser?.isAdmin==true?(
//             // admin routes
//             <>
//               <Route path='/admin/dashboard' element={<><ScrollToTop/><AdminDashboardPage/></>}/>
//             <Route path='/admin/product-update/:id' element={<><ScrollToTop/><ProductUpdatePage/></>}/>
//             <Route path='/admin/dailyproduct-update/:id' element={<><ScrollToTop/><DailyProductUpdate/></>}/>
//             <Route path='/admin/add-product' element={<><AddProductPage/></>}/>
//             <Route path='/admin/add-category' element={<><AddCategoryPage/></>}/>
//             <Route path='/admin/orders'  element={<><ScrollToTop/><AdminOrdersPage/></>}/>
//             <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
//             <Route exact path='/product-details/:id' element={<ProductDetailsPage/>}/>

//             </>
//           ):(
//             // user routes
//             <>
//                 <Route path='*' element={<NotFoundPage/>} />
//         <Route path="/" element={<><HomePage /><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/> </>} />
//         <Route path="/products" element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><Products/></>} />

//         <Route path='/signup' element={<SignupPage/>}/>
//         <Route path='/login' element={<LoginPage/>}/>
//         <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
//         <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
//         <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
//         <Route path="/cart" element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><CartPage /></>} />
//         <Route path="/aboutus" element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><Aboutus /></>} />
//         <Route path="/contactus" element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><Contactus /></>} />
//         <Route path="/profile" element={<UserProfilePage />} />
//         <Route path="/checkout" element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><CheckoutPage /></>} />
//         <Route path="/order-success/:id" element={<OrderSuccessPage />} />
//         <Route path="/orders" element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><UserOrdersPage /></>} />
//         <Route path="/wishlist" element={<WishlistPage />} />
//         <Route  path='/logout' element={<Logout/>}/>
//         <Route exact path='/product-details/:id' element={<><ScrollToTop/> <WhatsAppChat phoneNumber="8248222532" message="Hello! I need some help."/><ProductDetailsPage/></>}/>

//             </>
//           )
//         }

//       </>
//     )
//   )


//   return isAuthChecked ? <RouterProvider router={routes}/> : "";
// }

// export default App;
// Main App Component
import React from "react";
import StylesComponent from "./styles/StylesComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Chef from "./components/Chef";
import Services from "./components/Services";
// import Contact from "./components/Contact";
import  Contactt  from "./components/Contactt";
import ScrollToTop from "./components/ScrollToTop";
import ScriptsLoader from "./ScriptsLoader";
import Whatsapp from "./components/Whatsapp";

const App = () => {
  return (
    <>
    <ScriptsLoader/>
      <StylesComponent />
      <Header />
      <main>
        <Home />
         <Chef />
        <About />
        <Menu />

        <Services />
        {/* <Conta */}
        <Contactt />
      </main>
      <Footer />
            <Whatsapp />
      <ScrollToTop />

    </>
  );
};

export default App;