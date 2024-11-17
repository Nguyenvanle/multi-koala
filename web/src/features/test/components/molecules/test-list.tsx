"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TestBodyType } from "@/features/test/types/test-result";
import { EmptyState } from "@/features/test/components/atoms/empty-state";
import { TestCard } from "@/features/test/components/atoms/test-card";

interface TestListProps {
  tests: TestBodyType[];
  viewDetailHref: string;
  maxHeight?: string;
}

export default function TestList({
  tests,
  viewDetailHref,
  maxHeight = "calc(100vh - 380px)",
}: TestListProps) {
  if (!tests || tests.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollArea className="w-full" style={{ height: maxHeight }}>
      <div className="pr-3 -mr-3">
        {tests.map((test) => (
          <TestCard
            key={test.testId}
            test={test}
            viewDetailHref={viewDetailHref}
          />
        ))}
      </div>
    </ScrollArea>
  );
}