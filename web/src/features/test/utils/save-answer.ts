import { AnswerBodyType } from "@/features/test/types/answer";
import { TestBodyType } from "@/features/test/types/test-result";

// Hàm tạo một câu trả lời mới
const createNewAnswer = (updatedAnswer: AnswerBodyType) => ({
  answerId: null,
  answerDescription: updatedAnswer.answerDescription,
  correct: updatedAnswer.correct,
});

// Hàm xử lý thêm câu trả lời
const handleAddNewAnswer = (
  currentAnswers: AnswerBodyType[],
  updatedAnswer: AnswerBodyType
) => {
  // Nếu mảng câu trả lời hiện tại tồn tại và có phần tử
  if (currentAnswers && currentAnswers.length > 0) {
    return [...currentAnswers, createNewAnswer(updatedAnswer)];
  }

  // Nếu mảng câu trả lời rỗng hoặc không tồn tại
  return [createNewAnswer(updatedAnswer)];
};

// Hàm xử lý cập nhật câu trả lời
const handleUpdateExistingAnswer = (
  currentAnswers: AnswerBodyType[],
  answerId: string | null,
  updatedAnswer: AnswerBodyType
) => {
  return currentAnswers.map((answer) =>
    answer.answerId === answerId
      ? {
          ...answer,
          answerDescription: updatedAnswer.answerDescription,
          correct: updatedAnswer.correct,
        }
      : answer
  );
};

// Hàm chính xử lý cập nhật câu hỏi
export const updateQuestions = (
  testData: TestBodyType,
  questionId: string,
  answerId: string | null,
  updatedAnswer: AnswerBodyType
) => {
  console.log("Updating questions:", {
    questionId,
    answerId,
    updatedAnswer,
  });
  return testData.questions.map((question) => {
    // Nếu không phải câu hỏi cần update, trả về nguyên câu hỏi
    if (question.questionId !== questionId) return question;

    // Xử lý dựa trên loại thao tác
    return {
      ...question,
      answers: handleUpdateExistingAnswer(
        question.answers || [],
        answerId,
        updatedAnswer
      ),
    };
  });
};
