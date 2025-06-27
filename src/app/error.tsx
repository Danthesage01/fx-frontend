"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-gray-300 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Go to Home Page
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md text-left">
            <p className="font-semibold text-red-500 mb-2">Error details:</p>
            <p className="text-sm font-mono overflow-auto whitespace-pre-wrap">
              {error.message}
              {error.stack && <span className="block mt-2">{error.stack}</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
