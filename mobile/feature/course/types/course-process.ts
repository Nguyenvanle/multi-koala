export type CourseProcessBody = {
  process: number;
};

export type CourseProcessRes = {
  code: number;
  message: string;
  result: CourseProcessBody;
};
