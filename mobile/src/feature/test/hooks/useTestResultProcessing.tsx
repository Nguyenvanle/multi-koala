import { useEffect, useState } from "react";

const useTestResultProcessing = (serverData, userSubmission) => {
  const [processedResult, setProcessedResult] = useState(null);

  useEffect(() => {
    if (!serverData || !serverData.result || !userSubmission) return;

    const { result } = serverData;
    const { totalQuestion, correctAnswers, questions } = result;

    const updatedQuestions = questions.map((question) => {
      const userAnswer = userSubmission.answerSubmitList.find(
        (answer) => answer.questionId === question.questionId
      );

      const updatedAnswers = question.answers.map((answer) => ({
        ...answer,
        selected: userAnswer
          ? userAnswer.selectedAnswerId === answer.answerId
          : false,
      }));

      return {
        ...question,
        answers: updatedAnswers,
        userCorrect: updatedAnswers.some(
          (answer) => answer.correct && answer.selected
        ),
      };
    });

    setProcessedResult({
      ...result,
      totalQuestion,
      correctAnswers,
      questions: updatedQuestions,
    });
  }, [serverData, userSubmission]);

  return processedResult;
};

export default useTestResultProcessing;
