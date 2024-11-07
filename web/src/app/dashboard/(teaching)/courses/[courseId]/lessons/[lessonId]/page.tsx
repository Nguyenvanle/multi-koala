import { getLesson } from "@/features/lessons/actions/get-lesson";
import EditLessonForm from "@/features/lessons/components/templates/edit-form";
import { Suspense } from "react";

async function fetchLesson(lessonId: string) {
  const res = await getLesson(lessonId);
  return res.lesson;
}

export default async function TeachingEditLesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const lesson = await fetchLesson(params.lessonId);

  return (
    <div className="flex flex-col w-full gap-4">
      <Suspense>
        <EditLessonForm initData={lesson} />
      </Suspense>
    </div>
  );
}
