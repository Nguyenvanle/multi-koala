import { CourseCardProps } from "@/types/course/course";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentsCard({ lessons }: CourseCardProps) {
  return (
    <Card className="flex flex-0 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex flex-0 pb-0">
        <CardTitle>Student</CardTitle>
      </CardHeader>

      <CardFooter className="flex flex-1 flex-col pr-4">
        <CardDescription>Students</CardDescription>
        <div className="flex flex-row gap-4 bg-accent">
          <Skeleton className="flex h-20" />
          <Skeleton className="flex h-20" />
          <Skeleton className="flex h-20" />
          <Skeleton className="flex h-20" />
          <Skeleton className="flex h-20" />
          <Skeleton className="flex h-20" />
        </div>
      </CardFooter>
    </Card>
  );
}
