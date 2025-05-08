const Order = require("../models/Order");
const { sendMail } = require("../utils/Emails");
const User=require("../models/User")
exports.create=async(req,res)=>{
    try {
        console.log("reqq.body",req.body);

        let orderData = req.body;
        if (orderData.total) {
            orderData.total = parseFloat(orderData.total).toFixed(2); // Ensure 162.00 format
        }
        if (orderData.shipping) {
            orderData.shipping = parseFloat(orderData.shipping).toFixed(2); // Ensure 162.00 format
        }
          const userDetails = await User.findById(req.body.user);
        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }
        const created=new Order(orderData)
        await created.save()
        res.status(201).json(created)
        const formattedOrder = {
            user: {
                id: userDetails?._id,
                name: userDetails?.name,
                email: userDetails?.email,

            },
            orderId: created?._id,
            address: req.body?.address,
            paymentMode: req.body?.paymentMode,
            shipping:req.body.shipping,
            total: Number(req.body?.total),  // Convert to number
            items: req.body?.item?.map(item => ({
                quantity: item?.quantity,
                weight: item?.weight,
                productTitle: item.product?.title || "Unknown Product"  // Extract product title
            }))
        };

      // Format order details for email
const orderDetails = formattedOrder.items.map(item => `
    <li>
        <strong>Product:</strong> ${item.productTitle}<br>
        <strong>Quantity:</strong> ${item.quantity}<br>
        <strong>Weight:</strong> ${item.weight}
    </li>
`).join("");

const emailContent = `
    <p>Dear ${formattedOrder?.user?.name}</p>

    <p>A new order has been placed. Below are the details:</p>

      <h3>User Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${formattedOrder?.user?.name}</li>
                <li><strong>Email:</strong> ${formattedOrder?.user?.email}</li>

            </ul>

            <h3>Payment & Order Details:</h3>
            <ul>
                <li><strong>User ID:</strong> ${formattedOrder?.user?.id}</li>
               <li><strong>Order ID:</strong> ${formattedOrder?.orderId}</li>
                <li><strong>Payment Mode:</strong> ${formattedOrder?.paymentMode}</li>
                        <li><strong>Shipping :</strong> ${formattedOrder?.shipping}</li>
                <li><strong>Total:</strong> ₹${formattedOrder?.total?.toFixed(2)}</li>
            </ul>

            <h3>Address Details:</h3>
            <ul>
                <li><strong>Street:</strong> ${formattedOrder.address?.street}</li>
                <li><strong>City:</strong> ${formattedOrder.address?.city}</li>
                <li><strong>State:</strong> ${formattedOrder.address?.state}</li>
                <li><strong>Phone:</strong> ${formattedOrder.address?.phoneNumber}</li>
                <li><strong>Postal Code:</strong> ${formattedOrder.address?.postalCode}</li>
                <li><strong>Country:</strong> ${formattedOrder.address?.country}</li>
            </ul>

            <h3>Order Items:</h3>
            <ul>
                ${orderDetails}
            </ul>

            <p>Please review and process the order accordingly.</p>
            <p>Kindly verify the order to call customer care number: +91-8248 22 2532</p>
            <p>Thank you,<br>Thekkady Spices Team</p>
        `;

// Send email
await sendMail(formattedOrder?.user?.email, "Order Details", emailContent);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error creating an order, please trying again later',error})
    }
}

exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const results=await Order.find({user:id})
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching orders, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
    try {
        let skip=0
        let limit=0

        if(req.query.page && req.query.limit){
            const pageSize=req.query.limit
            const page=req.query.page
            skip=pageSize*(page-1)
            limit=pageSize
        }

        const totalDocs=await Order.find({}).countDocuments().exec()
        const results=await Order.find({}).skip(skip).limit(limit)
    //     .populate("user")
    // .lean();
        .populate("user").exec()

        res.header("X-Total-Count",totalDocs)
        res.status(200).json(results)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching orders, please try again later'})
    }
};

// exports.updateById=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const updated=await Order.findByIdAndUpdate(id,req.body,{new:true})
//         console.log("order data updated",updated);
//         res.status(200).json(updated)
//         console.log("order data updated",updated);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error updating order, please try again later'})
//     }
// }
exports.updateById=async(req,res)=>{
    console.log("updated order");

    try {
        const {id}=req.params
        const updated=await Order.findByIdAndUpdate(id,req.body,{new:true})

        // Get the updated order with populated user data
        const populatedOrder = await Order.findById(id).populate("user").exec();

        if (!populatedOrder) {
            return res.status(404).json({ message: "Order not found after update" });
        }

        // Format the updated order data for email
        const formattedOrder = {
            user: {
                id: populatedOrder.user?._id,
                name: populatedOrder.user?.name,
                email: populatedOrder.user?.email,
            },
            orderId: populatedOrder._id,
            address: populatedOrder.address,
            paymentMode: populatedOrder.paymentMode,
            shipping: populatedOrder.shipping,
            total: Number(populatedOrder.total),
            status: populatedOrder.status || "Processing", // Include status in the email
            items: populatedOrder.item?.map(item => ({
                quantity: item?.quantity,
                weight: item?.weight,
                productTitle: item.product?.title || "Unknown Product"
            }))
        };

        // Format order details for email
        const orderDetails = formattedOrder.items.map(item => `
            <li>
                <strong>Product:</strong> ${item.productTitle}<br>
                <strong>Quantity:</strong> ${item.quantity}<br>
                <strong>Weight:</strong> ${item.weight}
            </li>
        `).join("");

        const emailContent = `
            <p>Dear ${formattedOrder?.user?.name}</p>

            <p>Your order has been updated. Below are the latest details:</p>

            <h3>User Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${formattedOrder?.user?.name}</li>
                <li><strong>Email:</strong> ${formattedOrder?.user?.email}</li>
            </ul>

            <h3>Payment & Order Details:</h3>
            <ul>
                <li><strong>User ID:</strong> ${formattedOrder?.user?.id}</li>
                <li><strong>Order ID:</strong> ${formattedOrder?.orderId}</li>
                <li><strong>Payment Mode:</strong> ${formattedOrder?.paymentMode}</li>
                <li><strong>Shipping:Rs:</strong> ${formattedOrder?.shipping}</li>
                <li><strong>Total:</strong> ₹${formattedOrder?.total?.toFixed(2)}</li>
                <li><strong>Order Status:</strong> ${formattedOrder?.status}</li>
            </ul>

            <h3>Address Details:</h3>
            <ul>
                <li><strong>Street:</strong> ${formattedOrder.address[0]?.street}</li>
                <li><strong>City:</strong> ${formattedOrder.address[0]?.city}</li>
                <li><strong>State:</strong> ${formattedOrder.address[0]?.state}</li>
                <li><strong>Phone:</strong> ${formattedOrder.address[0]?.phoneNumber}</li>
                <li><strong>Postal Code:</strong> ${formattedOrder.address[0]?.postalCode}</li>
                <li><strong>Country:</strong> ${formattedOrder.address[0]?.country}</li>
            </ul>

            <h3>Order Items:</h3>
            <ul>
                ${orderDetails}
            </ul>

            <p>If you have any questions about these updates, please contact us.</p>
            <p><b>For any inquiries, please call our customer care number: +91-8248 22 2532 Collect your Invoice Bill</b></p>
            <p>Thank you for choosing Thekkady Spices!</p>
            <p>Regards,<br>Thekkady Spices Team</p>
        `;

        // Send email with updated order details
        await sendMail(populatedOrder.user?.email, "Order Update Notification", emailContent);

        console.log("Order data updated and email sent", updated);
        res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating order, please try again later'})
    }
}