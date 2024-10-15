package com.duokoala.server.service;

import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationApproveRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.certificationResponse.CertificationResponse;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CertificationMapper;
import com.duokoala.server.repository.CertificationRepository;
import com.duokoala.server.repository.userRepository.TeacherRepository;
import com.duokoala.server.service.mediaService.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CertificationService {
    CertificationRepository certificationRepository;
    CertificationMapper certificationMapper;
    AuthenticationService authenticationService;
    TeacherRepository teacherRepository;
    CloudinaryService cloudinaryService;

    public CertificationResponse uploadCertification(CertificationCreateRequest request) {
        Certification certification = certificationMapper.toCertification(request);
        certification.setUploadedByTeacher(authenticationService.getAuthenticatedTeacher());
        certification.setStatus(Status.PENDING_APPROVAL);
//        List images = new ArrayList<Image>();
//        for (String url : request.getProofImageUrls()) {
//            images.add(Image.builder()
//                    .imageUrl(url)
//                    .build());
//        }
//        certification.setProofImages(images);
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
//        List images = certification.getProofImages();
//        images.clear();
//        for (String url : request.getProofImageUrls()) {
//            images.add(Image.builder()
//                    .imageUrl(url)
//                    .build());
//        }
//        certification.setProofImages(images);
        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }

    @Transactional
    public CertificationResponse uploadImages(String certificationId, List<MultipartFile> imageFiles) throws IOException {
        Certification certification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new AppException(ErrorCode.CERTIFICATION_NOT_FOUND));
        List<Image> images = certification.getProofImages();
        for(Image image: images) {
            cloudinaryService.deleteImage(image.getImageId());
        }
        images.clear();
        for (MultipartFile image : imageFiles) {
            images.add(cloudinaryService.uploadImage(image));
        }
        return certificationMapper
                .toCertificationResponse
                        (certificationRepository.save(certification));
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
