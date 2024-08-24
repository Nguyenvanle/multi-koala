import Logo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DesktopNav: React.FC<DesktopNavProps> = ({ menuItems }) => (
  <nav className="ml-6 hidden md:flex space-x-4">
    <Link href="/">
      <Logo />
    </Link>
    {menuItems.map((item) => (
      <Link key={item.label} href={item.href}>
        <Button variant={item.variant || "link"}>{item.label}</Button>
      </Link>
    ))}
  </nav>
);

export default DesktopNav;
