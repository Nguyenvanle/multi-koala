import { Button } from "@/components/ui/button";
import { FilterIcon } from "@/features/courses/components/atoms/icon";

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => (
  <Button variant="outline" onClick={onClick} className="flex items-center">
    <FilterIcon />
    Filters
  </Button>
);
