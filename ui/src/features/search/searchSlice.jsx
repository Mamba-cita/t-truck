import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchAPI } from './searchService';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

export const searchAsync = createAsyncThunk('search/searchAsync', async (keyword) => {
  try {
    const data = await searchAPI(keyword);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const globalSearch = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectSearchResults = (state) => state.search.results;

export default globalSearch.reducer;
