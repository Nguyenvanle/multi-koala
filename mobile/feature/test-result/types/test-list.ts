export type Answer = {
  answerId: string;
  answerDescription: string;
  selected: boolean;
  correct: boolean;
};

export type AnswerList = Answer[];

export type Question = {
  questionId: string;
  image: string;
  questionDescription: string;
  answers: AnswerList;
};

export type QuestionList = Question[];

export type QuizResult = {
  quizResultId: string;
  totalQuestion: number;
  answeredQuestions: number;
  correctAnswers: number;
  dateTaken: Date;
  questions: QuestionList;
};

export type QuizResultList = QuizResult[];

export type ResultRes = {
  code: number;
  message: string;
  result: QuizResultList;
};
