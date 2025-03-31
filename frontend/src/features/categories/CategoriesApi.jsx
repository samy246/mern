import { axiosi } from "../../config/axios"

export const fetchAllCategories=async()=>{
    try {
        const res=await axiosi.get("/categories")
        console.log("categor",res);

        return res.data
    } catch (error) {
        throw error.response.data
    }
}