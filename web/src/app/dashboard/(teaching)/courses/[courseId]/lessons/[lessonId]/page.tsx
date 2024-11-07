import { getLesson } from "@/features/lessons/actions/get-lesson";

async function fetchLesson(lessonId: string) {
  const res = await getLesson(lessonId);
  return res.lesson ? res.lesson : {};
}

export default async function TeachingEditLesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const lesson = await fetchLesson(params.lessonId);

  return (
    <div>
      <h1>TeachingEditLesson</h1>
      <p>Course: {params.courseId}</p>
      <p>Lesson: {params.lessonId}</p>
      <pre>{JSON.stringify(lesson, null, 2)}</pre>
    </div>
  );
}
