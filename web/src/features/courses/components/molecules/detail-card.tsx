import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Muted, P } from "@/components/ui/typography";
import { CourseCardProps } from "@/types/course/course";

export default function DetailCard({
  courseName,
  coursePrice,
  courseDescription,
  uploadByTeacher,
}: CourseCardProps) {
  const discount: number = 0.2;
  const discountedPrice: number = coursePrice - coursePrice * discount;

  return (
    <Card className="w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex flex-row justify-between pb-4">
        <Muted className="mt-1.5">{uploadByTeacher}</Muted>
        <Badge>⭐ 4.5</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardTitle>{courseName}</CardTitle>

        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter>
        <Button className="flex-1 space-x-1">
          <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
