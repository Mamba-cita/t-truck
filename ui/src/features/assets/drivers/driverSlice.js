import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import driverService from './driverService';

const initialState = {
  drivers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createDriver = createAsyncThunk('drivers/create', async (driverData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await driverService.createDriver(driverData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getDrivers = createAsyncThunk('drivers/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await driverService.getDrivers(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const driverSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.drivers.push(action.payload);
      })
      .addCase(createDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.drivers = action.payload;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = driverSlice.actions;
export default driverSlice.reducer;
