import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RecentEnrollBodyType } from "@/features/enroll-courses/types/recent-enroll";

interface CourseTableProps {
  courseSales: RecentEnrollBodyType[];
}

export function CourseTable({ courseSales }: CourseTableProps) {
  const getSecondWord = (status: string) => {
    const words = status.split(" ");
    return words.length > 1 ? words[1] : status; // Trả về từ thứ hai hoặc chuỗi gốc nếu không có từ thứ hai
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead className="hidden md:table-cell">Course</TableHead>
          <TableHead className="hidden lg:table-cell">Status</TableHead>
          <TableHead className="hidden xl:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courseSales.map((sale, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{sale.studentName}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {sale.studentEmail}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {sale.courseName}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <Badge
                className="text-xs"
                variant={
                  sale.status.includes("Completed")
                    ? "default"
                    : sale.status.includes("progress")
                      ? "pending"
                      : "edit"
                }
              >
                {getSecondWord(sale.status).toLowerCase()}
              </Badge>
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              {new Date(sale.enrollAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              ${sale.coursePrice.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
