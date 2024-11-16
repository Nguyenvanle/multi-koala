export type AnswerBody = {
  answerId: string;
  answerDescription: string;
  correct: boolean;
  selected: boolean;
};

export type AnswerBodyList = AnswerBody[];

export type QuizBody = {
  questionId: string;
  image: string;
  questionDescription: string;
  answers: AnswerBodyList;
};

export type QuizBodyList = QuizBody[];

export type TestResultBody = {
  quizResultId: string;
  totalQuestion: number;
  answeredQuestions: number;
  correctAnswers: number;
  passed: boolean;
  questions: QuizBodyList;
};

export type TestResultRes = {
  code: number;
  message: string;
  result: TestResultBody;
};

export type SubmitBody = {
  questionId: string;
  selectedAnswerId: string;
};

export type SubmitBodyList = SubmitBody[];

export type SubmitRes = {
  answerSubmitList: SubmitBodyList;
};
