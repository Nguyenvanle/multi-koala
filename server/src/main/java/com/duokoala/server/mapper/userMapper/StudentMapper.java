package com.duokoala.server.mapper.userMapper;

import com.duokoala.server.dto.request.userRequest.StudentCreationRequest;
import com.duokoala.server.dto.request.userRequest.StudentUpdateRequest;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.entity.user.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "roles", ignore = true)
    Student toStudent(StudentCreationRequest request);
    StudentResponse toStudentResponse(Student student);
    @Mapping(target = "image", ignore = true)
    void updateStudent(@MappingTarget Student student, StudentUpdateRequest request);
}
