// features/courses/hooks/useEditCourseForm.ts
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "@/lib/utils";
import { nextjsApiService } from "@/services/next-api";
import { CourseDetailResType } from "@/features/courses/types/course";
import { useParams } from "next/navigation";

const EditCourseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  courseDescription: z.string().min(1, "Course description is required"),
  coursePrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  courseLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], {
    required_error: "Course level is required",
  }),
  types: z.array(z.string()),
  fields: z.array(z.string()),
  imageUrl: z.string().url(),
});

export type EditCourseFormData = z.infer<typeof EditCourseSchema>;

export default function useEditCourseForm(initialData: EditCourseFormData) {
  const { courseId } = useParams();
  const form = useForm<EditCourseFormData>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: EditCourseFormData) => {
    try {
      const { result } = await nextjsApiService.put<CourseDetailResType>(
        `/api/courses/${courseId}`,
        data
      );

      if (result?.code === 200) {
        console.log(result);
        showToast("Success", "Course update successfully!");
      } else {
        showToast(
          "Error",
          "Failed to update course, try reload or login again",
          "destructive"
        );
      }
    } catch (error) {
      showToast("Error", "Failed to update course", "destructive");
    }
  };

  const handleReset = () => {
    form.reset(initialData);
  };

  return { form, onSubmit, handleReset };
}
