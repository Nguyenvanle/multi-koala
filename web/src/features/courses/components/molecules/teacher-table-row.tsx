import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TeacherCourseActions } from "@/features/courses/components/molecules/teacher-course-actions";
import { TeacherMyCourseBodyType } from "@/features/courses/types/teacher-my-courses";
import {
  getStatusColor,
  statusLabels,
} from "@/features/courses/utils/get-status-color";
import { dateFormatter } from "@/utils/date-formater";

interface TeacherTableRowProps {
  course: TeacherMyCourseBodyType;
  index: number;
}

export const TeacherTableRow: React.FC<TeacherTableRowProps> = ({
  course,
  index,
}) => {
  const date = dateFormatter(course.courseUploadedAt);
  const variant = getStatusColor(course.status);

  return (
    <TableRow>
      <TableCell className="table-cell font-medium">{index + 1}</TableCell>
      <TableCell className="hidden lg:table-cell">
        <Image
          sizes={"60"}
          width={60}
          height={60}
          src={course.image?.imageUrl ?? "/images/fallback-image.jpg"}
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
      <TableCell className="hidden lg:table-cell" title="dd/mm/yyyy">
        {date}
      </TableCell>
      <TableCell>
        <TeacherCourseActions courseId={course.courseId} />
      </TableCell>
    </TableRow>
  );
};
