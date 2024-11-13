package com.duokoala.server.controller;

import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.LessonStudentResponse;
import com.duokoala.server.service.LessonStudentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonStudentController {
    LessonStudentService lessonStudentService;

    @GetMapping("/courses/{courseId}/my-lessons")
    public ApiResponse<List<LessonStudentResponse>> getMyLessons(@PathVariable String courseId) {
        return ApiResponse.<List<LessonStudentResponse>>builder()
                .result(lessonStudentService.myEnrolledLessonsInCourse(courseId))
                .build();
    }
}
