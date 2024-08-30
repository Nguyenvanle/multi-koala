package com.duokoala.server.controller;

import com.duokoala.server.dto.request.ActivityCreateRequest;
import com.duokoala.server.dto.response.ActivityResponse;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.service.ActivityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/activities")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ActivityController {
    ActivityService activityService;

    @PostMapping
    ApiResponse<ActivityResponse> createActivity(@RequestBody ActivityCreateRequest request) {
        return ApiResponse.<ActivityResponse>builder()
                .result(activityService.createActivity(request))
                .build();
    }
    @GetMapping
    ApiResponse<List<ActivityResponse>> getActivities() {
        return ApiResponse.<List<ActivityResponse>>builder()
                .result(activityService.getActivities())
                .build();
    }
}
