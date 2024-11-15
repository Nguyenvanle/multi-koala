import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnswerEditor } from "@/features/test/components/atoms/answer-edit";
import { ImageEmptyState } from "@/features/test/components/atoms/image-empty";
import { AnswerBodyType } from "@/features/test/types/answer";
import { QuestionBodyType } from "@/features/test/types/question";
import { cn } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function QuestionDisplay({
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
    const correctAnswer = question.answers.find((a) => a.correct);
    setSelectedAnswerId(correctAnswer?.answerId || "");
  }, [question.answers]);

  const handleAnswerSelect = (selectedAnswerId: string) => {
    setSelectedAnswerId(selectedAnswerId);
    question.answers.forEach((answer) => {
      onAnswerEdit(answer.answerId, {
        ...answer,
        correct: answer.answerId === selectedAnswerId,
      });
    });
  };

  const handleAnswerEdit = (
    answerId: string,
    updatedAnswer: AnswerBodyType
  ) => {
    if (updatedAnswer.correct && answerId !== selectedAnswerId) {
      question.answers.forEach((answer) => {
        if (answer.answerId !== answerId) {
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

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Label>
          <CardDescription>Upload image</CardDescription>
        </Label>
        {question.image ? (
          <Image
            src={question.image.imageUrl}
            alt="Question"
            className="max-w-full h-auto rounded"
            width={700}
            height={400}
          />
        ) : (
          <ImageEmptyState />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>
          <CardDescription>Question content</CardDescription>
        </Label>
        <div className="rounded border p-2">
          <p>{question.questionDescription}</p>
        </div>
        <Label>
          <CardDescription>
            Select the correct answer for this question
          </CardDescription>
        </Label>
        <div className="rounded border">
          <RadioGroup
            className="gap-0"
            value={selectedAnswerId}
            onValueChange={handleAnswerSelect}
          >
            {question.answers.map((answer) => (
              <div
                key={answer.answerId}
                className="flex items-center space-x-2 border-b p-2 hover:bg-muted"
              >
                <RadioGroupItem
                  value={answer.answerId}
                  id={answer.answerId}
                  hidden
                />
                <div
                  className={cn(
                    "w-2 h-full rounded",
                    answer.correct ? "bg-primary" : "bg-destructive"
                  )}
                />
                <Label htmlFor={answer.answerId} className="flex-grow">
                  {answer.answerDescription}
                </Label>
                <Dialog
                  open={openDialogId === answer.answerId}
                  onOpenChange={(open) => {
                    setOpenDialogId(open ? answer.answerId : null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-transparent"
                    >
                      <Pencil className="h-4 w-4 hover:text-primary" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Answer</DialogTitle>
                      <DialogDescription>
                        Edit the description and correctness of the answer.
                      </DialogDescription>
                    </DialogHeader>
                    <AnswerEditor
                      answer={answer}
                      onSave={(updatedAnswer) =>
                        handleAnswerEdit(answer.answerId, updatedAnswer)
                      }
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveAnswer(answer.answerId)}
                >
                  <Trash2 className="h-4 w-4 hover:text-destructive" />
                </Button>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button onClick={onAddAnswer} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Answer
        </Button>
      </div>
    </div>
  );
}