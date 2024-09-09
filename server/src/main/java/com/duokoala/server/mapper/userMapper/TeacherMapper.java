package com.duokoala.server.mapper.userMapper;

import com.duokoala.server.dto.request.userRequest.TeacherCreationRequest;
import com.duokoala.server.dto.request.userRequest.TeacherUpdateRequest;
import com.duokoala.server.dto.response.userResponse.TeacherResponse;
import com.duokoala.server.entity.user.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "roles", ignore = true)
    Teacher toTeacher(TeacherCreationRequest request);
    TeacherResponse toTeacherResponse(Teacher teacher,Float teacherRating);
    @Mapping(target = "image", ignore = true)
    void updateTeacher(@MappingTarget Teacher teacher, TeacherUpdateRequest request);
}
