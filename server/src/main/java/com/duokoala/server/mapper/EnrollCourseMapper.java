package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.EnrollCourseUpdateRequest;
import com.duokoala.server.dto.response.enrollCourseResponse.EnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.MyEnrollCourseResponse;
import com.duokoala.server.entity.EnrollCourse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = CourseMapper.class)// used in spring
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class EnrollCourseMapper {
    @Autowired
    CourseMapper courseMapper;

    @Mapping(target = "course",
            expression = "java(courseMapper.toCourseResponse(enrollCourse.getCourse()))")
    public abstract EnrollCourseResponse toEnrollCourseResponse(EnrollCourse enrollCourse);

    public abstract MyEnrollCourseResponse toMyEnrollCourseResponse(EnrollCourse enrollCourse);

    public abstract void updateEnrollCourse(@MappingTarget EnrollCourse enrollCourse,
                                            EnrollCourseUpdateRequest request);
}
