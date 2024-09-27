import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

export const enrollHandler = () => {
  toast({
    title: "Login Required",
    description: "You need to be logged in to enroll in this course.",
    duration: 3000,
  });

  redirect("/login");
};
