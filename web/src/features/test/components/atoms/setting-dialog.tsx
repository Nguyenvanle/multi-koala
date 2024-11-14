import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TestBodyType } from "@/features/test/types/test-result";
import { useState } from "react";

export const TestSettingsDialog = ({
  open,
  onOpenChange,
  testData,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testData: TestBodyType;
  onSave: (testDescription: string, passingScore: number) => void;
}) => {
  const [testDescription, setTestDescription] = useState(
    testData.testDescription
  );
  const [passingScore, setPassingScore] = useState(
    testData.passingScore.toString()
  );

  const handleSave = () => {
    onSave(testDescription, Number(passingScore));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Settings</DialogTitle>
          <DialogDescription>
            Update test name and passing score
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="testDescription">Test Name</Label>
            <Input
              id="testDescription"
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passingScore">Passing Score</Label>
            <Input
              id="passingScore"
              type="number"
              min="0"
              max="100"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
