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

export const convertDuration = (durationInSeconds: number) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};