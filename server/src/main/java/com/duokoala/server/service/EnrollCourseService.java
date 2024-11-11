package com.duokoala.server.service;

import com.duokoala.server.dto.request.enrollCourseRequest.EnrollCourseUpdateRequest;
import com.duokoala.server.dto.response.enrollCourseResponse.EnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.MyEnrollCourseResponse;
import com.duokoala.server.dto.response.enrollCourseResponse.RecentlyEnrollCourseResponse;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.EnrollCourseMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.EnrollCourseRepository;
import com.duokoala.server.repository.LessonRepository;
import com.duokoala.server.repository.LessonStudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class EnrollCourseService {
    EnrollCourseRepository enrollCourseRepository;
    EnrollCourseMapper enrollCourseMapper;
    CourseRepository courseRepository;
    AuthenticationService authenticationService;
    LessonStudentService lessonStudentService;
    LessonStudentRepository lessonStudentRepository;
    LessonRepository lessonRepository;


    @Transactional
    public EnrollCourseResponse create(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        var student = authenticationService.getAuthenticatedStudent();
        var enrollCourse = EnrollCourse.builder()
                .student(student)
                .course(course)
                .enrollAt(LocalDateTime.now())
                .process(0)
                .build();
        try {
            enrollCourseRepository.save(enrollCourse);
            List<LessonStudent> lessonStudents = course.getLessons().stream()
                    .map(lesson -> lessonStudentService.create(lesson, student))
                    .toList();
            lessonStudentRepository.saveAll(lessonStudents);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.ENROLL_COURSE_EXISTED);
        }
        return enrollCourseMapper.toEnrollCourseResponse(enrollCourse);
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

    public List<MyEnrollCourseResponse> getMyEnrollCourse() {
        var enrollCourses = enrollCourseRepository
                .findAllByStudent(authenticationService.getAuthenticatedStudent());
        return enrollCourses.stream().map(enrollCourseMapper::toMyEnrollCourseResponse).toList();
    }

    public List<RecentlyEnrollCourseResponse> getRecentlyEnrollCourse() {
        String teacherId = authenticationService.getAuthenticatedTeacher().getUserId();
        return enrollCourseRepository.getRecentlyEnrollCourse(teacherId).stream()
                .map(enrollCourse -> RecentlyEnrollCourseResponse.builder()
                        .studentId(enrollCourse.getStudent().getUserId())
                        .studentName(enrollCourse.getStudent().getFirstname() + " " + enrollCourse.getStudent().getLastname())
                        .studentEmail(enrollCourse.getStudent().getEmail())
                        .courseId(enrollCourse.getCourse().getCourseId())
                        .courseName(enrollCourse.getCourse().getCourseName())
                        .process(enrollCourse.getProcess())
                        .status(enrollCourse.getProcess() == 0 ? "Just started" : enrollCourse.getProcess() == 1 ? "Completed" : "In progress")
                        .enrollAt(enrollCourse.getEnrollAt())
                        .coursePrice(enrollCourse.getCourse().getCoursePrice())
                        .build()).toList();
    }
}
