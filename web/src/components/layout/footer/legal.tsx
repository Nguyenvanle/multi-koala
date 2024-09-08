import { H4, List } from "@/components/ui/typography";
import { LEGALS } from "@/types/layout/footer";
import Link from "next/link";

export default function Legal() {
  return (
    <div className="flex flex-col">
      <H4>Legal</H4>

      {LEGALS.map((link, index) => (
        <Link key={index} href={link.href} className="mt-4">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
