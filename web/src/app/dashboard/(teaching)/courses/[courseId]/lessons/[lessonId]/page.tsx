import { getLesson } from "@/features/lessons/actions/get-lesson";
import { getTests } from "@/features/lessons/actions/get-test";
import EditLessonForm from "@/features/lessons/components/templates/edit-form";
import { Suspense } from "react";

async function fetchLesson(lessonId: string) {
  const res = await getLesson(lessonId);
  return res.lesson;
}

async function fetchTests(lessonId: string) {
  const res = await getTests(lessonId);
  return res.tests;
}

export default async function TeachingEditLesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const [lesson, tests] = await Promise.all([
    fetchLesson(params.lessonId),
    fetchTests(params.lessonId),
  ]);

  return (
    <div className="flex flex-col w-full gap-4">
      <Suspense>
        <EditLessonForm initData={lesson} initTestData={tests} />
      </Suspense>
    </div>
  );
}
