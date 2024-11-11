package com.duokoala.server.controller;

import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.EnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.MyEnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.RecentlyEnrollCourseResponse;
import com.duokoala.server.service.EnrollCourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EnrollCourseController {
    EnrollCourseService enrollCourseService;
//    LessonStudentService lessonStudentService;

    @PostMapping("/courses/{courseId}/enroll-courses")
    ApiResponse<EnrollCourseResponse> create(@PathVariable String courseId) {
        return ApiResponse.<EnrollCourseResponse>builder()
                .result(enrollCourseService.create(courseId))
                .build();
    }

//    @PostMapping("/enroll-courses/update-student-enroll")
//    ApiResponse<Void> updateStudentEnroll() {
//        lessonStudentService.updateStudentEnroll();
//        return ApiResponse.<Void>builder().build();
//    }

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

    @GetMapping("/enroll-courses/recently-student-enrolled-my-courses")
    ApiResponse<List<RecentlyEnrollCourseResponse>> getRecentlyEnrollCourses() {
        return ApiResponse.<List<RecentlyEnrollCourseResponse>>builder()
                .result(enrollCourseService.getRecentlyEnrollCourse())
                .build();
    }
}
