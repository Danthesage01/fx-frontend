import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import ReduxProvider from "@/components/common/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FX Converter",
  description: "Seamless FX Converter for Global Commerce",
  icons: {
    icon: [
      {
        url: "/fx.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={7000}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
