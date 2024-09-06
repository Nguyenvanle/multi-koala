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
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String reviewId;
    float rating;
    String comment;
    LocalDateTime reviewAt;
    @ManyToOne
    Student student;
    @ManyToOne
    Course course;
}
