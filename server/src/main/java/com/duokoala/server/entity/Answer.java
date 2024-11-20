package com.duokoala.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String answerId;
    String answerDescription;
    boolean isCorrect;
    @ManyToOne
    @JsonBackReference
    Question question;
    @JsonIgnore
    boolean isActive;
    @JsonIgnore
    LocalDateTime answerUploadedAt;
}
