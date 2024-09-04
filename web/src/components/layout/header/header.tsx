import DesktopNav from "@/components/layout/header/desktop-nav";
import MobileNav from "@/components/layout/header/mobile-nav";
import AuthButtons from "@/features/auth/components/molecules/auth-buttons";
import UserMenu from "@/components/layout/header/user-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/header/mode-toogle";

export default function Header() {
  let menuItems: MenuItems = [
    { href: "/home", label: "Home" },
    { href: "/courses", label: "Course" },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background shadow-sm gap-4">
      <div className="flex flex-0 items-center ">
        <DesktopNav menuItems={menuItems} />
        <MobileNav menuItems={menuItems} />
      </div>

      <nav className="flex flex-row flex-1">
        <Link href={"/"} className="w-full">
          <Button variant={"outline"} className="w-full justify-start">
            Search...
          </Button>
        </Link>
      </nav>

      <div className="flex flex-0 items-center space-x-2">
        <AuthButtons />
        <UserMenu />
        <ModeToggle />
      </div>
    </header>
  );
}
