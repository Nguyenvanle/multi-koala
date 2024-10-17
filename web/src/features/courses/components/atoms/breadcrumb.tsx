import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string; // Tên của breadcrumb
  href?: string; // Link điều hướng (nếu có)
  icon?: React.ReactNode; // Icon cho breadcrumb (nếu có)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]; // Danh sách các breadcrumb
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 ">
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {item.href ? (
            // Nếu có href thì hiển thị link điều hướng
            <Link
              href={item.href}
              className="inline-flex items-center text-md font-medium text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-muted-foreground"
            >
              {item.label}
            </Link>
          ) : (
            // Nếu không có href thì hiển thị văn bản thông thường
            <span className="inline-flex items-center text-md font-medium text-foreground">
              {item.label}
            </span>
          )}
          {/* Chỉ hiển thị ChevronRight nếu không phải phần tử cuối */}
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-foreground mx-1" />
          )}
        </li>
      ))}
    </ol>
  </nav>
);
