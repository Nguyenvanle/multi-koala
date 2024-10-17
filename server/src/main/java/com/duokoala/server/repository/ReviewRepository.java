package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    @Query(nativeQuery = true,
            value = "SELECT COALESCE(AVG(rating),0.0) " +
                    "FROM review " +
                    "WHERE course_course_id = :courseId")
    Float getAvgCourse(@Param("courseId") String courseId);

    @Query(nativeQuery = true,
            value = "SELECT AVG(r.rating) " +
                    "FROM review r JOIN course c ON r.course_course_id = c.course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId")
    Float getAvgTeacher(@Param("teacherId") String teacherId);
    int countReviewByCourse(Course course);
}
