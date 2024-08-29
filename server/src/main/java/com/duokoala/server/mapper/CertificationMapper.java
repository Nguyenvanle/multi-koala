package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.CertificationCreateRequest;
import com.duokoala.server.dto.response.CertificationResponse;
import com.duokoala.server.entity.Certification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper( componentModel = "spring")// used in spring
public interface CertificationMapper {
    @Mapping(target = "uploadedByTeacher", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "approvedByAdmin", ignore = true)
    Certification toCertification(CertificationCreateRequest request);
    CertificationResponse toCertificationResponse(Certification certification);

}