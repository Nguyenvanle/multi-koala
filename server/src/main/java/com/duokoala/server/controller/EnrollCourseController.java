package com.duokoala.server.controller;

import com.duokoala.server.dto.request.EnrollCourseUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.EnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.MyEnrollCourseResponse;
import com.duokoala.server.service.EnrollCourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EnrollCourseController {
    EnrollCourseService enrollCourseService;

    @PostMapping("/courses/{courseId}/enroll-courses")
    ApiResponse<EnrollCourseResponse> create(@PathVariable String courseId) {
        return ApiResponse.<EnrollCourseResponse>builder()
                .result(enrollCourseService.create(courseId))
                .build();
    }

    @PutMapping("/enroll-courses/{enrollCourseId}")
    ApiResponse<EnrollCourseResponse> update(
            @PathVariable String enrollCourseId,
            @RequestBody EnrollCourseUpdateRequest request) {
        return ApiResponse.<EnrollCourseResponse>builder()
                .result(enrollCourseService.update(enrollCourseId,request))
                .build();
    }

    @GetMapping("/enroll-courses/{enrollCourseId}")
    ApiResponse<EnrollCourseResponse> get(@PathVariable String enrollCourseId) {
        return ApiResponse.<EnrollCourseResponse>builder()
                .result(enrollCourseService.get(enrollCourseId))
                .build();
    }

    @GetMapping("/enroll-courses/my-enrolled-courses")
    ApiResponse<List<MyEnrollCourseResponse>> getMyEnrollCourses() {
        return ApiResponse.<List<MyEnrollCourseResponse>>builder()
                .result(enrollCourseService.getMyEnrollCourse())
                .build();
    }

    @GetMapping("/enroll-courses")
    ApiResponse<List<EnrollCourseResponse>> getAll() {
        return ApiResponse.<List<EnrollCourseResponse>>builder()
                .result(enrollCourseService.getAll())
                .build();
    }
}
