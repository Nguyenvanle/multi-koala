import { H4, List } from "@/components/ui/typography";
import { MORES } from "@/types/layout/footer";
import Link from "next/link";

export default function More() {
  return (
    <div className="flex flex-col">
      <H4>More</H4>
      {MORES.map((link, index) => (
        <Link key={index} href={link.href} className="mt-4">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
