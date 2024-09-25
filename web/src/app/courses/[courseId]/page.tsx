import CourseDetail from "@/features/courses/components/pages/course-detail";

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  return <CourseDetail courseId={params.courseId} />;
}
