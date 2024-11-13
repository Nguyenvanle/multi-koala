"use client";

import { postLesson } from "@/features/lessons/actions/post-lessons";
import { formSchema } from "@/features/lessons/types/add-form";
import { postExam } from "@/features/test/actions/post-exam";
import {
  ExamAddFormBody,
  ExamAddFormBodyType,
} from "@/features/test/types/exam";
import { showToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useExamAddForm() {
  const router = useRouter();
  const { lessonId } = useParams();
  const form = useForm<ExamAddFormBodyType>({
    resolver: zodResolver(ExamAddFormBody),
  });

  const onSubmit = async (values: ExamAddFormBodyType) => {
    try {
      const { exam } = await postExam(lessonId as string, values);
      console.log(exam);
      showToast(
        "Exam added",
        "Your exam has been added successfully.",
        "default"
      );
    } catch (error) {
      console.error("Form submission error", error);
      showToast(
        "Exam not added",
        "There was an error adding your Exam. Please try again.",
        "destructive"
      );
    }
  };

  return { form, onSubmit };
}
