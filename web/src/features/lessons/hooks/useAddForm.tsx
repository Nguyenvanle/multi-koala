import { formSchema } from "@/features/lessons/types/add-form";
import { showToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useAddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      showToast(
        "Form submitted",
        "Your form has been submitted successfully: " +
          JSON.stringify(values, null, 2),
        "default"
      );
    } catch (error) {
      console.error("Form submission error", error);
      showToast(
        "Form submission error",
        "There was an error submitting your form. Please try again.",
        "destructive"
      );
    }
  }

  return { form, onSubmit };
}
