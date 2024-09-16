import { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterContext } from "@/features/filter/context/provider";

const LEVELS: { label: string; value: string }[] = [
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
  { label: "Advanced", value: "ADVANCED" },
  { label: "Expert", value: "EXPERT" },
];

export const FilterLevels: React.FC = () => {
  const { filters, updateFilter } = useContext(FilterContext)!;

  const handleLevelChange = (level: string) => {
    // Chỉ cho phép chọn 1 level
    const updatedLevels = filters.levels[0] === level ? [] : [level];
    updateFilter("levels", updatedLevels);
  };

  return (
    <div>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight pb-2">
        Course Level
      </h3>
      <div className="space-y-2">
        {LEVELS.map((level) => (
          <div key={level.value} className="flex items-center space-x-2">
            <Checkbox
              id={`level-${level.value}`}
              checked={filters.levels[0] === level.value} // Kiểm tra nếu level đang được chọn
              onCheckedChange={() => handleLevelChange(level.value)}
            />
            <label htmlFor={`level-${level.value}`} className="text-sm">
              {level.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
