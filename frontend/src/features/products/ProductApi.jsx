import { axiosi } from "../../config/axios";

export const addProduct=async(data)=>{
    try {
        const res=await axiosi.post('/products',data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
//new
export const fetchProducts = async (filters) => {
    console.log("filters", filters);

    let queryString = ''

    // Brand filter
    if (filters.brand) {
        filters.brand.map((brand) => {
            queryString += `brand=${brand}&`
        })
    }

    // Category filter
    if (filters.category) {
        filters.category.map((category) => {
            queryString += `category=${category}&`
        })
    }

    // Pagination
    if (filters.pagination) {
        queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`
    }

    // Sorting
    if (filters.sort) {
        queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`
    }

    // User filter
    if (filters.user) {
        queryString += `user=${filters.user}&`
    }

    // Search functionality
    if (filters.search) {
        queryString += `search=${encodeURIComponent(filters.search)}&`
    }

    try {
        const res = await axiosi.get(`/products?${queryString.slice(0, -1)}`)
        const totalResults = res.headers.get("X-Total-Count")
        return { data: res.data, totalResults: Number(totalResults) }
    } catch (error) {
        throw error.response?.data || error
    }
}
// new

// export const fetchProducts=async(filters)=>{
// console.log("filters",filters);

//     let queryString=''

//     if(filters.brand){
//         filters.brand.map((brand)=>{
//             queryString+=`brand=${brand}&`
//         })
//     }
//     if(filters.category){
//         filters.category.map((category)=>{
//             queryString+=`category=${category}&`
//         })
//     }

//     if(filters.pagination){
//         queryString+=`page=${filters.pagination.page}&limit=${filters.pagination.limit}&`
//     }

//     if(filters.sort){
//         queryString+=`sort=${filters.sort.sort}&order=${filters.sort.order}&`
//     }

//     if(filters.user){
//         queryString+=`user=${filters.user}&`
//     }

//     try {
//         const res=await axiosi.get(`/products?${queryString}`)
//         const totalResults=await res.headers.get("X-Total-Count")
//         return {data:res.data,totalResults:totalResults}
//     } catch (error) {
//         throw error.response.data
//     }
// }
// fetch daily product
export const fetchdailyProducts=async()=>{


    try {
        const res=await axiosi.get(`/dailyproducts`)
        const dailytotalResults=await res.headers.get("X-Total-Count")
        return {data:res.data,totaldailyResults:dailytotalResults}
    } catch (error) {
        throw error.response.data
    }
}
export const fetchProductById=async(id)=>{
    try {
        const res=await axiosi.get(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchdailyProductById=async(id)=>{
    try {
        const res=await axiosi.get(`/dailyproducts/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateProductById=async(update)=>{
    try {
        const res=await axiosi.patch(`/products/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updatedailyProductById=async(update)=>{
    try {
        const res=await axiosi.patch(`/dailyproducts/${update._id}`,update)
        return res.data
    } catch (error) {
        console.log("error.response.data",error.response.data);

        throw error.response.data
    }
}
export const undeleteProductById=async(id)=>{
    try {
        const res=await axiosi.patch(`/products/undelete/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteProductById=async(id)=>{
    try {
        const res=await axiosi.delete(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
