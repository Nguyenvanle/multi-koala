package com.duokoala.server.controller;

import com.duokoala.server.dto.request.discountCourseRequest.DiscountCourseApproveRequest;
import com.duokoala.server.dto.request.discountCourseRequest.DiscountCourseCreateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.discountCourseResponse.DiscountCourseResponse;
import com.duokoala.server.dto.response.discountCourseResponse.DiscountOnlyResponse;
import com.duokoala.server.service.DiscountCourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DiscountCourseController {
    DiscountCourseService discountCourseService;
    @PostMapping("/discount-courses")
    ApiResponse<DiscountCourseResponse> proposal(@RequestBody DiscountCourseCreateRequest request) {
        return ApiResponse.<DiscountCourseResponse>builder()
                .result(discountCourseService.create(request))
                .build();
    }

    @PutMapping("/discount-courses/{discountCourseId}")
    ApiResponse<DiscountCourseResponse> approve(
            @PathVariable String discountCourseId,
            @RequestBody DiscountCourseApproveRequest request) {
        return ApiResponse.<DiscountCourseResponse>builder()
                .result(discountCourseService.approve(discountCourseId,request))
                .build();
    }

    @GetMapping("/discount-courses/{discountCourseId}")
    ApiResponse<DiscountCourseResponse> get(@PathVariable String discountCourseId) {
        return ApiResponse.<DiscountCourseResponse>builder()
                .result(discountCourseService.get(discountCourseId))
                .build();
    }

    @GetMapping("/discount-courses")
    ApiResponse<List<DiscountCourseResponse>> getAll() {
        return ApiResponse.<List<DiscountCourseResponse>>builder()
                .result(discountCourseService.getAll())
                .build();
    }

    @GetMapping("courses/{courseId}/discount-only")
    ApiResponse<List<DiscountOnlyResponse>> getListByCourseId(@PathVariable String courseId) {
        return ApiResponse.<List<DiscountOnlyResponse>>builder()
                .result(discountCourseService.getListByCourseId(courseId))
                .build();
    }

    @DeleteMapping("/discount-courses/{discountCourseId}")
    ApiResponse<Void> delete(@PathVariable String discountCourseId) {
        discountCourseService.delete(discountCourseId);
        return ApiResponse.<Void>builder()
                .message("Discount for course has been deleted!")
                .build();
    }
}
