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
public class EnrollCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String enrollCourseId;
    LocalDateTime enrollAt;
    LocalDateTime lastUpdate;
    float process;
    @ManyToOne
    Student student;
    @ManyToOne
    Course course;
}
