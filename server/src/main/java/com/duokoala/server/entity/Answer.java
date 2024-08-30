package com.duokoala.server.entity;

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
}
