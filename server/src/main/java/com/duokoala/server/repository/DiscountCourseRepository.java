package com.duokoala.server.repository;

import com.duokoala.server.dto.response.DiscountResponse;
import com.duokoala.server.entity.DiscountCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountCourseRepository extends JpaRepository<DiscountCourse, String> {

    @Query(nativeQuery = true,
            value = "SELECT * " +
                    "FROM discount_course " +
                    "WHERE course_course_id = :courseId")
    List<DiscountCourse> getListByCourseId(@Param("courseId") String courseId);

    @Query(nativeQuery = true,
            value = "SELECT AVG(d.discount_rate) " +
                    "FROM discount_course dc JOIN discount d " +
                    "ON dc.discount_discount_id = d.discount_id " +
                    "WHERE course_course_id = :courseId " +
                    "AND dc.status = 'APPROVED'")
    Float getAvgApprovedRatingDiscountByCourseId(@Param("courseId") String courseId);
}
