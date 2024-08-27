package com.duokoala.server.controller.userController;

import com.duokoala.server.dto.request.userRequest.AdminCreationRequest;
import com.duokoala.server.dto.request.userRequest.AdminUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.service.userService.AdminService;
import com.duokoala.server.service.userService.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class AdminController {
    AdminService adminService;
    UserService userService;

    @PostMapping
    ApiResponse<AdminResponse> createAdmin(@RequestBody AdminCreationRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.createAdmin(request))
                .build();
    }
    @PutMapping("/{adminId}")
    ApiResponse<AdminResponse> updateAdmin(
            @PathVariable String adminId, @RequestBody AdminUpdateRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.updateAdmin(adminId, request))
                .build();
    }

    @GetMapping("/{adminId}")
    ApiResponse<AdminResponse> getAdmin(@PathVariable String adminId) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.getAdmin(adminId))
                .build();
    }

    @GetMapping
    ApiResponse<List<AdminResponse>> getAdmins() {
        return ApiResponse.<List<AdminResponse>>builder()
                .result(adminService.getAdmins())
                .build();
    }

    @DeleteMapping("/{adminId}")
    ApiResponse<Void> deleteAdmin(@PathVariable String adminId) {
        userService.deleteUser(adminId);
        return ApiResponse.<Void>builder()
                .message("Admin has been deleted!")
                .build();
    }
}
