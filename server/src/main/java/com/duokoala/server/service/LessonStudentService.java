package com.duokoala.server.service;

import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.user.Student;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonStudentService {
    public LessonStudent create(Lesson lesson, Student student) {
        return LessonStudent.builder()
                .lesson(lesson)
                .student(student)
                .lastUpdate(LocalDateTime.now())
                .process(0)
                .build();
    }
}
