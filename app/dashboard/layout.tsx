import AuthButton from "@/components/AuthButton";
import DashboardSidebar from "@/components/DashboardSidebar";
import NavBar from "@/components/NavBar";
import { ModeToggle } from "@/components/theme-provider-toggle";
import { cn } from "@/lib/utils";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardSidebar></DashboardSidebar>
      <div className="sm:ml-[240px] max-h-screen">
        <NavBar />
        {children}
      </div>
    </>
  );
}
