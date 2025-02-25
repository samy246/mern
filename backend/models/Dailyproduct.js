const mongoose=require("mongoose")
const {Schema}=mongoose

const dailyproductSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity: [
        {
            weight: { type: String, required: true },
            price: { type: String, required: true }
        }
    ],

    thumbnail:{
        type:String,
        required:true
    },


},{timestamps:true,versionKey:false})

module.exports=mongoose.model('dailyproduct',dailyproductSchema)