"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link
            href={"/"}
            className="flex items-center justify-center"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FX</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Converter
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-6">
            <a
              href="#products"
              className="text-gray-700 hover:text-godlies-700 px-2 py-2 text-sm font-medium"
            >
              Products
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-godlies-700 px-2 py-2 text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-gray-700 hover:text-godlies-700 px-2 py-2 text-sm font-medium"
            >
              Solutions
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-godlies-700 px-2 py-2 text-sm font-medium"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-godlies-700 px-2 py-2 text-sm font-medium"
            >
              Pricing
            </a>
          </div>

          {/* Desktop authentication buttons */}
          <div className="hidden md:flex md:items-center gap-3">
            <Link
              href="/auth/login"
              className="bg-converter-100 text-converter-700 hover:bg-converter-200 rounded-lg px-2 lg:px-4  py-2 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-converter-600 text-white rounded-lg px-2 lg:px-4 py-2 text-sm font-medium hover:bg-converter-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-godlies-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-godlies-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#products"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-godlies-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Products
          </a>{" "}
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-godlies-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </a>
          <a
            onClick={() => setIsOpen(false)}
            href="#solutions"
            className="text-gray-700 hover:text-godlies-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Solutions
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-godlies-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-godlies-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <Link
                href="/auth/login"
                className="bg-converter-100 text-converter-700 rounded-lg px-4 py-2 text-sm font-medium w-full block text-center"
              >
                Sign In
              </Link>
            </div>
            <div className="ml-3">
              <Link
                href="/auth/register"
                className="bg-converter-600 text-white rounded-lg px-4 py-2 text-sm font-medium w-full block text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
