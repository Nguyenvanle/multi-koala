import { CoursesResultResType } from "@/features/courses/types/course";
import { COURSE_VERIFY } from "@/types/course/verify";

// src/features/courses/filters/filterStrategies.ts
// Interface tổng quát cho chức năng filter
// Lọc một khóa học với một tiêu chí bất kỳ
export interface FilterStrategy {
  apply(courses: CoursesResultResType, value: any): CoursesResultResType;
}

// Triển khai với tiêu chí: Lọc theo tên
class NameFilter implements FilterStrategy {
  apply(courses: CoursesResultResType, value: string): CoursesResultResType {
    return courses.filter((course) =>
      course.courseName.toLowerCase().includes(value.toLowerCase())
    );
  }
}

// Triển khai với tiêu chí: Lọc theo khoảng giá
class PriceRangeFilter implements FilterStrategy {
  apply(
    courses: CoursesResultResType,
    value: { min: number; max: number }
  ): CoursesResultResType {
    return courses.filter((course) => {
      const discountedPrice =
        course.coursePrice * (1 - course.discountApprovedRate);
      return discountedPrice >= value.min && discountedPrice <= value.max;
    });
  }
}

// Triển khai với tiêu chí: Lọc theo đánh giá
class RatingFilter implements FilterStrategy {
  apply(
    courses: CoursesResultResType,
    value: number | undefined
  ): CoursesResultResType {
    if (value === undefined || value === 0) {
      return courses;
    }
    return courses.filter((course) => course.courseRating >= value);
  }
}

class FieldsFilter implements FilterStrategy {
  apply(courses: CoursesResultResType, fields: string[]): CoursesResultResType {
    if (fields.length === 0) return courses;
    return courses.filter((course) =>
      fields.every((field) =>
        course.fields.some((courseField) => courseField.fieldName === field)
      )
    );
  }
}

class TypesFilter implements FilterStrategy {
  apply(courses: CoursesResultResType, types: string[]): CoursesResultResType {
    if (types.length === 0) return courses;
    return courses.filter((course) =>
      types.every((type) =>
        course.types.some((courseType) => courseType.typeName === type)
      )
    );
  }
}

class LevelsFilter implements FilterStrategy {
  apply(courses: CoursesResultResType, levels: string[]): CoursesResultResType {
    if (levels.length === 0) return courses;
    return courses.filter((course) => levels.includes(course.courseLevel));
  }
}

class CourseStatusFilter implements FilterStrategy {
  apply(
    courses: CoursesResultResType,
    showApprovedOnly: boolean
  ): CoursesResultResType {
    if (!showApprovedOnly) {
      return courses;
    }
    return courses.filter(
      (course) => course.status === COURSE_VERIFY.Enum.APPROVED
    );
  }
}

export {
  RatingFilter,
  PriceRangeFilter,
  NameFilter,
  FieldsFilter,
  TypesFilter,
  LevelsFilter,
  CourseStatusFilter,
};

