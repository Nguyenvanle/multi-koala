export default function CourseDetail({
  params,
}: {
  params: { courseId: string };
}) {
  return <div>CourseDetail: {params.courseId}</div>;
}
