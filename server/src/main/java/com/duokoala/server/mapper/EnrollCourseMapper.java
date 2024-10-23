package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.enrollCourseRequest.EnrollCourseUpdateRequest;
import com.duokoala.server.dto.response.enrollCourseResponse.EnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.MyEnrollCourseResponse;
import com.duokoala.server.entity.EnrollCourse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")// used in spring
public interface EnrollCourseMapper {
    EnrollCourseResponse toEnrollCourseResponse(EnrollCourse enrollCourse);
    MyEnrollCourseResponse toMyEnrollCourseResponse(EnrollCourse enrollCourse);
    void updateEnrollCourse(@MappingTarget EnrollCourse enrollCourse,
                                            EnrollCourseUpdateRequest request);
}
