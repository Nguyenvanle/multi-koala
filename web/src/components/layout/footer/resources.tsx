import { H4, List } from "@/components/ui/typography";
import { QUICK_LINKS, RESOURCES } from "@/types/layout/footer";
import Link from "next/link";

export const Resources = () => (
  <div className="flex flex-col">
    <H4>Resources</H4>
    {RESOURCES.map((link) => (
      <Link key={link.label} href={link.href}>
        <List className="ml-0 mb-0 mt-4">{link.label}</List>
      </Link>
    ))}
  </div>
);
