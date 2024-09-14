import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilter } from "@/features/filter/hooks/useFilter";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, updateFilter, resetFilters } = useFilter();

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Courses</DialogTitle>

          <DialogDescription>
            Set your preferred filters for courses.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price-range" className="text-right">
              Price Range
            </Label>

            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="price-min"
                type="number"
                value={filters.priceRange.min}
                onChange={(e) =>
                  updateFilter("priceRange", {
                    ...filters.priceRange,
                    min: Number(e.target.value),
                  })
                }
                placeholder="Min"
              />

              <span>-</span>

              <Input
                id="price-max"
                type="number"
                value={filters.priceRange.max}
                onChange={(e) =>
                  updateFilter("priceRange", {
                    ...filters.priceRange,
                    max: Number(e.target.value),
                  })
                }
                placeholder="Max"
              />
            </div>
          </div>

          {/* ... (các filter khác) */}
        </div>

        <DialogFooter className="gap-2 sm:space-x-0">
          <Button onClick={resetFilters}>Reset</Button>

          <Button onClick={handleSubmit}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
