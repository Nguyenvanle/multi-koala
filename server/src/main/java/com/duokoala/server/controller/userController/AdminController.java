package com.duokoala.server.controller.userController;

import com.duokoala.server.dto.request.userRequest.AdminCreationRequest;
import com.duokoala.server.dto.request.userRequest.AdminUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.service.userService.AdminService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class AdminController {
    AdminService adminService;

    @PostMapping
    ApiResponse<AdminResponse> createAdmin(@RequestBody AdminCreationRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.createAdmin(request))
                .build();
    }
    @PutMapping("/{adminId}")
    ApiResponse <AdminResponse> updateAdmin(
            @PathVariable String adminId, @RequestBody AdminUpdateRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.updateAdmin(adminId, request))
                .build();
    }
}
