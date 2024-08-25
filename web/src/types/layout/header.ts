type MenuItem = {
  href: string;
  label: string;
  variant?: "outline" | "link";
};

type MenuItems = {
  href: string;
  label: string;
  variant?: "outline" | "link";
}[];


type DesktopNavProps = {
  menuItems: MenuItem[];
};

type MobileNavProps = {
  menuItems: MenuItem[];
};
