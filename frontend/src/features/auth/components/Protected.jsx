import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate,useLocation } from "react-router"


export const Protected = ({children}) => {
    var loggedInUser=useSelector(selectLoggedInUser)
    const location = useLocation();

    console.log("loggedInUser?.isVerified", loggedInUser?.isVerified);

    // Allow HomePage to be accessed by all users
    // if (location.pathname === "/") {
    //     return children;
    // }

    if (!loggedInUser?.isVerified) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;

}
