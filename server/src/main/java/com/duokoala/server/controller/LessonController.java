package com.duokoala.server.controller;

import com.duokoala.server.dto.request.lessonRequest.LessonCreateRequest;
import com.duokoala.server.dto.request.lessonRequest.LessonUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.LessonResponse;
import com.duokoala.server.service.LessonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonController {
    LessonService lessonService;

    @PostMapping("/courses/{courseId}/lessons")
    ApiResponse<LessonResponse> create(
            @PathVariable String courseId,
            @RequestBody LessonCreateRequest request) {
        return ApiResponse.<LessonResponse>builder()
                .result(lessonService.create(courseId, request))
                .build();
    }

    @PutMapping("/lessons/{lessonId}")
    ApiResponse<LessonResponse> update(
            @PathVariable String lessonId,
            @RequestBody LessonUpdateRequest request) {
        return ApiResponse.<LessonResponse>builder()
                .result(lessonService.update(lessonId,request))
                .build();
    }
}
