"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRoles } from "@/hooks/useRoles";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNav: React.FC<MobileNavProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasRole } = useRoles();

  !hasRole("guest") &&
    (menuItems = [...menuItems, { href: "/dashboard", label: "Dashboard" }]);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-[1.2rem] w-[1.2rem]" />

            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Duokoala</SheetTitle>

            <SheetDescription className="text-left">
              Navigation menu
            </SheetDescription>
          </SheetHeader>

          <nav className="flex flex-col space-y-4 mt-4">
            {menuItems.map((item) => (
              <SheetClose key={item.label} asChild>
                <Link href={item.href}>
                  <Button
                    variant={item.variant || "link"}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
