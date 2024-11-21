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
import {
  PaginationControlProps,
  PaginationProps,
} from "@/features/pagination/types/pagination";
import PageNavigation from "@/features/pagination/components/page-nav";
import { EmptyState } from "@/features/courses/components/atoms/empty-state";

interface DashboardRecentlySoldCoursesProps {
  courseSales: RecentEnrollBodyType[];
  search: {
    handleSearch: (query: string) => void;
    searchQuery: string;
  };
  controls: PaginationControlProps;
  pagination: PaginationProps;
}

export default function DashboardRecentlySoldCourses({
  courseSales,
  search,
  controls,
  pagination,
}: DashboardRecentlySoldCoursesProps) {
  // Tính toán start index cho trang hiện tại
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;

  const onSearch = (event: { target: { value: string } }) => {
    search.handleSearch(event.target.value);
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
      <CardContent className="min-h-[436px]">
        {courseSales?.length === 0 || !courseSales ? (
          <EmptyState />
        ) : (
          <CourseTable courseSales={courseSales} />
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row justify-between items-center px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="text-sm text-muted-foreground">
          Showing
          <span className="font-bold">
            {" "}
            {startIndex + 1}-
            {Math.min(startIndex + courseSales.length, pagination.totalItems)}
          </span>{" "}
          of <span className="font-bold ">{pagination.totalItems} </span>
          courses
        </div>
        <PageNavigation controls={controls} pagination={pagination} />
      </CardFooter>
    </Card>
  );
}
