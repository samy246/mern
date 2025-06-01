import {axiosi} from '../../config/axios'


export const createOrder=async(order)=>{
    try {
        const res=await axiosi.post("/orders",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getOrderByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/orders/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

// export const getAllOrders=async()=>{
//     try {
//         const res=await axiosi.get(`/orders`)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }
// new
export const getAllOrders = async (page = 1, limit = 10) => {
    try {
        const res = await axiosi.get(`/orders?page=${page}&limit=${limit}`)
        //  const totalCount = parseInt(res.headers.get('X-Total-Count')) || 0
        // const currentPage = parseInt(res.headers.get('X-Page')) || 1
        // const pageLimit = parseInt(res.headers.get('X-Limit')) || 10
        // const totalPages = parseInt(res.headers.get('X-Total-Pages')) || 1
        return {
            orders: res.data,
            totalCount: parseInt(res.headers['x-total-count'] || '0'),
            currentPage: page,
            limit: limit,
            totalPages: Math.ceil(parseInt(res.headers['x-total-count'] || '0') / limit)
        }
    } catch (error) {
        throw error.response?.data || error.message
    }
}

export const updateOrderById=async(update)=>{
    try {
        const res=await axiosi.patch(`/orders/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}