package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollCourseRepository extends JpaRepository<EnrollCourse, String> {
    List<EnrollCourse> findTop3ByStudentOrderByEnrollAtDesc(Student student);

    List<EnrollCourse> findAllByStudent(Student student);

    int countByCourse(Course course);

    int countByCourseAndProcess(Course course, float process);

    @Query(nativeQuery = true,
            value = "select ec.* from enroll_course ec " +
                    "join course c on ec.course_course_id = c.course_id " +
                    "WHERE c.uploaded_by_teacher_user_id = :teacherId " +
                    "ORDER by enroll_at DESC")
    List<EnrollCourse> getRecentlyEnrollCourse(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(*) " +
                    "FROM enroll_course " +
                    "GROUP BY course_course_id " +
                    "ORDER BY COUNT(*) DESC " +
                    "LIMIT 1")
    int findMaxCountEnrollCourseGroupByCourseId();
}
