
// File location: /lib/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
// Import from the correct path
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import { authApi } from './apiServices/authApi';


// Create a root reducer with properly named keys
const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  // Add other reducers here as your app grows
});

// Create the store with the typed root reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Export types for TypeScript
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;