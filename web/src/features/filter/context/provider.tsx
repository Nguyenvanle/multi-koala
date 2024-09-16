"use client";

import { createContext, useCallback, useState } from "react";

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    name: "",
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    fields: [],
    types: [],
    levels: [],
  });

  const updateFilter = useCallback(
    (filterType: keyof FilterState, value: any) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      name: "",
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      fields: [],
      types: [],
      levels: [],
    });
  }, []);

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
