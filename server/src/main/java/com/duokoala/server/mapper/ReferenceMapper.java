package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.referenceRequest.ReferenceCreateRequest;
import com.duokoala.server.dto.request.referenceRequest.ReferenceUpdateRequest;
import com.duokoala.server.dto.response.ReferenceResponse;
import com.duokoala.server.entity.Reference;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface ReferenceMapper {
    @Mapping(target = "favoriteFields", ignore = true)
    Reference toReference(ReferenceCreateRequest request);
    ReferenceResponse toReferenceResponse(Reference reference);
    @Mapping(target = "favoriteFields", ignore = true)
    void updateReference(@MappingTarget Reference reference,ReferenceUpdateRequest request);
}
