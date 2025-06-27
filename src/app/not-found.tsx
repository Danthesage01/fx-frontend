"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or 'next/router' for Pages Router

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Automatically redirect after a few seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex h-[calc(100vh-150px)] items-center justify-center md:h-[calc(100vh-50px)]">
      <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
            404
          </h1>
        </div>
        <div className="max-w-md text-gray-500">
          <p className="mb-4 px-1 text-gray-800 text-xl leading-normal font-bold md:px-0 md:text-2xl">
            Sorry we couldn't find this page.
          </p>
          <p className="my-2 px-1 md:px-0">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <p className="mb-8 px-1 md:px-0">
            Click the button or wait to be taken back home
          </p>
          <div className="flex w-full items-center justify-center md:inline">
            <Link
              href="/"
              className="focus:shadow-outline-blue group from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 border-primary-400/30 mx-auto inline transform rounded-full border bg-gradient-to-r px-4 py-3 text-center text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 focus:outline-hidden bg-gray-900"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
