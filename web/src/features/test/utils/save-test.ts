import { toast } from "@/components/ui/use-toast";
import {
  putQuestions,
  putSingleQuestion,
} from "@/features/test/actions/put-question";
import {
  QuestionBodyType,
  QuestionError,
} from "@/features/test/types/question";
import { TestBody } from "@/features/test/types/test-result";

interface TestBodyType {
  testId: string;
  questions: QuestionBodyType[];
  // ... other test fields
}

// Kiểu trả về tương thích với SingleQuestionResponse và PutQuestionResponse
interface SaveTestResponse {
  success: boolean;
  error?: QuestionError;
  errors?: QuestionError[];
  totalAttempted?: number;
  totalSuccessful?: number;
}

export const saveTestData = async (
  data: TestBodyType
): Promise<SaveTestResponse> => {
  try {
    console.log("Saving test data:", data);

    // Validate test data structure
    const validate = TestBody.safeParse(data);
    if (!validate.success) {
      console.error("Test data validation error:", validate.error);
      return {
        success: false,
        error: {
          questionId: "VALIDATION_ERROR",
          errorType: "VALIDATION",
          error: "Invalid test data structure",
          details: validate.error,
          originalData: data,
        },
      };
    }

    // Check if questions array is empty
    if (!data.questions || data.questions.length === 0) {
      return {
        success: false,
        error: {
          questionId: "NO_QUESTIONS",
          errorType: "VALIDATION",
          error: "No questions provided in test data",
          originalData: data,
        },
      };
    }

    // Determine whether to use single or multiple question update
    if (data.questions.length === 1) {
      // Single question update
      const result = await putSingleQuestion(data.questions[0], data.testId);
      return {
        ...result,
        totalAttempted: 1,
        totalSuccessful: result.success ? 1 : 0,
      };
    } else {
      // Multiple questions update
      return await putQuestions(data.questions, data.testId);
    }
  } catch (error) {
    console.error("Error saving test data:", error);
    return {
      success: false,
      error: {
        questionId: "CRITICAL_ERROR",
        errorType: "UNKNOWN",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
        originalData: data,
      },
    };
  }
};

// Example usage:
export const handleSaveTest = async (testData: TestBodyType) => {
  const response = await saveTestData(testData);

  if (response.success) {
    const successMessage =
      response.totalAttempted === 1
        ? "Question saved successfully"
        : `Successfully saved ${response.totalSuccessful} out of ${response.totalAttempted} questions`;

    toast({
      title: "Save successful",
      description: successMessage,
      duration: 3000,
    });
  } else {
    // Handle single question error
    if (response.error) {
      const errorMessage = `Failed to save question: ${response.error.error}`;
      toast({
        title: "Save error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      console.error("Save error:", response.error);
    }
    // Handle multiple questions errors
    else if (response.errors) {
      const validationErrors = response.errors.filter(
        (e) => e.errorType === "VALIDATION"
      );
      const serverErrors = response.errors.filter(
        (e) => e.errorType === "SERVER"
      );
      const networkErrors = response.errors.filter(
        (e) => e.errorType === "NETWORK"
      );

      if (validationErrors.length) {
        toast({
          title: "Save error",
          description: `${validationErrors.length} questions failed validation`,
          variant: "destructive",
          duration: 5000,
        });
        validationErrors.forEach((error) => {
          console.error(`Question ${error.questionId}: ${error.error}`);
        });
      }

      if (serverErrors.length) {
        toast({
          title: "Save error",
          description: `${serverErrors.length} questions failed to save`,
          variant: "destructive",
          duration: 5000,
        });
      }

      if (networkErrors.length) {
        toast({
          title: "Save error",
          description: `${networkErrors.length} questions failed to connect to server`,
          variant: "destructive",
          duration: 5000,
        });
      }

      console.error("Failed questions:", response.errors);
    }
  }
};
