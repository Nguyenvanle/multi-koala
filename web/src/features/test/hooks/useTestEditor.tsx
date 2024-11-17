import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AnswerBodyType } from "@/features/test/types/answer";
import {
  PostQuestionBodyType,
  PutQuestionBody,
  PutQuestionBodyType,
  QuestionBodyType,
} from "@/features/test/types/question";
import { TestBodyType } from "@/features/test/types/test-result";
import { putExam } from "@/features/test/actions/put-exam";
import { examService } from "@/features/test/services/exam";
import { postQuestion } from "@/features/test/actions/post-question";
import { putSingleQuestion } from "@/features/test/actions/put-question";
import { putQuestionV2 } from "@/features/test/actions/put-question-v2";

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
        setTestData((prevData) => ({
          ...prevData,
          questions: [...prevData.questions, res.result?.result!],
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
        questionDescription: updatedQuestion.questionDescription,
        answers: updatedQuestion.answers
          ? updatedQuestion.answers.map((a) => a.answerDescription)
          : [],
        correctIndex: updatedQuestion.answers
          ? updatedQuestion.answers.findIndex((a) => a.correct)
          : 0,
      };

      console.log("uploadData:", uploadData);

      const validate = PutQuestionBody.safeParse(uploadData);

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
        setTestData((prevData) => ({
          ...prevData,
          questions: prevData.questions.map((q) =>
            q.questionId === questionId ? updatedQuestion : q
          ),
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
