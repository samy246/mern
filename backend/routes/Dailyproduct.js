const express=require('express')
const dailyproductController=require("../controllers/Dailyproduct")
const router=express.Router()

router
    .post("/",dailyproductController.create)
    .get("/",dailyproductController.getAll)
    .get("/:id",dailyproductController.getById)
    .patch("/:id",dailyproductController.updateById)
    // .patch("/undelete/:id",productController.undeleteById)
    // .delete("/:id",productController.deleteById)

module.exports=router