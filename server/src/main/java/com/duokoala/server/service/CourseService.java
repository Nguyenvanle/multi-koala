package com.duokoala.server.service;

import com.duokoala.server.dto.request.courseRequest.CourseApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.courseResponse.DiscountAppliedResponse;
import com.duokoala.server.dto.response.courseResponse.CoursePriceResponse;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseService {
    CourseRepository courseRepository;
    CourseMapper courseMapper;
    TypeRepository typeRepository;
    AuthenticationService authenticationService;
    FieldRepository fieldRepository;
    DiscountCourseRepository discountCourseRepository;
    RequestDiscountRepository requestDiscountRepository;

    public DiscountAppliedResponse getMaxApprovedDiscountRate(String courseId) {
        Float maxDiscountCourse = Optional.ofNullable(
                discountCourseRepository
                        .findMaxApprovedDiscountRateByCourseId(courseId)
        ).orElse(0.0f);

        Float maxRequestDiscount = Optional.ofNullable(
                requestDiscountRepository
                        .findMaxApprovedRequestDiscountRateByCourseId(courseId)
        ).orElse(0.0f);

        return DiscountAppliedResponse.builder()
                .discountApplied(Math.max(maxDiscountCourse, maxRequestDiscount))
                .build();
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
        course.setStatus(Status.IN_EDITING);
        course.setDeleted(false);
        return courseMapper.toCourseResponse(courseRepository.save(course));
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
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse get(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        return courseMapper.toCourseResponse(course);
    }

    public List<CourseResponse> getAll() {
        var courses = courseRepository.findAll();
        return courses.stream().map(courseMapper::toCourseResponse).toList();
    }

    public CoursePriceResponse getCoursePrice() {
        return CoursePriceResponse.builder()

                .maxCoursePrice(Optional.ofNullable(courseRepository.getMaxPrice()
                ).orElse(0.0f))

                .minCoursePrice(Optional.ofNullable(courseRepository.getMinPrice()
                ).orElse(0.0f))

                .build();
    }

    public List<CourseResponse> getAvailableCourses() {
        var courses = courseRepository.findAllByStatus(Status.APPROVED);
        return courses.stream().map(courseMapper::toCourseResponse).toList();
    }

    public List<CourseResponse> getListByTeacherId(String teacherId) {
        var courses = courseRepository.getListByTeacherId(teacherId);
        return courses.stream().map(courseMapper::toCourseResponse).toList();
    }

    public List<CourseResponse> getMyUploadedCourses() {
        var courses = courseRepository
                .findAllByUploadedByTeacher
                        (authenticationService.getAuthenticatedTeacher());
        return courses.stream().map(courseMapper::toCourseResponse).toList();
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
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse sendToApprove(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        course.setStatus(Status.PENDING_APPROVAL);
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }
}
