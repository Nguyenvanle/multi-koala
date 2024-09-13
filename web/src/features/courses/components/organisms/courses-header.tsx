import React, { Dispatch, SetStateAction, useState, useCallback } from "react";
import { H4, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SelectSort,
  SortOption,
} from "@/features/courses/components/molecules/select-sort";
import { FilterIcon, Search } from "lucide-react";
import { debounce } from "lodash";

interface CoursesHeaderProps {
  setSortOrder: Dispatch<SetStateAction<SortOption>>;
  updateFilter: (filterType: string, value: any) => void;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  setSortOrder,
  updateFilter,
}) => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [nameFilter, setNameFilter] = useState<string>("");

  const debouncedUpdateNameFilter = useCallback(
    debounce((value: string) => {
      updateFilter("name", value);
    }, 300),
    [updateFilter]
  );

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameFilter(value);
    debouncedUpdateNameFilter(value);
  };

  const handleFilterSubmit = () => {
    updateFilter("name", nameFilter);
    updateFilter("priceRange", priceRange);
    updateFilter("rating", ratingFilter);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <H4>Courses</H4>
        <P className="text-sm text-gray-500">Discover and learn new skills</P>
      </div>

      <div className="flex flex-1 justify-between items-center space-x-2">
        <div className="relative flex-grow max-w-80">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search courses..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
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
                  type="button"
                  onClick={() => {
                    setPriceRange({ min: 0, max: 1000 });
                    setRatingFilter(0);
                  }}
                >
                  Reset
                </Button>
                <Button type="submit" onClick={handleFilterSubmit}>
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SelectSort setSortOrder={setSortOrder} />
        </div>
      </div>
    </div>
  );
};

export default CoursesHeader;
