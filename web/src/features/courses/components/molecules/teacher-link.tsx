// src/features/courses/components/molecules/TeacherLink.tsx
import Link from "next/link";

type TeacherLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export const TeacherLink: React.FC<TeacherLinkProps> = ({
  children,
  className,
  href,
}) => (
  <Link
    href={href}
    className={"hover:text-primary mt-1.5 font-medium " + className}
  >
    {children}
  </Link>
);
