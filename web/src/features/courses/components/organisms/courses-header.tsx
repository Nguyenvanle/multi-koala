// src/features/courses/components/organisms/CoursesHeader.tsx
import React, { Dispatch, SetStateAction } from "react";
import { H4, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "@/features/courses/components/atoms/icon";
import {
  SelectSort,
  SortOption,
} from "@/features/courses/components/molecules/select-sort";

interface CoursesHeaderProps {
  setSortOrder: Dispatch<SetStateAction<SortOption>>;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  setSortOrder,
}) => (
  <>
    <div className="flex flex-1 flex-col justify-start">
      <H4 className="mt-0 text-primary">Courses</H4>

      <P>
        Explore our diverse range of courses designed to enhance your skills and
        knowledge. Discover more about each course below!
      </P>
    </div>

    <div className="flex flex-1 flex-row justify-between gap-4">
      <Button variant="outline">
        <FilterIcon />
      </Button>

      <SelectSort setSortOrder={setSortOrder} />
    </div>
  </>
);
