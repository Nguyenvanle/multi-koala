// features/courses/components/CourseBadges.tsx

import { Badge } from "@/components/ui/badge";

interface CourseBadgesProps {
  courseType: { typeName: string }[];
}

const CourseBadges: React.FC<CourseBadgesProps> = ({ courseType }) => {
  const displayedTypes = courseType.slice(0, 2);
  const additionalTypesCount =
    courseType.length > 2 ? courseType.length - 2 : 0;

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {displayedTypes.map((type) => (
        <Badge
          key={type.typeName}
          className="bg-secondary text-secondary-foreground rounded px-1"
        >
          #{type.typeName}
        </Badge>
      ))}
      {additionalTypesCount > 0 && (
        <Badge className="bg-secondary text-secondary-foreground rounded px-1">
          +{additionalTypesCount}
        </Badge>
      )}
    </div>
  );
};

export default CourseBadges;
