import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProductById, fetchdailyProductById, fetchdailyProducts, fetchProductById, fetchProducts, undeleteProductById, updatedailyProductById, updateProductById } from "./ProductApi";


const initialState={
    status:"idle",
    productUpdateStatus:'idle',
    productdailyUpdateStatus:'idle',
    productAddStatus:"idle",
    productFetchStatus:"idle",
    productdailyFetchStatus:"idle",
    products:[],
    dailyproducts:[],
    totalResults:0,
    totaldailyResults:0,
    isFilterOpen:false,
    selectedProduct:null,
    selecteddailyProduct:null,
    errors:null,
    successMessage:null
}

export const addProductAsync=createAsyncThunk("products/addProductAsync",async(data)=>{
    const addedProduct=await addProduct(data)
    return addedProduct
})
export const fetchProductsAsync=createAsyncThunk("products/fetchProductsAsync",async(filters)=>{
    const products=await fetchProducts(filters)
    return products
})
export const fetchdailyProductsAsync=createAsyncThunk("products/fetchdailyProductsAsync",async()=>{
    const dailyproducts=await fetchdailyProducts()
    return dailyproducts
})
export const fetchProductByIdAsync=createAsyncThunk("products/fetchProductByIdAsync",async(id)=>{
    const selectedProduct=await fetchProductById(id)
    return selectedProduct
})
export const fetchdailyProductByIdAsync=createAsyncThunk("products/fetchdailyProductByIdAsync",async(id)=>{
    const selecteddailyProduct=await fetchdailyProductById(id)
    return selecteddailyProduct
})
export const updateProductByIdAsync=createAsyncThunk("products/updateProductByIdAsync",async(update)=>{
    const updatedProduct=await updateProductById(update)
    return updatedProduct
})
export const updatedailyProductByIdAsync=createAsyncThunk("products/updatedailyProductByIdAsync",async(update)=>{
    const updateddailyProduct=await updatedailyProductById(update)
    return updateddailyProduct
})
// export const updatedailyProductByIdAsync = createAsyncThunk(
//     "products/updatedailyProductByIdAsync",
//     async (update, { rejectWithValue }) => {
//       try {
//         const updatedProduct = await updatedailyProductById(update);
//         return updatedProduct;
//       } catch (error) {
//         return rejectWithValue(error.message);
//       }
//     }
//   );

export const undeleteProductByIdAsync=createAsyncThunk("products/undeleteProductByIdAsync",async(id)=>{
    const unDeletedProduct=await undeleteProductById(id)
    return unDeletedProduct
})
export const deleteProductByIdAsync=createAsyncThunk("products/deleteProductByIdAsync",async(id)=>{
    const deletedProduct=await deleteProductById(id)
    return deletedProduct
})

