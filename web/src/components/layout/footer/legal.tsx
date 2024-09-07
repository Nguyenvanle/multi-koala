import { H4, List } from "@/components/ui/typography";
import { LEGALS } from "@/types/layout/footer";
import Link from "next/link";

export default function Legal() {
  return (
    <div className="flex flex-col">
      <H4>Legal</H4>
      {LEGALS.map((link) => (
        <Link key={link.label} href={link.href}>
          <List className="ml-0 mb-0 mt-4">{link.label}</List>
        </Link>
      ))}
    </div>
  );
}
