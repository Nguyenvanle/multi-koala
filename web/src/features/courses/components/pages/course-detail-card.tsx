import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CourseDetails } from "@/features/courses/components/molecules/course-details";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import { CourseDetailResultResType } from "@/features/courses/types/course";

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
          rating={RatingAdapter.getRating(course.courseId)}
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

export default CourseDetailCard;
