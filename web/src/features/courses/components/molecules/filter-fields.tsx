import { H4 } from "@/components/ui/typography";
import { CheckboxGroup } from "@/features/courses/components/atoms/checkbox-group";
import { FieldSkeleton } from "@/features/courses/components/atoms/field-skeleton";
import useField from "@/features/field/hooks/useField";

export const FilterFields: React.FC = () => {
  const { fields, loading, error } = useField();

  if (loading) return <FieldSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!fields) return <div>No fields found</div>;

  return (
    <div className="flex flex-1 flex-col">
      <H4 className="pb-2">Course Fields</H4>
      <CheckboxGroup
        options={fields.map((field) => ({
          id: field.fieldName,
          label: field.fieldName,
        }))}
        filterType="fields"
      />
    </div>
  );
};
