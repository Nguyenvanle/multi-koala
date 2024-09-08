"use client";

import { CourseCardProps } from "@/types/course/course";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleEllipsis, Ellipsis } from "lucide-react";
import Link from "next/link";
import useStudent from "@/features/courses/hooks/useStudents";
import { useEffect } from "react";

export default function StudentsCard({ courseId }: { courseId: string }) {
  const { students, loading, error } = useStudent({ courseId });

  useEffect(() => {
    console.log(students);
  }, [students]);

  return (
    <Card className=" flex-1 flex-col gap-2 w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex flex-0 pb-0 gap-2 ">
        <CardTitle>Students</CardTitle>

        <div className="flex flex-1 flex-row gap-1 flex-wrap">
          {!students ? (
            <div>Loading...</div>
          ) : (
            students.map((student) => (
              <Avatar key={student.userId}>
                <AvatarImage
                  title={student.username}
                  src={student.image.imageUrl}
                  alt={student.username}
                />
                <AvatarFallback title={student.username}></AvatarFallback>
              </Avatar>
            ))
          )}

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
