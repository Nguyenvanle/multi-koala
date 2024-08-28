import { P } from "@/components/ui/typography";
import { CourseCardProps } from "@/types/course/course";

export default function DetailCard({
  courseName,
  coursePrice,
  courseDescription,
}: CourseCardProps) {
  return (
    <div className="flex flex-col">
      <P>{courseName}</P>
      <P>{coursePrice.toString()}</P>
      <P>{courseDescription}</P>
    </div>
  );
}
