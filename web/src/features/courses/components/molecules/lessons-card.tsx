"use client";

// LessonsCard.tsx
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { CourseCardProps } from "@/types/course/course";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const LessonCard = dynamic(
  () => import("@/features/courses/components/molecules/lesson-card"),
  {
    loading: () => (
      <div className="flex flex-col gap-4 bg-background">
        <Skeleton className="flex h-20 w-full" />
        <Skeleton className="flex h-20 w-full" />
        <Skeleton className="flex h-20 w-full" />
        <Skeleton className="flex h-20 w-full" />
        <Skeleton className="flex h-20 w-full" />
        <Skeleton className="flex h-20 w-full" />
      </div>
    ),
    ssr: false, // Disable server-side rendering
  }
);

export default function LessonsCard({ lessons }: CourseCardProps) {
  const [visibleLessons, setVisibleLessons] = useState<number>(10);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleLessons < lessons.length) {
          setVisibleLessons((prev) => Math.min(prev + 10, lessons.length));
        }
      },
      { threshold: 0.1 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [visibleLessons, lessons.length]);

  return (
    <Card className="flex flex-0 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex flex-0 pb-0">
        <CardTitle>Lessons</CardTitle>
      </CardHeader>

      <CardFooter className="flex flex-0 flex-col pr-4">
        <ScrollArea className="min-h-[260px] max-h-[75vh] flex-1 w-full items-start space-y-4 pr-4 pb-4">
          {lessons.slice(0, visibleLessons).map((lesson) => (
            <LessonCard key={lesson.lessonId} {...lesson} />
          ))}
          {visibleLessons < lessons.length && (
            <div ref={scrollRef} style={{ height: "20px" }} />
          )}
        </ScrollArea>
      </CardFooter>
    </Card>
  );
}
