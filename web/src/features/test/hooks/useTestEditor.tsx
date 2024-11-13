import { toast } from "@/components/ui/use-toast";
import { AnswerBodyType } from "@/features/test/types/answer";
import { QuestionBodyType } from "@/features/test/types/question";
import { TestBodyType } from "@/features/test/types/test-result";
import { useState } from "react";

// Mock function to simulate saving dataz
export const saveTestData = async (data: TestBodyType) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Saving test data:", data);
  return { success: true };
};

export default function useTestEditor(initialTestData: TestBodyType) {
  const [testData, setTestData] = useState<TestBodyType>(initialTestData);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    testData.questions[0]?.questionId || null
  );

  const handleQuestionEdit = (questionId: string) => {
    setEditingQuestionId(questionId);
  };

  const handleQuestionSave = (
    questionId: string,
    updatedQuestion: QuestionBodyType
  ) => {
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.questionId === questionId ? updatedQuestion : q
      ),
    }));
    setEditingQuestionId(null);
  };

  const handleAnswerEdit = (
    questionId: string,
    answerId: string,
    updatedAnswer: AnswerBodyType
  ) => {
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.answerId === answerId ? updatedAnswer : a
              ),
            }
          : q
      ),
    }));
  };

  const handleAddAnswer = (questionId: string) => {
    const newAnswer: AnswerBodyType = {
      answerId: Date.now().toString(),
      answerDescription: "",
      correct: false,
    };
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.questionId === questionId
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      ),
    }));
  };

  const handleRemoveAnswer = (questionId: string, answerId: string) => {
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.questionId === questionId
          ? { ...q, answers: q.answers.filter((a) => a.answerId !== answerId) }
          : q
      ),
    }));
  };

  const handleSaveTest = async () => {
    const result = await saveTestData(testData);
    if (result.success) {
      toast({
        title: "Test saved successfully",
        description: "All changes have been saved.",
      });
    } else {
      toast({
        title: "Error saving test",
        description:
          "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToQuestion = (questionId: string) => {
    setActiveQuestionId(questionId);
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return {
    testData,
    editingQuestionId,
    activeQuestionId,
    setEditingQuestionId,
    handleQuestionEdit,
    handleQuestionSave,
    handleAnswerEdit,
    handleAddAnswer,
    handleRemoveAnswer,
    handleSaveTest,
    scrollToQuestion,
  };
}
