// // File location: /lib/features/auth/authSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../store';
// import { StoredUser } from '@/types/user';
// import { getStoredItem } from '@/utils/localStore';

// // Define an enum of userRole

// // Define a type for the user
// interface User {
//  id: string;
//  name: string;
//  email: string;
// }


// // Define the auth state interface
// interface AuthState {
//  user: User | null;
//  userId: string | null;
//  email: string | null;

//  accessToken: string | null;
//  refreshToken: string | null;
//  isAuthenticated: boolean;
//  isLoading: boolean;
//  error: string | null;
// }
// const storedUser = typeof window !== 'undefined' ? getStoredItem<StoredUser>("user") : null;

// // Define the initial state
// const initialState: AuthState = {
//  user: null,
//  userId: storedUser ? storedUser.userId : null,
//  email: storedUser ? storedUser.email : null,
//  accessToken: storedUser ? storedUser.accessToken : null,
//  refreshToken: storedUser ? storedUser.refreshToken : null,
//  isAuthenticated: !!storedUser, // <-- Set based on existence of storedUser
//  isLoading: false,
//  error: null,
// };

// // Create the auth slice
// const authSlice = createSlice({
//  name: 'auth',
//  initialState,
//  reducers: {
//   // Set loading state
//   setLoading: (state, action: PayloadAction<boolean>) => {
//    state.isLoading = action.payload;
//   },



//   // Set user information upon successful login/registration
//   setUser: (state, action: PayloadAction<Partial<AuthState>>) => {

//    const updatedStates = { ...state, ...action.payload }

//    const {
//     user,
//     userId,
//     email,
//     accessToken,
//     refreshToken,
//     isAuthenticated,
//    } = action.payload


//    state.user = user ?? null;
//    state.userId = userId ?? null;
//    state.email = email ?? null;
//    state.accessToken = accessToken ?? null;
//    state.refreshToken = refreshToken ?? null;
//    state.isAuthenticated = isAuthenticated ?? false;
//    // Save token to localStorage
//    if (typeof window !== 'undefined') {
//     localStorage.setItem('user', JSON.stringify({
//      user: updatedStates.user,
//      accessToken: updatedStates.accessToken,
//      refreshToken: updatedStates.refreshToken,
//      isAuthenticated: updatedStates.isAuthenticated,
//      email: updatedStates.email,
//      userId: updatedStates.userId,
//     }));
//    }
//   },
//   // Set user information upon successful login/registration
//   setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
//    state.user = action.payload.user;
//    state.accessToken = action.payload.token;
//    state.isAuthenticated = true;
//    state.isLoading = false;
//    state.error = null;

//    // Save token to localStorage
//    if (typeof window !== 'undefined') {
//     localStorage.setItem('token', action.payload.token);
//    }
//   },

//   // Handle authentication errors
//   setError: (state, action: PayloadAction<string>) => {
//    state.error = action.payload;
//    state.isLoading = false;
//   },

//   // Clear auth state on logout
//   logout: (state) => {
//    state.user = null;
//    state.userId = null;
//    state.email = null;
//    state.accessToken = null;
//    state.refreshToken = null;
//    state.isAuthenticated = false;
//    state.error = null;

//    // Remove token from localStorage
//    if (typeof window !== 'undefined') {
//     localStorage.removeItem('user');
//    }
//   },
//  },
// });

// // Export actions
// export const { setLoading, setCredentials, setError, logout, setUser } = authSlice.actions;

// // Export selectors
// export const selectAuth = (state: RootState) => state.auth;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectAccessToken = (state: RootState) => state.auth.accessToken;
// export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
// export const selectAuthError = (state: RootState) => state.auth.error;



// // Export reducer
// export default authSlice.reducer;


// File location: /lib/features/auth/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { StoredUser } from '@/types/user';
import { getStoredItem } from '@/utils/localStore';
import { setAxiosToken } from '@/lib/api/axiosInstance';

// Define a type for the user
interface User {
 id: string;
 name: string;
 email: string;
}

// Define the auth state interface
interface AuthState {
 user: User | null;
 userId: string | null;
 email: string | null;
 accessToken: string | null;
 refreshToken: string | null;
 isAuthenticated: boolean;
 isLoading: boolean;
 error: string | null;
}

const storedUser = typeof window !== 'undefined' ? getStoredItem<StoredUser>("user") : null;

// Define the initial state
const initialState: AuthState = {
 user: null,
 userId: storedUser ? storedUser.userId : null,
 email: storedUser ? storedUser.email : null,
 accessToken: storedUser ? storedUser.accessToken : null,
 refreshToken: storedUser ? storedUser.refreshToken : null,
 isAuthenticated: !!storedUser,
 isLoading: false,
 error: null,
};

// Set initial token in axios if it exists
if (storedUser?.accessToken) {
 setAxiosToken(storedUser.accessToken);
}

// Create the auth slice
const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
  // Set loading state
  setLoading: (state, action: PayloadAction<boolean>) => {
   state.isLoading = action.payload;
  },

  // Set user information upon successful login/registration
  setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
   const updatedStates = { ...state, ...action.payload }

   const {
    user,
    userId,
    email,
    accessToken,
    refreshToken,
    isAuthenticated,
   } = action.payload

   state.user = user ?? null;
   state.userId = userId ?? null;
   state.email = email ?? null;
   state.accessToken = accessToken ?? null;
   state.refreshToken = refreshToken ?? null;
   state.isAuthenticated = isAuthenticated ?? false;

   // Set token in axios instance
   setAxiosToken(accessToken ?? null);

   // Save token to localStorage
   if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify({
     user: updatedStates.user,
     accessToken: updatedStates.accessToken,
     refreshToken: updatedStates.refreshToken,
     isAuthenticated: updatedStates.isAuthenticated,
     email: updatedStates.email,
     userId: updatedStates.userId,
    }));
   }
  },

  // Set user information upon successful login/registration
  setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
   state.user = action.payload.user;
   state.accessToken = action.payload.token;
   state.isAuthenticated = true;
   state.isLoading = false;
   state.error = null;

   // Set token in axios instance
   setAxiosToken(action.payload.token);

   // Save token to localStorage
   if (typeof window !== 'undefined') {
    localStorage.setItem('token', action.payload.token);
   }
  },

  // Handle authentication errors
  setError: (state, action: PayloadAction<string>) => {
   state.error = action.payload;
   state.isLoading = false;
  },

  // Clear auth state on logout
  logout: (state) => {
   state.user = null;
   state.userId = null;
   state.email = null;
   state.accessToken = null;
   state.refreshToken = null;
   state.isAuthenticated = false;
   state.error = null;

   // Clear token from axios instance
   setAxiosToken(null);

   // Remove token from localStorage
   if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
   }
  },

  // Action to refresh the access token
  refreshToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
   state.accessToken = action.payload.accessToken;
   state.refreshToken = action.payload.refreshToken;

   // Set new token in axios instance
   setAxiosToken(action.payload.accessToken);

   // Update localStorage
   if (typeof window !== 'undefined') {
    const storedUser = getStoredItem<StoredUser>("user");
    if (storedUser) {
     const updatedUser = {
      ...storedUser,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
     };
     localStorage.setItem('user', JSON.stringify(updatedUser));
    }
   }
  },
 },
});

// Export actions
export const {
 setLoading,
 setCredentials,
 setError,
 logout,
 setUser,
 refreshToken
} = authSlice.actions;

// Export selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Export reducer
export default authSlice.reducer;