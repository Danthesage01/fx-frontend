"use client";

import { useMemo, useState } from "react";
import {
  Shield,
  ArrowRightLeft,
  TrendingUp,
  User,
  AlertTriangle,
  RefreshCw,
  Eye,
  Key,
  UserX,
  Trash2,
  Calendar,
  Clock,
  Filter,
  X,
  MoreVertical,
} from "lucide-react";
import {
  useGetUserEventsQuery,
  Event,
  EventsQueryParams,
} from "@/lib/apiServices/eventApi";
import { Pagination } from "@/components/Paginations";

export default function AuditTrail(): JSX.Element {
  const [eventFilter, setEventFilter] = useState("All Events");
  const [dateFilter, setDateFilter] = useState("Last 7 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Memoize the date range calculation to prevent infinite re-renders
  const startDate = useMemo(() => {
    const now = new Date();

    switch (dateFilter) {
      case "Last 7 Days":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case "Last 30 Days":
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      case "Last 90 Days":
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return "";
    }
  }, [dateFilter]);

  // Check if any filters are active
  const hasActiveFilters =
    eventFilter !== "All Events" || dateFilter !== "All Time";

  // Use the memoized value directly
  const queryParams: EventsQueryParams = useMemo(
    () => ({
      page: currentPage,
      limit: 5,
      eventType: eventFilter,
      startDate: startDate,
    }),
    [currentPage, eventFilter, startDate]
  );

  const {
    data: eventsData,
    isLoading,
    error,
  } = useGetUserEventsQuery(queryParams);

  const events = eventsData?.data || [];
  const pagination = eventsData?.pagination;

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: "event" | "date", value: string) => {
    setCurrentPage(1); // Reset to first page
    if (filterType === "event") {
      setEventFilter(value);
    } else {
      setDateFilter(value);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setEventFilter("All Events");
    setDateFilter("All Time");
    setCurrentPage(1);
  };

  // Event type configurations
  const getEventConfig = (eventType: string) => {
    const configs = {
      CONVERSION_CREATED: {
        icon: ArrowRightLeft,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
        title: "Conversion Created",
        status: "success",
      },
      RATE_FETCHED: {
        icon: TrendingUp,
        color:
          "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
        title: "Exchange Rate Fetched",
        status: "success",
      },
      USER_LOGIN: {
        icon: User,
        color:
          "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
        title: "User Login",
        status: "success",
      },
      FAILED_LOGIN: {
        icon: AlertTriangle,
        color:
          "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
        title: "Failed Login Attempt",
        status: "failed",
      },
      USER_LOGOUT: {
        icon: UserX,
        color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        title: "User Logout",
        status: "success",
      },
      USER_REGISTERED: {
        icon: User,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
        title: "User Registered",
        status: "success",
      },
      PROFILE_UPDATED: {
        icon: User,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
        title: "Profile Updated",
        status: "success",
      },
      PASSWORD_CHANGED: {
        icon: Key,
        color:
          "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
        title: "Password Changed",
        status: "success",
      },
      TOKEN_REFRESHED: {
        icon: RefreshCw,
        color:
          "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
        title: "Token Refreshed",
        status: "success",
      },
      CONVERSION_DELETED: {
        icon: Trash2,
        color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
        title: "Conversion Deleted",
        status: "success",
      },
      DASHBOARD_VIEWED: {
        icon: Eye,
        color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        title: "Dashboard Viewed",
        status: "success",
      },
    };

    return (
      configs[eventType as keyof typeof configs] || {
        icon: Shield,
        color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        title: eventType
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        status: "success",
      }
    );
  };

  const getEventDescription = (event: Event) => {
    const { eventType, metadata } = event;

    switch (eventType) {
      case "CONVERSION_CREATED":
        return `Converted ${metadata.amount?.toLocaleString()} ${metadata.fromCurrency} to ${metadata.convertedAmount?.toLocaleString()} ${metadata.toCurrency}`;
      case "RATE_FETCHED":
        return `Retrieved live rate for ${metadata.fromCurrency}/${metadata.toCurrency} pair`;
      case "USER_LOGIN":
        return `Successful authentication`;
      case "USER_REGISTERED":
        return `New account created successfully`;
      case "FAILED_LOGIN":
        return `Invalid credentials provided`;
      case "USER_LOGOUT":
        return `Session terminated`;
      case "PROFILE_UPDATED":
        return `Profile information updated`;
      case "PASSWORD_CHANGED":
        return `Password successfully changed`;
      case "TOKEN_REFRESHED":
        return `Access token renewed`;
      case "CONVERSION_DELETED":
        return `Conversion record removed`;
      case "DASHBOARD_VIEWED":
        return `Dashboard accessed`;
      default:
        return `${eventType.replace(/_/g, " ").toLowerCase()}`;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "failed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          Failed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        Success
      </span>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const formatTimestampMobile = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBrowserInfo = (userAgent?: string) => {
    if (!userAgent) return "Unknown Browser";

    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown Browser";
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Audit Trail
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Audit Trail
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {pagination?.total || 0} total events
          </p>
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Event Type Filter */}
          <select
            value={eventFilter}
            onChange={(e) => handleFilterChange("event", e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>All Events</option>
            <option>USER_LOGIN</option>
            <option>USER_REGISTERED</option>
            <option>CONVERSION_CREATED</option>
            <option>RATE_FETCHED</option>
            <option>FAILED_LOGIN</option>
            <option>USER_LOGOUT</option>
            <option>PROFILE_UPDATED</option>
            <option>PASSWORD_CHANGED</option>
            <option>TOKEN_REFRESHED</option>
            <option>CONVERSION_DELETED</option>
            <option>DASHBOARD_VIEWED</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
        </div>

        {/* Mobile Filter Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border transition-colors  w-[90%] ${
              hasActiveFilters
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-400"
                : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {(eventFilter !== "All Events" ? 1 : 0) +
                  (dateFilter !== "All Time" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Events
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Type
              </label>
              <select
                value={eventFilter}
                onChange={(e) => handleFilterChange("event", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>All Events</option>
                <option>USER_LOGIN</option>
                <option>USER_REGISTERED</option>
                <option>CONVERSION_CREATED</option>
                <option>RATE_FETCHED</option>
                <option>FAILED_LOGIN</option>
                <option>USER_LOGOUT</option>
                <option>PROFILE_UPDATED</option>
                <option>PASSWORD_CHANGED</option>
                <option>TOKEN_REFRESHED</option>
                <option>CONVERSION_DELETED</option>
                <option>DASHBOARD_VIEWED</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                value={dateFilter}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>All Time</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>

        {events.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No audit events match your current filters.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet Timeline View (md+) */}
            <div className="hidden md:block">
              <div className="p-6">
                <div className="space-y-6">
                  {events.map((event: Event) => {
                    const config = getEventConfig(event.eventType);
                    const IconComponent = config.icon;

                    return (
                      <div
                        key={event._id}
                        className="flex items-start space-x-4"
                      >
                        {/* Event Icon */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">
                              {config.title}
                            </h3>
                            {getStatusBadge(config.status)}
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {getEventDescription(event)}
                          </p>

                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimestamp(event.timestamp)}
                            </span>

                            {event.metadata.ipAddress && (
                              <span>IP: {event.metadata.ipAddress}</span>
                            )}

                            {event.metadata.userAgent && (
                              <span>
                                Browser:{" "}
                                {getBrowserInfo(event.metadata.userAgent)}
                              </span>
                            )}

                            {event.metadata.rate && (
                              <span>Rate: {event.metadata.rate}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Card View (below md) */}
            <div className="md:hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {events.map((event: Event) => {
                  const config = getEventConfig(event.eventType);
                  const IconComponent = config.icon;

                  return (
                    <div
                      key={event._id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {config.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTimestampMobile(event.timestamp)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            {getStatusBadge(config.status)}
                            <button
                              onClick={() =>
                                setExpandedEvent(
                                  expandedEvent === event._id ? null : event._id
                                )
                              }
                              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {getEventDescription(event)}
                          </div>
                        </div>

                        {/* Collapsible Details */}
                        {expandedEvent === event._id && (
                          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">
                                Full Date:
                              </span>
                              <span className="text-gray-900 dark:text-white text-right">
                                {formatTimestamp(event.timestamp)}
                              </span>
                            </div>

                            {event.metadata.ipAddress && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  IP Address:
                                </span>
                                <span className="text-gray-900 dark:text-white font-mono text-xs">
                                  {event.metadata.ipAddress}
                                </span>
                              </div>
                            )}

                            {event.metadata.userAgent && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Browser:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {getBrowserInfo(event.metadata.userAgent)}
                                </span>
                              </div>
                            )}

                            {event.metadata.rate && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Exchange Rate:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {event.metadata.rate}
                                </span>
                              </div>
                            )}

                            {event.metadata.amount && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Amount:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {event.metadata.amount.toLocaleString()}{" "}
                                  {event.metadata.fromCurrency}
                                </span>
                              </div>
                            )}

                            {event.metadata.convertedAmount && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Converted:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {event.metadata.convertedAmount.toLocaleString()}{" "}
                                  {event.metadata.toCurrency}
                                </span>
                              </div>
                            )}

                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">
                                Event ID:
                              </span>
                              <span className="text-gray-900 dark:text-white font-mono text-xs break-all">
                                {event._id}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Quick Info - only show when not expanded */}
                        {expandedEvent !== event._id && (
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{formatTimestamp(event.timestamp)}</span>
                            {event.metadata.rate && (
                              <span>Rate: {event.metadata.rate}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
