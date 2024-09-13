import {
  FilterStrategy,
  NameFilter,
  PriceRangeFilter,
  RatingFilter,
} from "@/features/filter/services/strategy";

// src/features/courses/filters/filterFactory.ts
export class FilterFactory {
  static createFilter(type: string): FilterStrategy {
    switch (type) {
      case "name":
        return new NameFilter();
      case "priceRange":
        return new PriceRangeFilter();
      case "rating":
        return new RatingFilter();
      default:
        throw new Error(`Unsupported filter type: ${type}`);
    }
  }
}
