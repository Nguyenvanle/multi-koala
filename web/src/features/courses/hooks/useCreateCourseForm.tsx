'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { showToast } from "@/lib/utils";
import { CourseTypeBodyType } from "@/features/courses/types/course-type";
import { CourseFieldBodyType } from "@/features/courses/types/course-field";
import { ImageBodyType } from "@/features/images/types/image";
import { COURSE_VERIFY } from "@/types/course/verify";

const CreateCourseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  courseDescription: z.string().min(1, "Course description is required"),
  coursePrice: z.number().min(0, "Price must be a positive number"),
  courseLevel: z.string().min(1, "Course level is required"),
  types: z.array(CourseTypeBodyType),
  fields: z.array(CourseFieldBodyType),
  image: ImageBodyType,
});

type CreateCourseFormData = z.infer<typeof CreateCourseSchema>;

export default function useCreateCourseForm() {
  const router = useRouter();
  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      courseName: "",
      courseDescription: "",
      coursePrice: 0,
      courseLevel: "",
      types: [],
      fields: [],
      image: { imageId: "", imageUrl: "" },
    },
  });

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      // Here you would typically send the data to your API
      console.log("Submitting course data:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast("Success", "Course created successfully!");
      router.push("/courses"); // Redirect to courses page
    } catch (error) {
      showToast("Error", "Failed to create course", "destructive");
    }
  };

  const addType = () => {
    const types = form.getValues("types");
    form.setValue("types", [...types, { typeName: "", typeDescription: "" }]);
  };

  const removeType = (index: number) => {
    const types = form.getValues("types");
    form.setValue("types", types.filter((_, i) => i !== index));
  };

  const addField = () => {
    const fields = form.getValues("fields");
    form.setValue("fields", [...fields, { fieldName: "", fieldDescription: "" }]);
  };

  const removeField = (index: number) => {
    const fields = form.getValues("fields");
    form.setValue("fields", fields.filter((_, i) => i !== index));
  };

  return { form, onSubmit, addType, removeType, addField, removeField };
}