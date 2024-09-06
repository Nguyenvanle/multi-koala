import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
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

export default function LinkButton({
  href,
  label,
  variant,
  className,
}: LinkButtonProps) {
  return (
    <Link href={href} passHref className={className}>
      <Button variant={variant} className={className}>
        {label}
      </Button>
    </Link>
  );
}
