import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  TeacherTableHeader,
  TeacherTableRow,
} from "@/features/courses/components/molecules";

export default function TeacherTable({ courses, totalCourses }: any) {
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
            {courses.map((course: any) => (
              <TeacherTableRow key={course.id} course={course} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{courses.length}</strong> of{" "}
          <strong>{totalCourses}</strong> courses
        </div>
      </CardFooter>
    </Card>
  );
}
