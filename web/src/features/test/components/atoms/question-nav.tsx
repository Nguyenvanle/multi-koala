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
      "w-full text-left px-3 py-2 rounded-md transition-colors border",
      "hover:bg-primary hover:text-primary-foreground",
      "flex items-center justify-between group",
      isActive && "bg-primary text-primary-foreground",
      "mb-1"
    )}
  >
    <div className="flex flex-1 justify-center gap-2">
      <span className="font-medium">{index + 1}</span>
    </div>
  </button>
);
