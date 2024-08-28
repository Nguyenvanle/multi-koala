import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import { CourseCardProps } from "@/types/course/course";
import Image from "next/image";

export function CourseCard({
  courseName,
  coursePrice,
  courseDescription,
  courseImage,
}: CourseCardProps) {
  return (
    <Card className="w-full max-w-sm rounded overflow-hidden hover:shadow-md">
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

      <CardContent className="px-4 pb-4">
        <CardTitle>{courseName}</CardTitle>

        <P>{courseDescription}</P>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4">
        <Badge className="px-2 py-1 bg-accent text-foreground hover:text-background">
          {"$ " + coursePrice.toString()}
        </Badge>

        <Button>Enroll Now</Button>
      </CardFooter>
    </Card>
  );
}
