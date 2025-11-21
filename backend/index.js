require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
// const authRoutes=require("./routes/Auth")
// const productRoutes=require("./routes/Product")
// const dailyproductRoutes=require("./routes/Dailyproduct")
// const orderRoutes=require("./routes/Order")
// const cartRoutes=require("./routes/Cart")
// const brandRoutes=require("./routes/Brand")
// const categoryRoutes=require("./routes/Category")
// const userRoutes=require("./routes/User")
// const addressRoutes=require('./routes/Address')
// const reviewRoutes=require("./routes/Review")
// const wishlistRoutes=require("./routes/Wishlist")
const { connectToDB } = require("./database/db")
const Contact =require("./models/Contact")
const { sendMail } = require("./utils/Emails")

// server init
const server=express()

// database connection
connectToDB()


// middlewares
server.use(cors({origin:process.env.ORIGIN,credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))
server.use(express.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan("tiny"))
server.use(express.urlencoded({ limit: '50mb', extended: true }));
// routeMiddleware
// server.use("/auth",authRoutes)
// server.use("/users",userRoutes)
// server.use("/products",productRoutes)
// server.use("/dailyproducts",dailyproductRoutes)
// server.use("/orders",orderRoutes)
// server.use("/cart",cartRoutes)
// server.use("/brands",brandRoutes)
// server.use("/categories",categoryRoutes)
// server.use("/address",addressRoutes)
// server.use("/reviews",reviewRoutes)
// server.use("/wishlist",wishlistRoutes)
server.post("/contact", async (req, res) => {
    console.log("req.body contat",req.body);

    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        res.status(201).json({ message: "Message sent successfully", data: newContact });
        // tharnish1998@gmail.com,
        // thekkadyspices1@gmail.com
        await sendMail("thekkadyspices1@gmail.com",'Customer Contact-Us',`<p>Dear Thekkady Spices Team,

            <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Message:</strong> ${message}</li>
    </ul>

    <p>Please review and respond as necessary.</p>

    <p>Thank you,<br>Thekkady Spices Team</p>`)
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});


server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})
console.log(require('crypto').randomBytes(64).toString('hex'));

server.listen(8000,()=>{
    console.log('server [STARTED] ~ http://localhost:8000');
})