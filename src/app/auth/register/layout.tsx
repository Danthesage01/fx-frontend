import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page - FX Converter",
  description: "Register an account on FX Converter",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
