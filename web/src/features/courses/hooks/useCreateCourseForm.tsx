import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { showToast } from "@/lib/utils";

const CreateCourseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  courseDescription: z.string().min(1, "Course description is required"),
  coursePrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  courseLevel: z.string().min(1, "Course level is required"),
  types: z.array(z.string()),
  fields: z.array(z.string()),
  imageUrl: z.string().url(), // Sửa từ image sang imageUrl
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
      imageUrl:
        "https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996", // URL mặc định
    },
  });

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      // Convert coursePrice to a number before submitting
      const formData = data

      console.log("Submitting course data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
      showToast("Success", "Course created successfully!");
      router.push("/courses");
    } catch (error) {
      showToast("Error", "Failed to create course", "destructive");
    }
  };

  return { form, onSubmit };
}
