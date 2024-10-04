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
    List<EnrollCourse> findAllByStudent(Student student);
    int countByCourse(Course course);
    int countByCourseAndProcess(Course course, float process);
}
