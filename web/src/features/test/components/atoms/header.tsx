import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ListTodo } from "lucide-react";
import { TestBodyType } from "@/features/test/types/test-result";
import { H4, Muted, P } from "@/components/ui/typography";

const EnhancedCardHeader = ({ testData }: { testData: TestBodyType }) => {
  return (
    <CardHeader className="pb-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            {testData.testDescription}
          </CardTitle>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-1 items-center gap-2 p-2 border rounded">
            <div className="w-2 h-full bg-amber-500 rounded"></div>
            <div className="flex flex-col">
              <Muted>Target</Muted>
              <P className="font-bold text-foreground">
                {testData.passingScore}
              </P>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 p-2 border rounded">
            <div className="w-2 h-full bg-emerald-500 rounded"></div>
            <div className="flex flex-col">
              <Muted>Total</Muted>
              <P className="font-bold text-foreground">
                {testData.questions.length}
              </P>
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default EnhancedCardHeader;
