package com.duokoala.server.controller;

import com.duokoala.server.dto.request.testRequest.TestCreateRequest;
import com.duokoala.server.dto.request.testRequest.TestUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.TestResponse;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.service.TestService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestController {
    TestService testService;

    @PostMapping("/lessons/{lessonId}/tests")
    ApiResponse<TestResponse> create(
            @PathVariable String lessonId,
            @RequestBody TestCreateRequest request) {
        return ApiResponse.<TestResponse>builder()
                .result(testService.create(lessonId, request))
                .build();
    }

    @PutMapping("/tests/{testId}")
    ApiResponse<TestResponse> update(
            @PathVariable String testId,
            @RequestBody TestUpdateRequest request) {
        return ApiResponse.<TestResponse>builder()
                .result(testService.update(testId,request))
                .build();
    }

    @PutMapping("/tests/{testId}/approved")
    ApiResponse<TestResponse> Approve(@PathVariable String testId) {
        return ApiResponse.<TestResponse>builder()
                .result(testService.Approve(testId))
                .build();
    }

    @GetMapping("/tests/{testId}")
    ApiResponse<TestResponse> get(@PathVariable String testId) {
        return ApiResponse.<TestResponse>builder()
                .result(testService.getAvailableTest(testId))
                .build();
    }

    @GetMapping("/tests")
    ApiResponse<List<TestResponse>> getAll() {
        return ApiResponse.<List<TestResponse>>builder()
                .result(testService.getAll())
                .build();
    }

    @DeleteMapping("/tests/{testId}")
    ApiResponse<Void> delete(@PathVariable String testId) {
        testService.delete(testId);
        return ApiResponse.<Void>builder()
                .message("Test has been deleted!")
                .build();
    }
}
