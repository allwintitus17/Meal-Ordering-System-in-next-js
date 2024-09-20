import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from '../features/auth/authSlice';
import mealReducer from '../features/meals/mealSlice';  

const makeStore = () => 
  configureStore({
    reducer: {
      auth: authReducer,
      meals: mealReducer,
    },
    devTools: true,
  });

// Export the wrapper created by next-redux-wrapper
export const wrapper = createWrapper(makeStore);
  /*Summary*/
/*You're setting up a Redux store using @reduxjs/toolkit, combining two slices (auth and meals).
You're using next-redux-wrapper to ensure that Redux works seamlessly with server-side rendering in a Next.js app.
The wrapper is then exported for use in your Next.js app, which will allow Redux state to persist and be available throughout the app.*/