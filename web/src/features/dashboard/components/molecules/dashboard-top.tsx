import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MyPerformingCoursesBodyType } from "@/features/courses/types/course-perform";

interface DashboardTopPerformingCoursesProps {
  topCourses: MyPerformingCoursesBodyType[] | undefined;
}

export default function DashboardTopPerformingCourses({
  topCourses,
}: DashboardTopPerformingCoursesProps) {
  return (
    <Card>
      <CardHeader className="gap-2">
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>Your highest earning course.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
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
                <p className="text-sm font-medium leading-none">
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
    </Card>
  );
}
