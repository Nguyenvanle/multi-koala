import { Button } from "@/components/ui/button";
import {
  FilterIcon,
  Settings2Icon,
} from "@/features/courses/components/atoms/icon";

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => (
  <Button
    variant="outline"
    onClick={onClick}
    className="flex items-center gap-1"
  >
    <Settings2Icon />
    Filters
  </Button>
);
