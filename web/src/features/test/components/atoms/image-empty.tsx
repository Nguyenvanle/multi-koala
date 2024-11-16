import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

export const ImageEmptyState = () => (
  <Card className="w-full h-full">
    <CardContent className="flex flex-col items-center justify-center h-full py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Image Uploaded
      </h3>
      <p className="text-gray-500 text-center">
        Upload an image to enhance your question. <br />
        Supported formats: JPG, PNG.
      </p>
    </CardContent>
  </Card>
);
