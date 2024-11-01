import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MyPerformingCoursesBodyType } from "@/features/courses/types/course-perform";
import PageNavigation from "@/features/pagination/components/page-nav";
import {
  PaginationControlProps,
  PaginationProps,
} from "@/features/pagination/types/pagination";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface DashboardTopPerformingCoursesProps {
  topCourses: MyPerformingCoursesBodyType[] | undefined;
  controls: PaginationControlProps;
  pagination: PaginationProps;
}

export default function DashboardTopPerformingCourses({
  topCourses,
  controls,
  pagination,
}: DashboardTopPerformingCoursesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2 space-y-0">
        <div className="flex flex-col gap-2">
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>Your highest earning course.</CardDescription>
        </div>
        <Link href="/dashboard/courses">
          <Button variant="outline" size="sm">
            <span className="hidden md:flex">View More</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 min-h-[412px]">
        {topCourses?.length === 0 || !topCourses ? (
          <p className="text-sm text-muted-foreground font-medium leading-none">
            You don&#39;t have any courses yet. Create a new course to see
            updated information
          </p>
        ) : (
          topCourses.map((course, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src={course.image?.imageUrl ?? "/images/fallback-image.jpg"}
                  className="object-contain"
                />
                <AvatarFallback>{course.courseName}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none line-clamp-1">
                  {course.courseName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(course.avgcourseRating * 5).toFixed(2)} ★ (
                  {course.numberOfReviews} reviews)
                </p>
              </div>
              <div className="ml-auto font-medium flex-nowrap">
                ${course.income.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="flex justify-center pt-4">
        <PageNavigation controls={controls} pagination={pagination} />
      </CardFooter>
    </Card>
  );
}