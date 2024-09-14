import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { H4 } from "@/components/ui/typography";
import { fieldOptions, typeOptions } from "@/features/filter/enum";
import { useFilter } from "@/features/filter/hooks/useFilter";
import { useState } from "react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, updateFilter, resetFilters } = useFilter();
  const [selectedFields, setSelectedFields] = useState<string[]>(
    filters.fields
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(filters.types);

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    updateFilter("fields", selectedFields);
    updateFilter("types", selectedTypes);
    onClose();
  };

  const handleReset = () => {
    setSelectedFields([]);
    setSelectedTypes([]);
    resetFilters();
  };

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
            <div className="flex flex-1 flex-col">
              <H4 className="pb-2">Course Fields</H4>
              <div className=" flex flex-col ">
                <div className="flex flex-col gap-2">
                  {fieldOptions.map((field) => (
                    <div key={field} className="flex items-center gap-2">
                      <Checkbox
                        id={`field-${field}`}
                        checked={selectedFields.includes(field)}
                        onCheckedChange={() => handleFieldToggle(field)}
                      />

                      <Label className="mt-1" htmlFor={`field-${field}`}>
                        {field}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <H4 className="pb-2"> Course Types</H4>

              <div className=" flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {typeOptions.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => handleTypeToggle(type)}
                      />

                      <Label className="mt-1" htmlFor={`type-${type}`}>
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
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
