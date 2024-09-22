import DesktopNav from "@/components/layout/header/desktop-nav";
import MobileNav from "@/components/layout/header/mobile-nav";
import AuthButtons from "@/features/auth/components/molecules/auth-buttons";
import UserMenu from "@/components/layout/header/user-menu";
import { ModeToggle } from "@/components/layout/header/mode-toggle";
import SearchDialog from "@/components/layout/header/search-dialog";

export default function Header() {
  let menuItems: MenuItems = [
    { href: "/home", label: "Home" },
    { href: "/courses", label: "Courses" },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background shadow gap-4">
      <div className=" flex flex-2 items-center ">
        <DesktopNav menuItems={menuItems} />
        <MobileNav menuItems={menuItems} />
      </div>

      <nav className="flex flex-1 justify-end">
        <nav className="flex flex-row flex-grow justify-end md:flex-grow-0">
          <SearchDialog />
        </nav>
      </nav>

      <div className="flex flex-0 items-center space-x-2">
        <AuthButtons />
        <UserMenu />
        <ModeToggle />
      </div>
    </header>
  );
}
