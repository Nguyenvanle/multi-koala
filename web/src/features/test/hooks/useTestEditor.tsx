import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AnswerBodyType } from "@/features/test/types/answer";
import { QuestionBodyType } from "@/features/test/types/question";
import { TestBody, TestBodyType } from "@/features/test/types/test-result";
import { handleSaveTest as handleSaveTestUtil } from "@/features/test/utils/save-test";

export default function useTestEditor(initialTestData: TestBodyType) {
  const [testData, setTestData] = useState<TestBodyType>(initialTestData);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    testData.questions[0]?.questionId || null
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  useEffect(() => {
    console.log("Initial test data loaded:", initialTestData);
  }, [initialTestData]);

  const onDeleteQuestion = (questionId: string) => {
    setQuestionToDelete(questionId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (questionToDelete) {
      handleDeleteQuestion(questionToDelete);
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

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

  const handleDeleteQuestion = (questionId: string) => {
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((q) => q.questionId !== questionId),
    }));

    // Update active question if necessary
    if (activeQuestionId === questionId) {
      const remainingQuestions = testData.questions.filter(
        (q) => q.questionId !== questionId
      );
      setActiveQuestionId(remainingQuestions[0]?.questionId || null);
    }

    toast({
      title: "Question deleted",
      description: "The question has been removed from the test.",
    });
  };

  const handleUpdateTestSettings = (
    testDescription: string,
    passingScore: number
  ) => {
    setTestData((prevData) => ({
      ...prevData,
      testDescription,
      passingScore,
    }));

    toast({
      title: "Settings updated",
      description: "Test settings have been updated successfully.",
    });
  };

  const handleSaveTest = async () => {
    await handleSaveTestUtil(testData);
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
    handleDeleteQuestion,
    handleUpdateTestSettings,
    handleSaveTest,
    scrollToQuestion,

    settingsOpen,
    deleteDialogOpen,
    setSettingsOpen,
    setDeleteDialogOpen,
    onDeleteQuestion,
    confirmDelete,
  };
}
