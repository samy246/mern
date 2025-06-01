// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import { createOrder, getAllOrders, getOrderByUserId, updateOrderById } from './OrderApi'


// const initialState={
//     status:"idle",
//     orderUpdateStatus:"idle",
//     orderFetchStatus:"idle",
//     orders:[],
//     currentOrder:null,
//     errors:null,
//     successMessage:null
// }

// export const createOrderAsync=createAsyncThunk("orders/createOrderAsync",async(order)=>{
//     const createdOrder=await createOrder(order)
//     return createdOrder
// })

// // export const getAllOrdersAsync=createAsyncThunk("orders/getAllOrdersAsync",async()=>{
// //     const orders=await getAllOrders()
// //     return orders
// // })
// // new
// export const getAllOrdersAsync = createAsyncThunk(
//     "orders/getAllOrdersAsync",
//     async ({ page = 1, limit = 10 } = {}) => {
//         const result = await getAllOrders(page, limit)
//         return result
//     }
// )

// export const getOrderByUserIdAsync=createAsyncThunk("orders/getOrderByUserIdAsync",async(id)=>{
//     const orders=await getOrderByUserId(id)
//     return orders
// })

// export const updateOrderByIdAsync=createAsyncThunk("orders/updateOrderByIdAsync",async(update)=>{
//     const updatedOrder=await updateOrderById(update)
//     return updatedOrder
// })

// const orderSlice=createSlice({
//     name:'orderSlice',
//     initialState:initialState,
//     reducers:{
//         resetCurrentOrder:(state)=>{
//             state.currentOrder=null
//         },
//         resetOrderUpdateStatus:(state)=>{
//             state.orderUpdateStatus='idle'
//         },
//         resetOrderFetchStatus:(state)=>{
//             state.orderFetchStatus='idle'
//         }
//     },
//     extraReducers:(builder)=>{
//         builder
//             .addCase(createOrderAsync.pending,(state)=>{
//                 state.status='pending'
//             })
//             .addCase(createOrderAsync.fulfilled,(state,action)=>{
//                 state.status='fulfilled'
//                 state.orders.push(action.payload)
//                 state.currentOrder=action.payload
//             })
//             .addCase(createOrderAsync.rejected,(state,action)=>{
//                 state.status='rejected'
//                 state.errors=action.error
//             })

//             .addCase(getAllOrdersAsync.pending,(state)=>{
//                 state.orderFetchStatus='pending'
//             })
//             // .addCase(getAllOrdersAsync.fulfilled,(state,action)=>{
//             //     state.orderFetchStatus='fulfilled'
//             //     state.orders=action.payload
//             // })
//               .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.orders = action.payload.orders
//                 state.pagination = {
//                     currentPage: action.payload.currentPage,
//                     limit: action.payload.limit,
//                     totalCount: action.payload.totalCount,
//                     totalPages: action.payload.totalPages,
//                     hasMore: action.payload.currentPage < action.payload.totalPages
//                 }
//             })
//             .addCase(getAllOrdersAsync.rejected,(state,action)=>{
//                 state.orderFetchStatus='rejected'
//                 state.errors=action.error
//             })

//             .addCase(getOrderByUserIdAsync.pending,(state)=>{
//                 state.orderFetchStatus='pending'
//             })
//             .addCase(getOrderByUserIdAsync.fulfilled,(state,action)=>{
//                 state.orderFetchStatus='fulfilled'
//                 state.orders=action.payload
//             })
//             .addCase(getOrderByUserIdAsync.rejected,(state,action)=>{
//                 state.orderFetchStatus='rejected'
//                 state.errors=action.error
//             })

//             .addCase(updateOrderByIdAsync.pending,(state)=>{
//                 state.orderUpdateStatus='pending'
//             })
//             .addCase(updateOrderByIdAsync.fulfilled,(state,action)=>{
//                 state.orderUpdateStatus='fulfilled'
//                 const index=state.orders.findIndex((order)=>order._id===action.payload._id)
//                 state.orders[index]=action.payload
//             })
//             .addCase(updateOrderByIdAsync.rejected,(state,action)=>{
//                 state.orderUpdateStatus='rejected'
//                 state.errors=action.error
//             })
//     }
// })

// // exporting reducers
// export const {resetCurrentOrder,resetOrderUpdateStatus,resetOrderFetchStatus}=orderSlice.actions

// // exporting selectors
// export const selectOrderStatus=(state)=>state.OrderSlice.status
// export const selectOrders=(state)=>state.OrderSlice.orders
// export const selectOrdersErrors=(state)=>state.OrderSlice.errors
// export const selectOrdersSuccessMessage=(state)=>state.OrderSlice.successMessage
// export const selectCurrentOrder=(state)=>state.OrderSlice.currentOrder
// export const selectOrderUpdateStatus=(state)=>state.OrderSlice.orderUpdateStatus
// export const selectOrderFetchStatus=(state)=>state.OrderSlice.orderFetchStatus

// export default orderSlice.reducer

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createOrder, getAllOrders, getOrderByUserId, updateOrderById } from './OrderApi'

const initialState = {
    status: "idle",
    orderUpdateStatus: "idle",
    orderFetchStatus: "idle",
    orders: [],
    currentOrder: null,
    errors: null,
    successMessage: null,
    // Added pagination state
    pagination: {
        currentPage: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0,
        hasMore: false
    }
}

export const createOrderAsync = createAsyncThunk("orders/createOrderAsync", async(order) => {
    const createdOrder = await createOrder(order)
    return createdOrder
})

