"use client";

import { postImageLesson } from "@/features/lessons/actions/post-image-lesson";
import { putLesson } from "@/features/lessons/actions/put-lesson";
import { EditFormBody, EditFormType } from "@/features/lessons/types/edit-form";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { showToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useEditLessonForm(initData: LessonDetailResult) {
  const { lessonId } = useParams();
  const form = useForm<EditFormType>({
    resolver: zodResolver(EditFormBody),
    defaultValues: initData,
  });

  const onSubmit = async (values: EditFormType) => {
    try {
      const formData = new FormData();
      if (values.imageFile) {
        formData.append("file", values.imageFile);
        const response = await postImageLesson(initData.lessonId, formData);
        console.log("Lesson image res:", response);
      }

      const submitData = {
        lessonName: values.lessonName,
        lessonDescription: values.lessonDescription,
        demo: values.demo,
      };

      const { lesson } = await putLesson(lessonId as string, submitData);

      console.log("Lesson put res", lesson);

      showToast(
        "Lesson edited",
        `Your lesson has been edited successfully.`,
        "default"
      );
    } catch (error) {
      console.error("Form submission error", error);
      showToast(
        "Lesson not edited",
        "There was an error editing your lesson. Please try again.",
        "destructive"
      );
    }
  };

  return { form, onSubmit };
}
