package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.fieldRequest.FieldCreateRequest;
import com.duokoala.server.dto.request.fieldRequest.FieldUpdateRequest;
import com.duokoala.server.dto.response.FieldResponse;
import com.duokoala.server.entity.Field;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface FieldMapper {
    Field toField(FieldCreateRequest request);
    FieldResponse toFieldResponse(Field field);
    void updateField(@MappingTarget Field field, FieldUpdateRequest request);
}
