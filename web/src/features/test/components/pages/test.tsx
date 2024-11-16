"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TestBodyType } from "@/features/test/types/test-result";
import useTestEditor from "@/features/test/hooks/useTestEditor";
import { TestHeader } from "@/features/test/components/atoms/test-header";
import { QuestionCard } from "@/features/test/components/organisms/question-card";
import { NavigationSidebar } from "@/features/test/components/molecules/side-bar";
import { TestSettingsDialog } from "@/features/test/components/atoms/setting-dialog";
import { DeleteDialog } from "@/features/test/components/atoms/delete-dialog";

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
    scrollToQuestion,
    handleUpdateTestSettings,
    handleAddQuestion,

    settingsOpen,
    deleteDialogOpen,
    setSettingsOpen,
    setDeleteDialogOpen,
    onDeleteQuestion,
    confirmDelete,
  } = useTestEditor(initialTestData);

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] w-full">
      <div className="flex flex-col flex-1 gap-4">
        <TestHeader
          onSettingsClick={() => setSettingsOpen(true)}
          handleAddQuestion={handleAddQuestion}
        />

        <ScrollArea className="h-[calc(100vh-100px)] pr-4">
          <div className="flex flex-col gap-6">
            {testData.questions.map((question, index) => (
              <QuestionCard
                key={question.questionId}
                question={question}
                index={index}
                isActive={activeQuestionId === question.questionId}
                isEditing={editingQuestionId === question.questionId}
                onEdit={() => handleQuestionEdit(question.questionId)}
                onDelete={() => onDeleteQuestion(question.questionId)}
                onSave={(updatedQuestion) =>
                  handleQuestionSave(question.questionId, updatedQuestion)
                }
                onCancel={() => setEditingQuestionId(null)}
                onAnswerEdit={(answerId, updatedAnswer) =>
                  handleAnswerEdit(question.questionId, answerId, updatedAnswer)
                }
                onAddAnswer={() => handleAddAnswer(question.questionId)}
                onRemoveAnswer={(answerId) =>
                  handleRemoveAnswer(question.questionId, answerId)
                }
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <NavigationSidebar
        testData={testData}
        activeQuestionId={activeQuestionId}
        editingQuestionId={editingQuestionId}
        onQuestionClick={scrollToQuestion}
      />

      <TestSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        testData={testData}
        onSave={handleUpdateTestSettings}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
