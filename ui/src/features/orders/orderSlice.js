import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService';




const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// get order


export const getOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await orderService.getOrders(token);
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const getOrderById = createAsyncThunk('moves/getById', async (moveId, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getOrderById(moveId, token);
  } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
        })

       .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        .addCase(getOrderById.pending, (state) => {
              state.isLoading = true;
          })
        .addCase(getOrderById.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.orders = [action.payload];
          })
        .addCase(getOrderById.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
          })
 
        }
        
  });



  export const { reset } = orderSlice.actions;
  export default orderSlice.reducer;