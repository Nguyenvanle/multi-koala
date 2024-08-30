package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.ActivityCreateRequest;
import com.duokoala.server.dto.request.TypeCreateRequest;
import com.duokoala.server.dto.request.TypeUpdateRequest;
import com.duokoala.server.dto.response.ActivityResponse;
import com.duokoala.server.dto.response.TypeResponse;
import com.duokoala.server.entity.Activity;
import com.duokoala.server.entity.Type;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.TargetType;

@Mapper( componentModel = "spring")// used in spring
public interface TypeMapper {
    Type toType(TypeCreateRequest request);
    TypeResponse toTypeResponse(Type type);
    void updateType(@MappingTarget Type type, TypeUpdateRequest request);
}
