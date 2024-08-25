import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
  variant?:
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined; // Có thể mở rộng thêm các kiểu khác
}

export default function LinkButton({ href, label, variant }: LinkButtonProps) {
  return (
    <Link href={href} passHref>
      <Button variant={variant}>{label}</Button>
    </Link>
  );
}
