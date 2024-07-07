import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trailerService from './trailerService';

const initialState = {
  trailers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createTrailer = createAsyncThunk('trailers/create', async (trailerData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await trailerService.createTrailer(trailerData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getTrailers = createAsyncThunk('trailers/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await trailerService.getTrailers(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrailer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrailer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trailers.push(action.payload);
      })
      .addCase(createTrailer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTrailers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trailers = action.payload;
      })
      .addCase(getTrailers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = trailerSlice.actions;
export default trailerSlice.reducer;
