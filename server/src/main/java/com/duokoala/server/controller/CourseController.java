package com.duokoala.server.controller;

import com.duokoala.server.dto.request.courseRequest.CourseApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.service.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/courses")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CourseController {
    CourseService courseService;

    @PostMapping
    ApiResponse<CourseResponse> create(@RequestBody CourseCreateRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.create(request))
                .build();
    }
    @PutMapping("/{courseId}")
    ApiResponse<CourseResponse> update(
            @PathVariable String courseId, @RequestBody CourseUpdateRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.update(courseId,request))
                .build();
    }

    @PutMapping("/{courseId}/approve")
    ApiResponse<CourseResponse> approve(
            @PathVariable String courseId, @RequestBody CourseApproveRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.approve(courseId,request))
                .build();
    }

    @GetMapping("/{courseId}")
    ApiResponse<CourseResponse> get(@PathVariable String courseId) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.get(courseId))
                .build();
    }
    @GetMapping
    ApiResponse<List<CourseResponse>> getAll() {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getAll())
                .build();
    }
    @DeleteMapping("/{courseId}")
    ApiResponse<Void> delete(@PathVariable String courseId) {
        courseService.delete(courseId);
        return ApiResponse.<Void>builder()
                .message("Course has been deleted!")
                .build();
    }
}
