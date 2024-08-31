package com.duokoala.server.controller;

import com.duokoala.server.dto.request.DiscountCreateRequest;
import com.duokoala.server.dto.request.DiscountUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.DiscountResponse;
import com.duokoala.server.service.DiscountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/discounts")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class DiscountController {
    DiscountService discountService;

    @PostMapping
    ApiResponse<DiscountResponse> create(@RequestBody DiscountCreateRequest request) {
        return ApiResponse.<DiscountResponse>builder()
                .result(discountService.create(request))
                .build();
    }

    @PutMapping("/{discountId}")
    ApiResponse<DiscountResponse> update(
            @PathVariable String discountId,@RequestBody DiscountUpdateRequest request) {
        return ApiResponse.<DiscountResponse>builder()
                .result(discountService.update(discountId,request))
                .build();
    }

    @GetMapping("/{discountId}")
    ApiResponse<DiscountResponse> get(@PathVariable String discountId) {
        return ApiResponse.<DiscountResponse>builder()
                .result(discountService.get(discountId))
                .build();
    }

    @GetMapping
    ApiResponse<List<DiscountResponse>> getAll() {
        return ApiResponse.<List<DiscountResponse>>builder()
                .result(discountService.getAll())
                .build();
    }

    @DeleteMapping("/{discountId}")
    ApiResponse<Void> delete(@PathVariable String discountId) {
        discountService.delete(discountId);
        return ApiResponse.<Void>builder()
                .message("Discount has been deleted!")
                .build();
    }

}
