package com.duokoala.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class StudentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String studentAnswerId;
    @ManyToOne
    QuizResult quizResult;
    @ManyToOne
    Question question;
    @ManyToOne
    Answer selectedAnswer;
    boolean isCorrect;
}
