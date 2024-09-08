package com.duokoala.server.repository;

import com.duokoala.server.entity.DiscountCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountCourseRepository extends JpaRepository<DiscountCourse, String> {
    @Query(nativeQuery = true,
            value = "SELECT * " +
                    "FROM discount_course " +
                    "WHERE discount_discount_id = :discountId " +
                    "AND course_course_id = :courseId")
    DiscountCourse findByDiscountIdAndCourseId(@Param("discountId") String discountId, @Param("courseId") String courseId);

}
