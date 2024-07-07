import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moveService from './moveService';



const initialState = {
  moves: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// create a new move

export const createMove= createAsyncThunk('moves/create', async (moveData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await moveService.createMove(moveData, token);
        
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


// get moves


export const getMoves = createAsyncThunk('moves/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await moveService.getMoves(token);
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

export const getMoveById = createAsyncThunk('moves/getById', async (moveId, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await moveService.getMoveById(moveId, token);
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
export const updateMove = createAsyncThunk('moves/update', async ({ moveId, moveData }, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      return await moveService.updateMoveById(moveId, moveData, token);
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
export const deleteMove = createAsyncThunk('moves/delete', async (moveId, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token;
      await moveService.deleteMoveById(moveId, token);
      return moveId;
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




export const moveSlice = createSlice({
    name: "moves",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
          .addCase(createMove.pending, (state) => {
                state.isLoading = true;
            })
          .addCase(createMove.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.moves.push(action.payload);
               
            })
          .addCase(createMove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

         .addCase(getMoves.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.moves = action.payload;
        })

       .addCase(getMoves.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        .addCase(getMoveById.pending, (state) => {
              state.isLoading = true;
          })
        .addCase(getMoveById.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.moves = [action.payload];
          })
        .addCase(getMoveById.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
          })
          .addCase(updateMove.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateMove.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          const updatedMove = action.payload;
          state.moves = state.moves.map(move => move.id === updatedMove.id ? updatedMove : move);
      })      
        .addCase(updateMove.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteMove.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.moves = state.moves.filter(move => move.id !== action.payload);
    })
    .addCase(deleteMove.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
    });
        }
        
  });



  export const { reset } = moveSlice.actions;
  export default moveSlice.reducer;