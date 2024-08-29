package com.duokoala.server.service;

import com.duokoala.server.dto.request.CertificationCreateRequest;
import com.duokoala.server.dto.response.CertificationResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CertificationMapper;
import com.duokoala.server.repository.CertificationRepository;
import com.duokoala.server.repository.userRepository.TeacherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CertificationService {
    CertificationRepository certificationRepository;
    CertificationMapper certificationMapper;
    TeacherRepository teacherRepository;

    public CertificationResponse uploadCertification(CertificationCreateRequest request) {
        Certification certification = certificationMapper.toCertification(request);

        var context = SecurityContextHolder.getContext(); //get current context
        String teacherUsername = context.getAuthentication().getName();
        Teacher teacher = teacherRepository.findByUsername(teacherUsername)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        certification.setUploadedByTeacher(teacher);
        certification.setStatus(Status.PENDING_APPROVAL.name());

        return certificationMapper.toCertificationResponse(certificationRepository.save(certification));
    }
}
