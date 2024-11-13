import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnswerEditor } from "@/features/test/components/atoms/answer-edit";
import { AnswerBodyType } from "@/features/test/types/answer";
import { QuestionBodyType } from "@/features/test/types/question";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4 rounded overflow-hidden">
        {question.image && (
          <Image
            src={question.image.imageUrl}
            alt="Question"
            className="max-w-full h-auto"
            width={700}
            height={400}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="rounded border p-2">
          <p>{question.questionDescription}</p>
        </div>
        <div className="rounded border">
          <RadioGroup className="gap-0">
            {question.answers.map((answer) => (
              <div
                key={answer.answerId}
                className="flex items-center space-x-2 border-b p-2 hover:bg-muted"
              >
                <RadioGroupItem
                  value={answer.answerId}
                  id={answer.answerId}
                  checked={answer.correct}
                  onClick={() =>
                    onAnswerEdit(answer.answerId, {
                      ...answer,
                      correct: !answer.correct,
                    })
                  }
                />
                <Label htmlFor={answer.answerId} className="flex-grow">
                  {answer.answerDescription}
                </Label>
                <Dialog>
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
                    </DialogHeader>
                    <AnswerEditor
                      answer={answer}
                      onSave={(updatedAnswer) =>
                        onAnswerEdit(answer.answerId, updatedAnswer)
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
