import { Button } from "@/components/ui/button";
import { Settings, Save, Plus } from "lucide-react";

interface TestHeaderProps {
  onSettingsClick: () => void;
  handleAddQuestion: () => void;
}

export const TestHeader = ({
  onSettingsClick,
  handleAddQuestion,
}: TestHeaderProps) => (
  <div className="flex flex-row justify-between pr-4">
    <h1 className="text-2xl font-bold">Edit Test</h1>
    <div className="flex gap-2">
      <Button variant="outline" className="h-8" onClick={onSettingsClick}>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Button variant="outline" className="h-8" onClick={handleAddQuestion}>
        <Plus className="mr-2 h-4 w-4" />
        New Question
      </Button>
    </div>
  </div>
);
