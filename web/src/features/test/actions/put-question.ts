"use server";

import {
  QuestionBodyType,
  QuestionError,
} from "@/features/test/types/question";
import { questionService } from "@/features/test/services/question";
import { revalidateTag } from "next/cache";

interface PutQuestionResponse {
  success: boolean;
  errors?: QuestionError[];
  totalAttempted: number;
  totalSuccessful: number;
}

interface SingleQuestionResponse {
  success: boolean;
  error?: QuestionError;
}

// Helper function to parse API error messages
function parseApiError(
  error: any,
  questionId: string,
  originalData?: any
): QuestionError {
  // Case 1: Backend validation error (400)
  if (error?.code === 400) {
    const message =
      error?.result?.message || error?.message || "Validation error";

    // Parse specific JSON deserialization errors
    if (message.includes("Cannot deserialize value")) {
      const match = message.match(/type `([^`]+)` from ([^']+)/);
      if (match) {
        const [_, expectedType, actualType] = match;
        return {
          questionId,
          errorType: "VALIDATION",
          error: `Data type mismatch: Expected ${expectedType} but got ${actualType}`,
          details: error,
          originalData,
        };
      }
    }

    return {
      questionId,
      errorType: "VALIDATION",
      error: message,
      details: error,
      originalData,
    };
  }

  // Case 2: Server error (500)
  if (error?.code >= 500) {
    return {
      questionId,
      errorType: "SERVER",
      error: "Server encountered an error",
      details: error,
      originalData,
    };
  }

  // Case 3: Network error
  if (error instanceof TypeError && error.message.includes("network")) {
    return {
      questionId,
      errorType: "NETWORK",
      error: "Network connection error",
      details: error,
      originalData,
    };
  }

  // Default case
  return {
    questionId,
    errorType: "UNKNOWN",
    error: error instanceof Error ? error.message : "Unknown error occurred",
    details: error,
    originalData,
  };
}

// Validate question data before sending to API
function validateQuestionData(question: QuestionBodyType): {
  isValid: boolean;
  error?: string;
} {
  // Add basic validation rules here
  if (!question.questionId) {
    return { isValid: false, error: "Question ID is required" };
  }

  // Add more validation rules as needed

  return { isValid: true };
}

export async function putSingleQuestion(
  question: QuestionBodyType
): Promise<SingleQuestionResponse> {
  try {
    // Validate question data before sending
    const validation = validateQuestionData(question);
    if (!validation.isValid) {
      return {
        success: false,
        error: {
          questionId: question.questionId || "UNKNOWN",
          errorType: "VALIDATION",
          error: validation.error || "Invalid question data",
          originalData: question,
        },
      };
    }

    const uploadData = {
      questionDescription: question.questionDescription,
      answers: question.answers.map((a) => a.answerDescription),
      correctIndex: question.answers.findIndex((a) => a.correct) - 1,
    };

    const result = await questionService.update(
      question.questionId,
      uploadData
    );

    console.log(result);

    if (result.code === 200) {
      console.log(`Successfully updated question ${question.questionId}`);
      revalidateTag("/lessons/${lessonId}/tests");
      return {
        success: true,
      };
    } else {
      const error = parseApiError(result, question.questionId, question);
      console.error(`Failed to update question ${question.questionId}:`, error);
      return {
        success: false,
        error,
      };
    }
  } catch (error) {
    const parsedError = parseApiError(error, question.questionId, question);
    console.error(
      `Error updating question ${question.questionId}:`,
      parsedError
    );
    return {
      success: false,
      error: parsedError,
    };
  }
}

export async function putQuestions(
  data: QuestionBodyType[]
): Promise<PutQuestionResponse> {
  const errors: QuestionError[] = [];
  const results: { success: boolean; questionId: string }[] = [];

  try {
    for (const question of data) {
      const singleResult = await putSingleQuestion(question);

      if (singleResult.success) {
        results.push({ success: true, questionId: question.questionId });
      } else if (singleResult.error) {
        errors.push(singleResult.error);
        results.push({ success: false, questionId: question.questionId });
      }
    }

    const totalSuccessful = results.filter((r) => r.success).length;
    const totalAttempted = data.length;

    if (errors.length === 0) {
      console.log("Successfully saved all questions", {
        total: totalAttempted,
        successful: totalSuccessful,
      });
      return {
        success: true,
        totalAttempted,
        totalSuccessful,
      };
    } else {
      console.error("Some questions failed to update", {
        total: totalAttempted,
        successful: totalSuccessful,
        failed: errors.length,
        errors: errors,
      });
      return {
        success: false,
        errors,
        totalAttempted,
        totalSuccessful,
      };
    }
  } catch (error) {
    const criticalError = parseApiError(error, "CRITICAL_ERROR");
    return {
      success: false,
      errors: [criticalError],
      totalAttempted: data.length,
      totalSuccessful: 0,
    };
  }
}
