"use client";

import { postLesson } from "@/features/lessons/actions/post-lessons";
import { formSchema } from "@/features/lessons/types/add-form";
import { showToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useAddForm() {
  const { courseId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { lesson } = await postLesson(courseId as string, values);
      console.log(lesson);
      location.reload();
      showToast(
        "Lesson added",
        "Your lesson has been added successfully.",
        "default"
      );
    } catch (error) {
      console.error("Form submission error", error);
      showToast(
        "Lesson not added",
        "There was an error adding your lesson. Please try again.",
        "destructive"
      );
    }
  };

  return { form, onSubmit };
}
