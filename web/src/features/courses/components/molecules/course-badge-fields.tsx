import { Badge } from "@/components/ui/badge";

interface CourseField {
  fieldName: string;
  fieldDescription: string;
}

interface CourseBadgesProps {
  fields: CourseField[]; // Đổi tên thuộc tính thành `fields`.
  limitDisable?: boolean;
}

const CourseBadgeField: React.FC<CourseBadgesProps> = ({
  fields,
  limitDisable,
}) => {
  const displayedFields = fields.slice(0, 2); // Hiển thị tối đa 2 trường
  const additionalFieldsCount = fields.length > 2 ? fields.length - 2 : 0; // Đếm số trường bổ sung

  if (limitDisable)
    return (
      <div className="flex flex-row flex-wrap gap-1">
        {fields.map((field) => (
          <Badge
            key={field.fieldName} // Sử dụng fieldName làm key
            className="bg-primary text-primary-foreground rounded px-1"
          >
            #{field.fieldName}
          </Badge>
        ))}
      </div>
    );

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {displayedFields.map((field) => (
        <Badge
          key={field.fieldName} // Sử dụng fieldName làm key
          className="bg-primary text-primary-foreground rounded px-1"
        >
          #{field.fieldName}
        </Badge>
      ))}

      {additionalFieldsCount > 0 && (
        <Badge className="bg-secondary text-secondary-foreground rounded px-1">
          +{additionalFieldsCount}
        </Badge>
      )}
    </div>
  );
};

export default CourseBadgeField;
