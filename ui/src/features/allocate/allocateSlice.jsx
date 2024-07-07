import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import allocateService from './allocateService';



const initialState = {
  moves: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Define new async thunk for updating a move
export const allocateMove = createAsyncThunk('allocate/update', async ({ moveId, moveData }, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await allocateService.allocateMoveById(moveId, moveData, token);
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


export const moveSlice = createSlice({
    name: "moves",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
       
          .addCase(allocateMove.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(allocateMove.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          const allocateMove = action.payload;
          state.moves = state.moves.map(move => move.id === allocateMove.id ? allocateMove : move);
      })      
        .addCase(allocateMove.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        
        }
        
  });



  export const { reset } = moveSlice.actions;
  export default moveSlice.reducer;