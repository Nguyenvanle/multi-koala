export default function TeachingEditLesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  return (
    <div>
      <h1>TeachingEditLesson</h1>
      <p>Course: {params.courseId}</p>
      <p>Lesson: {params.lessonId}</p>
    </div>
  );
}
