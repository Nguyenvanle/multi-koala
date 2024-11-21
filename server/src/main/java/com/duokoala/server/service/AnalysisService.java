package com.duokoala.server.service;

import com.duokoala.server.dto.response.analysis.studentAnalysisResponse.AnalysisStudentStatusResponse;
import com.duokoala.server.dto.response.analysis.studentAnalysisResponse.StudentReportAnalysisResponse;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.repository.EnrollCourseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AnalysisService {
    EnrollCourseRepository enrollCourseRepository;
    AuthenticationService authenticationService;

    public StudentReportAnalysisResponse getStudentReportAnalysis() {
        List<EnrollCourse> myStudentEnrollment = enrollCourseRepository.findAll()
                .stream()
                .filter(enrollCourse ->
                        enrollCourse
                                .getCourse()
                                .getUploadedByTeacher()
                                .equals(authenticationService.getAuthenticatedTeacher()))
                .toList();


        int totalStudent = (int) myStudentEnrollment
                .stream()
                .map(EnrollCourse::getStudent)
                .distinct()
                .count();


        int countNewStudent = (int) myStudentEnrollment//join but don't take anything yet
                .stream()
                .filter(enrollCourse ->
                        enrollCourse.getEnrollAt()
                                .isAfter(LocalDateTime.now().minusMonths(1)))
                .map(EnrollCourse::getStudent)
                .distinct()
                .filter(student -> student.getQuizResults().isEmpty())
                .count();

        int countCompletedCourse = (int) myStudentEnrollment.stream()
                .filter(enrollCourse ->
                        enrollCourse.getLastUpdate() != null &&
                                enrollCourse.getProcess() == 1.0
                                && enrollCourse.getLastUpdate().isAfter(LocalDateTime.now().minusMonths(1)))
                .map(EnrollCourse::getStudent)
                .distinct()
                .count();


        int countCompletedLesson = (int) myStudentEnrollment.stream()
                .map(EnrollCourse::getStudent)
                .filter(student -> student.getLessonStudents().stream()
                        .anyMatch(lessonStudent ->
                                lessonStudent.getProcess() == 1.0
                                        && lessonStudent.getLastUpdate().isAfter(LocalDateTime.now().minusMonths(1))))
                .distinct()
                .count() - countCompletedCourse;

        int countTakeTest = (int) myStudentEnrollment.stream()//is take test in month
                .map(EnrollCourse::getStudent)
                .filter(student -> student.getQuizResults().stream()
                        .anyMatch(quizResult -> quizResult.getDateTaken().isAfter(LocalDateTime.now().minusMonths(1))))
                .distinct()
                .count() - countCompletedLesson;


        int countInactiveStudent = totalStudent - countNewStudent - countCompletedCourse - countCompletedLesson - countTakeTest;

        List<AnalysisStudentStatusResponse> studentStatus = List.of(
                new AnalysisStudentStatusResponse
                        ("new", countNewStudent,//join in one month but don't take anything yet
                                "Students who have just enrolled in a course this month but don't do anything yet"),
                new AnalysisStudentStatusResponse
                        ("take_test", countTakeTest,//take test in month
                                "Students actively participating in at least one test this month"),
                new AnalysisStudentStatusResponse //completed lesson in month
                        ("completed_lesson", countCompletedLesson,
                                "Students who have completed at least one lesson this month"),
                new AnalysisStudentStatusResponse //completed course in month
                        ("completed_course", countCompletedCourse,
                                "Students who have completed at least one course this month"),
                new AnalysisStudentStatusResponse
                        ("inactive", countInactiveStudent,
                                "Students who haven't participated in any activities (test, course, lesson) this month, but have been enrolled in a course for more than a month"
                        )
        );

        log.info("Total Student:" + totalStudent);
        return StudentReportAnalysisResponse.builder()
                .month(LocalDateTime.now())
                .trend((float) countNewStudent / totalStudent)
                .studentStatus(studentStatus)
                .build();
    }
}
