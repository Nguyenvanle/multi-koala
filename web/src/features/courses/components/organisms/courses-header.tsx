import { useState, useCallback } from "react";
import {
  SelectSort,
  SortOption,
} from "@/features/courses/components/molecules/select-sort";
import { debounce } from "lodash";
import SearchInputCourse from "@/features/courses/components/molecules/search-input";
import { FilterButton } from "@/features/courses/components/molecules/filter-button";
import { FilterDialog } from "@/features/courses/components/organisms/filter-dialog";
import { H4, P } from "@/components/ui/typography";

interface CoursesHeaderProps {
  setSortOrder: React.Dispatch<React.SetStateAction<SortOption>>;
  updateFilter: (filterType: string, value: any) => void;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  setSortOrder,
  updateFilter,
}) => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [nameFilter, setNameFilter] = useState<string>("");

  const debouncedUpdateNameFilter = useCallback(
    (value: string) => {
      const debouncedFn = debounce((val: string) => {
        updateFilter("name", val);
      }, 300);
      debouncedFn(value);
    },
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
    setIsFilterDialogOpen(false);
  };

  return (
    <div className="space-y-4 ">
      <div className="flex flex-1 flex-col justify-start">
        <H4 className="mt-0">All Courses</H4>
        <P>
          Explore our diverse range of courses designed to enhance your skills
          and knowledge. Discover more about each course below!
        </P>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-auto sm:flex-grow">
          <SearchInputCourse
            value={nameFilter}
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
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        onSubmit={handleFilterSubmit}
      />
    </div>
  );
};

export default CoursesHeader;
