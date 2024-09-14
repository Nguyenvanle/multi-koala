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
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            Filter Courses
          </DialogTitle>

          <DialogDescription>
            Set your preferred filters for courses.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[50vh]">
          <div className="flex flex-col gap-2 justify-between sm:flex-row min-h-[400px]">
            <FilterFields />

            <FilterTypes />
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
