import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mealsService from './mealService'; // Update the path if needed

const initialState = {
  meals: [],          // List of meals
  meal: {},           // Single meal details
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};



export const createMeal = createAsyncThunk(
    'meals/createMeal',
    async (mealData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token; // Adjust to get the token
        return await mealsService.createMeal(mealData, token);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )
  

// Async thunk to get all meals for the authenticated user
export const getMeals = createAsyncThunk(
  'meals/getMeals',
  async (_, thunkAPI) => {
    try {
      
      const token=thunkAPI.getState().auth.user.token;
      return await mealsService.getMeals(token);
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Meal
      .addCase(createMeal.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.meals.push(action.payload); // Add the new meal to the list
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Error creating meal';
        state.isSuccess = false;
      })
      
      // Get Meals
      .addCase(getMeals.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.meals = action.payload; // Set meals from response
      
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Error fetching meals';
        state.isSuccess = false;
      });
  },
});

export const { reset } = mealSlice.actions;
export default mealSlice.reducer;
