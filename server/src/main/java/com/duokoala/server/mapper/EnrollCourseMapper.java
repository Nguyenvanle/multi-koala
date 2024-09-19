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

@Mapper(componentModel = "spring")// used in spring
public interface EnrollCourseMapper {
    EnrollCourseResponse toEnrollCourseResponse(EnrollCourse enrollCourse);
    MyEnrollCourseResponse toMyEnrollCourseResponse(EnrollCourse enrollCourse);
    void updateEnrollCourse(@MappingTarget EnrollCourse enrollCourse,
                                            EnrollCourseUpdateRequest request);
}
