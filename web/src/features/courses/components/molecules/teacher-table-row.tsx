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
  index: number;
}

export const TeacherTableRow: React.FC<TeacherTableRowProps> = ({
  course,
  index,
}) => {
  const date = new Date(course.courseUploadedAt).toLocaleDateString();
  const variant = getStatusColor(course.status);

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell font-medium">
        {index + 1}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
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
        <Badge variant={variant} className="line-clamp-1 w-fit">
          {statusLabels[course.status]}
        </Badge>
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
      <TableCell className="hidden lg:table-cell">{date}</TableCell>
      <TableCell>
        <TeacherCourseActions />
      </TableCell>
    </TableRow>
  );
};
