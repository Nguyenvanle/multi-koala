package com.duokoala.server.repository;

import com.duokoala.server.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    @Query(nativeQuery = true,
            value = "SELECT * " +
                    "FROM review " +
                    "WHERE student_user_id = :studentId " +
                    "AND course_course_id = :courseId")
    Review findByStudentIdAndCourseId(
            @Param("studentId") String studentId,
            @Param("courseId") String courseId);
}
