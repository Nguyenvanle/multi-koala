package com.duokoala.server.service;

import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.repository.EnrollCourseRepository;
import com.duokoala.server.repository.LessonStudentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonStudentService {
    EnrollCourseRepository enrollCourseRepository;
    LessonStudentRepository lessonStudentRepository;

    public LessonStudent create(Lesson lesson, Student student) {
        return LessonStudent.builder()
                .lesson(lesson)
                .student(student)
                .lastUpdate(LocalDateTime.now())
                .process(0)
                .build();
    }

    public void updateStudentEnroll() {
        List<EnrollCourse> enrollCourses = enrollCourseRepository.findAll();
        for (EnrollCourse enroll : enrollCourses) {
            List<LessonStudent> lessonStudents = enroll.getCourse().getLessons().stream()
                    .map(lesson -> create(lesson, enroll.getStudent()))
                    .toList();
            lessonStudentRepository.saveAll(lessonStudents);
        }
    }
}
