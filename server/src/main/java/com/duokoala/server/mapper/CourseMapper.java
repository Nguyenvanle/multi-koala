package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface CourseMapper {
    @Mapping(target = "types", ignore = true)
    Course toCourse(CourseCreateRequest request);
    CourseResponse toCourseResponse(Course course);
    @Mapping(target = "types", ignore = true)
    void updateCourse(@MappingTarget Course course, CourseUpdateRequest request);
}