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

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  ratingFilter: number;
  setRatingFilter: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  ratingFilter,
  setRatingFilter,
  onSubmit,
}) => (
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
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  min: Number(e.target.value),
                }))
              }
              placeholder="Min"
            />
            <span>-</span>
            <Input
              id="price-max"
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  max: Number(e.target.value),
                }))
              }
              placeholder="Max"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating-filter" className="text-right">
            Minimum Rating
          </Label>
          <Input
            id="rating-filter"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="col-span-3"
            placeholder="Enter minimum rating"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            setPriceRange({ min: 0, max: 1000 });
            setRatingFilter(0);
          }}
        >
          Reset
        </Button>
        <Button onClick={onSubmit}>Apply Filters</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
