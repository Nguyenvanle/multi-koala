package com.duokoala.server.controller;

import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/emails")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class EmailController {
    EmailService emailService;
    @PostMapping("register/{emailAddress}/send-OTP")
    ApiResponse<Void> sendRegisterEmail(@PathVariable String emailAddress) throws MessagingException {
        emailService.sendRegisterEmail(emailAddress);
        return ApiResponse.<Void>builder()
                .message("OTP has been sent")
                .build();
    }

    @PostMapping("register/{emailAddress}/verify-OTP/{otp}")
    ApiResponse<Boolean> verifyRegisterOTP(
            @PathVariable String emailAddress,
            @PathVariable String otp) {
        return ApiResponse.<Boolean>builder()
                .result(emailService.verifyRegisterOTP(emailAddress,otp))
                .build();
    }

    @PostMapping("reset-password/{emailAddress}/send-OTP")
    ApiResponse<Void> sendResetPasswordEmail(@PathVariable String emailAddress) throws MessagingException {
        emailService.sendResetPasswordEmail(emailAddress);
        return ApiResponse.<Void>builder()
                .message("OTP has been sent")
                .build();
    }

    @PostMapping("reset-password/{emailAddress}/verify-OTP/{otp}")
    ApiResponse<Boolean> verifyForgetPasswordOTP(
            @PathVariable String emailAddress,
            @PathVariable String otp) {
        return ApiResponse.<Boolean>builder()
                .result(emailService.verifyForgetPasswordOTP(emailAddress,otp))
                .build();
    }
}
