import { H4, List } from "@/components/ui/typography";
import { QUICK_LINKS, RESOURCES } from "@/types/layout/footer";
import Link from "next/link";

export const Resources = () => (
  <div className="flex flex-col">
    <H4>Resources</H4>
    {RESOURCES.map((link, index) => (
      <Link key={index} href={link.href} className="mt-4">
        {link.label}
      </Link>
    ))}
  </div>
);
