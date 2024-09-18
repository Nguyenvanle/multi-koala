import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonBody } from "@/features/lessons/schema/lessons";
import { Clock, Calendar, Bookmark, PlayCircle } from "lucide-react";
import Image from "next/image";
import { P } from "@/components/ui/typography";

export const LessonInfo: React.FC<{ lesson: LessonBody }> = ({ lesson }) => {
  // Calculate hours, minutes, and seconds
  const totalSeconds = lesson.video.videoDuration;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format the upload date
  const uploadDate = new Date(lesson.lessonUploadedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative p-0">
        <Image
          src={lesson.image.imageUrl}
          alt={lesson.lessonName}
          width={800}
          height={400}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <CardTitle className="text-white text-2xl px-2">
            {lesson.lessonName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <P className=" mb-4">{lesson.lessonDescription}</P>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-primary" />
            <span>
              {hours > 0 ? `${hours}h ` : ""}
              {minutes > 0 ? `${minutes}m ` : ""}
              {seconds}s
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>{uploadDate}</span>
          </div>
          <div className="flex items-center">
            <Bookmark className="mr-2 h-4 w-4 text-primary" />
            <span>{lesson.course.courseName}</span>
          </div>
          <div className="flex items-center">
            <PlayCircle className="mr-2 h-4 w-4 text-primary" />
            <span>Video Lesson</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">
            Duration: {hours > 0 ? `${hours}h ` : ""}
            {minutes}m {seconds}s
          </Badge>
          <Badge variant="outline">Course: {lesson.course.courseName}</Badge>
          <Badge variant="outline" className="capitalize">
            Level: {lesson.course.courseLevel.toLowerCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
