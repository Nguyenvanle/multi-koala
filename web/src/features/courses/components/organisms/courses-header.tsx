// src/features/courses/components/organisms/CoursesHeader.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
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

interface CoursesHeaderProps {
  setSortOrder: Dispatch<SetStateAction<SortOption>>;
  setFilterKeyword: Dispatch<SetStateAction<string>>;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  setSortOrder,
  setFilterKeyword,
}) => {
  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilterSubmit = () => {
    setFilterKeyword(filterValue);
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

      <div className="flex flex-1 flex-row justify-between gap-4">
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
                Enter course name to filter the list.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="filter" className="text-right">
                  Course Name
                </Label>
                <Input
                  id="filter"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter course name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setFilterValue("")}>
                Reset
              </Button>
              <Button type="submit" onClick={handleFilterSubmit}>
                Apply Filter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <SelectSort setSortOrder={setSortOrder} />
      </div>
    </>
  );
};