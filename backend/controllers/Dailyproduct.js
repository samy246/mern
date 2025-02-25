const { Schema, default: mongoose } = require("mongoose")
const Dailyproduct=require("../models/Dailyproduct.js")

exports.create=async(req,res)=>{
    try {
        const created=new Dailyproduct(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
    try {


        const totalDocs=await Dailyproduct.find({})

       console.log("totalDocs",totalDocs);

        res.status(200).json(totalDocs)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching products, please try again later'})
    }
};

exports.getById=async(req,res)=>{
    console.log("getbyid");

    try {
        const {id}=req.params
        console.log("IDDD=====>",id);

        const result=await Dailyproduct.findById(id)
        // .populate("brand").populate("category")
        console.log("result",result);

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    console.log("update====>",req.body);

    try {
        const {id}=req.params
        // const updated=await Dailyproduct.findByIdAndUpdate(id,req.body,{new:true})
        const updated = await Dailyproduct.findByIdAndUpdate(
            id,
            { $set: req.body }, // Explicitly set the fields in req.body
            { new: true, runValidators: true } // Ensure updated document is returned and validations run
        );
        console.log("updated==>",updated);

        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating product, please try again later'})
    }
}

// exports.undeleteById=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const unDeleted=await Product.findByIdAndUpdate(id,{isDeleted:false},{new:true}).populate('brand')
//         res.status(200).json(unDeleted)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error restoring product, please try again later'})
//     }
// }

// exports.deleteById=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const deleted=await Product.findByIdAndUpdate(id,{isDeleted:true},{new:true}).populate("brand")
//         res.status(200).json(deleted)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error deleting product, please try again later'})
//     }
// }


