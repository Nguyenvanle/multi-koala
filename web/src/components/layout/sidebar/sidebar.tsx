"use client";

import { sidebarItems } from "@/types/layout/side-bar";
import { usePathname } from "next/navigation"; // Nhập hook để lấy đường dẫn hiện tại

export default function Sidebar() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Chỉ lấy phần cuối của pathname để khớp với label
  const currentRoute = pathname.split("/").pop()?.toLowerCase(); // Lấy phần cuối của đường dẫn

  return (
    <div className="w-52 border-none bg-background hidden md:flex">
      <div className="py-4 pr-4 xl:py-6 xl:pr-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href={`/dashboard/${item.label.toLowerCase()}`} // Cập nhật href để link đến đúng đường dẫn
              className={`flex items-center text-accent-foreground p-2 rounded ${
                currentRoute === item.label.toLowerCase() // So sánh với currentRoute để xác định item đang được chọn
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
            >
              <item.icon className="mr-2 text-primary" size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
