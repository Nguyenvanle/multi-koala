"use client";

import { sidebarItems } from "@/types/layout/side-bar";
import { usePathname } from "next/navigation"; // Hook to get the current path

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="w-52 border-none bg-background hidden md:flex">
      <div className="py-4 pr-4 xl:py-6 xl:pr-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item, index) => {
            // Check if the current pathname starts with the sidebar item's path
            const isActive = pathname.startsWith(
              `/dashboard/${item.label.toLowerCase()}`
            );

            return (
              <a
                key={index}
                href={`/dashboard/${item.label.toLowerCase()}`} // Updated href to point to the correct route
                className={`flex items-center text-accent-foreground p-2 rounded ${
                  isActive ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <item.icon className="mr-2 text-primary" size={20} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
