import Header from "@/components/layout/header/header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center bg-secondary">{children}</main>
    </>
  );
}
