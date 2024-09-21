package com.duokoala.server.controller;

import com.duokoala.server.dto.request.certificationRequest.CertificationApproveRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.certificationResponse.CertificationResponse;
import com.duokoala.server.service.CertificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CertificationController {
    CertificationService certificationService;

    @PostMapping("/certifications")
    ApiResponse<CertificationResponse> uploadCertification(
            @RequestBody CertificationCreateRequest request) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService.uploadCertification(request))
                .build();
    }

    @PutMapping("/certifications/{certificationId}/approve")
    ApiResponse<CertificationResponse> approveCertification(
            @PathVariable String certificationId ,@RequestBody CertificationApproveRequest request) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService
                        .approveCertification(certificationId,request))
                .build();
    }

    @PutMapping("/certifications/{certificationId}")
    ApiResponse<CertificationResponse> updateCertification(
            @PathVariable String certificationId ,@RequestBody CertificationUpdateRequest request) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService
                        .updateCertification(certificationId,request))
                .build();
    }

    @GetMapping("/certifications/{certificationId}")
    ApiResponse<CertificationResponse> getCertification(@PathVariable String certificationId) {
        return ApiResponse.<CertificationResponse>builder()
                .result(certificationService.getCertification(certificationId))
                .build();
    }

    @GetMapping("/certifications/my-certifications")
    ApiResponse<List<CertificationResponse>> getMyCertification() {
        return ApiResponse.<List<CertificationResponse>>builder()
                .result(certificationService.getMyCertifications())
                .build();
    }
    @GetMapping("teachers/{teacherId}/certifications")
    ApiResponse<List<CertificationResponse>> getCertificationsByTeacherId(@PathVariable String teacherId) {
        return ApiResponse.<List<CertificationResponse>>builder()
                .result(certificationService.getCertificationsByTeacherId(teacherId))
                .build();
    }


    @GetMapping("/certifications")
    ApiResponse<List<CertificationResponse>> getCertifications() {
        return ApiResponse.<List<CertificationResponse>>builder()
                .result(certificationService.getCertifications())
                .build();
    }

    @DeleteMapping("/certifications/{certificationId}")
    ApiResponse<Void> deleteCertification(@PathVariable String certificationId) {
        certificationService.deleteCertification(certificationId);
        return ApiResponse.<Void>builder()
                .message("Certification has been deleted!")
                .build();
    }
}
