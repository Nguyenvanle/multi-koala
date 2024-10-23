package com.duokoala.server.controller;

import com.duokoala.server.dto.request.quizResultRequest.QuizResultCreateRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultSubmitRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.quizResultResponse.QuizResultReportResponse;
import com.duokoala.server.dto.response.quizResultResponse.QuizResultResponse;
import com.duokoala.server.service.QuizResultService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuizResultController {
    QuizResultService quizResultService;

    @PostMapping("/tests/{testId}/quiz-results")
    ApiResponse<QuizResultResponse> create(
            @PathVariable String testId,
            @RequestBody QuizResultCreateRequest request) {
        return ApiResponse.<QuizResultResponse>builder()
                .result(quizResultService.create(testId, request))
                .build();
    }

    @PostMapping("/tests/{testId}/submit-quiz")
    ApiResponse<QuizResultResponse> submit(
            @PathVariable String testId,
            @RequestBody QuizResultSubmitRequest request) {
        return ApiResponse.<QuizResultResponse>builder()
                .result(quizResultService.submitQuiz(testId,request))
                .build();
    }

    @GetMapping("/quiz-results/{quizResultId}")
    ApiResponse<QuizResultResponse> get(@PathVariable String quizResultId) {
        return ApiResponse.<QuizResultResponse>builder()
                .result(quizResultService.getQuizResultResponse(quizResultId))
                .build();
    }

    @GetMapping("/quiz-results/my-quiz-result")
    ApiResponse<List<QuizResultResponse>> getMine() {
        return ApiResponse.<List<QuizResultResponse>>builder()
                .result(quizResultService.getMine())
                .build();
    }

    @GetMapping("tests/{testId}/my-quiz-result")
    ApiResponse<List<QuizResultResponse>> getMineFromTest(@PathVariable String testId) {
        return ApiResponse.<List<QuizResultResponse>>builder()
                .result(quizResultService.getMineFromTest(testId))
                .build();
    }

    @GetMapping("/quiz-results")
    ApiResponse<List<QuizResultResponse>> getAll() {
        return ApiResponse.<List<QuizResultResponse>>builder()
                .result(quizResultService.getAll())
                .build();
    }

    @GetMapping("/quiz-results/my-report")
    public ApiResponse<List<QuizResultReportResponse>> getMyReport() {
        return ApiResponse.<List<QuizResultReportResponse>>builder()
                .result(quizResultService.getMyQuizResultReport())
                .build();
    }

    @DeleteMapping("/quiz-results/{quizResultId}")
    ApiResponse<Void> delete(@PathVariable String quizResultId) {
        quizResultService.delete(quizResultId);
        return ApiResponse.<Void>builder()
                .message("Quiz result has been deleted!")
                .build();
    }
}
