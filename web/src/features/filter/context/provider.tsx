"use client";

import useCoursePricesRange from "@/features/courses/hooks/useCoursePricesRange";
import { createContext, useCallback, useState, useEffect } from "react";

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pricesRange, isLoading } = useCoursePricesRange();

  const [filters, setFilters] = useState<FilterState>({
    name: "",
    priceRange: { min: 0, max: 1000 }, // Giá trị mặc định tạm thời
    rating: 0,
    fields: [],
    types: [],
    levels: [],
    status: true,
  });

  useEffect(() => {
    if (pricesRange && !isLoading) {
      setFilters(prev => ({
        ...prev,
        priceRange: {
          min:  0,
          max: pricesRange.maxCoursePrice || 1000
        }
      }));
    }
  }, [pricesRange, isLoading]);

  const updateFilter = useCallback(
    (filterType: keyof FilterState, value: any) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      name: "",
      priceRange: pricesRange 
        ? { min:  0, max: pricesRange.maxCoursePrice || 1000 }
        : { min: 0, max: 1000 },
      rating: 0,
      fields: [],
      types: [],
      levels: [],
      status: true,
    });
  }, [pricesRange]);

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};