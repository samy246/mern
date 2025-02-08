require('dotenv').config()
const jwt=require('jsonwebtoken')
const { sanitizeUser } = require('../utils/SanitizeUser')
exports.verifyToken = async (req, res, next) => {
    try {
        console.log("Request Cookies:", req.cookies);

        // Extract admin and user tokens separately
        const adminToken = req.cookies.adminToken;
        const userToken = req.cookies.userToken;

        // If no token is found, return 401 Unauthorized
        if (!adminToken && !userToken) {
            return res.status(401).json({ message: "Token missing, please login again" });
        }

        let decodedInfo;

        // Try verifying adminToken first
        if (adminToken) {
            decodedInfo = jwt.verify(adminToken, process.env.SECRET_KEY);
            if (!decodedInfo.isAdmin) {
                return res.status(403).json({ message: "Access denied. Admins only." });
            }
        }
        // If no adminToken, try verifying userToken
        else if (userToken) {
            decodedInfo = jwt.verify(userToken, process.env.SECRET_KEY);
        }

        // If token is valid, attach user data to request and proceed
        if (decodedInfo && decodedInfo._id && decodedInfo.email) {
            req.user = decodedInfo;
            next();
        } else {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        }
    } catch (error) {
        console.log(error);

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

// exports.verifyToken=async(req,res,next)=>{
//     try {
//         console.log("req.cokkis",req.cookies);

//         // extract the token from request cookies
//         const {token}=req.cookies

//         // if token is not there, return 401 response
//         if(!token){
//             return res.status(401).json({message:"Token missing, please login again"})
//         }

//         // verifies the token
//         const decodedInfo=jwt.verify(token,process.env.SECRET_KEY)

//         // checks if decoded info contains legit details, then set that info in req.user and calls next
//         if(decodedInfo && decodedInfo._id && decodedInfo.email){
//             req.user=decodedInfo
//             next()
//         }

//         // if token is invalid then sends the response accordingly
//         else{
//             return res.status(401).json({message:"Invalid Token, please login again"})
//         }

//     } catch (error) {

//         console.log(error);

//         if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({ message: "Token expired, please login again" });
//         }
//         else if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(401).json({ message: "Invalid Token, please login again" });
//         }
//         else {
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// }