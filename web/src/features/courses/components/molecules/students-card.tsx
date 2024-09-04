"use client";

import { CourseCardProps } from "@/types/course/course";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleEllipsis, Ellipsis } from "lucide-react";
import Link from "next/link";

export default function StudentsCard({ lessons }: CourseCardProps) {
  return (
    <Card className="flex flex-1 flex-col gap-2 w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex flex-0 pb-0 gap-2 ">
        <CardTitle>Students</CardTitle>

        <div className="flex flex-1 flex-row gap-1 flex-wrap">
          {lessons.map((lesson, index) => (
            <Avatar key={lesson.lessonId}>
              <AvatarImage
                title={lesson.lessonTitle}
                src={lesson.lessonsImageUrl}
                alt={lesson.lessonTitle}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          ))}

          <Link href={""}>
            <Avatar>
              <AvatarFallback>
                <Ellipsis size={24} />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </CardHeader>

      <CardFooter></CardFooter>
    </Card>
  );
}
