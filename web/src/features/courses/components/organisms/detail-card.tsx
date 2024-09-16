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
import { P } from "@/components/ui/typography";
import { Price } from "@/features/courses/components/atoms/price";

type DetailCardProps = {
  courseName: string;
  coursePrice: number;
  courseRating: number;
  courseDescription: string;
  uploadByTeacher: string;
  totalDuration: number | null;
  totalLessons: number | null;
};

export const DetailCard: React.FC<DetailCardProps> = ({
  courseName,
  coursePrice,
  courseRating,
  courseDescription,
  uploadByTeacher,
  totalDuration,
  totalLessons,
}) => {
  const discount: number = 0.2;
  const discountedPrice = useMemo(
    () => coursePrice - coursePrice * discount,
    [coursePrice]
  );

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
        <CourseInfo totalDuration={totalDuration} totalLessons={totalLessons} />
        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter className="flex flex-0">
        <Button className="flex-1 space-x-1" onClick={handlePurchase}>
          <Price
            discountedPrice={discountedPrice}
            originalPrice={coursePrice}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};
