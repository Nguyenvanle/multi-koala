import { H4, List } from "@/components/ui/typography";
import { MORES } from "@/types/layout/footer";
import Link from "next/link";

export default function More() {
  return (
    <div className="flex flex-col">
      <H4>More</H4>
      {MORES.map((link) => (
        <Link key={link.label} href={link.href}>
          <List className="ml-0 mb-0 mt-4">{link.label}</List>
        </Link>
      ))}
    </div>
  );
}
