import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 xl:gap-6">
      <Skeleton className="h-10 w-3/4 max-w-sm bg-background" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
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
    </div>
  );
}

export function ErrorMessage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
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
