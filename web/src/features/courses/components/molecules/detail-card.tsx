import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { convertDuration } from "@/lib/utils";
import { CourseCardProps } from "@/types/course/course";
import { H3, H4, Large, Lead, Muted, P } from "@/components/ui/typography";
import { useMemo } from "react";

export default function DetailCard({
  courseName,
  coursePrice,
  courseDescription,
  uploadByTeacher,
  totalDuration,
  totalLessons,
}: {
  courseName: string;
  coursePrice: number;
  courseDescription: string;
  uploadByTeacher: string;
  totalDuration: number | null;
  totalLessons: number | null;
}) {
  const discount: number = 0.2;
  const discountedPrice = useMemo(() => coursePrice - coursePrice * discount, [coursePrice]);
  
  // Kiểm tra totalDuration, nếu null thì sử dụng 0
  const { hours, minutes, seconds } = convertDuration(totalDuration || 0);

  return (
    <Card className="flex flex-1 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex-row justify-between pb-4 items-center">
        <Link href={""} className="hover:text-primary mt-1.5">
          {uploadByTeacher}
        </Link>
        <Badge className="rounded-xl">⭐ 4.5</Badge>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4">
        <CardTitle className="line-clamp-2">{courseName}</CardTitle>
        <Muted>
          {hours > 0
            ? `${hours}h ${minutes}m ${seconds}'`
            : `${minutes}m ${seconds}'`}{" "}
          • {totalLessons} lessons
        </Muted>

        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter className="flex flex-0">
        <Button className="flex-1 space-x-1">
          <span className="font-bold text-primary-foreground">{`$${discountedPrice.toFixed(2)}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>
        </Button>
      </CardFooter>
    </Card>
  );
}