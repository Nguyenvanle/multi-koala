import { AnswerBodyType } from "@/features/test/types/answer";
import { QuestionBodyType } from "@/features/test/types/question";
import { useEffect, useState } from "react";

export default function useQuestionDisplay({
  question,
  onAnswerEdit,
  onAddAnswer,
  onRemoveAnswer,
}: {
  question: QuestionBodyType;
  onAnswerEdit: (answerId: string, updatedAnswer: AnswerBodyType) => void;
  onAddAnswer: () => void;
  onRemoveAnswer: (answerId: string) => void;
}) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("");
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  useEffect(() => {
    const correctAnswer = question.answers?.find((a) => a.correct);
    setSelectedAnswerId(correctAnswer?.answerId || "");
  }, [question.answers]);

  const handleAnswerSelect = (selectedAnswerId: string) => {
    setSelectedAnswerId(selectedAnswerId);
    question.answers?.forEach((answer) => {
      if (answer.answerId) {
        onAnswerEdit(answer.answerId, {
          ...answer,
          correct: answer.answerId === selectedAnswerId,
        });
      }
    });
  };

  const handleAnswerEdit = (
    answerId: string,
    updatedAnswer: AnswerBodyType
  ) => {
    if (updatedAnswer.correct && answerId !== selectedAnswerId) {
      question.answers?.forEach((answer) => {
        if (answer.answerId) {
          onAnswerEdit(answer.answerId, {
            ...answer,
            correct: false,
          });
        }
      });
      setSelectedAnswerId(answerId);
    }
    onAnswerEdit(answerId, updatedAnswer);
    setOpenDialogId(null); // Đóng dialog sau khi edit
  };

  return {
    selectedAnswerId,
    handleAnswerSelect,
    handleAnswerEdit,
    openDialogId,
    setOpenDialogId,
  };
}
