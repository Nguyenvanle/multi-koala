import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuestionImageUpload from "@/features/test/components/atoms/image-upload";
import { QuestionBodyType } from "@/features/test/types/question";
import { Save, X } from "lucide-react";
import { useState } from "react";
import { set } from "zod";

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
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = async (imageData: File | null) => {
    setImage(imageData);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("file", image || "");
    console.log(formData.get("file"));

    onSave(editedQuestion);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 space-y-1">
          <CardDescription>Upload question image</CardDescription>
          <QuestionImageUpload
            question={editedQuestion}
            onImageChange={handleImageChange}
          />
        </div>

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
        </div>
      </div>

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
  );
}
