package com.duokoala.server.controller;

import com.duokoala.server.dto.request.reviewRequest.ReviewCreateRequest;
import com.duokoala.server.dto.request.reviewRequest.ReviewUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.ReviewResponse;
import com.duokoala.server.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @PostMapping("/courses/{courseId}/reviews")
    ApiResponse<ReviewResponse> create(
            @PathVariable String courseId,
            @RequestBody ReviewCreateRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.create(courseId,request))
                .build();
    }

    @PutMapping("/reviews/{reviewId}")
    ApiResponse<ReviewResponse> update(
            @PathVariable String reviewId,
            @RequestBody ReviewUpdateRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.update(reviewId,request))
                .build();
    }

    @GetMapping("/reviews/{reviewId}")
    ApiResponse<ReviewResponse> get(@PathVariable String reviewId) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.get(reviewId))
                .build();
    }

    @GetMapping("/reviews")
    ApiResponse<List<ReviewResponse>> getAll() {
        return ApiResponse.<List<ReviewResponse>>builder()
                .result(reviewService.getAll())
                .build();
    }
    @DeleteMapping("/reviews/{reviewId}")
    ApiResponse<Void> delete(@PathVariable String reviewId) {
        reviewService.delete(reviewId);
        return ApiResponse.<Void>builder()
                .message("Review has been deleted!")
                .build();
    }
}
