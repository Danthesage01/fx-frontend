import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page - FX Converter",
  description: "Provide your login credentials for FX Converter",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
