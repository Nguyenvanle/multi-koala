"use client";

import { Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestBodyType } from "@/features/test/types/test-result";
import { cn } from "@/lib/utils";
import useTestEditor from "@/features/test/hooks/useTestEditor";
import { QuestionDisplay } from "@/features/test/components/molecules/question-display";
import { QuestionEditor } from "@/features/test/components/atoms/question-edit";
import { QuestionNavItem } from "@/features/test/components/atoms/question-nav";

export default function TestEditor({
  initialTestData,
}: {
  initialTestData: TestBodyType;
}) {
  const {
    testData,
    activeQuestionId,
    editingQuestionId,
    setEditingQuestionId,
    handleQuestionEdit,
    handleQuestionSave,
    handleAnswerEdit,
    handleAddAnswer,
    handleRemoveAnswer,
    handleSaveTest,
    scrollToQuestion,
  } = useTestEditor(initialTestData);

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] w-full">
      {/* Main content */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row justify-between pr-4">
          <h1 className="text-2xl font-bold">Edit Test</h1>

          <Button className="h-8" onClick={handleSaveTest}>
            <Save className="mr-2 h-4 w-4" />
            Save Test
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-100px)] pr-4 ">
          <div className="flex flex-col gap-6 ">
            {testData.questions.map((question) => (
              <Card
                key={question.questionId}
                id={`question-${question.questionId}`}
                className={cn(
                  "transition-all duration-200 ",
                  activeQuestionId === question.questionId &&
                    "ring-inset ring-2 ring-primary"
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold -mt-4">
                    Question {testData.questions.indexOf(question) + 1}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuestionEdit(question.questionId)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {editingQuestionId === question.questionId ? (
                    <QuestionEditor
                      question={question}
                      onSave={(updatedQuestion) =>
                        handleQuestionSave(question.questionId, updatedQuestion)
                      }
                      onCancel={() => setEditingQuestionId(null)}
                    />
                  ) : (
                    <QuestionDisplay
                      question={question}
                      onAnswerEdit={(answerId, updatedAnswer) =>
                        handleAnswerEdit(
                          question.questionId,
                          answerId,
                          updatedAnswer
                        )
                      }
                      onAddAnswer={() => handleAddAnswer(question.questionId)}
                      onRemoveAnswer={(answerId) =>
                        handleRemoveAnswer(question.questionId, answerId)
                      }
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Question navigation sidebar */}
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Questions {testData.testDescription}</CardTitle>
          <CardDescription>🎯: {testData.passingScore}</CardDescription>
          <CardDescription>📃: {testData.questions.length}</CardDescription>
        </CardHeader>
        <CardContent className="h-[calc(100vh-260px)]">
          <ScrollArea className="h-[calc(100vh-260px)] -mr-3">
            <div className="pr-3 ">
              {testData.questions.map((question, index) => (
                <QuestionNavItem
                  key={question.questionId}
                  index={index}
                  question={question}
                  isActive={activeQuestionId === question.questionId}
                  isEditing={editingQuestionId === question.questionId}
                  onClick={() => scrollToQuestion(question.questionId)}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
