import DesktopNav from "@/components/layout/header/desktop-nav";
import MobileNav from "@/components/layout/header/mobile-nav";
import AuthButtons from "@/features/auth/components/molecules/auth-buttons";
import UserMenu from "@/components/layout/header/user-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  let menuItems: MenuItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Course" },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-background shadow-sm gap-4">
      <div className="flex flex-0 items-center ">
        <DesktopNav menuItems={menuItems} />
        <MobileNav menuItems={menuItems} />
      </div>

      <nav className="flex flex-row flex-1">
        <Link href={"/"} className="w-full flex-1">
          <Button variant={"outline"} className="w-full flex-1 justify-start">
            Search...
          </Button>
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <AuthButtons />
        <UserMenu />
      </div>
    </header>
  );
}
