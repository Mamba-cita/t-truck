import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import truckService from './truckService';



const initialState = {
  trucks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// create a new customer

export const createTruck = createAsyncThunk('trucks/create', async (truckData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await truckService.createTruck(truckData, token);
        
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


// get trucks


export const getTrucks = createAsyncThunk('trucks/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await truckService.getTrucks(token);
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




export const truckSlice = createSlice({
    name: "truck",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
          .addCase(createTruck.pending, (state) => {
                state.isLoading = true;
            })
          .addCase(createTruck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trucks.push(action.payload);
               
            })
          .addCase(createTruck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

         .addCase(getTrucks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trucks = action.payload;
        })

       .addCase(getTrucks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        }
  });



  export const { reset } = truckSlice.actions;
  export default truckSlice.reducer;