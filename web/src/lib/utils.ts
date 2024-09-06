import { toast } from "@/components/ui/use-toast";
import { DURATION } from "@/types/layout/toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showToast = (
  title: string,
  description: string,
  variant?: "default" | "destructive" | null | undefined
) => {
  toast({
    title,
    description,
    variant,
    duration: DURATION,
  });
};
