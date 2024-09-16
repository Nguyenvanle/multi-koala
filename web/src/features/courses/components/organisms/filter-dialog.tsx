import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterFields } from "@/features/courses/components/molecules/filter-fields";
import { FilterPrice } from "@/features/courses/components/molecules/filter-price";
import { FilterRating } from "@/features/courses/components/molecules/filter-rating";
import { FilterTypes } from "@/features/courses/components/molecules/filter-types";
import { useFilterDialog } from "@/features/courses/hooks/useFilterDialog";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { handleApply, handleReset } = useFilterDialog(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[740px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            Filter Courses
          </DialogTitle>

          <DialogDescription>
            Set your preferred filters for courses.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-1  md:grid-cols-3 gap-2 md:gap-4 min-h-[400px] pr-4">
            <FilterFields />

            <FilterTypes />

            <div className="flex flex-col gap-4">
              <FilterPrice />

              <FilterRating />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-2 sm:space-x-0">
          <Button onClick={handleReset} variant={"outline"}>
            Reset
          </Button>

          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
