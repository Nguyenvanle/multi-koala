package com.duokoala.server.service;

import com.duokoala.server.dto.request.courseRequest.CourseApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.enums.Level;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CourseMapper;
import com.duokoala.server.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseService {
    CourseRepository courseRepository;
    CourseMapper courseMapper;
    TypeRepository typeRepository;
    AuthenticationService authenticationService;
    ReviewRepository reviewRepository;
    FieldRepository fieldRepository;
    DiscountRepository discountRepository;
    DiscountCourseRepository discountCourseRepository;
    RequestDiscountRepository requestDiscountRepository;

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

    public CourseResponse create(CourseCreateRequest request) {
        Course course = courseMapper.toCourse(request);
        course.setCourseUploadedAt(LocalDateTime.now());
        var types = typeRepository.findAllById(request.getTypes());
        course.setTypes(new HashSet<>(types));
        var fields = fieldRepository.findAllById(request.getFields());
        course.setFields(new HashSet<>(fields));
        Image image = new Image();
        image.setImageUrl(request.getImageUrl());
        course.setImage(image);
        course.setCourseLevel(Level.fromString(request.getCourseLevel()));
        course.setUploadedByTeacher(
                authenticationService.getAuthenticatedTeacher());
        course.setStatus(Status.PENDING_APPROVAL);
        course.setDeleted(false);
        return courseMapper.toCourseResponse(courseRepository.save(course), 0.0f, 0.0f);
    }

    public CourseResponse update(String courseId, CourseUpdateRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        courseMapper.updateCourse(course, request);
        var types = typeRepository.findAllById(request.getTypes());
        course.setTypes(new HashSet<>(types));
        var fields = fieldRepository.findAllById(request.getFields());
        course.setFields(new HashSet<>(fields));
        course.setCourseLevel(Level.fromString(request.getCourseLevel()));
        course.getImage().setImageUrl(request.getImageUrl());
        return courseMapper.toCourseResponse(
                courseRepository.save(course),
                getAvgRatingCourse(courseId),
                getAvgApprovedDiscountRate(course.getCourseId()));
    }

    public CourseResponse get(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        return courseMapper.toCourseResponse(
                course,
                getAvgRatingCourse(courseId),
                getAvgApprovedDiscountRate(course.getCourseId()));
    }

    public List<CourseResponse> getAll() {
        var courses = courseRepository.findAll();
        return courses.stream().map(
                        course -> courseMapper
                                .toCourseResponse(course,
                                        getAvgRatingCourse(course.getCourseId()),
                                        getAvgApprovedDiscountRate(course.getCourseId())))
                .toList();
    }

    public List<CourseResponse> getListByTeacherId(String teacherId) {
        var courses = courseRepository.getListByTeacherId(teacherId);
        return courses.stream().map(course -> courseMapper
                        .toCourseResponse(course,
                                getAvgRatingCourse(course.getCourseId()),
                                getAvgApprovedDiscountRate(course.getCourseId())))
                .toList();
    }

    public List<CourseResponse> getMine() {
        var courses = courseRepository
                .findAllByUploadedByTeacher
                        (authenticationService.getAuthenticatedTeacher());
        return courses.stream().map(course -> courseMapper
                        .toCourseResponse(course,
                                getAvgRatingCourse(course.getCourseId()),
                                getAvgApprovedDiscountRate(course.getCourseId())))
                .toList();
    }

    public List<CourseResponse> getMyEnrollCourse() {
        var courses = courseRepository
                .findAllByUploadedByStudentId(authenticationService
                        .getAuthenticatedStudent()
                        .getUserId());
        return courses.stream().map(course -> courseMapper
                        .toCourseResponse(
                                course,
                                getAvgRatingCourse(course.getCourseId()),
                                getAvgApprovedDiscountRate(course.getCourseId())))
                .toList();
    }

    public void delete(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        course.setDeleted(true);
        courseRepository.save(course);
    }

    public CourseResponse approve(String courseId, CourseApproveRequest request) {
        Status approvedStatus = Status.validateApprovedStatus(request.getStatus());
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        if (!Objects.isNull(course.getApprovedByAdmin()))
            throw new AppException(ErrorCode.COURSE_ALREADY_APPROVED);
        course.setStatus(approvedStatus);
        course.setApprovedByAdmin(authenticationService.getAuthenticatedAdmin());
        return courseMapper.toCourseResponse(courseRepository.save(course),
                0.0f, 0.0f);
    }
}
