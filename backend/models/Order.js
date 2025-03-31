const mongoose=require("mongoose")
const {Schema}=mongoose

const orderSchema=new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },
    item:{
        type:[Schema.Types.Mixed],
        required:true
    },
    address:{
        type:[Schema.Types.Mixed],
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Dispatched','Out for delivery','Cancelled'],
        default:'Pending'
    },
    paymentMode:{
        type:String,
        enum:['QRCODE','GPAYANDPHONEPAY','BANKACCOUNT'],
        required:true
    },
    shipping:{
        type: Number,
        required: true,
        set: v => parseFloat(v).toFixed(2)
    },
    total: {
        type: Number,
        required: true,
        set: v => parseFloat(v).toFixed(2)
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{versionKey:false})

module.exports=mongoose.model("Order",orderSchema)