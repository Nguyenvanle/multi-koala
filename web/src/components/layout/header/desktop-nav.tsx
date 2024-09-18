"use client";

import Logo from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { useRoles } from "@/hooks/useRoles";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav({ menuItems }: DesktopNavProps) {
  const { hasRole } = useRoles();
  const path = usePathname();

  !hasRole("guest") &&
    (menuItems = [...menuItems, { href: "/dashboard", label: "Dashboard" }]);

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
            item.href === path && "text-primary"
          }`}
        >
          {item.label}
          {item.href === path ? (
            <Badge className="p-[1px]" />
          ) : (
            <Badge className="bg-background hover:shadow-none" />
          )}
        </Link>
      ))}
    </nav>
  );
}
