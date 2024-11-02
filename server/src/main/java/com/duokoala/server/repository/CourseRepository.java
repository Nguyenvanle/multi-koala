package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.courseEnums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    @Query(nativeQuery = true,
            value = "SELECT * FROM course " +
                    "WHERE uploaded_by_teacher_user_id = :teacherId")
    List<Course> getListByTeacherId(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value = "SELECT MAX(course_price) FROM course")
    Float getMaxPrice();

    @Query(nativeQuery = true,
            value = "SELECT MIN(course_price) FROM course")
    Float getMinPrice();

    List<Course> findAllByUploadedByTeacher(Teacher teacher);

    List<Course> findAllByStatus(Status status);

    @Query(nativeQuery = true,
            value = "SELECT COALESCE(SUM(c.course_price),0.0) " +
                    "FROM enroll_course ec " +
                    "JOIN course c ON c.course_id = ec.course_course_id " +
                    "WHERE c.course_id = :courseId")
    Double sumIncomeCourse(@Param("courseId") String courseId);

    List<Course> findAllByUploadedByTeacherAndEnrollCoursesEnrollAtAfter(Teacher teacher, LocalDateTime date);

}
