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

    @PostMapping("/{emailAddress}/send-OTP")
    ApiResponse<Void> sendOTP(@PathVariable String emailAddress) throws MessagingException {
        emailService.sendVerificationEmail(emailAddress);
        return ApiResponse.<Void>builder()
                .message("OTP has been sent")
                .build();
    }

    @PostMapping("/{emailAddress}/verify-OTP/{otp}")
    ApiResponse<Boolean> verifyOTP(
            @PathVariable String emailAddress,
            @PathVariable String otp) {
        return ApiResponse.<Boolean>builder()
                .result(emailService.verifyOtp(emailAddress,otp))
                .build();
    }
}
