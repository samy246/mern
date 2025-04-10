const { Schema, default: mongoose } = require("mongoose")
const Product=require("../models/Product")

exports.create=async(req,res)=>{
    try {
        const created=new Product(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product, please trying again later'})
    }
}
// new
// exports.getAll = async (req, res) => {
//     console.log("productsgetlll");

//     try {
//         const filter = {}
//         // const sort = {}
//         let skip = 0
//         let limit = 0

//         // Search functionality
//         if (req.query.search) {
//             filter.$or = [
//                 { name: { $regex: req.query.search, $options: 'i' } },
//                 { description: { $regex: req.query.search, $options: 'i' } },
//                 { 'brand.name': { $regex: req.query.search, $options: 'i' } },
//                 { 'category.name': { $regex: req.query.search, $options: 'i' } }
//             ]
//         }

//         // Brand filter
//         if (req.query.brand) {
//             filter.brand = { $in: req.query.brand }
//         }

//         // Category filter
//         if (req.query.category) {
//             filter.category = { $in: req.query.category }
//         }

//         // User-specific filter
//         if (req.query.user) {
//             filter['isDeleted'] = false
//         }

//         // Sorting
//            // Sorting - Fixed for price sorting
//            if (req.query.sort === 'price') {
//             const direction = req.query.order === 'asc' ? 1 : -1;

//             // Use aggregation for proper sorting by nested price
//             const pipeline = [
//                 { $match: filter },
//                 // Unwind the quantity array to work with individual elements
//                 { $addFields: {
//                     // Add a field with the minimum price value in the quantity array
//                     minPrice: {
//                         $min: {
//                             $map: {
//                                 input: "$quantity",
//                                 as: "q",
//                                 in: { $toDouble: "$$q.price" }
//                             }
//                         }
//                     }
//                 }},
//                 // Sort by the minimum price
//                 { $sort: { minPrice: direction } },
//                 // Bring in the related collections
//                 {
//                     $lookup: {
//                         from: "brands",
//                         localField: "brand",
//                         foreignField: "_id",
//                         as: "brand"
//                     }
//                 },
//                 { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
//                 {
//                     $lookup: {
//                         from: "categories",
//                         localField: "category",
//                         foreignField: "_id",
//                         as: "category"
//                     }
//                 },
//                 { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
//                 // Apply pagination
//                 { $skip: skip },
//                 { $limit: limit }
//             ];

//             const results = await Product.aggregate(pipeline);
//             return res.status(200).json(results);
//         } else if (req.query.sort === 'weight') {
//             // Similar approach for weight sorting
//             const direction = req.query.order === 'asc' ? 1 : -1;

//             const pipeline = [
//                 { $match: filter },
//                 { $addFields: {
//                     // Add a field with the minimum weight value in the quantity array
//                     // Note: This will sort alphabetically unless weights are standardized
//                     minWeight: {
//                         $min: "$quantity.weight"
//                     }
//                 }},
//                 { $sort: { minWeight: direction } },
//                 {
//                     $lookup: {
//                         from: "brands",
//                         localField: "brand",
//                         foreignField: "_id",
//                         as: "brand"
//                     }
//                 },
//                 { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
//                 {
//                     $lookup: {
//                         from: "categories",
//                         localField: "category",
//                         foreignField: "_id",
//                         as: "category"
//                     }
//                 },
//                 { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
//                 { $skip: skip },
//                 { $limit: limit }
//             ];

//             const results = await Product.aggregate(pipeline);
//             return res.status(200).json(results);
//         } else {
//             // Standard sorting for other fields
//             const sort = {};
//             if (req.query.sort) {
//                 sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
//             }

//         }
//         // if (req.query.sort) {
//         //     sort[req.query.sort] = req.query.order
//         //         ? (req.query.order === 'asc' ? 1 : -1)
//         //         : 1
//         // }

//         // Pagination
//         if (req.query.page && req.query.limit) {
//             const pageSize = parseInt(req.query.limit)
//             const page = parseInt(req.query.page)

//             skip = pageSize * (page - 1)
//             limit = pageSize
//         }

//         // Count total documents matching the filter
//         const totalDocs = await Product.find(filter)
//             .populate("brand")
//             .populate("category")
//             .countDocuments()
//             .exec()

//         // Fetch results with pagination and population
//         const results = await Product.find(filter)
//             .populate("brand")
//             .populate("category")
//             .sort(sort)
//             .skip(skip)
//             .limit(limit)
//             .exec()

//         // Set total count header
//         res.set("X-Total-Count", totalDocs)

//         res.status(200).json(results)

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message:'Error fetching products, please try again later'})
//     }
// };
exports.getAll = async (req, res) => {
    console.log("productsgetlll");

    try {
        const filter = {}
        let skip = 0
        let limit = 0

        // Search functionality
        if (req.query.search) {
            filter.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { 'brand.name': { $regex: req.query.search, $options: 'i' } },
                { 'category.name': { $regex: req.query.search, $options: 'i' } }
            ]
        }

        // Brand filter
        if (req.query.brand) {
            filter.brand = { $in: req.query.brand }
        }

        // Category filter
        if (req.query.category) {
            filter.category = { $in: req.query.category }
        }

        // User-specific filter
        if (req.query.user) {
            filter['isDeleted'] = false
        }

        // Pagination
        if (req.query.page && req.query.limit) {
            const pageSize = parseInt(req.query.limit)
            const page = parseInt(req.query.page)
            skip = pageSize * (page - 1)
            limit = pageSize
        }

        // Count total documents matching the filter
        const totalDocs = await Product.find(filter)
            .countDocuments()
            .exec()

        // Set total count header
        res.set("X-Total-Count", totalDocs)

        // Handle sorting based on nested quantity.price with priority
        if (req.query.sort === 'price') {
            const direction = req.query.order === 'asc' ? 1 : -1;

            // Use aggregation for proper sorting by nested price
            const pipeline = [
                { $match: filter },
                // Add fields for sorting priority
                { $addFields: {
                    // Check if quantity array exists and has elements
                    hasQuantity: {
                        $cond: [
                            { $and: [
                                { $isArray: "$quantity" },
                                { $gt: [{ $size: "$quantity" }, 0] }
                            ]},
                            1,  // Has quantity array
                            0   // No quantity array
                        ]
                    },
                    // Calculate min price if quantity exists, otherwise set to null
                    minPrice: {
                        $cond: [
                            { $and: [
                                { $isArray: "$quantity" },
                                { $gt: [{ $size: "$quantity" }, 0] }
                            ]},
                            {
                                $min: {
                                    $map: {
                                        input: "$quantity",
                                        as: "q",
                                        in: { $toDouble: { $ifNull: ["$$q.price", "999999"] } }
                                    }
                                }
                            },
                            999999  // High value for products without quantity
                        ]
                    }
                }},
                // First sort by hasQuantity (products with quantity first)
                // Then sort by minPrice within each group
                { $sort: {
                    hasQuantity: -1,  // Products with quantity first
                    minPrice: direction  // Then by price in requested direction
                }},
                // Bring in the related collections
                {
                    $lookup: {
                        from: "brands",
                        localField: "brand",
                        foreignField: "_id",
                        as: "brand"
                    }
                },
                { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
                // Apply pagination
                { $skip: skip },
                { $limit: limit }
            ];

            const results = await Product.aggregate(pipeline);
            return res.status(200).json(results);
        } else if (req.query.sort === 'weight') {
            // Similar approach for weight sorting
            const direction = req.query.order === 'asc' ? 1 : -1;

            const pipeline = [
                { $match: filter },
                // Add fields for sorting priority
                { $addFields: {
                    // Check if quantity array exists and has elements
                    hasQuantity: {
                        $cond: [
                            { $and: [
                                { $isArray: "$quantity" },
                                { $gt: [{ $size: "$quantity" }, 0] }
                            ]},
                            1,  // Has quantity array
                            0   // No quantity array
                        ]
                    },
                    // For weights like "100g", "1kg", we need to normalize them
                    // This is a simple approach - ideally you'd convert to a standard unit
                    minWeight: {
                        $cond: [
                            { $and: [
                                { $isArray: "$quantity" },
                                { $gt: [{ $size: "$quantity" }, 0] }
                            ]},
                            { $min: "$quantity.weight" },
                            "ZZZZ"  // High value to push to end for alphabetic sort
                        ]
                    }
                }},
                // Sort by hasQuantity first, then by weight
                { $sort: {
                    hasQuantity: -1,
                    minWeight: direction
                }},
                {
                    $lookup: {
                        from: "brands",
                        localField: "brand",
                        foreignField: "_id",
                        as: "brand"
                    }
                },
                { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
                { $skip: skip },
                { $limit: limit }
            ];

            const results = await Product.aggregate(pipeline);
            return res.status(200).json(results);
        } else {
            // Standard sorting for other fields
            const sort = {};
            if (req.query.sort) {
                sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
            }

            // Fetch results with pagination and population
            const results = await Product.find(filter)
                .populate("brand")
                .populate("category")
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec();

            return res.status(200).json(results);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error fetching products, please try again later'})
    }
};

// exports.getAll = async (req, res) => {
//     try {
//         const filter={}
//         const sort={}
//         let skip=0
//         let limit=0

//         if(req.query.brand){
//             filter.brand={$in:req.query.brand}
//         }

//         if(req.query.category){
//             filter.category={$in:req.query.category}
//         }

//         if(req.query.user){
//             filter['isDeleted']=false
//         }

//         if(req.query.sort){
//             sort[req.query.sort]=req.query.order?req.query.order==='asc'?1:-1:1
//         }

//         if(req.query.page && req.query.limit){

//             const pageSize=req.query.limit
//             const page=req.query.page

//             skip=pageSize*(page-1)
//             limit=pageSize
//         }

//         const totalDocs=await Product.find(filter).sort(sort).populate("brand").populate("category").countDocuments().exec()
//         const results=await Product.find(filter).sort(sort).populate("brand").populate("category").skip(skip).limit(limit).exec()

//         res.set("X-Total-Count",totalDocs)

//         res.status(200).json(results)

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error fetching products, please try again later'})
//     }
// };

exports.getById=async(req,res)=>{
    console.log("product");

    try {
        const {id}=req.params
        const result=await Product.findById(id).populate("brand").populate("category")
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating product, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Product.findByIdAndUpdate(id,{isDeleted:false},{new:true}).populate('brand')
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring product, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Product.findByIdAndUpdate(id,{isDeleted:true},{new:true}).populate("brand")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting product, please try again later'})
    }
}


