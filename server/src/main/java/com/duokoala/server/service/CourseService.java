package com.duokoala.server.service;

import com.duokoala.server.dto.request.certificationRequest.CertificationApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.CertificationResponse;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CourseMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.TypeRepository;
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

    public CourseResponse create(CourseCreateRequest request) {
        Course course = courseMapper.toCourse(request);
        course.setCourseUploadedAt(LocalDateTime.now());
        var types = typeRepository.findAllById(request.getTypes());
        course.setTypes(new HashSet<>(types));
        Image image = new Image();
        image.setImageUrl(request.getImageUrl());
        course.setImage(image);
        course.setUploadedByTeacher(
                authenticationService.getAuthenticatedTeacher());
        course.setStatus(Status.PENDING_APPROVAL);
        course.setDeleted(false);
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse update(String courseId, CourseUpdateRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        courseMapper.updateCourse(course,request);
        var types = typeRepository.findAllById(request.getTypes());
        course.setTypes(new HashSet<>(types));
        course.getImage().setImageUrl(request.getImageUrl());
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse get(String courseId) {
        return courseMapper.toCourseResponse(courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND)));
    }

    public List<CourseResponse> getAll() {
        var courses = courseRepository.findAll();
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
}
