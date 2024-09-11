package com.duokoala.server.controller;

import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountApproveRequest;
import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountCreateRequest;
import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.requestDiscountResponse.RequestDiscountOnlyResponse;
import com.duokoala.server.dto.response.requestDiscountResponse.RequestDiscountResponse;
import com.duokoala.server.service.RequestDiscountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestDiscountController {
    RequestDiscountService requestDiscountService;
    @PostMapping("courses/{courseId}/request-discounts")
    ApiResponse<RequestDiscountResponse> proposal(
            @PathVariable String courseId,
            @RequestBody RequestDiscountCreateRequest request) {
        return ApiResponse.<RequestDiscountResponse>builder()
                .result(requestDiscountService.create(courseId,request))
                .build();
    }

    @PutMapping("/request-discounts/{requestDiscountId}/approve")
    ApiResponse<RequestDiscountResponse> approve(
            @PathVariable String requestDiscountId,
            @RequestBody RequestDiscountApproveRequest request) {
        return ApiResponse.<RequestDiscountResponse>builder()
                .result(requestDiscountService.approve(requestDiscountId,request))
                .build();
    }

    @PutMapping("/request-discounts/{requestDiscountId}")
    ApiResponse<RequestDiscountResponse> update(
            @PathVariable String requestDiscountId,
            @RequestBody RequestDiscountUpdateRequest request) {
        return ApiResponse.<RequestDiscountResponse>builder()
                .result(requestDiscountService.update(requestDiscountId,request))
                .build();
    }

    @GetMapping("/request-discounts/{requestDiscountId}")
    ApiResponse<RequestDiscountResponse> get(@PathVariable String requestDiscountId) {
        return ApiResponse.<RequestDiscountResponse>builder()
                .result(requestDiscountService.get(requestDiscountId))
                .build();
    }

    @GetMapping("/request-discounts")
    ApiResponse<List<RequestDiscountResponse>> getAll() {
        return ApiResponse.<List<RequestDiscountResponse>>builder()
                .result(requestDiscountService.getAll())
                .build();
    }

    @GetMapping("courses/{courseId}/discount-request-only")
    ApiResponse<List<RequestDiscountOnlyResponse>> getListByCourseId(@PathVariable String courseId) {
        return ApiResponse.<List<RequestDiscountOnlyResponse>>builder()
                .result(requestDiscountService.getAllByCourse(courseId))
                .build();
    }

    @DeleteMapping("/request-discounts/{requestDiscountId}")
    ApiResponse<Void> delete(@PathVariable String requestDiscountId) {
        requestDiscountService.delete(requestDiscountId);
        return ApiResponse.<Void>builder()
                .message("Request discount has been deleted!")
                .build();
    }
}
