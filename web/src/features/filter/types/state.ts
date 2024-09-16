type FilterState = {
  name: string;
  priceRange: { min: number; max: number };
  rating: number;
  fields: string[];
  types: string[];
  levels: string[];
};
