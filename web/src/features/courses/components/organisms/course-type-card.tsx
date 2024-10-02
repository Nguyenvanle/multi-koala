import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CourseTypesCard({ form, courseTypes }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {courseTypes?.map((type: any, index: any) => (
            <FormField
              key={index}
              control={form.control}
              name={`types.${index}`}
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Badge
                      variant="outline"
                      className="w-full justify-start gap-2 py-2 px-3"
                    >
                      <Checkbox
                        checked={field.value !== undefined}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? type : undefined);
                        }}
                      />
                      <FormLabel
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        title={type.typeDescription}
                      >
                        {capitalizeFirstLetter(type.typeName)}
                      </FormLabel>
                    </Badge>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
