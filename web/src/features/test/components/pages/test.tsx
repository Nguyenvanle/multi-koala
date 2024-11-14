"use client";

import React, { useState } from "react";
import { Pencil, Save, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestBodyType } from "@/features/test/types/test-result";
import { cn } from "@/lib/utils";
import useTestEditor from "@/features/test/hooks/useTestEditor";
import { QuestionDisplay } from "@/features/test/components/molecules/question-display";
import { QuestionEditor } from "@/features/test/components/atoms/question-edit";
import { QuestionNavItem } from "@/features/test/components/atoms/question-nav";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import EnhancedCardHeader from "@/features/test/components/atoms/header";

const TestSettingsDialog = ({
  open,
  onOpenChange,
  testData,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testData: TestBodyType;
  onSave: (testDescription: string, passingScore: number) => void;
}) => {
  const [testDescription, setTestDescription] = useState(
    testData.testDescription
  );
  const [passingScore, setPassingScore] = useState(
    testData.passingScore.toString()
  );

  const handleSave = () => {
    onSave(testDescription, Number(passingScore));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Settings</DialogTitle>
          <DialogDescription>
            Update test name and passing score
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="testDescription">Test Name</Label>
            <Input
              id="testDescription"
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passingScore">Passing Score</Label>
            <Input
              id="passingScore"
              type="number"
              min="0"
              max="100"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function TestEditor({
  initialTestData,
}: {
  initialTestData: TestBodyType;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

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
    handleUpdateTestSettings,
    handleDeleteQuestion,
  } = useTestEditor(initialTestData);

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

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] w-full">
      {/* Main content */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row justify-between pr-4">
          <h1 className="text-2xl font-bold">Edit Test</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="h-8"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button className="h-8" onClick={handleSaveTest}>
              <Save className="mr-2 h-4 w-4" />
              Save Test
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-100px)] pr-4">
          <div className="flex flex-col gap-6">
            {testData.questions.map((question) => (
              <Card
                key={question.questionId}
                id={`question-${question.questionId}`}
                className={cn(
                  "transition-all duration-200",
                  activeQuestionId === question.questionId &&
                    "ring-inset ring-2 ring-primary"
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold -mt-4">
                    Question {testData.questions.indexOf(question) + 1}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuestionEdit(question.questionId)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteQuestion(question.questionId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
      <Card className="w-64 overflow-hidden">
        <EnhancedCardHeader testData={testData} />
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
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
        </CardContent>
      </Card>

      {/* Test Settings Dialog */}
      <TestSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        testData={testData}
        onSave={handleUpdateTestSettings}
      />

      {/* Delete Question Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this question? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
