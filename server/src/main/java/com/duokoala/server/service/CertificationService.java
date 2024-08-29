package com.duokoala.server.service;

import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationApproveRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.CertificationResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CertificationMapper;
import com.duokoala.server.repository.CertificationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CertificationService {
    CertificationRepository certificationRepository;
    CertificationMapper certificationMapper;
    AuthenticationService authenticationService;

    public CertificationResponse uploadCertification(CertificationCreateRequest request) {
        Certification certification = certificationMapper.toCertification(request);
        Teacher teacher = authenticationService.getAuthenticatedTeacher();
        certification.setUploadedByTeacher(teacher);
        certification.setStatus(Status.PENDING_APPROVAL);
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    public CertificationResponse approveCertification(
            String certificationId, CertificationApproveRequest request) {
        Status approvedStatus = Status.validateApprovedStatus(request.getStatus());
        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_EXISTED));
        certification.setStatus(approvedStatus);
        if (!Objects.isNull(certification.getApprovedByAdmin()))
            throw new AppException(ErrorCode.CERTIFICATION_IS_APPROVED);
        Admin admin = authenticationService.getAuthenticatedAdmin();
        certification.setApprovedByAdmin(admin);
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    public CertificationResponse updateCertification(
            String certificationId, CertificationUpdateRequest request) {
        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_EXISTED));
        certificationMapper.updateCertification(certification,request);
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    public CertificationResponse getCertification(String certificationId) {
        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_EXISTED));
        return certificationMapper.toCertificationResponse(certification);
    }
    public List<CertificationResponse> getCertifications() {
        var certifications = certificationRepository.findAll();
        return certifications.stream().map(certificationMapper::toCertificationResponse).toList();
    }
}
