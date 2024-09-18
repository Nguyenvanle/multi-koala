package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.certificationResponse.CertificationResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.mapper.userMapper.TeacherMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper( componentModel = "spring")// used in spring
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class CertificationMapper {
    @Autowired
    protected TeacherMapper teacherMapper;

    @Mapping(target = "uploadedByTeacher", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "approvedByAdmin", ignore = true)
    public abstract Certification toCertification(CertificationCreateRequest request);

    @Mapping(target = "uploadedByTeacher",
            expression = "java(teacherMapper.toTeacherResponse(certification.getUploadedByTeacher()))")
    public abstract CertificationResponse toCertificationResponse(Certification certification);

    @Mapping(target = "uploadedByTeacher", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "certificateId", ignore = true)
    @Mapping(target = "approvedByAdmin", ignore = true)
    public abstract void updateCertification(
            @MappingTarget Certification certification, CertificationUpdateRequest request);
}
