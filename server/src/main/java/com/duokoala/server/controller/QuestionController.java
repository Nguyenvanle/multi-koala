package com.duokoala.server.controller;

import com.duokoala.server.dto.request.questionRequest.QuestionCreateRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionResponse;
import com.duokoala.server.service.QuestionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class QuestionController {
    QuestionService questionService;
    @PostMapping("/tests/{testId}/questions")
    ApiResponse<QuestionResponse> create(
            @PathVariable String testId,
            @RequestBody QuestionCreateRequest request) {
        return ApiResponse.<QuestionResponse>builder()
                .result(questionService.create(testId,request))
                .build();
    }

    @PostMapping("/questions/{questionId}/update-image")
    ApiResponse<QuestionResponse> uploadImage(
            @PathVariable String questionId
            ,@RequestParam("file") MultipartFile file) throws IOException {
        return ApiResponse.<QuestionResponse>builder()
                .result(questionService.uploadImage(questionId,file))
                .build();
    }


    @PutMapping("/questions/{questionId}")
    ApiResponse<QuestionResponse> update(
            @PathVariable String questionId,
            @RequestBody QuestionUpdateRequest request) {
        return ApiResponse.<QuestionResponse>builder()
                .result(questionService.update(questionId,request))
                .build();
    }

    @GetMapping("/questions/{questionId}")
    ApiResponse<QuestionResponse> get(@PathVariable String questionId) {
        return ApiResponse.<QuestionResponse>builder()
                .result(questionService.get(questionId))
                .build();
    }

    @GetMapping("/questions")
    ApiResponse<List<QuestionResponse>> getAll() {
        return ApiResponse.<List<QuestionResponse>>builder()
                .result(questionService.getAll())
                .build();
    }
    @DeleteMapping("/questions/{questionId}")
    ApiResponse<Void> delete(@PathVariable String questionId) {
        questionService.delete(questionId);
        return ApiResponse.<Void>builder()
                .message("Question has been deleted!")
                .build();
    }
}
