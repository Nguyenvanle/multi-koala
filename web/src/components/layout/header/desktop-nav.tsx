"use client";
import Logo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { useRoles } from "@/hooks/useRoles";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav({ menuItems }: DesktopNavProps) {
  const { hasRole } = useRoles();
  const path = usePathname();

  !hasRole("guest") &&
    (menuItems = [...menuItems, { href: "/dashboard", label: "Dashboard" }]);

  return (
    <nav className="hidden md:flex space-x-4 flex-0">
      <Link href="/">
        <Logo />
      </Link>
      {menuItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <Button
            variant={item.variant || "link"}
            className={`h-full ${
              item.href === path && "text-primary underline underline-offset-4"
            }`}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
