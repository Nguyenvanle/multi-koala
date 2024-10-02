import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-10 w-3/4 max-w-sm" />
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, j) => (
              <Skeleton key={j} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ErrorMessage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-destructive/10">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            An error occurred while loading the data. Please try again later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
