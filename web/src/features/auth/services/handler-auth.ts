import { toast } from "@/components/ui/use-toast";
import { DURATION } from "@/types/layout/toast";
import { UseFormSetError } from "react-hook-form";

export const handlerAuth = ({
  code,
  error,
  setError,
}: {
  code: number | undefined;
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (setError) {
    switch (code) {
      case 401:
        setError("password", {
          message: "Password is incorrect. Try again.",
        });
        break;

      case 404:
        setError("username", {
          type: "server",
          message: "Username not found. Try again.",
        });
        break;

      case 409:
        setError("username", {
          type: "server",
          message: "Username already exists. Try again.",
        });
        break;

      default:
        break;
    }
  } else {
    toast({
      title: "UNCATEGORIZED_EXCEPTION",
      description: error || "Internal server error",
      variant: "destructive",
      duration: DURATION,
    });
  }
};
