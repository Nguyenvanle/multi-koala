import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TeacherCourseActions } from "@/features/courses/components/molecules/teacher-course-actions";

export const TeacherTableRow: React.FC<any> = ({ course }) => (
  <TableRow>
    <TableCell className="hidden sm:table-cell">
      <Image
        alt={`${course.name} image`}
        className="aspect-square rounded-md object-cover"
        height="64"
        src={course.imageSrc}
        width="64"
      />
    </TableCell>
    <TableCell className="font-medium">{course.name}</TableCell>
    <TableCell>
      <Badge variant={course.status === "Active" ? "outline" : "secondary"}>
        {course.status}
      </Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell">${course.price}</TableCell>
    <TableCell className="hidden md:table-cell">{course.totalSales}</TableCell>
    <TableCell className="hidden md:table-cell">{course.createdAt}</TableCell>
    <TableCell>
      <TeacherCourseActions />
    </TableCell>
  </TableRow>
);
