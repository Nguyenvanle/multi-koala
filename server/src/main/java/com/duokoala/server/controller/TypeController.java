package com.duokoala.server.controller;

import com.duokoala.server.dto.request.TypeCreateRequest;
import com.duokoala.server.dto.request.TypeUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.TypeResponse;
import com.duokoala.server.service.TypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/types")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TypeController {
    TypeService typeService;

    @PostMapping
    ApiResponse<TypeResponse> create(@RequestBody TypeCreateRequest request) {
        return ApiResponse.<TypeResponse>builder()
                .result(typeService.create(request))
                .build();
    }

    @PutMapping("/{typeId}")
    ApiResponse<TypeResponse> update(@PathVariable String typeId, @RequestBody TypeUpdateRequest request) {
        return ApiResponse.<TypeResponse>builder()
                .result(typeService.update(typeId,request))
                .build();
    }

    @GetMapping("/{typeId}")
    ApiResponse<TypeResponse> get(@PathVariable String typeId) {
        return ApiResponse.<TypeResponse>builder()
                .result(typeService.get(typeId))
                .build();
    }

    @GetMapping
    ApiResponse<List<TypeResponse>> getAll() {
        return ApiResponse.<List<TypeResponse>>builder()
                .result(typeService.getAll())
                .build();
    }

    @DeleteMapping("/{typeId}")
    ApiResponse<Void> delete(@PathVariable String typeId) {
        typeService.delete(typeId);
        return ApiResponse.<Void>builder()
                .message("Type has been deleted!")
                .build();
    }

}
