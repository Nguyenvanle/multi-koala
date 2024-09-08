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

import java.util.List;

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

    @GetMapping("/courses/{courseId}/lessons")
    ApiResponse<List<LessonResponse>> getListByCourseId(
            @PathVariable String courseId) {
        return ApiResponse.<List<LessonResponse>>builder()
                .result(lessonService.getListByCourseId(courseId))
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

    @GetMapping("/lessons/{lessonId}")
    ApiResponse<LessonResponse> get(@PathVariable String lessonId) {
        return ApiResponse.<LessonResponse>builder()
                .result(lessonService.get(lessonId))
                .build();
    }

    @GetMapping("/lessons")
    ApiResponse<List<LessonResponse>> getAll() {
        return ApiResponse.<List<LessonResponse>>builder()
                .result(lessonService.getAll())
                .build();
    }

    @DeleteMapping("/lessons/{lessonId}")
    ApiResponse<Void> delete(@PathVariable String lessonId) {
        lessonService.delete(lessonId);
        return ApiResponse.<Void>builder()
                .build();
    }
}
