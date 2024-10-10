// features/courses/hooks/useEditCourseForm.ts
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseBodyType } from "@/features/courses/types/course";
import { z } from "zod";
import { CourseTypeBodyType } from "@/features/courses/types/course-type";
import { CourseFieldBodyType } from "@/features/courses/types/course-field";

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
  const form = useForm<EditCourseFormData>({
    resolver: zodResolver(CourseBodyType),
    defaultValues: initialData,
  });

  const watchedValues = form.watch(); // Lấy dữ liệu hiện tại của form
  console.log("Current form data:", watchedValues); // Debug dữ liệu trước validate

  const onSubmit = async (data: EditCourseFormData) => {
    // Xử lý việc cập nhật khóa học
    console.log("Updated course data:", data);
  };

  const handleReset = () => {
    form.reset(initialData);
  };

  return { form, onSubmit, handleReset };
}
