"use server";

import { QuizResultService } from "@/features/quiz-results/services/quiz-results";
import { cookies } from "next/headers";

export async function getMyReport() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

   try {
     const res = await QuizResultService.getAllQuizResult(accessToken);
     const reports = res.result?.result;

     return { reports };
   } catch (error) {
     console.error("Error fetching reports", error);
   }

   return { reports: [] };
  
}
