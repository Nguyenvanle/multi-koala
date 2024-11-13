import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuestionBodyType } from "@/features/test/types/question";
import { Save, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function QuestionEditor({
  question,
  onSave,
  onCancel,
}: {
  question: QuestionBodyType;
  onSave: (question: QuestionBodyType) => void;
  onCancel: () => void;
}) {
  const [editedQuestion, setEditedQuestion] =
    useState<QuestionBodyType>(question);

  const handleSave = () => {
    onSave(editedQuestion);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {editedQuestion.image && (
        <div className="flex flex-col gap-2">
          <Label>
            <CardDescription>Upload image</CardDescription>
          </Label>
          <Image
            src={editedQuestion.image.imageUrl}
            alt="Question"
            className="mt-1 max-w-full h-auto rounded"
            width={700}
            height={400}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="questionDescription">
          <CardDescription>Question content</CardDescription>
        </Label>
        <Textarea
          id="questionDescription"
          placeholder="Enter question content here"
          value={editedQuestion.questionDescription}
          onChange={(e) =>
            setEditedQuestion({
              ...editedQuestion,
              questionDescription: e.target.value,
            })
          }
          className="mt-1"
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel} variant="outline">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
