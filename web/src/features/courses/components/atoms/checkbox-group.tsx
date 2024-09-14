import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatString } from "@/features/field/libs/util";
import { useFilter } from "@/features/filter/hooks/useFilter";

interface CheckboxGroupProps {
  options: { id: string; label: string }[];
  filterType: "fields" | "types";
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  filterType,
}) => {
  const { filters, updateFilter } = useFilter();

  const handleToggle = (value: string) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    updateFilter(filterType, newValues);
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map(({ id, label }) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox
            id={`${filterType}-${id}`}
            checked={filters[filterType].includes(id)}
            onCheckedChange={() => handleToggle(id)}
          />
          <Label className="mt-1" htmlFor={`${filterType}-${id}`}>
            {formatString(label)}
          </Label>
        </div>
      ))}
    </div>
  );
};
