import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TableBody, Table } from "@/components/ui/table";
import {
  TeacherTableHeader,
  TeacherTableRow,
} from "@/features/courses/components/molecules";
import {
  TeacherMyCourseBodyType,
  TeacherMyCoursesBodyType,
} from "@/features/courses/types/teacher-my-courses";

export default function TeacherTable({
  courses,
}: {
  courses: TeacherMyCoursesBodyType;
}) {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>
          Manage your courses and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TeacherTableHeader />
          <TableBody>
            {courses.map((course: TeacherMyCourseBodyType) => (
              <TeacherTableRow key={course.courseId} course={course} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{courses.length}</strong> of{" "}
          <strong>{courses.length}</strong> courses
        </div>
      </CardFooter>
    </Card>
  );
}
