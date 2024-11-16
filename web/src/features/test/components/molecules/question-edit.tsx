import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { putImage } from "@/features/test/actions/put-image";
import QuestionImageUpload from "@/features/test/components/atoms/image-upload";
import { QuestionBodyType } from "@/features/test/types/question";
import { Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
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
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = async (imageData: File | null) => {
    setImage(imageData);
  };

  const handleSave = async () => {
    setIsEditing(true);
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const res = await putImage(editedQuestion.questionId, formData);

        if (res.success) {
          setEditedQuestion(res.result);
          console.log(editedQuestion);
          toast({
            title: "Question added",
            description: "A new question has been added to the test.",
          });
        } else {
          throw new Error("Failed to upload image");
        }
      }
      onSave(editedQuestion);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
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
          {isEditing ? (
            "Saving..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
