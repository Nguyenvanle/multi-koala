import { H4 } from "@/components/ui/typography";
import useCourseType from "@/features/course-type/hooks/useCourseType";
import { CheckboxGroup } from "@/features/courses/components/atoms/checkbox-group";
import { FieldSkeleton } from "@/features/courses/components/atoms/field-skeleton";

export const FilterTypes: React.FC = () => {
  const { courseTypes, loading, error } = useCourseType();

  if (loading) return <FieldSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!courseTypes)
    return (
      <div className="flex flex-1 flex-col">
        <H4 className="pb-2">Course Types</H4>
        <div>No types found</div>
      </div>
    );


  return (
    <div className="flex flex-1 flex-col">
      <H4 className="pb-2">Course Types</H4>
      <CheckboxGroup
        options={courseTypes.map((type) => ({
          id: type.typeName,
          label: type.typeName,
        }))}
        filterType="types"
      />
    </div>
  );
};
