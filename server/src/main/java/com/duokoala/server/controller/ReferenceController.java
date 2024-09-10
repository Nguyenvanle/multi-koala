package com.duokoala.server.controller;

import com.duokoala.server.dto.request.referenceRequest.ReferenceCreateRequest;
import com.duokoala.server.dto.request.referenceRequest.ReferenceUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.ReferenceResponse;
import com.duokoala.server.service.ReferenceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/references")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReferenceController {
    ReferenceService referenceService;

    @PostMapping
    ApiResponse<ReferenceResponse> create(@RequestBody ReferenceCreateRequest request) {
        return ApiResponse.<ReferenceResponse>builder()
                .result(referenceService.create(request))
                .build();
    }

    @PutMapping("/{referenceId}")
    ApiResponse<ReferenceResponse> update(
            @PathVariable String referenceId,
            @RequestBody ReferenceUpdateRequest request) {
        return ApiResponse.<ReferenceResponse>builder()
                .result(referenceService.update(referenceId, request))
                .build();
    }

    @GetMapping("/{referenceId}")
    ApiResponse<ReferenceResponse> get(@PathVariable String referenceId) {
        return ApiResponse.<ReferenceResponse>builder()
                .result(referenceService.get(referenceId))
                .build();
    }

    @GetMapping
    ApiResponse<List<ReferenceResponse>> getAll() {
        return ApiResponse.<List<ReferenceResponse>>builder()
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
