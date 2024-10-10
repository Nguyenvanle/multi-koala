export type AnswerDetails = {
  answerId: string;
  answerDescription: string;
  correct: boolean;
};

export type AnswerDetailsList = AnswerDetails[];

export type QuestionDetails = {
  questionId: string;
  image: string;
  questionDescription: string;
  answers: AnswerDetailsList;
};

export type QuestionDetailsList = QuestionDetails[];

export type TestDetails = {
  testId: string;
  testDescription: string;
  passingScore: number;
  status: string;
  questions: QuestionDetailsList;
};

export type TestList = TestDetails[];

export type TestDetailsRes = {
  code: number;
  message: string;
  result: TestList;
};
