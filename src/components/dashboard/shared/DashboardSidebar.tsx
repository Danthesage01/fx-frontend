"use client";

import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";
import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRightLeft,
  History,
  FileText,
  LogOut,
  X,
  ChevronLeft,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapse: () => void;
}

export default function DashboardSidebar({
  isOpen,
  onToggle,
  isCollapsed,
  onCollapse,
}: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // Auto-expand sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && isCollapsed) {
        // lg breakpoint
        onCollapse(); // This will toggle to expanded
      }
    };

    // Check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed, onCollapse]);

  const navigationItems = [
    {
      href: "/dashboard",
      icon: ArrowRightLeft,
      label: "Converter",
    },
    {
      href: "/dashboard/transaction-history",
      icon: History,
      label: "Transaction History",
    },
    {
      href: "/dashboard/audit-trail",
      icon: FileText,
      label: "Audit Trails",
    },
  ];

  // Function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // On mobile, always show expanded version
  const isMobileExpanded =
    typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Fixed position, doesn't scroll with content */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50
        ${isCollapsed && !isMobileExpanded ? "lg:w-16" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        bg-white dark:bg-gray-800 shadow-md h-screen
        transition-all duration-300 ease-in-out
        flex flex-col
        overflow-hidden
      `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#"
              onClick={onCollapse}
              className="flex items-center space-x-3 min-w-0"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">FX</span>
              </div>
              {/* Always show text on mobile, respect collapse on desktop */}
              {(!isCollapsed || isMobileExpanded) && (
                <>
                  <span className="text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    Converter
                  </span>
                  <ChevronLeft className="h-6 w-6 hidden lg:block flex-shrink-0" />
                </>
              )}
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation - Scrollable if content overflows */}
        <nav className="flex-1 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            const showLabel = !isCollapsed || isMobileExpanded;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center p-3  transition-colors group
                  ${isCollapsed && !isMobileExpanded ? "lg:justify-center" : "justify-start"}
                  min-w-0 relative
                  ${
                    isActive
                      ? "text-blue-700 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
                style={isActive ? { backgroundColor: "#DBEAFE" } : {}}
                title={
                  isCollapsed && !isMobileExpanded ? item.label : undefined
                }
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-700" : ""}`}
                />
                {showLabel && (
                  <span
                    className={`ml-3 font-medium whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? "text-blue-700" : ""}`}
                  >
                    {item.label}
                  </span>
                )}

                {/* Active indicator dot for collapsed state (desktop only) */}
                {isActive && isCollapsed && !isMobileExpanded && (
                  <div className="absolute right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="pb-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full p-3   text-red-600 
              hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 transition-colors
              ${isCollapsed && !isMobileExpanded ? "lg:justify-center" : "justify-start"}
              min-w-0
            `}
            title={isCollapsed && !isMobileExpanded ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {(!isCollapsed || isMobileExpanded) && (
              <span className="ml-3 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
