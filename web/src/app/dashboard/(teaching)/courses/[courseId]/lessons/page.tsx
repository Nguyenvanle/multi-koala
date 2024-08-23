export default function TeachingLessons({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <div>
      <h1>TeachingLessons</h1>
      <p>Course: {params.courseId}</p>
    </div>
  );
}
