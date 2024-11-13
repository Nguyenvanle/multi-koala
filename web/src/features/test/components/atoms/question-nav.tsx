import { QuestionBodyType } from "@/features/test/types/question";
import { cn } from "@/lib/utils";

export const QuestionNavItem = ({
  index,
  question,
  isActive,
  onClick,
  isEditing,
}: {
  index: number;
  question: QuestionBodyType;
  isActive: boolean;
  onClick: () => void;
  isEditing: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left px-3 py-2 rounded-md transition-colors",
      "hover:bg-primary hover:text-primary-foreground",
      "flex items-center justify-between group",
      isActive && "bg-primary text-primary-foreground",
      "mb-1"
    )}
  >
    <div className="flex items-center gap-2">
      <span className="font-medium">{index + 1}</span>
      <span className="text-sm truncate max-w-[180px]">
        {question.questionDescription || "Untitled Question"}
      </span>
    </div>
    {isEditing && (
      <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
        Editing
      </span>
    )}
  </button>
);
