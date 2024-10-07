import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-grow">{children}</main>
      <Footer />
    </>
  );
}
