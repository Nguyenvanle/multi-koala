package com.duokoala.server.controller;

import com.duokoala.server.dto.request.CertificationApproveRequest;
import com.duokoala.server.dto.request.CertificationCreateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.CertificationResponse;
import com.duokoala.server.service.CertificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/certifications")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CertificationController {
    CertificationService certificationService;

    @PostMapping
    ApiResponse<CertificationResponse> uploadCertification(
            @RequestBody CertificationCreateRequest request) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService.uploadCertification(request))
                .build();
    }

    @PutMapping("/{certificationId}/approve")
    ApiResponse<CertificationResponse> approveCertification(
            @PathVariable String certificationId ,@RequestBody CertificationApproveRequest request) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService
                        .approveCertification(certificationId,request))
                .build();
    }
}
