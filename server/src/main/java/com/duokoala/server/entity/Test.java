package com.duokoala.server.entity;

import com.duokoala.server.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

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
    @Enumerated(EnumType.STRING)
    Status status;
    int passingScore;
    boolean isDeleted;
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Question> questions;
}
