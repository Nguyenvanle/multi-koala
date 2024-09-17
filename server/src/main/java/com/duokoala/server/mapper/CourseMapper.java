package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.mapper.userMapper.TeacherMapper;
import com.duokoala.server.repository.DiscountCourseRepository;
import com.duokoala.server.repository.RequestDiscountRepository;
import com.duokoala.server.repository.ReviewRepository;
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
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    DiscountCourseRepository discountCourseRepository;
    @Autowired
    RequestDiscountRepository requestDiscountRepository;


    @Mapping(target = "courseLevel", ignore = true)
    @Mapping(target = "types", ignore = true)
    @Mapping(target = "fields", ignore = true)
    public abstract Course toCourse(CourseCreateRequest request);

    @Mapping(target = "uploadedByTeacher",
            expression = "java(teacherMapper.toTeacherResponse(course.getUploadedByTeacher()))")
    @Mapping(target = "courseRating",
            expression = "java(getAvgRatingCourse(course.getCourseId()))")
    @Mapping(target = "discountApprovedRate",
            expression = "java(getAvgApprovedDiscountRate(course.getCourseId()))")
    public abstract CourseResponse toCourseResponse(Course course);

    @Mapping(target = "types", ignore = true)
    @Mapping(target = "courseLevel", ignore = true)
    @Mapping(target = "fields", ignore = true)
    public abstract void updateCourse(@MappingTarget Course course, CourseUpdateRequest request);

    float getAvgRatingCourse(String courseId) {
        Float avgCourse = reviewRepository.getAvgCourse(courseId);
        return avgCourse != null ? avgCourse : 0.0f;
    }

    float getAvgApprovedDiscountRate(String courseId) {
        Float avgDiscountApproved = discountCourseRepository
                .getAvgApprovedRatingDiscountByCourseId(courseId);
        Float avgDiscountRequestApproved = requestDiscountRepository
                .getAvgApprovedRatingRequestDiscountByCourseId(courseId);
        if (avgDiscountApproved != null &&
                avgDiscountRequestApproved != null)
            return (avgDiscountApproved + avgDiscountRequestApproved) / 2;
        else if (avgDiscountApproved != null)
            return avgDiscountApproved;
        else if (avgDiscountRequestApproved != null)
            return avgDiscountRequestApproved;
        else return 0.0f;
    }
}
