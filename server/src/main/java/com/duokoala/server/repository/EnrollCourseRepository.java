package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.EnrollCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollCourseRepository extends JpaRepository<EnrollCourse, String> {
    @Query(nativeQuery = true,
            value ="SELECT * " +
                    "FROM enroll_course " +
                    "WHERE student_user_id = :studentId")
    List<EnrollCourse> findEnrollCoursesByStudentId(@Param("studentId") String studentId);
}
