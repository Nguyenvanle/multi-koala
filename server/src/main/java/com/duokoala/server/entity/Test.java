package com.duokoala.server.entity;
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
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String testId;
    String testDescription;
    LocalDateTime TestUploadedAt;
    @ManyToOne
    Lesson lesson;
    boolean isDeleted;
}
