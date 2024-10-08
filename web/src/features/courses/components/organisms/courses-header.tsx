import { useState, useCallback } from "react";
import {
  SelectSort,
  SortOption,
} from "@/features/courses/components/molecules/select-sort";
import SearchInputCourse from "@/features/courses/components/molecules/search-input";
import { FilterButton } from "@/features/courses/components/molecules/filter-button";
import { FilterDialog } from "@/features/courses/components/organisms/filter-dialog";
import { H4, Muted, P } from "@/components/ui/typography";
import { useFilter } from "@/features/filter/hooks/useFilter";
import { Book } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CoursesHeaderProps {
  setSortOrder: React.Dispatch<React.SetStateAction<SortOption>>;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  setSortOrder,
}) => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const { filters, updateFilter } = useFilter();

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("name", e.target.value);
  };

  return (
    <div className="w-full p-4 xl:p-6 space-y-4">
      <Card className="p-4 xl:p-6 space-y-6 shadow-lg">
        <div className="flex flex-1 flex-col justify-start ">
          <H4 className="flex flex-row mt-0 items-center text-primary">
            <Book className="mr-1 text-primary" size={20} />
            All Courses
          </H4>

          <Muted>
            Explore our diverse range of courses designed to enhance your skills
            and knowledge. Discover more about each course below!
          </Muted>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="w-full sm:w-auto sm:flex-grow">
            <SearchInputCourse
              value={filters.name}
              onChange={handleNameFilterChange}
            />
          </div>

          <div className="flex flex-row space-x-2 ">
            <FilterButton onClick={() => setIsFilterDialogOpen(true)} />

            <SelectSort setSortOrder={setSortOrder} />
          </div>
        </div>

        <FilterDialog
          isOpen={isFilterDialogOpen}
          onClose={() => setIsFilterDialogOpen(false)}
        />
      </Card>
    </div>
  );
};

export default CoursesHeader;
