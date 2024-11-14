import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { QuestionBodyType } from "@/features/test/types/question";
import { cn } from "@/lib/utils";
import { AnswerBodyType } from "@/features/test/types/answer";
import { QuestionEditor } from "@/features/test/components/atoms/question-edit";
import { QuestionDisplay } from "@/features/test/components/molecules/question-display";

interface QuestionCardProps {
  question: QuestionBodyType;
  index: number;
  isActive: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (updatedQuestion: QuestionBodyType) => void;
  onCancel: () => void;
  onAnswerEdit: (answerId: string, updatedAnswer: AnswerBodyType) => void;
  onAddAnswer: () => void;
  onRemoveAnswer: (answerId: string) => void;
}

export const QuestionCard = ({
  question,
  index,
  isActive,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onAnswerEdit,
  onAddAnswer,
  onRemoveAnswer,
}: QuestionCardProps) => (
  <Card
    id={`question-${question.questionId}`}
    className={cn(
      "transition-all duration-200",
      isActive && "ring-inset ring-2 ring-primary"
    )}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-bold -mt-4">
        Question {index + 1}
      </CardTitle>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      {isEditing ? (
        <QuestionEditor
          question={question}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <QuestionDisplay
          question={question}
          onAnswerEdit={onAnswerEdit}
          onAddAnswer={onAddAnswer}
          onRemoveAnswer={onRemoveAnswer}
        />
      )}
    </CardContent>
  </Card>
);
