import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { showToast } from "@/lib/utils";
import { nextjsApiService } from "@/services/next-api";
import { CourseDetailResType } from "@/features/courses/types/course";
import { apiService } from "@/services/api";
import { mutate } from "swr";
import { TeacherMyCoursesResType } from "@/features/courses/types/teacher-my-courses";

const CreateCourseSchema = z.object({
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

type CreateCourseFormData = z.infer<typeof CreateCourseSchema>;

const STORAGE_KEY = "courseFormData";

const defaultValues: CreateCourseFormData = {
  courseName: "",
  courseDescription: "",
  coursePrice: 0,
  courseLevel: "BEGINNER",
  types: [],
  fields: [],
  imageUrl:
    "https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996",
};

export default function useCreateCourseForm() {
  const router = useRouter();
  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues,
  });

  useEffect(() => {
    // Restore data from localStorage on initial render
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }

    // Save form data to localStorage whenever it changes
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      const { result } = await nextjsApiService.post<CourseDetailResType>(
        "/api/courses/add",
        data
      );
      console.log(result);
      showToast("Success", "Course created successfully!");
      localStorage.removeItem(STORAGE_KEY); // Clear saved data after successful submission
      form.reset(defaultValues);

      const timestamp = new Date().getTime();
      router.push(`/dashboard/courses?refresh=${timestamp}`);
    } catch (error) {
      showToast("Error", "Failed to create course", "destructive");
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { form, onSubmit, handleReset };
}