import { QUICK_LINKS } from "@/types/layout/footer";
import Link from "next/link";

export const QuickLinks = () => (
  <div className="flex flex-col">
    <h5 className="font-bold mb-2">Quick Links</h5>
    {QUICK_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="mb-2 hover:text-gray-400"
      >
        {link.label}
      </Link>
    ))}
  </div>
);
