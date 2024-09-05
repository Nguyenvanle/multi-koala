package com.duokoala.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String answerId;
    String answerDescription;
    boolean isCorrect;
    @ManyToOne
    @JsonIgnore
    Question question;
}
