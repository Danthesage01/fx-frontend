"use client";

import {
  selectAccessToken,
  selectIsAuthenticated,
} from "@/lib/features/auth/authSlice";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import FxConverter from "@/components/dashboard/converter/FxConverter"; // Your converter component

export default function DashboardPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);

  if (!isAuthenticated || !accessToken) {
    redirect("/auth/login");
    return null;
  }

  return <FxConverter />;
}
