import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function CourseFieldsCard({ form, fields }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {fields?.map((field: any, index: any) => (
            <FormField
              key={index}
              control={form.control}
              name={`fields.${index}`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormControl>
                    <Badge
                      variant="outline"
                      className="w-full justify-start gap-2 py-2 px-3"
                    >
                      <Checkbox
                        checked={formField.value !== undefined}
                        onCheckedChange={(checked) => {
                          formField.onChange(checked ? field : undefined);
                        }}
                      />
                      <FormLabel
                        className="text-sm font-medium leading-none cursor-pointer"
                        title={field.fieldDescription}
                      >
                        {capitalizeFirstLetter(field.fieldName)}
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
