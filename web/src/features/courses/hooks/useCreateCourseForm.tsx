import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { showToast } from "@/lib/utils";
import { nextjsApiService } from "@/services/next-api";
import { CourseDetailResType } from "@/features/courses/types/course";

const CreateCourseSchema = z.object({
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
  imageUrl: z.string().url(),
});

const STORAGE_KEY = "courseFormData";

export type CreateCourseFormData = z.infer<typeof CreateCourseSchema>;

const defaultValues: CreateCourseFormData = {
  courseName: "",
  courseResponsibilityEndAt: new Date(),
  coursePrice: 0,
  courseLevel: "BEGINNER",
  courseDescription: "",
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
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Convert the date string back to Date object
      parsedData.courseResponsibilityEndAt = new Date(
        parsedData.courseResponsibilityEndAt
      );
      form.reset(parsedData);
    }

    const subscription = form.watch((value) => {
      const dataToSave = {
        ...value,
        courseResponsibilityEndAt:
          value.courseResponsibilityEndAt?.toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      // Convert Date object to ISO string for API submission
      const submissionData = {
        ...data,
        courseResponsibilityEndAt: data.courseResponsibilityEndAt.toISOString(),
      };

      const { result } = await nextjsApiService.post<CourseDetailResType>(
        "/api/courses/add",
        submissionData
      );

      if (result?.code === 200) {
        console.log(result);
        showToast("Success", "Course created successfully!");
        localStorage.removeItem(STORAGE_KEY);
        form.reset(defaultValues);

        const timestamp = new Date().getTime();
        router.push(`/dashboard/courses?refresh=${timestamp}`);
      } else {
        showToast(
          "Error",
          "Failed to created course, try reload or login again",
          "destructive"
        );
      }
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
