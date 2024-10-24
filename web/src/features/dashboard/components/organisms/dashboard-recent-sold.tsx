import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseTable } from "@/features/dashboard/components/molecules/course-table";
import { RecentEnrollBodyType } from "@/features/enroll-courses/types/recent-enroll";

interface DashboardRecentlySoldCoursesProps {
  courseSales: RecentEnrollBodyType[];
}

export default function DashboardRecentlySoldCourses({
  courseSales,
}: DashboardRecentlySoldCoursesProps) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recently Sold Courses</CardTitle>
          <CardDescription>
            Your recent course has been purchased.
          </CardDescription>
        </div>
        {courseSales.length > 0 && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {courseSales?.length === 0 || !courseSales ? (
          <p className="text-sm text-muted-foreground font-medium leading-none">
            You haven&#39;t sold any courses yet. Please wait to see updated
            information
          </p>
        ) : (
          <CourseTable courseSales={courseSales} />
        )}
      </CardContent>
    </Card>
  );
}
