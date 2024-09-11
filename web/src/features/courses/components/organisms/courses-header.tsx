// src/features/courses/components/organisms/CoursesHeader.tsx
import React from "react";
import { H4, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "@/features/courses/components/atoms/icon";
import { SelectSort } from "@/features/courses/components/molecules/select-sort";

export const CoursesHeader: React.FC = () => (
  <>
    <div className="flex flex-1 flex-col justify-start">
      <H4 className="mt-0 text-primary">Courses</H4>
      <P>
        Explore our diverse range of courses designed to enhance your skills and
        knowledge. Discover more about each course below!
      </P>
    </div>
    <div className="flex flex-1 flex-row justify-end gap-4">
      <div className="flex flex-0 justify-end gap-2">
        <Button variant="outline">
          <FilterIcon />
        </Button>
        <SelectSort />
      </div>
    </div>
  </>
);
