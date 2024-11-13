export type CourseRatingBody = {
  avgcourseRating: number;
};

export type CourseRatingRes = {
  code: number;
  message: string;
  result: CourseRatingBody;
};
