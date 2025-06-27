// File location: /lib/api/eventsApi.ts

import { apiSlice } from "../api/apiSlice";

// Define types for events API responses and requests
interface EventMetadata {
 email?: string;
 loginMethod?: string;
 ipAddress?: string;
 userAgent?: string;
 fromCurrency?: string;
 toCurrency?: string;
 amount?: number;
 rate?: number;
 convertedAmount?: number;
 [key: string]: any;
}

interface Event {
 _id: string;
 userId: string;
 eventType: string;
 metadata: EventMetadata;
 timestamp: string;
}



interface EventsListResponse {
 success: boolean;
 message: string;
 data: Event[]; // Changed: events directly in data array
 pagination: {   // Changed: pagination at root level
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  page: number;
  totalItems?: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
 };
}

interface EventStatsResponse {
 success: boolean;
 data: {
  stats: Array<{
   _id: string;
   count: number;
   lastOccurrence: string;
  }>;
 };
}

interface EventsQueryParams {
 page?: number;
 limit?: number;
 eventType?: string;
 startDate?: string;
 endDate?: string;
}

// Inject events endpoints into the API slice
export const eventsApi = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  // Query endpoint to get user events with filtering
  getUserEvents: builder.query<EventsListResponse, EventsQueryParams>({
   query: (params = {}) => {
    const { page = 1, limit = 20, eventType, startDate, endDate } = params;
    let url = `/events?page=${page}&limit=${limit}`;

    if (eventType && eventType !== 'All Events') {
     url += `&eventType=${eventType}`;
    }
    if (startDate) {
     url += `&startDate=${startDate}`;
    }
    if (endDate) {
     url += `&endDate=${endDate}`;
    }

    return {
     url,
     method: "GET",
     toastOptions: {
      skipErrorToast: true,
      skipSuccessToast: true
     }
    };
   },
   providesTags: ["User"],
  }),

  // Query endpoint to get event statistics
  getEventStats: builder.query<EventStatsResponse, void>({
   query: () => ({
    url: "/events/stats",
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: ["User"],
  }),

  // Query endpoint for recent events (convenience endpoint)
  getRecentEvents: builder.query<EventsListResponse, { limit?: number }>({
   query: ({ limit = 10 } = {}) => ({
    url: `/events?page=1&limit=${limit}`,
    method: "GET",
    toastOptions: {
     skipErrorToast: true,
     skipSuccessToast: true
    }
   }),
   providesTags: ["User"],
  }),
 }),
 overrideExisting: true
});

// Export the auto-generated hooks
export const {
 useGetUserEventsQuery,
 useGetEventStatsQuery,
 useGetRecentEventsQuery,
} = eventsApi;

// Export types for use in components
export type {
 Event,
 EventMetadata,
 EventsQueryParams,
 EventsListResponse,
 EventStatsResponse,
};