import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseTable } from "@/features/dashboard/components/molecules/course-table";
import { RecentEnrollBodyType } from "@/features/enroll-courses/types/recent-enroll";
import { Input } from "@/components/ui/input";
import PageNavigation from "@/features/pagination/components/page-nav";
import { PaginationControlProps, PaginationProps } from "@/features/pagination/types/pagination";

interface DashboardRecentlySoldCoursesProps {
  courseSales: RecentEnrollBodyType[];
  handleSearch: (query: string) => void;
}


export default function DashboardRecentlySoldCourses({
  courseSales,
  handleSearch,
}: DashboardRecentlySoldCoursesProps) {
  const onSearch = (event: { target: { value: string } }) => {
    handleSearch(event.target.value);
  };
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-col md:flex-row gap-2 justify-between space-y-0">
        <div className="flex flex-col gap-2">
          <CardTitle>Recently Sold Courses</CardTitle>
          <CardDescription>
            Your recent course has been purchased.
          </CardDescription>
        </div>
        <div className="flex flex-row items-center gap-2 w-full md:max-w-80">
          <div className="relative flex-grow ">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search for courses and students name..."
              onChange={onSearch}
              className="pl-8 focus:border-accent"
            />
          </div>
        </div>
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
