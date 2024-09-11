package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Review;
import com.duokoala.server.entity.user.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    @Query(nativeQuery = true,
           value = "SELECT * FROM course " +
                    "WHERE uploaded_by_teacher_user_id = :teacherId")
    List<Course> getListByTeacherId(@Param("teacherId") String teacherId);

    @Query(nativeQuery = true,
            value ="SELECT c.* " +
                    "FROM course c JOIN enroll_course ec " +
                    "WHERE ec.student_user_id = :studentId")
    List<Course> findAllByUploadedByStudentId(@Param("studentId") String studentId);

    List<Course> findAllByUploadedByTeacher(Teacher teacher);

}
