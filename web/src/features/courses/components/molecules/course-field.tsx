// features/courses/components/CourseFields.tsx

import { Badge } from "@/components/ui/badge";

interface CourseFieldProps {
  courseField: { fieldName: string }[];
}

const CourseFields: React.FC<CourseFieldProps> = ({ courseField }) => {
  const displayedFields = courseField.slice(0, 1);
  const additionalFieldsCount =
    courseField.length > 1 ? courseField.length - 1 : 0;

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {additionalFieldsCount > 0 && (
        <Badge className="bg-primary text-primary-foreground rounded px-1">
          +{additionalFieldsCount}
        </Badge>
      )}

      {displayedFields.map((field) => (
        <Badge
          key={field.fieldName}
          className="bg-primary text-primary-foreground rounded px-1"
        >
          {field.fieldName}
        </Badge>
      ))}
    </div>
  );
};

export default CourseFields;
