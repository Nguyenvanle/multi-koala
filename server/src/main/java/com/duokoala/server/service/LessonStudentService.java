package com.duokoala.server.service;

import com.duokoala.server.dto.response.LessonStudentResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.LessonStudentMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.EnrollCourseRepository;
import com.duokoala.server.repository.LessonStudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LessonStudentService {
    EnrollCourseRepository enrollCourseRepository;
    LessonStudentRepository lessonStudentRepository;
    CourseRepository courseRepository;
    AuthenticationService authenticationService;
    LessonStudentMapper lessonStudentMapper;

    public LessonStudent create(Lesson lesson, Student student) {
        return LessonStudent.builder()
                .lesson(lesson)
                .student(student)
                .lastUpdate(LocalDateTime.now())
                .process(0)
                .build();
    }

    public List<LessonStudentResponse> myEnrolledLessonsInCourse(String courseId) {
        Student student = authenticationService.getAuthenticatedStudent();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        List<LessonStudent> lessonStudents = lessonStudentRepository.findByStudentAndLessonCourse(student, course);
        return lessonStudents.stream().map(lessonStudentMapper::toLessonStudentResponse).collect(Collectors.toList());
    }


//    public void updateStudentEnroll() {
//        List<EnrollCourse> enrollCourses = enrollCourseRepository.findAll();
//        for (EnrollCourse enroll : enrollCourses) {
//            List<LessonStudent> lessonStudents = enroll.getCourse().getLessons().stream()
//                    .map(lesson -> create(lesson, enroll.getStudent()))
//                    .toList();
//            lessonStudentRepository.saveAll(lessonStudents);
//        }
//    }
}
