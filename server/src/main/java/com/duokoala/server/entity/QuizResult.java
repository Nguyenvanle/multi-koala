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
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String quizResultId;
    int totalQuestion;
    int answeredQuestions;
    int correctAnswers;
    LocalDateTime dateTaken;
    @ManyToOne
    Test test;
    @ManyToOne
    Student student;
}
