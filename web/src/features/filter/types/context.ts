type FilterContextType = {
  filters: FilterState;
  updateFilter: (filterType: keyof FilterState, value: any) => void;
  resetFilters: () => void;
};
