import { Card, CardHeader } from "@/components/ui/card";
import { CourseCardProps } from "@/types/course/course";
import Image from "next/image";

export default function DisplayCard({
  courseName,
  courseImage,
}: CourseCardProps) {
  return (
    <Card className=" rounded overflow-hidden hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative w-full h-80 overflow-hidden ">
          <Image
            src={courseImage}
            alt={courseName}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </CardHeader>
    </Card>
  );
}
