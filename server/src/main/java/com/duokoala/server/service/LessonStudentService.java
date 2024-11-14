package com.duokoala.server.service;

import com.duokoala.server.dto.response.LessonStudentResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.LessonStudentMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.EnrollCourseRepository;
import com.duokoala.server.repository.LessonStudentRepository;
import com.duokoala.server.repository.QuizResultRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LessonStudentService {
    private final EnrollCourseRepository enrollCourseRepository;
    private final QuizResultRepository quizResultRepository;
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

    @Transactional
    public void updateMyProcessLesson(Lesson lesson) {
        Student student = authenticationService.getAuthenticatedStudent();
        LessonStudent lessonStudent = lessonStudentRepository.findByStudentAndLesson(student, lesson)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_LESSON_NOT_FOUND));
        int numberOfTest = lesson.getTests().size();
        if (numberOfTest == 0) return;
        int numberOfPasTest = quizResultRepository
                .countPassedTestInLesson(student.getUserId(), lesson.getLessonId());
        lessonStudent.setProcess((float) numberOfPasTest / numberOfTest);
        lessonStudent.setLastUpdate(LocalDateTime.now());
        if (lessonStudent.getProcess() == 1.0)
            updateProcessCourse(lesson.getCourse());
        lessonStudentRepository.save(lessonStudent);
    }

    @Transactional
    public void updateProcessCourse(Course course) {
        Student student = authenticationService.getAuthenticatedStudent();
        EnrollCourse enrollCourse = enrollCourseRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new AppException(ErrorCode.ENROLL_COURSE_NOT_FOUND));
        int numberOfLesson = course.getLessons().size();
        int numberOfPassLesson = lessonStudentRepository
                .countByStudentAndLessonCourseAndProcess(student, course, 1);
        enrollCourse.setProcess((float) numberOfPassLesson / numberOfLesson);
        enrollCourse.setLastUpdate(LocalDateTime.now());
        enrollCourseRepository.save(enrollCourse);
    }

    public void updateStudentEnroll() { //query use only one to insert data
        List<EnrollCourse> enrollCourses = enrollCourseRepository.findAll();
        for (EnrollCourse enroll : enrollCourses) {
            List<LessonStudent> lessonStudents = enroll.getCourse().getLessons().stream()
                    .map(lesson -> create(lesson, enroll.getStudent()))
                    .toList();
            lessonStudentRepository.saveAll(lessonStudents);
        }
    }
}
