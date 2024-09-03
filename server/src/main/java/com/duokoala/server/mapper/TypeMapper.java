package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.typeRequest.TypeCreateRequest;
import com.duokoala.server.dto.request.typeRequest.TypeUpdateRequest;
import com.duokoala.server.dto.response.TypeResponse;
import com.duokoala.server.entity.Type;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface TypeMapper {
    Type toType(TypeCreateRequest request);
    TypeResponse toTypeResponse(Type type);
    void updateType(@MappingTarget Type type, TypeUpdateRequest request);
}
