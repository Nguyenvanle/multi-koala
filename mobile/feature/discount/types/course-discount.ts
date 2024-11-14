export type CourseDiscountBody = {
  discountApplied: number;
};

export type CourseDiscountBodyList = CourseDiscountBody[];

export type CourseDiscountRes = {
  code: number;
  message: string;
  result: CourseDiscountBody;
};

export type CourseDiscountResList = {
  code: number;
  message: string;
  result: CourseDiscountBody[];
};
