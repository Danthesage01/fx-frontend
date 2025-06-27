// File location: /lib/api/conversionApi.ts

import { apiSlice } from "../api/apiSlice";

// Define types for conversion API responses and requests
interface ConversionRequest {
 fromCurrency: string;
 toCurrency: string;
 amount: number;
}

interface ExchangeRate {
 fromCurrency: string;
 toCurrency: string;
 rate: number;
 timestamp: string;
}

interface Conversion {
 _id: string;
 userId: string;
 fromCurrency: string;
 toCurrency: string;
 amount: number;
 rate: number;
 convertedAmount: number;
 createdAt: string;
 updatedAt: string;
}

interface ConversionResponse {
 success: boolean;
 message: string;
 data: {
  conversion: Conversion;
 };
}

interface ConversionsListResponse {
 success: boolean;
 message: string;
 data: Conversion[];
 pagination: {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
 };
}

interface ConversionSummary {
 totalConversions: number;
 lastConversion: string;
 firstConversion: string;
 totalAmountConverted: number;
 uniqueCurrencyPairs: number;
 avgConversionAmount: number;
}

interface ConversionSummaryResponse {
 success: boolean;
 data: {
  summary: ConversionSummary;
  stats: ConversionSummary;
 };
}

interface CurrenciesResponse {
 success: boolean;
 data: {
  currencies: string[];
 };
}

interface ExchangeRateResponse {
 success: boolean;
 data: ExchangeRate;
}

interface ConversionsQueryParams {
 page?: number;
 limit?: number;
 sortBy?: string;
 sortOrder?: 'asc' | 'desc';
}

// Inject conversion endpoints into the API slice
export const conversionApi = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  // Query endpoint to get supported currencies
  getSupportedCurrencies: builder.query<CurrenciesResponse, void>({
   query: () => ({
    url: "/conversions/currencies",
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: ["Currencies"],
  }),

  // Query endpoint to get exchange rate
  getExchangeRate: builder.query<ExchangeRateResponse, { from: string; to: string }>({
   query: ({ from, to }) => ({
    url: `/rates/${from}/${to}`,
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: (result, error, { from, to }) => [
    { type: "ExchangeRate", id: `${from}-${to}` }
   ],
  }),

  // Mutation endpoint to create a conversion
  createConversion: builder.mutation<ConversionResponse, ConversionRequest>({
   query: (conversionData) => ({
    url: "/conversions",
    method: "POST",
    data: conversionData,
    toastOptions: {
     successMessage: "Conversion completed successfully!",
     errorMessage: "Failed to create conversion. Please try again.",
    },
   }),
   invalidatesTags: ["Conversions", "ConversionSummary"],
  }),

  // Query endpoint to get user conversions with pagination
  getUserConversions: builder.query<ConversionsListResponse, ConversionsQueryParams>({
   query: (params = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    return {
     url: `/conversions?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
     method: "GET",
    };
   },
   providesTags: ["Conversions"],
  }),

  // Query endpoint to get conversion summary/stats
  getConversionSummary: builder.query<ConversionSummaryResponse, void>({
   query: () => ({
    url: "/conversions/summary",
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: ["ConversionSummary"],
  }),

  // Query endpoint to get single conversion
  getConversion: builder.query<{ success: boolean; data: Conversion }, string>({
   query: (id) => ({
    url: `/conversions/${id}`,
    method: "GET",
   }),
   providesTags: (result, error, id) => [{ type: "Conversion", id }],
  }),

  // Mutation endpoint to delete a conversion
  deleteConversion: builder.mutation<{ success: boolean; message: string }, string>({
   query: (id) => ({
    url: `/conversions/${id}`,
    method: "DELETE",
    toastOptions: {
     successMessage: "Conversion deleted successfully!",
     errorMessage: "Failed to delete conversion.",
    },
   }),
   invalidatesTags: (result, error, id) => [
    { type: "Conversion", id },
    "Conversions",
    "ConversionSummary"
   ],
  }),

  // Query endpoint for recent conversions (convenience endpoint)
  getRecentConversions: builder.query<ConversionsListResponse, { limit?: number }>({
   query: ({ limit = 5 } = {}) => ({
    url: `/conversions?page=1&limit=${limit}&sortBy=createdAt&sortOrder=desc`,
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: ["Conversions"],
  }),
 }),
 overrideExisting: true
});

// Export the auto-generated hooks
export const {
 useGetSupportedCurrenciesQuery,
 useGetExchangeRateQuery,
 useCreateConversionMutation,
 useGetUserConversionsQuery,
 useGetConversionSummaryQuery,
 useGetConversionQuery,
 useDeleteConversionMutation,
 useGetRecentConversionsQuery,
} = conversionApi;

// Export types for use in components
export type {
 ConversionRequest,
 Conversion,
 ConversionSummary,
 ExchangeRate,
 ConversionsQueryParams,
};