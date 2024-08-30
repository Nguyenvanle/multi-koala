import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkButton from "@/components/ui/link-button";
import { H3, H4, Large, Lead, Muted, P } from "@/components/ui/typography";
import { CourseCardProps } from "@/types/course/course";
import Link from "next/link";

export default function DetailCard({
  courseName,
  coursePrice,
  courseDescription,
  uploadByTeacher,
}: CourseCardProps) {
  const discount: number = 0.2;
  const discountedPrice: number = coursePrice - coursePrice * discount;

  return (
    <Card className="flex flex-1 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className=" flex-row justify-between pb-4 items-center">
        <Link href={"/"} className="text-teal-700 hover:text-teal-500">
          {uploadByTeacher}
        </Link>
        <Badge className="rounded-xl">⭐ 4.5</Badge>
      </CardHeader>

      <CardContent className=" flex flex-1 flex-col space-y-4">
        <CardTitle>{courseName}</CardTitle>

        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter className="flex flex-0">
        <Button className="flex-1 space-x-1">
          <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
