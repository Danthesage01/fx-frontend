"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/lib/features/auth/authSlice";
import DashboardSidebar from "../../components/dashboard/shared/DashboardSidebar";
import { Menu } from "lucide-react";

// Fix: Properly define the component with props interface

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="flex">
      {/* Skeleton Sidebar */}
      <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-blue-200 rounded-lg mr-3"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center p-3 rounded-lg"
              >
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton Main Content */}
      <div className="flex-1 lg:ml-8">
        {/* Mobile Header Skeleton */}
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="p-4 lg:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 w-1/3 mb-6 rounded"></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 w-48 mb-6 rounded"></div>
              <div className="space-y-4">
                <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    // Fix: Pass props as JSX props, not function parameters
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isCollapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content - Responsive width based on sidebar state */}
        <div
          className={`
          flex-1 flex flex-col
          transition-all duration-300 ease-in-out
          ${
            // On large screens, adjust margin based on sidebar collapse state
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          }
          // On mobile, no margin (sidebar is overlay)
          ml-0
        `}
        >
          {/* Mobile Header */}
          <div className="sticky top-0  lg:hidden bg-white dark:bg-gray-800 shadow-sm p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-2 pt-4 pb-8 lg:p-8 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
