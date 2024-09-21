package com.duokoala.server.controller;

import com.duokoala.server.dto.request.courseRequest.CourseApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.courseResponse.DiscountAppliedResponse;
import com.duokoala.server.dto.response.courseResponse.MaxCoursePriceResponse;
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
    @GetMapping("/courses/approved-courses")
    ApiResponse<List<CourseResponse>> getApprovedCourses() {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getAvailableCourses())
                .build();
    }

    @GetMapping("/courses/my-uploaded-courses")
    ApiResponse<List<CourseResponse>> getMyCourses() {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getMyUploadedCourses())
                .build();
    }

    @GetMapping("teachers/{teacherId}/courses")
    ApiResponse<List<CourseResponse>> getListByTeacherId(@PathVariable String teacherId) {
        return ApiResponse.<List<CourseResponse>>builder()
                .result(courseService.getListByTeacherId(teacherId))
                .build();
    }

    @GetMapping("/courses/{courseId}/discount-applied")
    ApiResponse<DiscountAppliedResponse> getDiscountApplied(@PathVariable String courseId) {
        return ApiResponse.<DiscountAppliedResponse>builder()
                .result(courseService.getMaxApprovedDiscountRate(courseId))
                .build();
    }
    @GetMapping("/courses/max-course-price")
    ApiResponse<MaxCoursePriceResponse> getMaxCoursePrice() {
        return ApiResponse.<MaxCoursePriceResponse>builder()
                .result(courseService.getMaxPrice())
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
