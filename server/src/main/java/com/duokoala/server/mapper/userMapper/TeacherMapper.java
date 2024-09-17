package com.duokoala.server.mapper.userMapper;

import com.duokoala.server.dto.request.userRequest.TeacherCreationRequest;
import com.duokoala.server.dto.request.userRequest.TeacherUpdateRequest;
import com.duokoala.server.dto.response.userResponse.TeacherResponse;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.repository.ReviewRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.annotation.Target;

@Mapper(componentModel = "spring")
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class TeacherMapper {
    @Autowired
    ReviewRepository reviewRepository;

    public float getAvgRatingTeacher(String teacherId) {
        Float avgRating = reviewRepository.getAvgTeacher(teacherId);
        return avgRating != null ? avgRating : 0.0f;
    }
    @Mapping(target = "teacherRating",
            expression = "java(getAvgRatingTeacher(teacher.getUserId()))")
    public abstract TeacherResponse toTeacherResponse(Teacher teacher);
//    public abstract TeacherResponse toTeacherResponse(Teacher teacher,float teacherRating);

    @Mapping(target = "image", ignore = true)
    @Mapping(target = "roles", ignore = true)

    public abstract Teacher toTeacher(TeacherCreationRequest request);

    @Mapping(target = "image", ignore = true)
    public abstract void updateTeacher(@MappingTarget Teacher teacher, TeacherUpdateRequest request);
}
