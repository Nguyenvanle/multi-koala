package com.duokoala.server.repository;

import com.duokoala.server.entity.EnrollCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollCourseRepository extends JpaRepository<EnrollCourse, String> {
    @Query(nativeQuery = true,
            value = "SELECT * " +
                    "FROM enroll_course " +
                    "WHERE student_user_id = :studentId " +
                    "AND course_course_id = :courseId")
    EnrollCourse findByStudentIdAndCourseId(
            @Param("studentId") String studentId,
            @Param("courseId") String courseId);
}
