import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { AnswerEditor } from "@/features/test/components/atoms/answer-edit";
import { cn } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AnswerBodyType } from "@/features/test/types/answer";

export function AnswerDisplay({
  answer,
  openDialogId,
  setOpenDialogId,
  handleAnswerEdit,
  onRemoveAnswer,
}: {
  answer: { answerId: string; answerDescription: string; correct: boolean };
  openDialogId: string | null;
  setOpenDialogId: (answerId: string | null) => void;
  handleAnswerEdit: (answerId: string, updatedAnswer: AnswerBodyType) => void;
  onRemoveAnswer: (answerId: string) => void;
}) {
  return (
    <div
      key={answer.answerId}
      className="flex items-center space-x-2 border-b p-2 hover:bg-muted"
    >
      <RadioGroupItem value={answer.answerId} id={answer.answerId} hidden />
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
          <Button variant="ghost" size="sm" className="hover:bg-transparent">
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
  );
}
