import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagination: {
    totalPages: number;
    page: number;
    limit: number;
    total: number;
    hasPrev: boolean;
    hasNext: boolean;
  } | null;
}

export function Pagination({
  currentPage,
  setCurrentPage,
  pagination,
}: PaginationProps) {
  // Pagination handlers
  console.log(pagination);
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (pagination?.hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (pagination?.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers to show - responsive version
  const getPageNumbers = () => {
    if (!pagination) return [];

    const { totalPages } = pagination;
    const pages = [];

    // Mobile: Show fewer pages (3 max)
    // Desktop: Show more pages (5-7 max)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxPagesToShow = isMobile ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Advanced pagination with ellipsis for desktop
  const getAdvancedPageNumbers = () => {
    if (!pagination) return [];

    const { totalPages } = pagination;
    const pages = [];
    const delta = 2; // Number of pages to show around current page

    // Always show first page
    pages.push(1);

    // Add ellipsis after first page if needed
    if (currentPage - delta > 2) {
      pages.push("...");
    }

    // Add pages around current page
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis before last page if needed
    if (currentPage + delta < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if different from first)
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <>
      {/* Desktop Pagination */}
      <div className="hidden sm:block bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Results info */}
          <div className="flex items-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing{" "}
              <span className="font-medium">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of <span className="font-medium">{pagination.total}</span> events
            </p>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-center sm:justify-end space-x-2">
            {/* Previous button */}
            <button
              onClick={goToPrevious}
              disabled={!pagination.hasPrev}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Advanced page numbers for desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {getAdvancedPageNumbers().map((pageNum, index) => (
                <div key={`${pageNum}-${index}`}>
                  {pageNum === "..." ? (
                    <span className="px-3 py-1 text-gray-500 dark:text-gray-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </span>
                  ) : (
                    <button
                      onClick={() => goToPage(pageNum as number)}
                      className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                        pageNum === currentPage
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Simple page numbers for tablet */}
            <div className="md:hidden flex items-center space-x-1">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={goToNext}
              disabled={!pagination.hasNext}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className="sm:hidden bg-gray-50 dark:bg-gray-700 px-4 py-4 border-t border-gray-200 dark:border-gray-600">
        {/* Results info - Mobile */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{pagination.totalPages}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {pagination.total} total events
          </p>
        </div>

        {/* Mobile pagination controls */}
        <div className="flex items-center justify-between">
          {/* Previous button - Mobile */}
          <button
            onClick={goToPrevious}
            disabled={!pagination.hasPrev}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pagination.hasPrev
                ? "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 border border-gray-300 dark:border-gray-500"
                : "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {/* Page indicator */}
          <div className="flex items-center space-x-1">
            {/* Show 3 page numbers max on mobile */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 h-10 text-sm rounded-lg font-medium transition-colors ${
                  pageNum === currentPage
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 border border-gray-300 dark:border-gray-500"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Next button - Mobile */}
          <button
            onClick={goToNext}
            disabled={!pagination.hasNext}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pagination.hasNext
                ? "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 border border-gray-300 dark:border-gray-500"
                : "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick jump to first/last pages on mobile */}
        {pagination.totalPages > 5 && (
          <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            {currentPage > 3 && (
              <button
                onClick={() => goToPage(1)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Go to first page
              </button>
            )}
            {currentPage < pagination.totalPages - 2 && (
              <button
                onClick={() => goToPage(pagination.totalPages)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Go to last page
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
