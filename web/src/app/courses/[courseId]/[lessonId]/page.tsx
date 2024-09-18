import LessonTemplate from "@/features/lessons/components/templates/lesson-template";

export default function LessonDetail({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  return <LessonTemplate params={params}></LessonTemplate>;
}
