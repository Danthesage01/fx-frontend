//lib/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance, { setAxiosToken } from "./axiosInstance";
import { toast } from "react-toastify";
import { RootState } from "../store";

// Define interface for your API response structure
interface ApiResponse<T> {
 success: boolean;
 message: string;
 data: T;
}

// Define types for the toast options
interface ToastOptions {
 skipErrorToast?: boolean;
 errorMessage?: string;
 errorToastOptions?: any;

 skipSuccessToast?: boolean;
 successMessage?: string;
 successToastOptions?: any;

 // Optionally use the API response message
 useResponseMessageForSuccess?: boolean;
 useResponseMessageForError?: boolean;
}

// Define a custom base query using your Axios instance
const axiosBaseQuery = ({
 baseUrl = "",
 showErrorToasts = true,
 showSuccessToasts = true
} = {}) =>
 async (
  {
   url,
   method,
   data,
   params,
   toastOptions = {}
  }: {
   url: string;
   method: string;
   data?: any;
   params?: any;
   toastOptions?: ToastOptions;
  },
  { getState }: { getState: () => unknown }
 ) => {
  try {
   // Get token from Redux state and set it in axios
   const state = getState() as RootState;
   const token = state.auth.accessToken;
   setAxiosToken(token);

   const result = await axiosInstance({
    url: baseUrl + url,
    method,
    data,
    params,
   });

   // Extract the standardized response
   const apiResponse = result.data as ApiResponse<any>;

   // Handle success toast
   const shouldShowSuccessToast =
    toastOptions.skipSuccessToast !== true && showSuccessToasts;

   if (shouldShowSuccessToast) {
    const useResponseMessage =
     toastOptions.useResponseMessageForSuccess !== false;

    const successMessage =
     toastOptions.successMessage ||
     (useResponseMessage ? apiResponse.message : "Operation completed successfully");

    toast.success(successMessage, toastOptions.successToastOptions || {});
   }

   return { data: result.data };
  } catch (axiosError: any) {
   // Try to extract message from the standard error response structure if available
   const apiResponse = axiosError.response?.data as ApiResponse<any> | undefined;
   const useResponseMessage =
    toastOptions.useResponseMessageForError !== false;

   const errorMessage =
    toastOptions.errorMessage ||
    (useResponseMessage && apiResponse?.message) ||
    axiosError.response?.data?.message ||
    axiosError.response?.data?.error ||
    "An error occurred. Please try again.";

   // Show toast notification if not explicitly skipped
   const shouldSkipErrorToast = toastOptions.skipErrorToast === true;
   if (showErrorToasts && !shouldSkipErrorToast) {
    toast.error(errorMessage, toastOptions.errorToastOptions || {});
   }

   console.log({
    status: axiosError.response?.status,
    data: axiosError.response?.data || axiosError.message,
    headers: axiosError.response?.headers,
    request: axiosError.request,
   });

   return {
    error: {
     status: axiosError.response?.status,
     data: axiosError.response?.data || axiosError.message,
    },
   };
  }
 };

// Create the API slice
export const apiSlice = createApi({
 reducerPath: "api",
 tagTypes: ["User", "UserProfile", "Currencies", "Conversions", "Conversion", "ConversionSummary", "ExchangeRate"],
 baseQuery: axiosBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  showErrorToasts: true,
  showSuccessToasts: true,
 }),
 endpoints: (builder) => ({}),
});