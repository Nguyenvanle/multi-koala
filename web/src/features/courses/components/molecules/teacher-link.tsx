// src/features/courses/components/molecules/TeacherLink.tsx
import Link from "next/link";

type TeacherLinkProps = {
  teacherName: string;
};

export const TeacherLink: React.FC<TeacherLinkProps> = ({ teacherName }) => (
  <Link href="" className="hover:text-primary mt-1.5 font-medium">
    {teacherName}
  </Link>
);
