import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherLink } from "@/features/courses/components/molecules/teacher-link";
import { Badge } from "@/components/ui/badge";
import { CourseInfo } from "@/features/courses/components/molecules/course-info";
import { H4, Lead, P } from "@/components/ui/typography";
import PriceButton from "@/features/courses/components/atoms/price-button";
import CourseBadges from "@/features/courses/components/molecules/course-badge";
import { CourseCardProps } from "@/types/course/course";
import CourseBadgeField from "@/features/courses/components/molecules/course-badge-fields";
import { BarChart2, BookOpen, Calendar, Clock, Star } from "lucide-react";
import { convertDuration } from "@/lib/utils";

type DetailCardProps = CourseCardProps & {
  totalDuration: number | null;
  totalLessons: number | null;
};

const DetailCard = ({
  courseName,
  coursePrice,
  courseRating,
  courseDiscount,
  courseDescription,
  uploadByTeacher,
  totalDuration,
  totalLessons,
  courseCreateAt,
  courseType,
  courseFields,
  courseLevel,
}: DetailCardProps) => {
  const discount = courseDiscount;
  const discountedPrice = coursePrice - coursePrice * discount;
  const rating = (Math.round(courseRating * 5 * 10) / 10).toFixed(1);

  const { hours, minutes } = convertDuration(totalDuration || 0);

  return (
    <Card className="flex flex-col w-full  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {uploadByTeacher}
          </span>
          <Badge className="bg-yellow-400 text-yellow-900">
            <Star className="w-4 h-4 mr-1" />
            {rating}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 p-6">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {courseName}
        </CardTitle>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            {totalLessons} lessons
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(courseCreateAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <BarChart2 className="w-4 h-4 mr-2" />
            {courseLevel}
          </div>
        </div>

        <div className="space-y-3">
          <H4 className="text-lg font-semibold text-gray-700">Course Fields</H4>
          <div className="flex flex-wrap gap-2">
            {courseFields.map((field) => (
              <Badge
                key={field.fieldName}
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-200"
              >
                {field.fieldName}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <H4 className="text-lg font-semibold text-gray-700">Course Types</H4>
          <div className="flex flex-wrap gap-2">
            {courseType.map((type) => (
              <Badge
                key={type.typeName}
                variant="outline"
                className="bg-green-50 text-green-600 border-green-200"
              >
                {type.typeName}
              </Badge>
            ))}
          </div>
        </div>

        <P className="text-gray-600">{courseDescription}</P>
      </CardContent>

      <CardFooter className="bg-gray-50 border-t p-6">
        <PriceButton
          discountedPrice={discountedPrice}
          originalPrice={coursePrice}
          discount={discount}
          onClick={() => {}}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default DetailCard;
