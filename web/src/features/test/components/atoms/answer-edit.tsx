import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnswerBodyType } from "@/features/test/types/answer";
import { Check } from "lucide-react";
import { useState } from "react";

export function AnswerEditor({
  answer,
  onSave,
}: {
  answer: AnswerBodyType;
  onSave: (answer: AnswerBodyType) => void;
}) {
  const [editedAnswer, setEditedAnswer] = useState<AnswerBodyType>(answer);

  const handleSave = () => {
    onSave(editedAnswer);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="answerDescription">Answer</Label>
        <Input
          id="answerDescription"
          value={editedAnswer.answerDescription}
          onChange={(e) =>
            setEditedAnswer({
              ...editedAnswer,
              answerDescription: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="correct"
          checked={editedAnswer.correct}
          onCheckedChange={(checked) =>
            setEditedAnswer({ ...editedAnswer, correct: checked as boolean })
          }
        />
        <Label htmlFor="correct">Correct Answer</Label>
      </div>
      <div className="flex flex-row justify-end">
        <Button onClick={handleSave} variant={"default"}>
          <Check className="mr-2 h-4 w-4" />
          Save Answer
        </Button>
      </div>
    </div>
  );
}
