import Image from "next/image";
import useQuestionDisplay from "@/features/test/hooks/useQuestionDisplay";
import { AnswerBodyType } from "@/features/test/types/answer";
import { AnswerDisplay } from "@/features/test/components/molecules/answer-display";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { ImageEmptyState } from "@/features/test/components/atoms/image-empty";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { QuestionBodyType } from "@/features/test/types/question";
import { RadioGroup } from "@/components/ui/radio-group";

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
  const {
    selectedAnswerId,
    handleAnswerSelect,
    handleAnswerEdit,
    openDialogId,
    setOpenDialogId,
  } = useQuestionDisplay({
    question,
    onAnswerEdit,
    onAddAnswer,
    onRemoveAnswer,
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <Label>
          <CardDescription>Upload image</CardDescription>
        </Label>
        {question.image ? (
          <Image
            src={question?.image?.imageUrl ?? "/images/smile.png"}
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
        <div className="rounded border min-h-10 p-2">
          <p>{question.questionDescription}</p>
        </div>
        <Label>
          <CardDescription>Answers</CardDescription>
        </Label>
        <div className="rounded border">
          <RadioGroup
            className="gap-0"
            value={selectedAnswerId}
            onValueChange={handleAnswerSelect}
          >
            {question.answers &&
              question.answers.map((answer) => (
                <AnswerDisplay
                  key={answer.answerId}
                  answer={{ ...answer, answerId: answer.answerId || "" }}
                  openDialogId={openDialogId}
                  setOpenDialogId={setOpenDialogId}
                  handleAnswerEdit={handleAnswerEdit}
                  onRemoveAnswer={onRemoveAnswer}
                />
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
