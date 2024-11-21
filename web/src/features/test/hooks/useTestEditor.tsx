import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AnswerBodyType } from "@/features/test/types/answer";
import {
  PostQuestionBodyType,
  PutQuestionBodyType,
  QuestionBody,
  QuestionBodyType,
} from "@/features/test/types/question";
import { TestBodyType } from "@/features/test/types/test-result";
import { putExam } from "@/features/test/actions/put-exam";
import { postQuestion } from "@/features/test/actions/post-question";
import { putQuestionV2 } from "@/features/test/actions/put-question-v2";
import useSWR from "swr";
import { examService } from "@/features/test/services/exam";
import { deleteQuestion } from "@/features/test/actions/delete-question";
import { updateQuestions } from "@/features/test/utils/save-answer";

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

  const { data, mutate } = useSWR("/tests/${testId}", () =>
    examService.getTestByTestId(initialTestData.testId)
  );

  const handleAddQuestion = async () => {
    const newQuestion: PostQuestionBodyType = {
      questionDescription: "",
      answers: ["A", "B", "C", "D"],
      correctIndex: 0,
    };

    try {
      const res = await postQuestion(testData.testId, newQuestion);

      console.log(res);

      if (res.success) {
        const mutateData = await mutate();

        setTestData((prevData) => ({
          ...prevData,
          questions: mutateData?.result?.result.questions || prevData.questions,
        }));

        // Set newly created question as active and scroll to it
        setActiveQuestionId(res.result?.result?.questionId || null);
        setEditingQuestionId(res.result?.result?.questionId || null);

        // Scroll after a short delay to ensure the DOM has updated
        setTimeout(() => {
          const element = document.getElementById(
            `question-${res.result?.result?.questionId || null}`
          );
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);

        toast({
          title: "Question added",
          description: "A new question has been added to the test.",
        });
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

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

  const handleQuestionSave = async (
    questionId: string,
    updatedQuestion: QuestionBodyType
  ) => {
    try {
      console.log("updatedQuestion:", updatedQuestion);

      const uploadData: PutQuestionBodyType = {
        questionId: updatedQuestion.questionId,
        questionDescription: updatedQuestion.questionDescription,
        answers:
          updatedQuestion.answers?.map((a) => ({
            answerId: a.answerId,
            answerDescription: a.answerDescription,
            correct: a.correct,
          })) || [],
        image: null,
      };

      console.log("uploadData:", uploadData);

      const validate = QuestionBody.safeParse(uploadData);

      if (!validate.success) {
        console.error("Error updating question:", validate.error);
        toast({
          title: "Error updating question",
          description: "An error occurred while updating the question.",
          variant: "destructive",
        });
        return;
      }

      const res = await putQuestionV2(questionId, uploadData);

      if (res.success) {
        const mutateData = await mutate();

        console.log("mutateData:", mutateData);
        setTestData((prevData) => ({
          ...prevData,
          questions: prevData.questions.map((q) =>
            q.questionId === questionId ? updatedQuestion : q
          ),
          ...mutateData?.result?.result,
        }));
        setEditingQuestionId(null);

        toast({
          title: "Question updated",
          description: "The question has been updated successfully.",
        });
      } else {
        console.error("Res: Error updating question:", res);
        toast({
          title: "Error updating question",
          description: "An error occurred while updating the question.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Catch: Error updating question:", error);
      toast({
        title: "Error updating question",
        description: "An error occurred while updating the question.",
        variant: "destructive",
      });
    }
  };

  const handleAnswerEdit = async (
    questionId: string,
    answerId: string | null, // Allow null for new answers
    updatedAnswer: AnswerBodyType
  ) => {
    if (answerId?.length === 0) {
      answerId = null;
    }

    console.log("handleAnswerEdit:", {
      questionId,
      answerId,
      updatedAnswer,
    });

    try {
      // First, update the local state
      console.log("Current testData:", testData);

      const updatedQuestions = updateQuestions(
        testData,
        questionId,
        answerId,
        updatedAnswer
      );

      // Find the specific question that was updated
      const updatedQuestion = updatedQuestions.find(
        (q) => q.questionId === questionId
      );

      if (!updatedQuestion) {
        throw new Error("Question not found");
      }

      // Prepare the data for API call
      const uploadData: PutQuestionBodyType = {
        questionId: updatedQuestion.questionId,
        questionDescription: updatedQuestion.questionDescription,
        answers:
          updatedQuestion.answers?.map((a) => ({
            answerId: a.answerId, // Keep null for new answers
            answerDescription: a.answerDescription,
            correct: a.correct,
          })) || [],
        image: null,
      };

      // Call the API to update the question
      const res = await putQuestionV2(questionId, uploadData);

      if (res.success) {
        // Update the state with the server response
        const mutateData = await mutate();

        setTestData((prevData) => ({
          ...prevData,
          questions: mutateData?.result?.result.questions || updatedQuestions,
        }));

        toast({
          title: "Answer updated",
          description: "The answer has been updated successfully.",
        });
      } else {
        // Revert local state if API call fails
        setTestData((prevData) => ({
          ...prevData,
          questions: prevData.questions,
        }));

        toast({
          title: "Error updating answer",
          description:
            res.message || "An error occurred while updating the answer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating answer:", error);

      toast({
        title: "Error updating answer",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleAddAnswer = (questionId: string) => {
    const newAnswer: AnswerBodyType = {
      answerId: null,
      answerDescription: "",
      correct: false,
    };
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.questionId === questionId
          ? { ...q, answers: [...(q.answers || []), newAnswer] }
          : q
      ),
    }));
  };

  const handleRemoveAnswer = (questionId: string, answerId: string) => {
    setTestData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              answers: q.answers?.filter((a) => a.answerId !== answerId) || [],
            }
          : q
      ),
    }));
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const res = await deleteQuestion(questionId);

      if (res.success) {
        setTestData((prevData) => ({
          ...prevData,
          questions: prevData.questions.filter(
            (q) => q.questionId !== questionId
          ),
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
      } else {
        console.error("Error deleting question:", res);
        toast({
          title: "Error deleting question",
          description: "An error occurred while deleting the question.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast({
        title: "Error deleting question",
        description: "An error occurred while deleting the question.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTestSettings = async (
    testDescription: string,
    passingScore: number
  ) => {
    try {
      const res = await putExam(testData.testId, {
        testDescription,
        passingScore,
      });

      if (res.success) {
        console.log("Test settings updated:", res);

        setTestData((prevData) => ({
          ...prevData,
          testDescription,
          passingScore,
        }));
        toast({
          title: "Settings updated",
          description: "Test settings have been updated successfully.",
        });
      } else {
        console.error("Error updating test settings:", res);
        toast({
          title: "Error updating settings",
          description: "An error occurred while updating test settings.",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Error updating test settings:", error);
      toast({
        title: "Error updating settings",
        description: "An error occurred while updating test settings.",
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
    handleDeleteQuestion,
    handleUpdateTestSettings,
    scrollToQuestion,
    handleAddQuestion, // Export new function

    settingsOpen,
    deleteDialogOpen,
    setSettingsOpen,
    setDeleteDialogOpen,
    onDeleteQuestion,
    confirmDelete,
  };
}
