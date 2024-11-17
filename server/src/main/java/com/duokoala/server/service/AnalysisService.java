package com.duokoala.server.service;

import com.duokoala.server.dto.response.analysis.studentAnalysisResponse.AnalysisStudentStatusResponse;
import com.duokoala.server.dto.response.analysis.studentAnalysisResponse.StudentReportAnalysisResponse;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.repository.EnrollCourseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
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

        int totalStudent = myStudentEnrollment
                .stream()
                .map(EnrollCourse::getStudent)
                .distinct()
                .toList()
                .size();

        int countNewStudent = myStudentEnrollment
                .stream()
                .filter(enrollCourse ->
                        enrollCourse.getEnrollAt()
                                .isAfter(LocalDateTime.now().minusMonths(1)))
                .toList()
                .size();

        int countActiveStudent = (int) myStudentEnrollment.stream()
                .map(EnrollCourse::getStudent)
                .filter(student -> student.getQuizResults().stream()
                        .anyMatch(quizResult -> quizResult.getDateTaken().isAfter(LocalDateTime.now().minusMonths(1))))
                .distinct()
                .count();

        int countCompletedLesson = (int) myStudentEnrollment.stream()
                .map(EnrollCourse::getStudent)
                .filter(student -> student.getLessonStudents().stream()
                        .anyMatch(lessonStudent ->
                                lessonStudent.getProcess() == 1.0
                                        && lessonStudent.getLastUpdate().isAfter(LocalDateTime.now().minusMonths(1))))
                .distinct()
                .count();


        int countCompletedCourse = (int) myStudentEnrollment.stream()
                .filter(enrollCourse ->
                        enrollCourse.getLastUpdate() != null &&
                                enrollCourse.getProcess() == 1.0
                                && enrollCourse.getLastUpdate().isAfter(LocalDateTime.now().minusMonths(1)))
                .map(EnrollCourse::getStudent)
                .distinct()
                .count();

        int countInactiveStudent = (int) myStudentEnrollment.stream()
                .map(EnrollCourse::getStudent)
                .filter(student -> student.getQuizResults().stream()
                        .noneMatch(quizResult -> quizResult.getDateTaken().isAfter(LocalDateTime.now().minusMonths(1))))
                .distinct()
                .count();

        List<AnalysisStudentStatusResponse> studentStatus = List.of(
                new AnalysisStudentStatusResponse
                        ("new", countNewStudent,
                                "Students who have just enrolled in a course this month"),
                new AnalysisStudentStatusResponse
                        ("active", countActiveStudent,
                                "Students actively participating in at least one test this month"),
                new AnalysisStudentStatusResponse
                        ("completed_lesson", countCompletedLesson,
                                "Students who have completed at least one lesson this month"),
                new AnalysisStudentStatusResponse
                        ("completed_course", countCompletedCourse,
                                "Students who have completed at least one course this month"),
                new AnalysisStudentStatusResponse
                        ("inactive", countInactiveStudent,
                                "Students haven't taken any test this month."
                        )
        );

        return StudentReportAnalysisResponse.builder()
                .month(LocalDateTime.now())
                .trend((float) countNewStudent / totalStudent)
                .studentStatus(studentStatus)
                .build();
    }
}
