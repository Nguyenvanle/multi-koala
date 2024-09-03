package com.duokoala.server.controller;

import com.duokoala.server.dto.request.lessonRequest.LessonCreateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.LessonResponse;
import com.duokoala.server.service.LessonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses/{courseId}/lessons")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class LessonController {
    LessonService lessonService;

    @PostMapping
    ApiResponse<LessonResponse> create(
            @PathVariable String courseId,
            @RequestBody LessonCreateRequest request) {
        return ApiResponse.<LessonResponse>builder()
                .result(lessonService.create(courseId,request))
                .build();
    }
}
