// import { useSelector } from "react-redux"
// import { selectLoggedInUser } from "../AuthSlice"
// import { Navigate,useLocation } from "react-router"


// export const Protected = ({children}) => {
//     console.log("children");

//     var loggedInUser=useSelector(selectLoggedInUser)
//     const location = useLocation();

//     console.log("loggedInUser?.isVerified", loggedInUser?.isVerified);

//     // Allow HomePage to be accessed by all users
//     // if (location.pathname === "/") {
//     //     return children;
//     // }

//     if (!loggedInUser?.isVerified) {
//         return <Navigate to="/" replace state={{ from: location }} />;
//     }

//     return children;

// }


// new
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate, useLocation } from "react-router";

export const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const location = useLocation();
console.log("loggedInUser36",loggedInUser);
    if (location.pathname === "/logout") {
      return children;
    }
  // Allow access to HomePage for all users
  if (location.pathname === "/") {
    return children;
  }
  if (loggedInUser?.isAdmin==true) {
    return <Navigate to="/admin/dashboard"  />;
  }
  // Redirect to HomePage if the user is not logged in or verified
  if (!loggedInUser || !loggedInUser.isVerified) {
    // Avoid redirect loop: don't navigate to `/` if already there
    if (location.pathname !== "/") {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  }

  return children; // Render the protected route for verified users
};
