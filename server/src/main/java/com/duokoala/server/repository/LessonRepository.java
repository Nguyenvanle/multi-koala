package com.duokoala.server.repository;

import com.duokoala.server.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, String> {
    @Query(nativeQuery = true,
            value = "SELECT COUNT(*) " +
                    "FROM lesson " +
                    "WHERE course_course_id = :courseId")
    int countLessonsByCourseId(@Param("courseId") String courseId);
}
