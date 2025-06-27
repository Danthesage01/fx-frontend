

// File location: /lib/api/authApi.ts

import { UserRole } from "@/types/user";
import { apiSlice } from "../api/apiSlice";
import { setUser, logout } from "../features/auth/authSlice";

// Define the types for your API responses and requests
interface LoginRequest {
 email: string;
 password: string;
}

interface RegisterRequest {
 email: string;
 name: string;
 password: string;
}

interface PhoneLoginRequest {
 phone: string;
 code: string;
}

interface LoginResponse {
 success: boolean;
 message: string
 data: {
  tokens: {
   accessToken: string;
   refreshToken: string;
   expiresIn: string;
  }
  user: {
   id: string;
   name: string;
   email: string;
   role: UserRole
  }
 }
}

interface RegisterResponse {
 success: boolean;
 message: string
 data: {
  tokens: {
   accessToken: string;
   refreshToken: string;
   expiresIn: string;
  }
  user: {
   id: string;
   name: string;
   email: string;
   role: UserRole
  }
 }
}

interface UserProfile {
 id: string;
 name: string;
 email: string;
 phone?: string;
 // Add other profile fields as needed
}

// Inject endpoints into the API slice
export const authApi = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  // Query endpoint to get the home page data
  getHealthApi: builder.query<any, void>({
   query: () => ({
    url: "/health",
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: ["User"],
  }),

  // Mutation endpoint for email/password login
  login: builder.mutation<LoginResponse, LoginRequest>({
   query: (credentials) => ({
    url: "/auth/login",
    method: "POST",
    data: credentials,
    toastOptions: {
     successMessage: "Welcome back! Login successful.",
    },
   }),
   invalidatesTags: ["User"],
   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
     const { data } = await queryFulfilled;

     // Dispatch setUser action to update Redux state and sync with axios
     dispatch(setUser({
      user: {
       id: data.data.user.id,
       name: data.data.user.name,
       email: data.data.user.email,
      },
      userId: data.data.user.id,
      email: data.data.user.email,
      accessToken: data.data.tokens.accessToken,
      refreshToken: data.data.tokens.refreshToken,
      isAuthenticated: true,
     }));
    } catch (error) {
     // Handle login error if needed
     console.error('Login failed:', error);
    }
   },
  }),

  // Mutation endpoint for user registration
  register: builder.mutation<RegisterResponse, RegisterRequest>({
   query: (userData) => ({
    url: "/auth/register",
    method: "POST",
    data: userData,
    toastOptions: {
     successMessage: "Account created successfully! Welcome aboard.",
     errorMessage: "Registration failed. Please check your information.",
    },
   }),
   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
     const { data } = await queryFulfilled;

     // Dispatch setUser action to update Redux state and sync with axios
     dispatch(setUser({
      user: {
       id: data.data.user.id,
       name: data.data.user.name,
       email: data.data.user.email,
      },
      userId: data.data.user.id,
      email: data.data.user.email,
      accessToken: data.data.tokens.accessToken,
      refreshToken: data.data.tokens.refreshToken,
      isAuthenticated: true,
     }));
    } catch (error) {
     // Handle registration error if needed
     console.error('Registration failed:', error);
    }
   },
  }),

  // Query endpoint to get user profile
  getUserProfile: builder.query<UserProfile, void>({
   query: () => ({
    url: "/auth/profile", // Updated to match your API docs
    method: "GET",
   }),
   providesTags: ["UserProfile"],
  }),

  // Mutation endpoint to update user profile
  updateUserProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
   query: (userData) => ({
    url: "/auth/profile", // Updated to match your API docs
    method: "PUT", // Updated to match your API docs
    data: userData,
   }),
   invalidatesTags: ["UserProfile"],
  }),

  // Mutation endpoint for logout
  logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
   query: () => ({
    url: "/auth/logout",
    method: "POST",
    toastOptions: {
     successMessage: "Logged out successfully!",
    },
   }),
   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
     await queryFulfilled;
     // Dispatch logout action to clear Redux state and sync with axios
     dispatch(logout());
    } catch (error) {
     // Even if the API call fails, we should still logout locally
     dispatch(logout());
    }
   },
  }),

  // Mutation endpoint for logout from all devices
  logoutAllDevices: builder.mutation<{ success: boolean; message: string }, void>({
   query: () => ({
    url: "/auth/logout-all",
    method: "POST",
    toastOptions: {
     successMessage: "Logged out from all devices successfully!",
    },
   }),
   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
     await queryFulfilled;
     // Dispatch logout action to clear Redux state and sync with axios
     dispatch(logout());
    } catch (error) {
     // Even if the API call fails, we should still logout locally
     dispatch(logout());
    }
   },
  }),

  //  // Mutation endpoint for changing password
  changePassword: builder.mutation<
   { success: boolean; message: string },
   { currentPassword: string; newPassword: string }
  >({
   query: (passwordData) => ({
    url: "/auth/change-password",
    method: "POST",
    data: passwordData,
    toastOptions: {
     successMessage: "Password changed successfully!",
     errorMessage: "Failed to change password. Please check your current password.",
    },
   }),
  }),

  // Mutation endpoint for refreshing token
  refreshToken: builder.mutation<
   { success: boolean; data: { tokens: { accessToken: string; refreshToken: string } } },
   { refreshToken: string }
  >({
   query: (tokenData) => ({
    url: "/auth/refresh-token",
    method: "POST",
    data: tokenData,
    toastOptions: {
     skipSuccessToast: true, // Don't show toast for token refresh
     skipErrorToast: true,
    },
   }),
   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
     const { data } = await queryFulfilled;

     // Update tokens in Redux state
     dispatch(setUser({
      accessToken: data.data.tokens.accessToken,
      refreshToken: data.data.tokens.refreshToken,
     }));
    } catch (error) {
     // If refresh fails, logout user
     dispatch(logout());
    }
   },
  }),
 }),
 overrideExisting: true
});

// Export the auto-generated hooks
export const {
 useGetHealthApiQuery,
 useLoginMutation,
 useRegisterMutation,
 useGetUserProfileQuery,
 useUpdateUserProfileMutation,
 useLogoutUserMutation,
 useLogoutAllDevicesMutation,
 useChangePasswordMutation,
 useRefreshTokenMutation,
} = authApi;