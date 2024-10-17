package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.courseResponse.StatisticCourseResponse;
import com.duokoala.server.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")// used in spring
public interface CourseMapper {
    @Mapping(target = "courseLevel", ignore = true)
    @Mapping(target = "types", ignore = true)
    @Mapping(target = "fields", ignore = true)
    Course toCourse(CourseCreateRequest request);
    CourseResponse toCourseResponse(Course course);

    @Mapping(target = "types", ignore = true)
    @Mapping(target = "courseLevel", ignore = true)
    @Mapping(target = "fields", ignore = true)
    void updateCourse(@MappingTarget Course course, CourseUpdateRequest request);


    @Mapping(target = "totalEnrollments", ignore = true)
    @Mapping(target = "totalCompleted", ignore = true)
    @Mapping(target = "income", ignore = true)
    StatisticCourseResponse toStatisticCourseResponse(Course course);
}
