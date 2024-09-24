import React from "react";
import { CoursesResultResType } from "@/features/courses/types/course";
import { CoursesList } from "@/features/courses/components/organisms/courses-list";
import { Book } from "lucide-react";
import { P } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const CoursesSection: React.FC<{
  courses: CoursesResultResType;
  courseLoading: boolean;
}> = ({ courses, courseLoading }) => (
  <div className="col-span-1 md:col-span-3 p-12 pt-0 pb-6">
    <Card className="rounded-lg shadow-lg">
      <CardHeader className="border-b p-4 px-6">
        <h3 className="text-2xl font-bold flex items-center">
          <Book className="mr-2 text-primary" size={24} />
          Courses
        </h3>
      </CardHeader>
      <CardFooter className="pt-6 ">
        <CoursesList
          courses={courses}
          loading={courseLoading}
          className="lg:grid-cols-4 p-0 py-0"
          forProfile
        />
      </CardFooter>
    </Card>
  </div>
);