const productSlice=createSlice({
    name:"productSlice",
    initialState:initialState,
    reducers:{
        clearProductErrors:(state)=>{
            state.errors=null
        },
        clearProductSuccessMessage:(state)=>{
            state.successMessage=null
        },
        resetProductStatus:(state)=>{
            state.status='idle'
        },
        clearSelectedProduct:(state)=>{
            state.selectedProduct=null
        },
        cleardailySelectedProduct:(state)=>{
            state.selecteddailyProduct=null
        },
        resetProductUpdateStatus:(state)=>{
            state.productUpdateStatus='idle'
        },
        resetdailyProductUpdateStatus:(state)=>{
            state.productdailyUpdateStatus='idle'
        },
        resetProductAddStatus:(state)=>{
            state.productAddStatus='idle'
        },
        toggleFilters:(state)=>{
            state.isFilterOpen=!state.isFilterOpen
        },
        resetProductFetchStatus:(state)=>{
            state.productFetchStatus='idle'
        },
        resetdailyProductFetchStatus:(state)=>{
            state.productdailyFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addProductAsync.pending,(state)=>{
                state.productAddStatus='pending'
            })
            .addCase(addProductAsync.fulfilled,(state,action)=>{
                state.productAddStatus='fullfilled'
                state.products.push(action.payload)
            })
            .addCase(addProductAsync.rejected,(state,action)=>{
                state.productAddStatus='rejected'
                state.errors=action.error
            })

            .addCase(fetchProductsAsync.pending,(state)=>{
                state.productFetchStatus='pending'
            })
            .addCase(fetchProductsAsync.fulfilled,(state,action)=>{
                state.productFetchStatus='fullfilled'
                state.products=action.payload.data
                state.totalResults=action.payload.totalResults
            })
            .addCase(fetchProductsAsync.rejected,(state,action)=>{
                state.productFetchStatus='rejected'
                state.errors=action.error
            })

            // daily
            .addCase(fetchdailyProductsAsync.pending,(state)=>{
                state.productdailyFetchStatus='pending'
            })
            .addCase(fetchdailyProductsAsync.fulfilled,(state,action)=>{
                state.productdailyFetchStatus='fullfilled'
                state.dailyproducts=action.payload.data
                state.totaldailyResults=action.payload.totaldailyResults
            })
            .addCase(fetchdailyProductsAsync.rejected,(state,action)=>{
                state.productdailyFetchStatus='rejected'
                state.errors=action.error
            })
            .addCase(fetchdailyProductByIdAsync.pending,(state)=>{
                state.productdailyFetchStatus='pending'
            })
            .addCase(fetchdailyProductByIdAsync.fulfilled,(state,action)=>{
                state.productdailyFetchStatus='fullfilled'
                state.selecteddailyProduct=action.payload
            })
            .addCase(fetchdailyProductByIdAsync.rejected,(state,action)=>{
                state.productdailyFetchStatus='rejected'
                state.errors=action.error
            })
            // daily

            .addCase(fetchProductByIdAsync.pending,(state)=>{
                state.productFetchStatus='pending'
            })
            .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
                state.productFetchStatus='fullfilled'
                state.selectedProduct=action.payload
            })
            .addCase(fetchProductByIdAsync.rejected,(state,action)=>{
                state.productFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateProductByIdAsync.pending,(state)=>{
                state.productUpdateStatus='pending'
            })
            .addCase(updateProductByIdAsync.fulfilled,(state,action)=>{
                state.productUpdateStatus='fullfilled'
                const index=state.products.findIndex((product)=>product._id===action.payload._id)
                state.products[index]=action.payload
            })
            .addCase(updateProductByIdAsync.rejected,(state,action)=>{
                state.productUpdateStatus='rejected'
                state.errors=action.error
            })

            .addCase(updatedailyProductByIdAsync.pending,(state)=>{
                state.productdailyUpdateStatus='pending'


            })
            .addCase(updatedailyProductByIdAsync.fulfilled,(state,action)=>{
                state.productdailyUpdateStatus='fullfilled'

                const index=state.dailyproducts?.findIndex((product)=>product._id==action.payload._id)
                state.dailyproducts[index]=action.payload
            })
            .addCase(updatedailyProductByIdAsync.rejected,(state,action)=>{
                state.productdailyUpdateStatus='rejected'
                state.errors=action.error
            })


            .addCase(undeleteProductByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(undeleteProductByIdAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                const index=state.products.findIndex((product)=>product._id===action.payload._id)
                state.products[index]=action.payload
            })
            .addCase(undeleteProductByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(deleteProductByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(deleteProductByIdAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                const index=state.products.findIndex((product)=>product._id===action.payload._id)
                state.products[index]=action.payload
            })
            .addCase(deleteProductByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectProductStatus=(state)=>state.ProductSlice.status


export const selectProducts=(state)=>state.ProductSlice.products
// console.log("state", selectProducts=(state)=>state);
export const selectProductTotalResults=(state)=>state.ProductSlice.totalResults
export const selectProductdailyTotalResults=(state)=>state.ProductSlice.dailyproducts
export const selectdailyProductdailyTotalResults=(state)=>state.ProductSlice.selecteddailyProduct
export const selectSelectedProduct=(state)=>state.ProductSlice.selectedProduct
export const selectProductErrors=(state)=>state.ProductSlice.errors
export const selectProductSuccessMessage=(state)=>state.ProductSlice.successMessage
export const selectProductUpdateStatus=(state)=>state.ProductSlice.productUpdateStatus
export const selectProductdailyUpdateStatus=(state)=>state.ProductSlice.productdailyUpdateStatus
export const selectProductAddStatus=(state)=>state.ProductSlice.productAddStatus
export const selectProductIsFilterOpen=(state)=>state.ProductSlice.isFilterOpen
export const selectProductFetchStatus=(state)=>state.ProductSlice.productFetchStatus

// exporting actions
export const {clearProductSuccessMessage,clearProductErrors,clearSelectedProduct,cleardailySelectedProduct,resetProductStatus,resetdailyProductFetchStatus,resetProductUpdateStatus,resetdailyProductUpdateStatus,resetProductAddStatus,toggleFilters,resetProductFetchStatus}=productSlice.actions

export default productSlice.reducer
