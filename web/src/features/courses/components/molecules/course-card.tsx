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
import Image from "next/image";

export function CourseCard({
  courseName,
  coursePrice,
  courseImage,
  uploadByTeacher,
}: CourseCardProps) {
  const discount: number = 0.2;
  const discountedPrice: number = coursePrice - coursePrice * discount;

  return (
    <Card className="flex flex-col justify-between w-full max-w-sm min-h-[370px] min-w-60 rounded overflow-hidden hover:shadow-md hover:shadow-accent">
      <CardHeader className="p-0 pb-4">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={courseImage}
            alt={courseName}
            fill
            className="object-cover object-center hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-4">
        <CardTitle className="line-clamp-2" title={courseName}>
          {courseName}
        </CardTitle>

        <Muted> 1h 23m • 18 lessons</Muted>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4">
        <Button className="flex-1 space-x-1">
          <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
