// src/features/courses/components/organisms/CoursesHeader.tsx
import React, { Dispatch, SetStateAction, useState, useCallback } from "react";
import { H4, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "@/features/courses/components/atoms/icon";
import {
  SelectSort,
  SortOption,
} from "@/features/courses/components/molecules/select-sort";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  // Debounce the updateFilter function for name search
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
    updateFilter("priceRange", priceRange);
    updateFilter("rating", ratingFilter);
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-start">
        <H4 className="mt-0 text-primary">Courses</H4>
        <P>
          Explore our diverse range of courses designed to enhance your skills
          and knowledge. Discover more about each course below!
        </P>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search courses..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="flex-grow"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FilterIcon />
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
    </>
  );
};