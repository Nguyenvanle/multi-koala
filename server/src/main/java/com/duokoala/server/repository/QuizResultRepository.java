package com.duokoala.server.repository;

import com.duokoala.server.entity.QuizResult;
import com.duokoala.server.entity.Test;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface QuizResultRepository extends JpaRepository<QuizResult,String> {
    List<QuizResult> findAllByStudent(Student student);
    List<QuizResult> findAllByStudentAndTestOrderByDateTakenDesc(Student student, Test test);
    @Query(nativeQuery = true,
value = "select qr.* " +
        "from quiz_result qr " +
        "join test t ON qr.test_test_id = t.test_id " +
        "join lesson l ON t.lesson_lesson_id = l.lesson_id " +
        "join course c ON l.course_course_id = c.course_id " +
        "where c.uploaded_by_teacher_user_id = :teacherId " +
        "ORDER BY qr.date_taken DESC")
List<QuizResult> findAllWithDetails(@Param("teacherId") String teacherId);
}
