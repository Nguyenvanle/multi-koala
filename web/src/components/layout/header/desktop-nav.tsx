"use client";

import Logo from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/contexts/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav({ menuItems }: DesktopNavProps) {
  const { user } = useAuth();
  const path = usePathname();

  // Kiểm tra nếu user có role là "TEACHER" hoặc "ADMIN"
  const hasTeacherOrAdminRole = user?.roles.some(
    (role) => role.roleName === "TEACHER" || role.roleName === "ADMIN"
  );

  if (hasTeacherOrAdminRole) {
    menuItems = [
      ...menuItems,
      { href: "/dashboard/courses", label: "Dashboard" },
    ];
  }

  // Hàm kiểm tra xem đường dẫn hiện tại có bắt đầu bằng href của menu item không
  const isActive = (href: string) => {
    return path.startsWith(href);
  };

  return (
    <nav className="hidden md:flex space-x-4 flex-0 ">
      <Link href="/">
        <Logo />
      </Link>
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col gap-1 mt-2 ${
            isActive(item.href) ? "text-primary" : ""
          }`}
        >
          {item.label}
          {isActive(item.href) ? (
            <Badge className="p-[1px]" />
          ) : (
            <Badge className="bg-background hover:shadow-none hover:bg-background" />
          )}
        </Link>
      ))}
    </nav>
  );
}