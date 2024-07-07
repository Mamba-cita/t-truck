import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fuelService from './fuelService';




const initialState = {
  fuel: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// create a new fuel

export const createFuelOrder = createAsyncThunk('fuel/createFuelOrder', async (fuelData, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fuelService.createFuelOrder(fuelData, token);
      return response.data; 
   
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

// get fuel


export const getAllFuelRecords = createAsyncThunk('fuel/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fuelService.getAllFuelRecords(token);
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

export const getFuelRecordsById = createAsyncThunk('fuel/getById', async (fuelId, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await fuelService.getFuelRecordsById(fuelId, token);
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

// Define new async thunk for updating a move
export const updateFuelById = createAsyncThunk('fuel/update', async ({ fuelId, fuelData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fuelService.updateMoveById(fuelId, fuelData, token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  });

// Async thunk action to delete a move by its ID
export const deleteFuelById = createAsyncThunk('fuel/delete', async (fuelId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        await fuelService.deleteFuelById(fuelId, token);
        return fuelId;
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
  


export const fuelSlice = createSlice({
    name: "fuel",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createFuelOrder.pending, (state) => {
          state.isLoading = true;
      })
    .addCase(createFuelOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.fuel.push(action.payload);
         
      })
    .addCase(createFuelOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
        .addCase(getAllFuelRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.fuel = action.payload;
        })

       .addCase(getAllFuelRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        .addCase(getFuelRecordsById.pending, (state) => {
              state.isLoading = true;
          })
        .addCase(getFuelRecordsById.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.fuel = [action.payload];
          })
        .addCase(getFuelRecordsById.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
          })
          .addCase(updateFuelById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateFuelById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          const updateFuelById = action.payload;
          state.fuel = state.fuel.map(fuel => fuel.id === updateFuelById.id ? updateFuelById : fuel);
      })      
        .addCase(updateFuelById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteFuelById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.fuel = state.fuel.filter(fuel => fuel.id !== action.payload);
    })
    .addCase(deleteFuelById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
    });
 
        }
        
  });



  export const { reset } = fuelSlice.actions;
  export default fuelSlice.reducer;