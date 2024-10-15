"use client";

import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users2,
  Settings,
  Users,
  BookOpen,
  IconNode,
  LibraryBig,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TooltipItemProps {
  href: string;
  icon: any;
  label: string;
  isActive: boolean;
}

const TooltipItem = ({
  href,
  icon: Icon,
  label,
  isActive,
}: TooltipItemProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        href={href}
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">{label}</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent side="right">{label}</TooltipContent>
  </Tooltip>
);

const sidebarItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/courses", icon: LibraryBig, label: "Courses" },
  { href: "/dashboard/students", icon: Users, label: "Students" },
  { href: "/dashboard/analytics", icon: LineChart, label: "Analytics" },
];

const settingsItem = {
  href: "/dashboard/settings",
  icon: Settings,
  label: "Settings",
};

export default function Sidebar() {
  const pathname = usePathname();

  const isItemActive = (itemHref: string) => pathname.endsWith(`${itemHref}`);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 top-16 pt-2 hidden w-14 flex-col border-r bg-background md:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {sidebarItems.map((item, index) => (
          <TooltipItem
            key={index}
            {...item}
            isActive={isItemActive(item.href)}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipItem
          {...settingsItem}
          isActive={isItemActive(settingsItem.href)}
        />
      </nav>
    </aside>
  );
}
