import React from "react";
import { Star, Clock, BookOpen, Tag, Users } from "lucide-react";
import { CourseDetailResultResType } from "@/features/courses/types/course";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"; // Import các component Card từ shadcnui
import { Button } from "@/components/ui/button";

interface CourseDetailCardProps {
  course: CourseDetailResultResType;
  totalDuration: number | null;
}

const CourseDetailCard: React.FC<CourseDetailCardProps> = ({
  course,
  totalDuration,
}) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="pb-0">
        <div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.courseLevel}
          </div>
          <CardTitle className="text-lg font-medium mt-1 text-black">
            {course.courseName}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-500">
            {course.courseDescription}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <CourseDetails
          rating={course.courseRating}
          duration={totalDuration || 0}
          types={course.types}
          fields={course.fields}
          instructor={course.uploadedByTeacher}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-900">
          ${course.coursePrice.toFixed(2)}
        </span>
        <Button className="w-1/3">Enroll Now</Button>
      </CardFooter>
    </Card>
  );
};

const CourseDetails: React.FC<{
  rating: number;
  duration: number;
  types: { typeName: string }[];
  fields: { fieldName: string }[];
  instructor: { firstname: string; lastname: string };
}> = ({ rating, duration, types, fields, instructor }) => {
  return (
    <>
      <DetailItem
        icon={<Star className="h-5 w-5 text-yellow-400" />}
        text={rating.toFixed(1)}
      />
      <DetailItem
        icon={<Clock className="h-5 w-5 text-gray-400" />}
        text={`Duration: ${duration}`}
      />
      <DetailItem
        icon={<BookOpen className="h-5 w-5 text-gray-400" />}
        text={fields.map((field) => field.fieldName).join(", ")}
      />
      <DetailItem
        icon={<Tag className="h-5 w-5 text-gray-400" />}
        text={types.map((type) => type.typeName).join(", ")}
      />
      <DetailItem
        icon={<Users className="h-5 w-5 text-gray-400" />}
        text={`Instructor: ${instructor.firstname} ${instructor.lastname}`}
      />
    </>
  );
};

const DetailItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <div className="mt-4 flex items-center">
      {icon}
      <span className="ml-2 text-sm text-gray-600">{text}</span>
    </div>
  );
};

export default CourseDetailCard;
