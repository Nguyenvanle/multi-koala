import { Card, CardContent } from "@/components/ui/card";
import EnhancedCardHeader from "@/features/test/components/atoms/header";
import { QuestionNavItem } from "@/features/test/components/atoms/question-nav";
import { TestBodyType } from "@/features/test/types/test-result";

interface NavigationSidebarProps {
  testData: TestBodyType;
  activeQuestionId: string | null;
  editingQuestionId: string | null;
  onQuestionClick: (questionId: string) => void;
}

export const NavigationSidebar = ({
  testData,
  activeQuestionId,
  editingQuestionId,
  onQuestionClick,
}: NavigationSidebarProps) => (
  <Card className="w-64 overflow-hidden">
    <EnhancedCardHeader testData={testData} />
    <CardContent>
      <div className="grid grid-cols-4 gap-2">
        {testData.questions.map((question, index) => (
          <QuestionNavItem
            key={question.questionId}
            index={index}
            question={question}
            isActive={activeQuestionId === question.questionId}
            isEditing={editingQuestionId === question.questionId}
            onClick={() => onQuestionClick(question.questionId)}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);
