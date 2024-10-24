import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MyPerformingCoursesBodyType } from "@/features/courses/types/course-perform";

interface DashboardTopPerformingCoursesProps {
  topCourses: MyPerformingCoursesBodyType[];
}

export default function DashboardTopPerformingCourses({
  topCourses,
}: DashboardTopPerformingCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {topCourses.map((course, index) => (
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
        ))}
      </CardContent>
    </Card>
  );
}
