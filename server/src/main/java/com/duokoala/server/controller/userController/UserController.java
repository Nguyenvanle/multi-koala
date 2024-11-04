package com.duokoala.server.controller.userController;

import com.duokoala.server.dto.request.userRequest.ChangePasswordRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.userResponse.UserResponse;
import com.duokoala.server.service.userService.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {
    UserService userService;

    @PostMapping("/{userId}/update-image")
    ApiResponse<UserResponse> uploadImage(
            @PathVariable String userId
            , @RequestParam("file") MultipartFile file) throws IOException {
        return ApiResponse.<UserResponse>builder()
                .result(userService.uploadImage(userId, file))
                .build();
    }

    @PutMapping("/{userId}/change-password")
    ApiResponse<UserResponse> changePassword(
            @PathVariable String userId
            , @RequestBody ChangePasswordRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.changeMyPassword(request))
                .build();
    }
}
