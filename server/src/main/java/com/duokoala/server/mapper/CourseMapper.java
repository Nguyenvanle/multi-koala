package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.mapper.userMapper.TeacherMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = TeacherMapper.class)// used in spring
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class CourseMapper {
    @Autowired
    protected TeacherMapper teacherMapper;

    @Mapping(target = "courseLevel", ignore = true)
    @Mapping(target = "types", ignore = true)
    @Mapping(target = "fields", ignore = true)
    public abstract Course toCourse(CourseCreateRequest request);

    @Mapping(target = "uploadedByTeacher",
            expression = "java(teacherMapper.toTeacherResponse(course.getUploadedByTeacher()))")
    public abstract CourseResponse toCourseResponse(Course course, float courseRating, float discountApprovedRate);


    @Mapping(target = "types", ignore = true)
    @Mapping(target = "courseLevel", ignore = true)
    @Mapping(target = "fields", ignore = true)
    public abstract void updateCourse(@MappingTarget Course course, CourseUpdateRequest request);
}
