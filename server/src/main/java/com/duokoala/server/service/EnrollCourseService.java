package com.duokoala.server.service;

import com.duokoala.server.dto.request.EnrollCourseUpdateRequest;
import com.duokoala.server.dto.response.EnrollCourseResponse;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.EnrollCourseMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.EnrollCourseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EnrollCourseService {
    EnrollCourseRepository enrollCourseRepository;
    EnrollCourseMapper enrollCourseMapper;
    CourseRepository courseRepository;
    AuthenticationService authenticationService;

    public EnrollCourseResponse create(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        var student = authenticationService.getAuthenticatedStudent();
        if (!Objects.isNull(enrollCourseRepository
                .findByStudentIdAndCourseId(student.getUserId(), courseId)))
            throw new AppException(ErrorCode.ENROLL_COURSE_EXISTED);
        var enrollCourse = EnrollCourse.builder()
                .student(student)
                .course(course)
                .enrollAt(LocalDateTime.now())
                .process(0)
                .build();
        return enrollCourseMapper.toEnrollCourseResponse(enrollCourseRepository.save(enrollCourse));
    }
    public EnrollCourseResponse update(
            String enrollCourseId,
            EnrollCourseUpdateRequest request) {
        var enrollCourse = enrollCourseRepository.findById(enrollCourseId)
                .orElseThrow(() -> new AppException(ErrorCode.ENROLL_COURSE_NOT_FOUND));
        enrollCourseMapper.updateEnrollCourse(enrollCourse, request);
        return enrollCourseMapper
                .toEnrollCourseResponse(enrollCourseRepository.save(enrollCourse));
    }
    public EnrollCourseResponse get(String enrollCourseId) {
        var enrollCourse = enrollCourseRepository.findById(enrollCourseId)
                .orElseThrow(() -> new AppException(ErrorCode.ENROLL_COURSE_NOT_FOUND));
        return enrollCourseMapper.toEnrollCourseResponse(enrollCourse);
    }
    public List<EnrollCourseResponse> getAll() {
        var enrollCourses = enrollCourseRepository.findAll();
        return enrollCourses.stream().map(enrollCourseMapper::toEnrollCourseResponse).toList();
    }
}