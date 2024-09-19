package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.certificationRequest.CertificationCreateRequest;
import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.response.certificationResponse.CertificationResponse;
import com.duokoala.server.entity.Certification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface CertificationMapper {
    @Mapping(target = "uploadedByTeacher", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "approvedByAdmin", ignore = true)
    Certification toCertification(CertificationCreateRequest request);
    CertificationResponse toCertificationResponse(Certification certification);
    @Mapping(target = "uploadedByTeacher", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "certificateId", ignore = true)
    @Mapping(target = "approvedByAdmin", ignore = true)
    void updateCertification(
            @MappingTarget Certification certification, CertificationUpdateRequest request);
}
