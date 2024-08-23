export default function LessonDetail({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  return (
    <div>
      <div>Course: {params.courseId}</div>
      <div>LessonDetail: {params.lessonId}</div>
    </div>
  );
}
