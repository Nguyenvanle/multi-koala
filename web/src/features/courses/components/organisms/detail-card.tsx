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

type DetailCardProps = CourseCardProps & {
  totalDuration: number | null;
  totalLessons: number | null;
};

export const DetailCard: React.FC<DetailCardProps> = ({
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
}) => {
  const discount = courseDiscount;
  const discountedPrice = coursePrice - coursePrice * discount;

  const rating = (Math.round(courseRating * 5 * 10) / 10).toFixed(1);

  const router = useRouter();

  const handlePurchase = () => {
    toast({
      title: "Login Required",
      description: "Please log in to your account to purchase courses.",
      duration: 5000,
    });
    router.push("/login");
  };

  return (
    <Card className="flex flex-1 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex-row justify-between pb-4 items-center">
        <TeacherLink teacherName={uploadByTeacher} />
        <Badge>⭐ {rating}</Badge>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4">
        <CardTitle className="line-clamp-2 text-2xl">{courseName}</CardTitle>

        <CourseInfo
          totalDuration={totalDuration}
          totalLessons={totalLessons}
          createAt={courseCreateAt}
        />

        <H4>Course Fields</H4>
        <CourseBadgeField fields={courseFields} limitDisable />

        <H4>Course Types</H4>
        <CourseBadges courseType={courseType} limitDisable />

        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter className="flex flex-0">
        <PriceButton
          discountedPrice={discountedPrice}
          originalPrice={coursePrice}
          discount={discount}
          onClick={handlePurchase}
        />
      </CardFooter>
    </Card>
  );
};
