import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reportService from './reportService';



const initialState = {
 reports: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const getAllReports = createAsyncThunk('reports/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await reportService.getAllReports(token);
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





export const reportSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
          

         .addCase(getAllReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reports = action.payload;
        })

       .addCase(getAllReports.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        }
        
  });



  export const { reset } = reportSlice.actions;
  export default reportSlice.reducer;