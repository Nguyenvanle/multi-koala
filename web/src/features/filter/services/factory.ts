import {
  CourseStatusFilter,
  FieldsFilter,
  FilterStrategy,
  LevelsFilter,
  NameFilter,
  PriceRangeFilter,
  RatingFilter,
  TypesFilter,
} from "@/features/filter/services/strategy";

// src/features/courses/filters/filterFactory.ts
export class FilterFactory {
  static createFilter(filterType: string): FilterStrategy {
    switch (filterType) {
      case "name":
        return new NameFilter();
      case "priceRange":
        return new PriceRangeFilter();
      case "rating":
        return new RatingFilter();
      case "fields":
        return new FieldsFilter();
      case "types":
        return new TypesFilter();
      case "levels":
        return new LevelsFilter();
      case "status":
        return new CourseStatusFilter();
      default:
        throw new Error(`Unsupported filter type: ${filterType}`);
    }
  }
}
