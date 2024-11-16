import { Button } from "@/components/ui/button";
import { Settings, Save } from "lucide-react";

interface TestHeaderProps {
  onSettingsClick: () => void;
  onSaveClick: () => void;
}

export const TestHeader = ({
  onSettingsClick,
  onSaveClick,
}: TestHeaderProps) => (
  <div className="flex flex-row justify-between pr-4">
    <h1 className="text-2xl font-bold">Edit Test</h1>
    <div className="flex gap-2">
      <Button variant="outline" className="h-8" onClick={onSettingsClick}>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Button className="h-8" onClick={onSaveClick}>
        <Save className="mr-2 h-4 w-4" />
        Save Test
      </Button>
    </div>
  </div>
);
