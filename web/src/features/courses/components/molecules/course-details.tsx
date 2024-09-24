import { DetailItem } from "@/features/courses/components/atoms/detail-item";
import { BookOpen, Clock, Star, Tag, Users } from "lucide-react";

export const CourseDetails: React.FC<{
  rating: number;
  duration: number;
  types: { typeName: string }[];
  fields: { fieldName: string }[];
  instructor: { firstname: string; lastname: string };
}> = ({ rating, duration, types, fields, instructor }) => {
  return (
    <>
      <DetailItem
        icon={<Star className="h-5 w-5 text-yellow-400" />}
        text={rating.toFixed(1)}
      />
      <DetailItem
        icon={<Clock className="h-5 w-5 text-gray-400" />}
        text={`Duration: ${duration}`}
      />
      <DetailItem
        icon={<BookOpen className="h-5 w-5 text-gray-400" />}
        text={fields.map((field) => field.fieldName).join(", ")}
      />
      <DetailItem
        icon={<Tag className="h-5 w-5 text-gray-400" />}
        text={types.map((type) => type.typeName).join(", ")}
      />
      <DetailItem
        icon={<Users className="h-5 w-5 text-gray-400" />}
        text={`Instructor: ${instructor.firstname} ${instructor.lastname}`}
      />
    </>
  );
};
