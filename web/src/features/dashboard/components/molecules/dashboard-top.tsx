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
import { ArrowUpRight, ChevronDown, ClipboardX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

interface DashboardTopPerformingCoursesProps {
  topCourses: MyPerformingCoursesBodyType[] | undefined;
  controls: PaginationControlProps;
  pagination: PaginationProps;
  months: string;
  setMonths: (months: string) => void;
}

export const EmptyState = () => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <ClipboardX className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl text-center font-semibold text-gray-700 mb-2">
        No Course Available On Around This Time
      </h3>
      <p className="text-gray-500 text-center">
        There is currently no course data to display. Please check another time
        or create a new course.
      </p>
    </CardContent>
  </Card>
);

export default function DashboardTopPerformingCourses({
  topCourses,
  controls,
  pagination,
  months,
  setMonths,
}: DashboardTopPerformingCoursesProps) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const fetchTopCourses = async () => {
      const res = await mutate(`get-top-courses`);
      console.log(res);
    };
    fetchTopCourses();
  }, [mutate, months]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2 space-y-0">
        <div className="flex flex-col gap-2">
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>Your highest earning course.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <span className="hidden md:flex">{months} month</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={months} onValueChange={setMonths}>
              <DropdownMenuRadioItem value="1">1 month</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="3">3 months</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="6">6 months</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="12">
                12 months
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 min-h-[412px]">
        {topCourses?.length === 0 || !topCourses ? (
          <EmptyState />
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