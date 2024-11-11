package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonStudentRepository extends JpaRepository<LessonStudent, String> {
    List<LessonStudent> findByStudentAndLessonCourse(Student student, Course course);
}
