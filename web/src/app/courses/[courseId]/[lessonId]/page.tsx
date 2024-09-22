import LessonTemplate from "@/features/lessons/components/templates/lesson-template";

export default function LessonDetail({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  return (
    <div className="container px-12 xl:px-8 py-9">
      <LessonTemplate params={params}></LessonTemplate>
    </div>
  );
}
