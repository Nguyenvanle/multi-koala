// features/courses/hooks/useEditCourseForm.ts
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "@/lib/utils";
import { nextjsApiService } from "@/services/next-api";
import { CourseDetailResType } from "@/features/courses/types/course";
import { useParams } from "next/navigation";
import { postImageCourse } from "@/features/courses/actions/post-image-course";
import { useState } from "react";

const EditCourseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  courseResponsibilityEndAt: z
    .date({
      required_error: "Course responsibility end date is required",
    })
    .refine((date) => date > new Date(), {
      message: "Course responsibility end date must be after today.",
    }),
  coursePrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  courseLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], {
    required_error: "Course level is required",
  }),
  courseDescription: z.string().min(1, "Course description is required"),
  types: z.array(z.string()),
  fields: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  imageFile: z.any().optional(),
});

export type EditCourseFormData = z.infer<typeof EditCourseSchema>;

export default function useEditCourseForm(initialData: EditCourseFormData) {
  const { courseId } = useParams();
  const form = useForm<EditCourseFormData>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {
      ...initialData,
      courseResponsibilityEndAt: new Date(
        initialData.courseResponsibilityEndAt
      ),
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: EditCourseFormData) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...data,
        courseResponsibilityEndAt: data.courseResponsibilityEndAt.toISOString(),
      };

      if (submissionData.imageFile !== initialData.imageFile) {
        const formData = new FormData();
        if (submissionData.imageFile) {
          formData.append("file", submissionData.imageFile);
        }

        const response = await postImageCourse(courseId as string, formData);
        console.log(response);
      }

      const { result } = await nextjsApiService.put<CourseDetailResType>(
        `/api/courses/${courseId}`,
        submissionData
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
      console.log("Update Form Error:", error);
      showToast("Error", "Failed to update course", "destructive");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset(initialData);
  };

  return { form, onSubmit, handleReset };
}
