package com.duokoala.server.service;

import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationApproveRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.certificationResponse.CertificationResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CertificationMapper;
import com.duokoala.server.repository.CertificationRepository;
import com.duokoala.server.repository.userRepository.TeacherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CertificationService {
    CertificationRepository certificationRepository;
    CertificationMapper certificationMapper;
    AuthenticationService authenticationService;
    private final TeacherRepository teacherRepository;

    public CertificationResponse uploadCertification(CertificationCreateRequest request) {
        Certification certification = certificationMapper.toCertification(request);
        certification.setUploadedByTeacher(authenticationService.getAuthenticatedTeacher());
        certification.setStatus(Status.PENDING_APPROVAL);
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    public CertificationResponse approveCertification(
            String certificationId, CertificationApproveRequest request) {
        Status approvedStatus = Status.validateApprovedStatus(request.getStatus());

        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_FOUND));
        if (!Objects.isNull(certification.getApprovedByAdmin()))
            throw new AppException(ErrorCode.CERTIFICATION_ALREADY_APPROVED);

        certification.setStatus(approvedStatus);
        certification.setApprovedByAdmin(authenticationService.getAuthenticatedAdmin());
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    public CertificationResponse updateCertification(
            String certificationId, CertificationUpdateRequest request) {
        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_FOUND));
        certificationMapper.updateCertification(certification, request);
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    public CertificationResponse getCertification(String certificationId) {
        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_FOUND));
        return certificationMapper.toCertificationResponse(certification);
    }

    public List<CertificationResponse> getMyCertifications() {
        var certifications = certificationRepository
                .findByUploadedByTeacher(authenticationService.getAuthenticatedTeacher());
        return certifications.stream().map(certificationMapper::toCertificationResponse).toList();
    }

    public List<CertificationResponse> getCertificationsByTeacherId(String teacherId) {
        var certifications = certificationRepository
                .findByUploadedByTeacher(teacherRepository
                        .findById(teacherId).orElseThrow(() ->
                                new AppException(ErrorCode.TEACHER_NOT_FOUND)));
        return certifications.stream().map(certificationMapper::toCertificationResponse).toList();
    }


    public List<CertificationResponse> getCertifications() {
        var certifications = certificationRepository.findAll();
        return certifications.stream().map(certificationMapper::toCertificationResponse).toList();
    }

    public void deleteCertification(String certificationId) {
        certificationRepository.deleteById(certificationId);
    }
}
