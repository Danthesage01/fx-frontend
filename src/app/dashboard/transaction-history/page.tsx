"use client";

import { useState, useMemo } from "react";
import {
  useGetUserConversionsQuery,
  useDeleteConversionMutation,
  Conversion,
} from "@/lib/apiServices/conversionApi";
import {
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Calendar,
  Filter,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
} from "lucide-react";
import { Pagination } from "@/components/Paginations";

interface FilterState {
  search: string;
  fromCurrency: string;
  toCurrency: string;
  dateRange: string;
  minAmount: string;
  maxAmount: string;
  status: string;
}

interface SortConfig {
  key: keyof Conversion | "none";
  direction: "asc" | "desc";
}

export default function TransactionHistory(): JSX.Element {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [loadAllTransactions, setLoadAllTransactions] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });
  const itemsPerPage = 5;

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    fromCurrency: "",
    toCurrency: "",
    dateRange: "all",
    minAmount: "",
    maxAmount: "",
    status: "all",
  });

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.fromCurrency ||
      filters.toCurrency ||
      filters.dateRange !== "all" ||
      filters.minAmount ||
      filters.maxAmount ||
      filters.status !== "all"
    );
  }, [filters]);

  // Determine if we should use backend pagination or frontend pagination
  const useBackendPagination = !hasActiveFilters && !loadAllTransactions;

  // Fetch transactions
  const {
    data: conversionsData,
    isLoading,
    error,
    refetch,
  } = useGetUserConversionsQuery({
    page: useBackendPagination ? currentPage : 1,
    limit: loadAllTransactions
      ? 10000
      : useBackendPagination
        ? itemsPerPage
        : 100,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [deleteConversion] = useDeleteConversionMutation();

  const allConversions: Conversion[] = conversionsData?.data || [];
  const backendPagination = conversionsData?.pagination;

  // Get unique currencies for filter dropdowns
  const uniqueCurrencies = useMemo(() => {
    const currencies = new Set<string>();
    allConversions.forEach((conv) => {
      currencies.add(conv.fromCurrency);
      currencies.add(conv.toCurrency);
    });
    return Array.from(currencies).sort();
  }, [allConversions]);

  // Frontend filtering logic
  const filteredConversions = useMemo(() => {
    if (useBackendPagination) {
      return allConversions; // No filtering needed for backend pagination
    }

    let filtered = [...allConversions];

    // Search filter (currency codes, amounts, or IDs)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (conv) =>
          conv.fromCurrency.toLowerCase().includes(searchLower) ||
          conv.toCurrency.toLowerCase().includes(searchLower) ||
          `${conv.fromCurrency}/${conv.toCurrency}`
            .toLowerCase()
            .includes(searchLower) ||
          conv.amount.toString().includes(searchLower) ||
          conv.convertedAmount.toString().includes(searchLower) ||
          conv._id.toLowerCase().includes(searchLower)
      );
    }

    // From currency filter
    if (filters.fromCurrency) {
      filtered = filtered.filter(
        (conv) => conv.fromCurrency === filters.fromCurrency
      );
    }

    // To currency filter
    if (filters.toCurrency) {
      filtered = filtered.filter(
        (conv) => conv.toCurrency === filters.toCurrency
      );
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      let cutoffDate: Date;

      switch (filters.dateRange) {
        case "7d":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "90d":
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "today":
          cutoffDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "week":
          cutoffDate = new Date(
            now.getTime() - now.getDay() * 24 * 60 * 60 * 1000
          );
          break;
        case "month":
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          cutoffDate = new Date(0);
      }

      filtered = filtered.filter(
        (conv) => new Date(conv.createdAt) >= cutoffDate
      );
    }

    // Amount range filters
    if (filters.minAmount) {
      filtered = filtered.filter(
        (conv) => conv.amount >= parseFloat(filters.minAmount)
      );
    }

    if (filters.maxAmount) {
      filtered = filtered.filter(
        (conv) => conv.amount <= parseFloat(filters.maxAmount)
      );
    }

    return filtered;
  }, [allConversions, filters, useBackendPagination]);

  // Frontend sorting
  const sortedConversions = useMemo(() => {
    if (useBackendPagination || sortConfig.key === "none") {
      return filteredConversions;
    }

    return [...filteredConversions].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof Conversion];
      const bVal = b[sortConfig.key as keyof Conversion];

      let comparison = 0;

      // Handle different data types
      if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
        const aDate = new Date(aVal as string);
        const bDate = new Date(bVal as string);
        comparison = aDate.getTime() - bDate.getTime();
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortConfig.direction === "desc" ? -comparison : comparison;
    });
  }, [filteredConversions, sortConfig, useBackendPagination]);

  // Frontend pagination for filtered results
  const paginatedConversions = useMemo(() => {
    if (useBackendPagination) {
      return sortedConversions; // Backend already paginated
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedConversions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedConversions, currentPage, useBackendPagination]);

  // Create pagination object for frontend pagination
  const frontendPagination = useMemo(() => {
    if (useBackendPagination) {
      return null;
    }

    const totalPages = Math.ceil(sortedConversions.length / itemsPerPage);
    return {
      currentPage,
      totalPages,
      page: currentPage,
      limit: itemsPerPage,
      total: sortedConversions.length,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }, [sortedConversions.length, currentPage, useBackendPagination]);

  // Determine which pagination to use
  const paginationData = useBackendPagination
    ? backendPagination
    : frontendPagination;

  // Update filter
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      fromCurrency: "",
      toCurrency: "",
      dateRange: "all",
      minAmount: "",
      maxAmount: "",
      status: "all",
    });
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (key: keyof Conversion) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Get sort icon
  const getSortIcon = (key: keyof Conversion) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 text-blue-500" />
    ) : (
      <ArrowDown className="h-4 w-4 text-blue-500" />
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this conversion?")) {
      try {
        await deleteConversion(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete conversion:", error);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "From",
      "To",
      "Amount",
      "Rate",
      "Converted",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...sortedConversions.map((conversion) =>
        [
          new Date(conversion.createdAt).toLocaleDateString(),
          conversion.fromCurrency,
          conversion.toCurrency,
          conversion.amount.toFixed(2),
          conversion.rate.toFixed(4),
          conversion.convertedAmount.toFixed(2),
          "Completed",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction-history-filtered-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = () => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
      Completed
    </span>
  );

  // Helper functions for formatting
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatRate = (rate: number) => {
    return rate.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transaction History
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transaction History
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {hasActiveFilters
              ? `Showing ${sortedConversions.length} of ${
                  useBackendPagination
                    ? backendPagination?.total || 0
                    : allConversions.length
                } filtered transactions`
              : `${useBackendPagination ? backendPagination?.total || 0 : allConversions.length} total transactions`}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              hasActiveFilters
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-400"
                : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </button>

          <button
            onClick={handleExportCSV}
            disabled={sortedConversions.length === 0}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
            <span>({sortedConversions.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Transactions
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  placeholder="Currency, amount, ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Currency
              </label>
              <select
                value={filters.fromCurrency}
                onChange={(e) => updateFilter("fromCurrency", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All currencies</option>
                {uniqueCurrencies.map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Currency
              </label>
              <select
                value={filters.toCurrency}
                onChange={(e) => updateFilter("toCurrency", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All currencies</option>
                {uniqueCurrencies.map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => updateFilter("dateRange", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>
            </div>

            {/* Min Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Amount
              </label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => updateFilter("minAmount", e.target.value)}
                placeholder="0"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Max Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Amount
              </label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => updateFilter("maxAmount", e.target.value)}
                placeholder="∞"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Results summary */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {useBackendPagination ? (
                <>
                  Showing {backendPagination?.total || 0} transactions
                  {backendPagination &&
                    backendPagination.total > allConversions.length && (
                      <span className="ml-2 text-blue-600">
                        ({backendPagination.total} total available)
                      </span>
                    )}
                </>
              ) : (
                <>
                  Showing {sortedConversions.length} of {allConversions.length}{" "}
                  transactions
                  {backendPagination &&
                    backendPagination.total > allConversions.length && (
                      <span className="ml-2 text-blue-600">
                        ({backendPagination.total} total available)
                      </span>
                    )}
                </>
              )}
            </div>

            {/* Load All Button */}
            {backendPagination &&
              backendPagination.total > allConversions.length && (
                <button
                  onClick={() => {
                    setLoadAllTransactions(true);
                    refetch();
                  }}
                  disabled={isLoading}
                  className="text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded transition-colors"
                >
                  {isLoading ? "Loading..." : "Load All Transactions"}
                </button>
              )}
          </div>
        </div>
      )}

      {/* Transaction Table - Responsive Design */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {paginatedConversions.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {hasActiveFilters
                ? "No matching transactions"
                : "No transactions found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {hasActiveFilters
                ? "Try adjusting your filters to see more results."
                : "You haven't made any currency conversions yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (lg+) */}
            <div className="hidden lg:block">
              {/* Table Header */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-7 gap-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 text-left"
                    disabled={useBackendPagination}
                  >
                    <span>Date</span>
                    {!useBackendPagination && getSortIcon("createdAt")}
                  </button>
                  <button
                    onClick={() => handleSort("fromCurrency")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 text-left"
                    disabled={useBackendPagination}
                  >
                    <span>From</span>
                    {!useBackendPagination && getSortIcon("fromCurrency")}
                  </button>
                  <button
                    onClick={() => handleSort("toCurrency")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 text-left"
                    disabled={useBackendPagination}
                  >
                    <span>To</span>
                    {!useBackendPagination && getSortIcon("toCurrency")}
                  </button>
                  <button
                    onClick={() => handleSort("amount")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 text-left"
                    disabled={useBackendPagination}
                  >
                    <span>Amount</span>
                    {!useBackendPagination && getSortIcon("amount")}
                  </button>
                  <button
                    onClick={() => handleSort("rate")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 text-left"
                    disabled={useBackendPagination}
                  >
                    <span>Rate</span>
                    {!useBackendPagination && getSortIcon("rate")}
                  </button>
                  <button
                    onClick={() => handleSort("convertedAmount")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 text-left"
                    disabled={useBackendPagination}
                  >
                    <span>Converted</span>
                    {!useBackendPagination && getSortIcon("convertedAmount")}
                  </button>
                  <div>Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedConversions.map((conversion: Conversion) => (
                  <div
                    key={conversion._id}
                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="grid grid-cols-7 gap-4 items-center">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatDate(conversion.createdAt)}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {conversion.fromCurrency}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {conversion.toCurrency}
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatAmount(conversion.amount)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatRate(conversion.rate)}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatAmount(conversion.convertedAmount)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge()}
                        <button
                          onClick={() => handleDelete(conversion._id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                          title="Delete conversion"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet View (md to lg) */}
            <div className="hidden md:block lg:hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedConversions.map((conversion: Conversion) => (
                  <div
                    key={conversion._id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Conversion
                          </span>
                          {getStatusBadge()}
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {conversion.fromCurrency} → {conversion.toCurrency}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(conversion.createdAt)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatAmount(conversion.amount)}{" "}
                            {conversion.fromCurrency}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Rate: {formatRate(conversion.rate)}
                          </div>
                          <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            {formatAmount(conversion.convertedAmount)}{" "}
                            {conversion.toCurrency}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDelete(conversion._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                            title="Delete conversion"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card View (below md) */}
            <div className="md:hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedConversions.map((conversion: Conversion) => (
                  <div
                    key={conversion._id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {conversion.fromCurrency} → {conversion.toCurrency}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge()}
                          <button
                            onClick={() =>
                              setExpandedRow(
                                expandedRow === conversion._id
                                  ? null
                                  : conversion._id
                              )
                            }
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Amount Display */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Amount
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatAmount(conversion.amount)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {conversion.fromCurrency}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Converted
                            </div>
                            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {formatAmount(conversion.convertedAmount)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {conversion.toCurrency}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Collapsible Details */}
                      {expandedRow === conversion._id && (
                        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              Rate:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {formatRate(conversion.rate)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              Date:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {formatDate(conversion.createdAt)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              ID:
                            </span>
                            <span className="text-gray-900 dark:text-white font-mono text-xs">
                              {conversion._id}
                            </span>
                          </div>
                          <div className="pt-2">
                            <button
                              onClick={() => handleDelete(conversion._id)}
                              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete Transaction</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Quick Info */}
                      {expandedRow !== conversion._id && (
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{formatDate(conversion.createdAt)}</span>
                          <span>Rate: {formatRate(conversion.rate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {paginationData && paginationData.totalPages > 1 && (
              <Pagination
                pagination={paginationData}
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
