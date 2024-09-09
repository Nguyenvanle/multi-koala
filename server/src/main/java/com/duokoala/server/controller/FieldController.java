package com.duokoala.server.controller;


import com.duokoala.server.dto.request.fieldRequest.FieldCreateRequest;
import com.duokoala.server.dto.request.fieldRequest.FieldUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.FieldResponse;
import com.duokoala.server.service.FieldService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fields")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FieldController {
    FieldService fieldService;

    @PostMapping
    ApiResponse<FieldResponse> create(@RequestBody FieldCreateRequest request) {
        return ApiResponse.<FieldResponse>builder()
                .result(fieldService.create(request))
                .build();
    }

    @PutMapping("/{fieldName}")
    ApiResponse<FieldResponse> update(@PathVariable String fieldName, @RequestBody FieldUpdateRequest request) {
        return ApiResponse.<FieldResponse>builder()
                .result(fieldService.update(fieldName,request))
                .build();
    }

    @GetMapping("/{fieldName}")
    ApiResponse<FieldResponse> get(@PathVariable String fieldName) {
        return ApiResponse.<FieldResponse>builder()
                .result(fieldService.get(fieldName))
                .build();
    }

    @GetMapping
    ApiResponse<List<FieldResponse>> getAll() {
        return ApiResponse.<List<FieldResponse>>builder()
                .result(fieldService.getAll())
                .build();
    }

    @DeleteMapping("/{fieldName}")
    ApiResponse<Void> delete(@PathVariable String fieldName) {
        fieldService.delete(fieldName);
        return ApiResponse.<Void>builder()
                .message("Field has been deleted!")
                .build();
    }

}
