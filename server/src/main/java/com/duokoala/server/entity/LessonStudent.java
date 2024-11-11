package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Student;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class LessonStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String lessonStudentId;
    float process;
    LocalDateTime lastUpdate;
    @ManyToOne
    Student student;
    @ManyToOne
    Lesson lesson;
}
