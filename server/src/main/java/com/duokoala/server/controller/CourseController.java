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
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CourseController {
    CourseService courseService;

    @PostMapping("/courses")
    ApiResponse<CourseResponse> create(@RequestBody CourseCreateRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.create(request))
                .build();
    }
    @PutMapping("/courses/{courseId}")
    ApiResponse<CourseResponse> update(
            @PathVariable String courseId, @RequestBody CourseUpdateRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.update(courseId,request))
                .build();
    }

    @PutMapping("/courses/{courseId}/approve")
    ApiResponse<CourseResponse> approve(
            @PathVariable String courseId, @RequestBody CourseApproveRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.approve(courseId,request))
                .build();
    }

    @GetMapping("/courses/{courseId}")
    ApiResponse<CourseResponse> get(@PathVariable String courseId) {
        return ApiResponse.<CourseResponse>builder()
                .result(courseService.get(courseId))
                .build();
    }
    @GetMapping("/courses")
    ApiResponse<List<CourseResponse>> getAll() {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getAll())
                .build();
    }
    @GetMapping("/courses/my-uploaded-courses")
    ApiResponse<List<CourseResponse>> getMyCourses() {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getMine())
                .build();
    }

    @GetMapping("/courses/my-enrolled-courses")
    ApiResponse<List<CourseResponse>> getMyEnrollCourses() {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getMyEnrollCourse())
                .build();
    }

    @GetMapping("teachers/{teacherId}/courses")
    ApiResponse<List<CourseResponse>> getListByTeacherId(@PathVariable String teacherId) {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getListByTeacherId(teacherId))
                .build();
    }

    @DeleteMapping("/courses/{courseId}")
    ApiResponse<Void> delete(@PathVariable String courseId) {
        courseService.delete(courseId);
        return ApiResponse.<Void>builder()
                .message("Course has been deleted!")
                .build();
    }
}
