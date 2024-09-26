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
import {
  FilterFields,
  FilterTypes,
  FilterLevels,
  FilterPrice,
  FilterRating,
  FilterStatus,
} from "@/features/courses/components/molecules";
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
      <DialogContent className="sm:max-w-[600px] md:max-w-[940px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            Filter Courses
          </DialogTitle>

          <DialogDescription>
            Set your preferred filters for courses.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 min-h-[400px] pr-4">
            <div className="flex flex-col gap-4">
              <FilterPrice />

              <FilterRating />

              <FilterStatus />

              <FilterLevels />
            </div>

            <FilterFields initialData={[]} />

            <FilterTypes initialData={[]} />
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
