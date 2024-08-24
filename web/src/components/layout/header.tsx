"use client";
import { useRoles } from "@/hooks/useRoles";
import DesktopNav from "@/components/layout/header/desktop-nav";
import MobileNav from "@/components/layout/header/mobile-nav";
import AuthButtons from "@/features/auth/components/molecules/auth-buttons";
import UserMenu from "@/components/layout/header/user-menu";

export default function Header() {
  const { hasRole } = useRoles();

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Course" },
    { href: "/", label: "Search...", variant: "outline" as const },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-background shadow-sm">
      <div className="flex items-center">
        <DesktopNav menuItems={menuItems} />
        <MobileNav menuItems={menuItems} />
      </div>

      <div className="flex items-center space-x-4">
        {hasRole("guest") ? <AuthButtons /> : <UserMenu />}
      </div>
    </header>
  );
}
