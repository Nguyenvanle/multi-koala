package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonStudentRepository extends JpaRepository<LessonStudent, String> {
    List<LessonStudent> findByStudentAndLessonCourse(Student student, Course course);

    Optional<LessonStudent> findByStudentAndLesson(Student student, Lesson lesson);

    int countByStudentAndLessonCourseAndProcess(Student student, Course course, int process);
}
