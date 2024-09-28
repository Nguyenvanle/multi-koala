package com.duokoala.server.repository.userRepository;

import com.duokoala.server.entity.user.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {
    Optional<Teacher> findByUsername(String username);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(DISTINCT c.course_id) " +
                    "FROM course c WHERE c.uploaded_by_teacher_user_id = :teacherId")
    int countTotalCourses(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(DISTINCT " +
                    "CASE WHEN c.status = 'approved' THEN c.course_id END) " +
                    "FROM course c WHERE c.uploaded_by_teacher_user_id = :teacherId")
    int countTotalApprovedCourses(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(DISTINCT ec.enroll_course_id) " +
                    "FROM enroll_course ec " +
                    "JOIN course c ON c.course_id = ec.course_course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    int countTotalEnrollments(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(DISTINCT ec.student_user_id) " +
                    "FROM enroll_course ec " +
                    "JOIN course c ON c.course_id = ec.course_course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    int countTotalStudents(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(DISTINCT " +
                    "CASE WHEN ec.process = 1.0 THEN ec.enroll_course_id END) " +
                    "FROM enroll_course ec JOIN course c ON c.course_id = ec.course_course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    int countTotalCompletedCourses(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT SUM(c.course_price) " +
                    "FROM enroll_course ec " +
                    "JOIN course c ON c.course_id = ec.course_course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    double sumTotalPrices(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT CASE WHEN COUNT(qr.quiz_result_id) > 0 " +
                    "THEN (COUNT(CASE WHEN qr.correct_answers > t.passing_score THEN qr.quiz_result_id END)/COUNT(qr.quiz_result_id)) " +
                    "ELSE 0.0 END " +
                    "FROM quiz_result qr JOIN test t ON t.test_id = qr.test_test_id " +
                    "JOIN lesson l ON l.lesson_id = t.lesson_lesson_id " +
                    "JOIN course c ON c.course_id = l.course_course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    double calculatePassRatingPerTest(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT CASE WHEN COUNT(qr.quiz_result_id) > 0 " +
                    "THEN AVG(CAST(qr.correct_answers AS DOUBLE) / qr.total_question) ELSE 0.0 END " +
                    "FROM quiz_result qr JOIN test t ON t.test_id = qr.test_test_id " +
                    "JOIN lesson l ON l.lesson_id = t.lesson_lesson_id " +
                    "JOIN course c ON c.course_id = l.course_course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    double calculateCorrectRatingPerQuestion(@Param("teacherId") String teacherId);
}
