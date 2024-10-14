package com.duokoala.server.controller;

import com.duokoala.server.dto.request.recommendRequest.RecommendCreateRequest;
import com.duokoala.server.dto.request.recommendRequest.RecommendUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.RecommendResponse;
import com.duokoala.server.service.RecommendService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/references")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecommendController {
    RecommendService referenceService;

    @PostMapping
    ApiResponse<RecommendResponse> create(@RequestBody RecommendCreateRequest request) {
        return ApiResponse.<RecommendResponse>builder()
                .result(referenceService.create(request))
                .build();
    }

    @PutMapping("/{referenceId}")
    ApiResponse<RecommendResponse> update(
            @PathVariable String referenceId,
            @RequestBody RecommendUpdateRequest request) {
        return ApiResponse.<RecommendResponse>builder()
                .result(referenceService.update(referenceId, request))
                .build();
    }

    @GetMapping("/{referenceId}")
    ApiResponse<RecommendResponse> get(@PathVariable String referenceId) {
        return ApiResponse.<RecommendResponse>builder()
                .result(referenceService.get(referenceId))
                .build();
    }

    @GetMapping
    ApiResponse<List<RecommendResponse>> getAll() {
        return ApiResponse.<List<RecommendResponse>>builder()
                .result(referenceService.getAll())
                .build();
    }

    @DeleteMapping("/{referenceId}")
    ApiResponse<Void> delete(@PathVariable String referenceId) {
        referenceService.delete(referenceId);
        return ApiResponse.<Void>builder()
                .message("Reference has been deleted!")
                .build();
    }
}