export const getAllOrdersAsync = createAsyncThunk(
    "orders/getAllOrdersAsync",
    async ({ page = 1, limit = 10 } = {}) => {
        const result = await getAllOrders(page, limit)
        return result
    }
)

export const getOrderByUserIdAsync = createAsyncThunk("orders/getOrderByUserIdAsync", async(id) => {
    const orders = await getOrderByUserId(id)
    return orders
})

export const updateOrderByIdAsync = createAsyncThunk("orders/updateOrderByIdAsync", async(update) => {
    const updatedOrder = await updateOrderById(update)
    return updatedOrder
})

// Optional: Add thunk for loading more orders (infinite scroll)
export const loadMoreOrdersAsync = createAsyncThunk(
    "orders/loadMoreOrdersAsync",
    async ({ page, limit = 10 }, { getState }) => {
        const result = await getAllOrders(page, limit)
        return result
    }
)

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {
        resetCurrentOrder: (state) => {
            state.currentOrder = null
        },
        resetOrderUpdateStatus: (state) => {
            state.orderUpdateStatus = 'idle'
        },
        resetOrderFetchStatus: (state) => {
            state.orderFetchStatus = 'idle'
        },
        // Added pagination reducers
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload
        },
        setLimit: (state, action) => {
            state.pagination.limit = action.payload
        },
        clearOrders: (state) => {
            state.orders = []
            state.pagination.currentPage = 1
        },
        resetErrors: (state) => {
            state.errors = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'pending'
                state.errors = null
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.orders.push(action.payload)
                state.currentOrder = action.payload
                // Update total count when new order is created
                state.pagination.totalCount += 1
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.errors = action.error
            })

            .addCase(getAllOrdersAsync.pending, (state) => {
                state.orderFetchStatus = 'pending'
                state.errors = null
            })
            .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
                state.orderFetchStatus = 'fulfilled'
                state.orders = action.payload.orders
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    limit: action.payload.limit,
                    totalCount: action.payload.totalCount,
                    totalPages: action.payload.totalPages,
                    hasMore: action.payload.currentPage < action.payload.totalPages
                }
            })
            .addCase(getAllOrdersAsync.rejected, (state, action) => {
                state.orderFetchStatus = 'rejected'
                state.errors = action.error
            })

            // Handle loading more orders (for infinite scroll)
            .addCase(loadMoreOrdersAsync.pending, (state) => {
                // Don't change orderFetchStatus to show loading state differently
            })
            .addCase(loadMoreOrdersAsync.fulfilled, (state, action) => {
                // Append new orders to existing ones
                state.orders = [...state.orders, ...action.payload.orders]
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    limit: action.payload.limit,
                    totalCount: action.payload.totalCount,
                    totalPages: action.payload.totalPages,
                    hasMore: action.payload.currentPage < action.payload.totalPages
                }
            })
            .addCase(loadMoreOrdersAsync.rejected, (state, action) => {
                state.errors = action.error
            })

            .addCase(getOrderByUserIdAsync.pending, (state) => {
                state.orderFetchStatus = 'pending'
                state.errors = null
            })
            .addCase(getOrderByUserIdAsync.fulfilled, (state, action) => {
                state.orderFetchStatus = 'fulfilled'
                state.orders = action.payload
                // Reset pagination for user-specific orders
                state.pagination = {
                    currentPage: 1,
                    limit: 10,
                    totalCount: action.payload.length,
                    totalPages: 1,
                    hasMore: false
                }
            })
            .addCase(getOrderByUserIdAsync.rejected, (state, action) => {
                state.orderFetchStatus = 'rejected'
                state.errors = action.error
            })

            .addCase(updateOrderByIdAsync.pending, (state) => {
                state.orderUpdateStatus = 'pending'
                state.errors = null
            })
            .addCase(updateOrderByIdAsync.fulfilled, (state, action) => {
                state.orderUpdateStatus = 'fulfilled'
                const index = state.orders.findIndex((order) => order._id === action.payload._id)
                if (index !== -1) {
                    state.orders[index] = action.payload
                }
                // Update currentOrder if it's the same order
                if (state.currentOrder && state.currentOrder._id === action.payload._id) {
                    state.currentOrder = action.payload
                }
            })
            .addCase(updateOrderByIdAsync.rejected, (state, action) => {
                state.orderUpdateStatus = 'rejected'
                state.errors = action.error
            })
    }
})

// Exporting reducers
export const {
    resetCurrentOrder,
    resetOrderUpdateStatus,
    resetOrderFetchStatus,
    setPage,
    setLimit,
    clearOrders,
    resetErrors
} = orderSlice.actions

// Exporting selectors
export const selectOrderStatus = (state) => state.OrderSlice.status
export const selectOrders = (state) => state.OrderSlice.orders
export const selectOrdersErrors = (state) => state.OrderSlice.errors
export const selectOrdersSuccessMessage = (state) => state.OrderSlice.successMessage
export const selectCurrentOrder = (state) => state.OrderSlice.currentOrder
export const selectOrderUpdateStatus = (state) => state.OrderSlice.orderUpdateStatus
export const selectOrderFetchStatus = (state) => state.OrderSlice.orderFetchStatus

// Added pagination selectors
export const selectPagination = (state) => state.OrderSlice.pagination
// export const selectPagination = (state) => state.orders.pagination
export const selectCurrentPage = (state) => state.OrderSlice.pagination.currentPage
export const selectTotalCount = (state) => state.OrderSlice.pagination.totalCount
export const selectTotalPages = (state) => state.OrderSlice.pagination.totalPages
export const selectHasMore = (state) => state.OrderSlice.pagination.hasMore

export default orderSlice.reducer