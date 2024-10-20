import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H4, P } from "@/components/ui/typography";
import PriceButton from "@/features/courses/components/atoms/price-button";
import { CourseCardProps } from "@/types/course/course";
import {
  BarChart2,
  BookOpen,
  Calendar,
  CalendarPlus,
  CalendarX,
  CalendarX2,
  Clock,
  Star,
} from "lucide-react";
import { convertDuration } from "@/lib/utils";
import { TeacherLink } from "@/features/courses/components/molecules/teacher-link";
import { enrollHandler } from "@/features/courses/libs/enroll-handler";

type DetailCardProps = CourseCardProps & {
  totalDuration: number | null;
  totalLessons: number | null;
  teacherId: string;
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
  courseResponsibilityEndAt: courseEndAt,
  courseType,
  courseFields,
  courseLevel,
  teacherId,
}: DetailCardProps) => {
  const rating = (Math.round(courseRating * 5 * 10) / 10).toFixed(1);

  const { hours, minutes } = convertDuration(totalDuration || 0);

  return (
    <Card className="flex flex-col w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-0 border-b">
        <div className="flex justify-between items-center">
          <TeacherLink
            href={`/teachers/${teacherId}`}
            className="text-lg font-semibold text-secondary-foreground"
          >
            {uploadByTeacher}
          </TeacherLink>
          <Badge className="bg-yellow-400 text-yellow-900">
            <Star className="w-4 h-4 mr-1" />
            {rating}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 space-y-4 p-6">
        <CardTitle className="text-2xl font-bold text-primary">
          {courseName}
        </CardTitle>

        <div className="flex flex-wrap gap-4 text-sm text-secondary-foreground">
          <div
            className="flex items-center"
            title={`Total Duration: ${hours} hours ${minutes} minutes (Commitment time needed for course completion)`}
          >
            <Clock className="w-4 h-4 mr-2" />
            {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
          </div>
          <div
            className="flex items-center"
            title={`Total Lessons: ${totalLessons} (Number of lessons in the course)`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {totalLessons} lessons
          </div>
          <div
            className="flex items-center"
            title={`Created At: ${new Date(
              courseCreateAt
            ).toLocaleDateString()} (Indicates course release date)`}
          >
            <CalendarPlus className="w-4 h-4 mr-2" />
            {new Date(courseCreateAt).toLocaleDateString()}
          </div>
          <div
            className="flex items-center"
            title={`Expires At: ${new Date(
              courseEndAt
            ).toLocaleDateString()} (Indicates course expiry date)`}
          >
            <CalendarX2 className="w-4 h-4 mr-2" />
            {new Date(courseEndAt).toLocaleDateString()}
          </div>
          <div
            className="flex items-center"
            title={`Course Level: ${courseLevel} (Difficulty level of the course)`}
          >
            <BarChart2 className="w-4 h-4 mr-2" />
            {courseLevel}
          </div>
        </div>

        <div className="space-y-3">
          <H4 className="text-lg font-semibold text-foreground">Fields</H4>
          <div className="flex flex-wrap gap-2">
            {courseFields.map((field) => (
              <Badge
                key={field.fieldName}
                variant="outline"
                className="bg-blue-50 dark:bg-background text-blue-600  border-blue-200"
                title={`Field Information: ${field.fieldName} (Expertise area of the course)`}
              >
                {field.fieldName}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <H4 className="text-lg font-semibold text-foreground">Types</H4>
          <div className="flex flex-wrap gap-2">
            {courseType.map((type) => (
              <Badge
                key={type.typeName}
                variant="outline"
                className="bg-green-50 dark:bg-background text-green-600 border-green-200"
                title={`Type Information: ${type.typeName} (Format of the course, e.g., online)`}
              >
                {type.typeName}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <H4>Description</H4>

          <P className="text-muted-foreground">{courseDescription}</P>
        </div>
      </CardContent>

      <CardFooter className="border-t p-6 flex flex-0">
        <PriceButton
          discountedPrice={courseDiscount}
          originalPrice={coursePrice}
          onClick={enrollHandler}
        />
      </CardFooter>
    </Card>
  );
};

export default DetailCard;