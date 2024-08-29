package com.duokoala.server.controller;

import com.duokoala.server.dto.request.certificationRequest.CertificationApproveRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.CertificationResponse;
import com.duokoala.server.service.CertificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PutMapping("/{certificationId}")
    ApiResponse<CertificationResponse> updateCertification(
            @PathVariable String certificationId ,@RequestBody CertificationUpdateRequest request) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService
                        .updateCertification(certificationId,request))
                .build();
    }

    @GetMapping("/{certificationId}")
    ApiResponse<CertificationResponse> getCertification(@PathVariable String certificationId) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService.getCertification(certificationId))
                .build();
    }

    @GetMapping
    ApiResponse<List<CertificationResponse>> getCertifications() {
        return ApiResponse.<List<CertificationResponse>>builder()
                .result(certificationService.getCertifications())
                .build();
    }

    @DeleteMapping("/{certificationId}")
    ApiResponse<Void> deleteCertification(@PathVariable String certificationId) {
        certificationService.deleteCertification(certificationId);
        return ApiResponse.<Void>builder()
                .message("Certification has been deleted!")
                .build();
    }
}
