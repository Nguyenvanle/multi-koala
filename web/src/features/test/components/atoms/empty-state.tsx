import { Card, CardContent } from "@/components/ui/card";
import { ClipboardX } from "lucide-react";

export const EmptyState = () => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <ClipboardX className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Test Available
      </h3>
      <p className="text-gray-500 text-center">
        There is currently no test data to display. Please check back later or
        create a new test.
      </p>
    </CardContent>
  </Card>
);
