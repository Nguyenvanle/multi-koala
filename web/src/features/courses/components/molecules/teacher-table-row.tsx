import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TeacherCourseActions } from "@/features/courses/components/molecules/teacher-course-actions";
import { TeacherMyCourseBodyType } from "@/features/courses/types/teacher-my-courses";
import {
  getStatusColor,
  statusLabels,
} from "@/features/courses/utils/get-status-color";

interface TeacherTableRowProps {
  course: TeacherMyCourseBodyType;
}

export const TeacherTableRow: React.FC<TeacherTableRowProps> = ({ course }) => {
  const date = new Date(course.courseUploadedAt).toLocaleDateString();
  const variant = getStatusColor(course.status);

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          priority
          width={60}
          height={60}
          src={course.image.imageUrl}
          alt={`${course.courseName} image`}
          className="aspect-square rounded-md object-cover"
        />
      </TableCell>
      <TableCell className="font-medium">{course.courseName}</TableCell>
      <TableCell>
        <Badge variant={variant}>{statusLabels[course.status]}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        ${course.coursePrice.toFixed(0)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        ${course.income.toFixed(0)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {course.totalEnrollments}
      </TableCell>
      <TableCell className="hidden md:table-cell">{date}</TableCell>
      <TableCell>
        <TeacherCourseActions />
      </TableCell>
    </TableRow>
  );
};
