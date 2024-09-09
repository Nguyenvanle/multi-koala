package com.duokoala.server.repository.userRepository;

import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByUsername(String username);
    @Query(value = "SELECT u.* FROM user u " +
            "JOIN student s ON u.user_id = s.user_id " +
            "JOIN enroll_course ec ON s.user_id = ec.student_user_id " +
            "WHERE ec.course_course_id = :courseId", nativeQuery = true)
    List<Student> getListByCourseId(@Param("courseId") String courseId);
}
