"use server";

import { QuizResultService } from "@/features/quiz-results/services/quiz-results";
import { cookies } from "next/headers";

export async function getMyReport() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

  const res = await QuizResultService.getAllQuizResult(accessToken);

  if (!res.result?.result) {
    throw new Error(
      "No result in /quiz-results/my-report:" + JSON.stringify(res)
    );
  }

  const reports = res.result.result;

  return { reports };
}
