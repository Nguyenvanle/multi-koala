package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.RequestDiscount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestDiscountRepository extends JpaRepository<RequestDiscount, String> {
    List<RequestDiscount> findAllByCourse(Course course);
    @Query(nativeQuery = true,
            value = "SELECT AVG(discount_rate) " +
                    "FROM request_discount " +
                    "WHERE course_course_id = :courseId " +
                    "AND status = 'APPROVED'")
    Float getAvgApprovedRatingRequestDiscountByCourseId(@Param("courseId") String courseId);
}
